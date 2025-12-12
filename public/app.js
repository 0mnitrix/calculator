const topicList = document.getElementById('topic-list');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const latestRewardEl = document.getElementById('latest-reward');
const heroScoreEl = document.getElementById('hero-score');
const heroRewardEl = document.getElementById('hero-reward');
const refreshButton = document.getElementById('refresh-topics');

async function fetchTopics() {
  const response = await fetch('/api/topics');
  if (!response.ok) {
    throw new Error('Unable to load topics');
  }
  const data = await response.json();
  return data.topics;
}

async function updateProgress(slug, completed) {
  const response = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, completed })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Unable to update progress');
  }

  const data = await response.json();
  return data.topics;
}

function updateStats(topics) {
  const completed = topics.filter((t) => t.completed).length;
  const total = topics.length;
  const latestReward = topics.find((t) => t.completed && t.reward) || null;

  completedCountEl.textContent = completed;
  totalCountEl.textContent = total;
  heroScoreEl.textContent = `${completed} / ${total} topics`;
  latestRewardEl.textContent = latestReward ? latestReward.reward : 'No rewards yet';
  heroRewardEl.textContent = latestReward ? latestReward.reward : 'No rewards yet — pick a topic!';
}

function createTopicCard(topic) {
  const card = document.createElement('article');
  card.className = `topic-card${topic.completed ? ' completed' : ''}`;
  card.setAttribute('role', 'listitem');

  const header = document.createElement('div');
  header.className = 'topic-card__header';

  const title = document.createElement('h3');
  title.textContent = topic.title;

  const status = document.createElement('div');
  status.className = 'topic-actions';

  const statusDot = document.createElement('span');
  statusDot.className = 'status-dot';
  statusDot.title = topic.completed ? 'Completed' : 'Not started';

  header.append(title, statusDot);

  const summary = document.createElement('p');
  summary.textContent = topic.summary;

  const skillList = document.createElement('ul');
  skillList.className = 'skill-list';
  topic.skills.forEach((skill) => {
    const item = document.createElement('li');
    item.textContent = skill;
    skillList.appendChild(item);
  });

  const actionRow = document.createElement('div');
  actionRow.className = 'topic-actions';

  const button = document.createElement('button');
  button.className = topic.completed ? 'btn primary' : 'btn ghost';
  button.textContent = topic.completed ? 'Mark as not done' : 'Mark completed';
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Saving...';
    try {
      const updatedTopics = await updateProgress(topic.slug, !topic.completed);
      renderTopics(updatedTopics);
    } catch (error) {
      alert(error.message);
    } finally {
      button.disabled = false;
    }
  });

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = topic.completed ? topic.reward || 'Reward pending' : 'Ready to complete';

  actionRow.append(badge, button);

  if (topic.reward) {
    const reward = document.createElement('div');
    reward.className = 'reward';
    reward.textContent = topic.reward;
    actionRow.appendChild(reward);
  }

  card.append(header, summary, skillList, actionRow);
  return card;
}

function renderTopics(topics) {
  topicList.innerHTML = '';
  topics.forEach((topic) => {
    const card = createTopicCard(topic);
    topicList.appendChild(card);
  });
  updateStats(topics);
}

async function init() {
  try {
    const topics = await fetchTopics();
    renderTopics(topics);
  } catch (error) {
    heroRewardEl.textContent = 'Something went wrong loading topics. Try again.';
    alert(error.message);
  }
}

refreshButton.addEventListener('click', init);

document.addEventListener('DOMContentLoaded', init);
