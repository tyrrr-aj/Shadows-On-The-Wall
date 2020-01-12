# Generated by Django 3.0.2 on 2020-01-11 20:54

import datetime
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import revolution.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=5000)),
                ('date_time', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('description', models.CharField(max_length=5000)),
                ('date_time', models.DateTimeField(default=datetime.datetime(2020, 1, 11, 21, 54, 19, 844412))),
                ('votes', models.IntegerField(default=0)),
                ('comments', models.ManyToManyField(blank=True, default=None, to='revolution.Comment')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='AppUser',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='revolution.Entry')),
            ],
            bases=('revolution.entry',),
        ),
        migrations.AddField(
            model_name='entry',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='revolution.AppUser'),
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='revolution.AppUser'),
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='revolution.Entry')),
                ('improvements', models.ManyToManyField(blank=True, default=None, related_name='_solution_improvements_+', to='revolution.Solution')),
                ('source_problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='revolution.Problem')),
            ],
            bases=('revolution.entry', revolution.models.TraversableMixin),
        ),
        migrations.AddField(
            model_name='problem',
            name='solutions',
            field=models.ManyToManyField(blank=True, default=None, to='revolution.Solution'),
        ),
        migrations.AddField(
            model_name='problem',
            name='tags',
            field=models.ManyToManyField(to='revolution.Tag'),
        ),
        migrations.CreateModel(
            name='Initiative',
            fields=[
                ('entry_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='revolution.Entry')),
                ('improvements', models.ManyToManyField(blank=True, default=None, related_name='_initiative_improvements_+', to='revolution.Initiative')),
                ('tags', models.ManyToManyField(to='revolution.Tag')),
            ],
            bases=('revolution.entry', revolution.models.TraversableMixin),
        ),
    ]
