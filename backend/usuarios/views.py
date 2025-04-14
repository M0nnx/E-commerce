from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from .serializers import UsuarioSerializer, LoginSerializer
from .models import Usuario
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .permissions import IsAdminUser, IsClienteUser
from rest_framework.exceptions import ValidationError


class UsuarioRegisterViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                if user.rol == 'admin':
                    user.is_superuser = True
                    user.is_staff = True
                    user.save()

                return Response({
                    'message': 'Usuario creado con éxito',
                    'user': UsuarioSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                raise ValidationError({"detail": str(e)})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioAdminViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)  
            return Response({
                'message': 'Login exitoso',
                'user': UsuarioSerializer(user).data,

            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditarPerfil(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UsuarioSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Perfil actualizado correctamente', 'user': serializer.data}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)