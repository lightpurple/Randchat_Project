from django.db import models

# Create your models here.
class Message(models.Model):
	text = models.TextField()
	send_time = models.DateField(auto_now_add=True)
