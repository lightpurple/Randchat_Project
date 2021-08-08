from django.contrib import auth
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

# Create your views here.

def temp(request):
	return render(request, 'account/temp.html')

def login(request):
	if request.method == 'POST':
		id = request.POST['username']
		pwd = request.POST['password']
		user = auth.authenticate(request, username=id, password=pwd)
		if user is not None:
			return render(request, 'account/temp.html')
		else:
			return render(request, 'account/login.html', {'error' : 'Id or Pwd is incorrect.'})
	else:
		return render(request, 'account/login.html')

def logout(request):
	if request.method == 'POST':
		auth.logout(request)
		return render(request, 'account/login.html')

class AccountCreateView(CreateView):
	model = User
	form_class = UserCreationForm
	#로그인 성공시 이동할 페이지
	success_url = reverse_lazy('account:login')
	#로그인 페이지
	template_name = 'account/signup.html'
