# filepath: c:\Users\kmedu\hotel-appdev\hotel_backend\hotel_backend\urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('auth_app.urls')),  # Include auth_app URLs
]