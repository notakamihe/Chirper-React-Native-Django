# Generated by Django 3.1.5 on 2021-01-30 13:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chirp',
            old_name='createdAt',
            new_name='created_at',
        ),
    ]
