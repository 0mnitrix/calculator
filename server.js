const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data.db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database(DB_PATH);

const topics = [
  {
    slug: 'html-foundations',
    title: 'HTML Foundations',
    summary: 'Structure pages with semantic elements, links, media, and forms.',
    skills: [
      'Semantic tags (header, nav, main, footer)',
      'Links, lists, images, and tables',
      'Form inputs, labels, and accessibility basics'
    ]
  },
  {
    slug: 'css-essentials',
    title: 'CSS Essentials',
    summary: 'Style pages with layout systems, colors, and reusable utilities.',
    skills: [
      'Cascade, specificity, and resets',
      'Flexbox and grid for layouts',
      'Reusable classes, variables, and responsive design'
    ]
  },
  {
    slug: 'javascript-basics',
    title: 'JavaScript Basics',
    summary: 'Use JS to add interactivity, handle events, and manipulate the DOM.',
    skills: [
      'Variables, functions, and array/object basics',
      'DOM querying and event listeners',
      'Fetching data and updating the UI safely'
    ]
  },
  {
    slug: 'internet-fundamentals',
    title: 'How the Internet Works',
    summary: 'Understand requests, responses, DNS, hosting, and HTTP status codes.',
    skills: [
      'Clients, servers, and DNS routing',
      'HTTP verbs, headers, and caching',
      'Security basics: HTTPS, TLS, and content delivery'
    ]
  },
  {
    slug: 'api-building-blocks',
    title: 'API Building Blocks',
    summary: 'Learn how APIs share data, with JSON, endpoints, and CRUD patterns.',
    skills: [
      'RESTful patterns and resource modeling',
      'Reading API docs and testing with cURL/Postman',
      'Handling errors, auth basics, and rate limits'
    ]
  }
];

function setupDatabase() {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS topics (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        skills TEXT NOT NULL
      );`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS progress (
        topic_slug TEXT PRIMARY KEY,
        completed INTEGER NOT NULL DEFAULT 0,
        reward TEXT,
        completed_at TEXT,
        FOREIGN KEY(topic_slug) REFERENCES topics(slug)
      );`
    );

    const insertTopic = db.prepare(
      'INSERT OR IGNORE INTO topics (slug, title, summary, skills) VALUES (?, ?, ?, ?);'
    );

    topics.forEach((topic) => {
      insertTopic.run(topic.slug, topic.title, topic.summary, JSON.stringify(topic.skills));
    });
    insertTopic.finalize();
  });
}

function listTopics(res) {
  db.all(
    `SELECT t.slug, t.title, t.summary, t.skills, 
            COALESCE(p.completed, 0) AS completed, 
            p.reward, p.completed_at
     FROM topics t
     LEFT JOIN progress p ON t.slug = p.topic_slug
     ORDER BY t.title ASC;`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to load topics' });
        return;
      }

      const formatted = rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        summary: row.summary,
        skills: JSON.parse(row.skills),
        completed: Boolean(row.completed),
        reward: row.reward,
        completedAt: row.completed_at
      }));

      res.json({ topics: formatted });
    }
  );
}

function getRewardFor(topicTitle) {
  const rewardPhrases = [
    'Badge unlocked',
    'New sticker earned',
    'Achievement reached',
    'High-five token',
    'Learning streak bonus'
  ];
  const phrase = rewardPhrases[Math.floor(Math.random() * rewardPhrases.length)];
  return `${phrase}: ${topicTitle} star`;
}

app.get('/api/topics', (_req, res) => {
  listTopics(res);
});

app.post('/api/progress', (req, res) => {
  const { slug, completed } = req.body || {};

  if (!slug || typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Provide both slug and completed (boolean).' });
    return;
  }

  db.get('SELECT * FROM topics WHERE slug = ?;', [slug], (err, topicRow) => {
    if (err) {
      res.status(500).json({ error: 'Unable to update progress.' });
      return;
    }

    if (!topicRow) {
      res.status(404).json({ error: 'Topic not found.' });
      return;
    }

    const reward = completed ? getRewardFor(topicRow.title) : null;
    const timestamp = completed ? new Date().toISOString() : null;

    db.run(
      `INSERT INTO progress (topic_slug, completed, reward, completed_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(topic_slug) DO UPDATE SET
         completed = excluded.completed,
         reward = excluded.reward,
         completed_at = excluded.completed_at;`,
      [slug, completed ? 1 : 0, reward, timestamp],
      (writeErr) => {
        if (writeErr) {
          res.status(500).json({ error: 'Failed to store progress.' });
          return;
        }

        listTopics(res);
      }
    );
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

setupDatabase();

app.listen(PORT, () => {
  console.log(`Web Learning Hub running at http://localhost:${PORT}`);
});
