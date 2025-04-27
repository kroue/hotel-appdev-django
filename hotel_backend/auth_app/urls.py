# filepath: c:\Users\kmedu\hotel-appdev\hotel_backend\auth_app\urls.py
from django.urls import path
from .views import login_view, logout_view, register_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
]