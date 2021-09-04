from rest_framework import status, exceptions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import AccountSerializer, UserLoginSerializer
from .models import User

"""
@api_view(['GET', 'POST'])
def signup(request):
	if request.method == 'GET':
		query_set = Account.objects.all()
		serializer = AccountSerializer(query_set, many=True)
		return JsonResponse(serializer.data, safe=False)
	elif request.method == 'POST':
		data = JSONParser().parse(request)
		serializer = AccountSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=201)
		return JsonResponse(serializer.errors, status=400)

"""


@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        serializer = AccountSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(email=serializer.validated_data['email']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate email"}, status=status.HTTP_409_CONFLICT)


"""class SignupView(APIView):
    def post(self, request):
        if not ('email' and 'password' and 'gender' in request.data):
            raise exceptions.ParseError("요청값이 올바르지 않습니다.")

        try:
            user = User.objects.create_user(
                email=request.data['email'],
                nickname=request.data['nickname'],
                gender=request.data['gender'],
                password=request.data['password']
            )
        except IntegrityError as e:
            raise exceptions.NotAcceptable("이미 존재하는 아이디입니다.")

        user.save()
        serializer = AccountSerializer(user)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
"""


class MyPage(APIView):
    def get(self, request):
        if not 'Authorization' in request.headers:
            raise exceptions.ParseError("헤더값이 올바르지 않습니다.")
        user = get_object_or_404(User, user=request.user)
        serializer = AccountSerializer(user)
        return Response(serializer.data)

"""
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        try:
            user = User.objects.get(email=email)
            if user is not None:
                if user.password == password:
                    token = get_object_or_404(Token, user=user)
                    response = {
                        'success': True,
                        'token': token.key
                    }
                    return Response(response, status=status.HTTP_200_OK)

                return HttpResponse(status=401)

            return HttpResponse(status=400)

        except KeyError:
            return Response({"message": "INVALID_KEYS"}, status=401)
"""


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if serializer.validated_data['email'] == "None": # email required
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': True,
            'token': serializer.data['token'] # 시리얼라이저에서 받은 토큰 전달
        }
        return Response(response, status=status.HTTP_200_OK)

"""
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.get(email=email)

        if user is not None:
            token = get_object_or_404(Token, user=user)
            serializer = AccountSerializer()
            if not serializer.is_valid(raise_exception=True):
                return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
            response = {
                'success': True,
                'token': token.key
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid Email or Password."}, status=status.HTTP_401_UNAUTHORIZED)
"""

"""
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            token = get_object_or_404(Token, user=user)
            serializer = AccountSerializer(user)
            return Response(serializer.data)
        else:
            return Response(status=401)
"""
