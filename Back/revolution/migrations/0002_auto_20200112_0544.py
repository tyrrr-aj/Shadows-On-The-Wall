# Generated by Django 3.0.2 on 2020-01-12 04:44

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('revolution', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='date_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='entry',
            name='date_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
