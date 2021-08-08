from django.contrib.auth import logout
from django.urls import path
from account.views import AccountCreateView, login, temp, logout

app_name = 'account'

urlpatterns = [
	path('temp/', temp, name='temp'),
	path('login/' , login, name='login'),
	path('logout/', logout, name='logout'),
	path('signup/', AccountCreateView.as_view(), name='signup'),
]
