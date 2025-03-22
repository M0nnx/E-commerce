from rest_framework.routers import DefaultRouter
from .views import postProducto,getProducto,postProducto, buscarId, filtrarCategoria, borrarProducto, verProducto
from django.urls import path, include

router = DefaultRouter()
router.register(r'productos', verProducto, basename="producto")

urlpatterns = [
    path('productos/add/', postProducto.as_view(), name='añadirProducto'),
    path('productos/view/', getProducto.as_view(), name='verProducto'),
    path('productos/post/<int:id>', postProducto.as_view(), name='postProducto'),
    path('productos/view/<str:param>/', buscarId.as_view(), name='buscarPor'),
    path('productos/categoria/<str:param>/', filtrarCategoria.as_view(), name='filtrarCategoria'),
    path('productos/delete/<int:pk>/', borrarProducto.as_view(), name='borrarProducto'),
    path('', include(router.urls)),
]