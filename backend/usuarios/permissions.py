from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user and request.user.rol == 'admin'
        return False

class IsClienteUser(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user and request.user.rol == 'cliente'
        return False
