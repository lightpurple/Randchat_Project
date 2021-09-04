from django.urls import path
from .views import LoginView, MyPage, createUser

urlpatterns = [
	path('signup/', createUser),
	path('login/', LoginView.as_view()),
	path('mypage/', MyPage)
]

