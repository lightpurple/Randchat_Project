from django.contrib.auth import logout
from django.urls import path
from account.views import signup, login, account

urlpatterns = [
	path('login/', login),
	path('account/<int:pk>', account),
	path('signup/', signup)
]
