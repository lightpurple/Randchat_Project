from django.urls import path
from .views import MyPage, createUser, login

urlpatterns = [
	path('signup/', createUser),
	path('login/', login),
	path('mypage/', MyPage)
]

