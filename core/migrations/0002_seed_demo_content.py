import json
from pathlib import Path
from django.db import migrations


def load_demo_data(apps, schema_editor):
    Course = apps.get_model('core', 'Course')
    Lesson = apps.get_model('core', 'Lesson')
    Quiz = apps.get_model('core', 'Quiz')
    QuizQuestion = apps.get_model('core', 'QuizQuestion')
    ProgressRecord = apps.get_model('core', 'ProgressRecord')

    base_dir = Path(__file__).resolve().parents[2]
    data_dir = base_dir / 'data'

    courses_data = json.loads((data_dir / 'courses.json').read_text(encoding='utf-8'))
    created_courses = []
    for item in courses_data:
        course = Course.objects.create(
            title=item['title'],
            description=item['description'],
            level=item['level'],
            lessons_count=item['lessons'],
            duration_minutes=item['duration'],
            language=item['language'],
            progress=item.get('progress', ''),
        )
        created_courses.append(course)

    lesson_data = json.loads((data_dir / 'lessons.json').read_text(encoding='utf-8'))
    if created_courses:
        Lesson.objects.create(
            course=created_courses[0],
            title=lesson_data['title'],
            summary=lesson_data['summary'],
            steps=lesson_data.get('steps', []),
            vocab=lesson_data.get('vocab', []),
        )

    quiz_data = json.loads((data_dir / 'quiz.json').read_text(encoding='utf-8'))
    quiz = Quiz.objects.create(title=quiz_data['title'])
    QuizQuestion.objects.bulk_create(
        [
          QuizQuestion(quiz=quiz, prompt=item['prompt'], topic=item.get('topic', ''), options=item.get('options', []))
          for item in quiz_data.get('questions', [])
        ]
    )

    for course in created_courses:
        ProgressRecord.objects.create(
            course=course,
            percent=course.progress or '0%',
            lessons_completed=course.lessons_count,
            streak=0,
            points=0,
        )


def unload_demo_data(apps, schema_editor):
    Course = apps.get_model('core', 'Course')
    Lesson = apps.get_model('core', 'Lesson')
    Quiz = apps.get_model('core', 'Quiz')
    QuizQuestion = apps.get_model('core', 'QuizQuestion')
    ProgressRecord = apps.get_model('core', 'ProgressRecord')

    ProgressRecord.objects.all().delete()
    QuizQuestion.objects.all().delete()
    Quiz.objects.all().delete()
    Lesson.objects.all().delete()
    Course.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_demo_data, reverse_code=unload_demo_data),
    ]
