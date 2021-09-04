from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models


class UserManager(BaseUserManager):

    # 일반 user 생성
    def create_user(self, email, nickname, gender, password=None):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            nickname=nickname,
            gender=gender
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, nickname, password=None):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            nickname=nickname,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user


class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, blank=True, unique=True)
    nickname = models.CharField(max_length=100, blank=True, unique=True)
    gender = models.CharField(default='', max_length=10)
    created = models.DateField(auto_now_add=True)
    match_gender = models.CharField(default='', max_length=10)
    image = models.ImageField(blank=True, null=True, upload_to="images/")
    introduce = models.CharField(default='', max_length=1000, null=True)

    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # 헬퍼 클래스 사용
    objects = UserManager()

    USERNAME_FIELD = 'email'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = ['user']
        verbose_name_plural = ['users']

    def __str__(self):
        return self.email

