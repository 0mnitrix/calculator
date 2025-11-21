from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from core import views as core_views

page_patterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('index.html', TemplateView.as_view(template_name='index.html')),
    path('login.html', TemplateView.as_view(template_name='login.html'), name='login'),
    path('signup.html', TemplateView.as_view(template_name='signup.html'), name='signup'),
    path('dashboard.html', TemplateView.as_view(template_name='dashboard.html'), name='dashboard'),
    path('courses.html', TemplateView.as_view(template_name='courses.html'), name='courses'),
    path('course.html', TemplateView.as_view(template_name='course.html'), name='course'),
    path('lesson.html', TemplateView.as_view(template_name='lesson.html'), name='lesson'),
    path('quiz.html', TemplateView.as_view(template_name='quiz.html'), name='quiz'),
    path('progress.html', TemplateView.as_view(template_name='progress.html'), name='progress'),
    path('profile.html', TemplateView.as_view(template_name='profile.html'), name='profile'),
    path('leaderboard.html', TemplateView.as_view(template_name='leaderboard.html'), name='leaderboard'),
    path('settings.html', TemplateView.as_view(template_name='settings.html'), name='settings'),
]

api_patterns = [
    path('api/health/', core_views.health_check, name='health'),
    path('api/courses/', core_views.courses_api, name='api-courses'),
    path('api/lessons/', core_views.lesson_api, name='api-lessons'),
    path('api/quiz/', core_views.quiz_api, name='api-quiz'),
    path('api/progress/', core_views.progress_api, name='api-progress'),
]

urlpatterns = [path('admin/', admin.site.urls), *page_patterns, *api_patterns]

if settings.DEBUG:
    urlpatterns += static('css/', document_root=settings.BASE_DIR / 'css')
    urlpatterns += static('js/', document_root=settings.BASE_DIR / 'js')
    urlpatterns += static('assets/', document_root=settings.BASE_DIR / 'assets')
    urlpatterns += static('data/', document_root=settings.BASE_DIR / 'data')
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'static')
