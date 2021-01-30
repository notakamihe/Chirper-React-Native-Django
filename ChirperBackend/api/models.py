from django.db import models
from django.contrib.auth.models import User

import datetime


class Chirp (models.Model):
    by = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def get_created_at(self):
        return self.created_at.strftime('%m/%d/%y  %H:%M').lstrip("0").replace(" 0", "")

    @property
    def get_username(self):
        return User.objects.get(id=self.by.id).username
