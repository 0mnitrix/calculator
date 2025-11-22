from django.contrib import admin

from .models import Course, Lesson, ProgressRecord, Quiz, QuizQuestion


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0


class ProgressInline(admin.TabularInline):
    model = ProgressRecord
    extra = 0


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'language', 'lessons_count', 'progress')
    search_fields = ('title', 'description', 'language')
    inlines = [LessonInline, ProgressInline]


class QuizQuestionInline(admin.TabularInline):
    model = QuizQuestion
    extra = 0


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title',)
    inlines = [QuizQuestionInline]


admin.site.register(Lesson)
admin.site.register(QuizQuestion)
admin.site.register(ProgressRecord)
