from django.db import models


# Create your models here.
class Message(models.Model):
	text = models.TextField()
	send_time = models.DateField(auto_now_add=True)


class Account(models.Model):
	username = models.CharField(max_length=30)
	email = models.EmailField()
	gender = models.BooleanField()
	introduce = models.TextField()
	password = models.CharField(max_length=200)
	created = models.DateField(auto_now_add=True)

	class Meta:
		verbose_name = "유저정보"
		verbose_name_plural = "유저들 정보"
		db_table = "User"
		ordering = ['created']
