from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    level = models.CharField(max_length=32)
    lessons_count = models.PositiveIntegerField(default=0)
    duration_minutes = models.PositiveIntegerField(default=0)
    language = models.CharField(max_length=128)
    progress = models.CharField(max_length=16, blank=True)

    def __str__(self):
        return self.title


class Lesson(models.Model):
    course = models.ForeignKey(Course, related_name='lessons', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    summary = models.TextField()
    steps = models.JSONField(default=list)
    vocab = models.JSONField(default=list)

    def __str__(self):
        return self.title


class Quiz(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    prompt = models.TextField()
    topic = models.CharField(max_length=128, blank=True)
    options = models.JSONField(default=list)

    def __str__(self):
        return self.prompt[:50]


class ProgressRecord(models.Model):
    course = models.ForeignKey(Course, related_name='progress_entries', on_delete=models.CASCADE)
    percent = models.CharField(max_length=16)
    lessons_completed = models.PositiveIntegerField(default=0)
    streak = models.PositiveIntegerField(default=0)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.course.title} — {self.percent}"
