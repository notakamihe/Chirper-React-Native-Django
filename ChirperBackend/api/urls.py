from django.urls import path
from .views import *

urlpatterns = [
    path('current-user', current_user),
    path('users/', UserList.as_view()),
    path('chirps/', ChirpList.as_view()),
]
