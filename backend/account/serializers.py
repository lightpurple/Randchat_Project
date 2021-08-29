from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = Account.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            nickname=validated_data['nickname'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = Account
        fields = ['nickname', 'username', 'email', 'password']
