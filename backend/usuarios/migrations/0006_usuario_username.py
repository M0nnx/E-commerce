# Generated by Django 5.1.7 on 2025-04-10 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0005_remove_usuario_first_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='username',
            field=models.EmailField(blank=True, max_length=255, unique=True),
        ),
    ]
