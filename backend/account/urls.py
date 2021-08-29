from django.contrib.auth import logout
from django.urls import path, include
from .views import Signup, login, account

urlpatterns = [
	path('login/', login),
	path('account/<int:pk>', account),
	path('signup/', Signup.as_view()),
	path('api-auth/', include('rest_framework.urls')),
	# path('mypage/', mypage), patch
]

