from django.urls import path
from .views import addProducto, listProducto,buscarId,filtrarCategoria,borrarProducto


urlpatterns = [
    path('productos/add/', addProducto.as_view() ,name='añadirProducto'),
    path('productos/view/', listProducto.as_view() ,name='verProducto'),
    path('productos/view/<str:param>/', buscarId.as_view() ,name='buscarPor'),
    path('productos/categoria/<str:param>/', filtrarCategoria.as_view() ,name='filtrarCategoria'),
    path('productos/delete/<int:pk>/', borrarProducto.as_view() ,name='borrarProducto'),

]
