import json
from pathlib import Path

from django.conf import settings
from django.db import OperationalError
from django.http import Http404, JsonResponse
from django.views.decorators.http import require_GET

from .models import Course, Lesson, ProgressRecord, Quiz


CONTENT_DIR = Path(settings.BASE_DIR) / 'data'


def _load_json_file(filename: str):
    path = CONTENT_DIR / filename
    if not path.exists():
        raise Http404(f"Файл {filename} не найден")
    with path.open(encoding='utf-8') as handle:
        return json.load(handle)


def serialize_course(course: Course):
    return {
        'id': course.id,
        'title': course.title,
        'description': course.description,
        'level': course.level,
        'lessons': course.lessons_count,
        'duration': course.duration_minutes,
        'language': course.language,
        'progress': course.progress,
    }


def serialize_lesson(lesson: Lesson):
    return {
        'id': lesson.id,
        'title': lesson.title,
        'summary': lesson.summary,
        'steps': lesson.steps,
        'vocab': lesson.vocab,
        'course_id': lesson.course_id,
    }


def serialize_progress(entry: ProgressRecord):
    return {
        'course': serialize_course(entry.course),
        'percent': entry.percent,
        'lessons_completed': entry.lessons_completed,
        'streak': entry.streak,
        'points': entry.points,
    }


def serialize_quiz(quiz: Quiz):
    return {
        'id': quiz.id,
        'title': quiz.title,
        'questions': [
            {
                'prompt': q.prompt,
                'topic': q.topic,
                'options': q.options,
            }
            for q in quiz.questions.all()
        ],
    }


@require_GET
def health_check(request):
    return JsonResponse({'status': settings.HEALTH_CHECK_MESSAGE})


@require_GET
def courses_api(request):
    try:
        courses = Course.objects.all()
        if courses.exists():
            payload = [serialize_course(course) for course in courses]
            return JsonResponse(payload, safe=False)
    except OperationalError:
        pass

    payload = _load_json_file('courses.json')
    return JsonResponse(payload, safe=False)


@require_GET
def lesson_api(request):
    course_id = request.GET.get('course_id')
    try:
        lessons = Lesson.objects.all()
        if course_id:
            lessons = lessons.filter(course_id=course_id)
        lesson = lessons.first()
        if lesson:
            payload = serialize_lesson(lesson)
            return JsonResponse(payload, safe=False)
    except OperationalError:
        pass

    payload = _load_json_file('lessons.json')
    return JsonResponse(payload, safe=False)


@require_GET
def quiz_api(request):
    try:
        quiz = Quiz.objects.prefetch_related('questions').first()
        if quiz:
            payload = serialize_quiz(quiz)
            return JsonResponse(payload, safe=False)
    except OperationalError:
        pass

    payload = _load_json_file('quiz.json')
    return JsonResponse(payload, safe=False)


@require_GET
def progress_api(request):
    try:
        progress_entries = ProgressRecord.objects.select_related('course').all()
        if progress_entries.exists():
            payload = [serialize_progress(entry) for entry in progress_entries]
            return JsonResponse(payload, safe=False)
    except OperationalError:
        pass

    fallback_courses = _load_json_file('courses.json')
    payload = [
        {
            'course': course,
            'percent': course.get('progress', '0%'),
            'lessons_completed': course.get('lessons', 0),
            'streak': 0,
            'points': 0,
        }
        for course in fallback_courses
    ]
    return JsonResponse(payload, safe=False)
