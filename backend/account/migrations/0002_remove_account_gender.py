# Generated by Django 3.2.6 on 2021-08-29 11:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='gender',
        ),
    ]
