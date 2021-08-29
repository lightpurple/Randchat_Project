from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models


# Create your models here.
class Message(models.Model):
    text = models.TextField()
    send_time = models.DateField(auto_now_add=True)


class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, username, nickname, password=None):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            nickname=nickname,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, nickname, username, email=None, password=None):
        user = self.create_user(
            password=password,
            nickname=nickname,
            username=username,
            email=email,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    username = models.CharField(default='', max_length=100, null=False, blank=False)
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    introduce = models.CharField(default='', max_length=1000, null=True)
    created = models.DateField(auto_now_add=True)

    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # 헬퍼 클래스 사용
    objects = UserManager()

    USERNAME_FIELD = 'nickname'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.nickname
