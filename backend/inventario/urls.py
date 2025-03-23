from django.conf import settings
from rest_framework.routers import DefaultRouter
from .views import addProducto,getProducto,postProducto, buscarId, filtrarCategoria, borrarProducto,actualizar_imagen
from django.urls import path, include
from django.conf.urls.static import static



urlpatterns = [
    path('productos/add/', addProducto.as_view(), name='AñadirProducto'),
    path('productos/view/', getProducto.as_view(), name='VerProductos'),
    path('productos/post/<int:id>/', postProducto.as_view(), name='ModificarProducto'),
    path('productos/view/<str:param>/', buscarId.as_view(), name='buscarPorID'),
    path('productos/categoria/<str:param>/', filtrarCategoria.as_view(), name='filtrarCategoria'),
    path('productos/delete/<int:pk>/', borrarProducto.as_view(), name='BorrarProducto'),
    path('productos/change/<int:id>/', actualizar_imagen, name='actualizar_imagen'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)