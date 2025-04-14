from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioRegisterViewSet, UsuarioAdminViewSet, EditarPerfil
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'register', UsuarioRegisterViewSet, basename='register')
router.register(r'usuarios', UsuarioAdminViewSet, basename='usuarios-admin')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('perfil/', EditarPerfil.as_view(), name='perfil'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
