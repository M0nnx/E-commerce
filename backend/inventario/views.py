from rest_framework import generics, status
from .models import Producto
from .serializer import ProductoSerializer
from rest_framework import filters
from rest_framework.exceptions import NotFound
from rest_framework.response import Response


class addProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class listProducto(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class borrarProducto(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        print(f'Producto eliminado: {instance.nombre} (ID: {instance.id})')
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class buscarId(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class= ProductoSerializer
    filter_backends = [filters.BaseFilterBackend]
    search_fields = ['id','nombre','categoria']

    def get_object(self):
        param = self.kwargs.get('param',None)
        try:
            id = int(param)
            return Producto.objects.get(id=id)
        except ValueError:
            try:
                return Producto.objects.get(nombre__iexact=param)
            except Producto.DoesNotExist:
                raise NotFound(f"Producto no encontrado con el nombre: {param}")

class filtrarCategoria(generics.ListAPIView):
    queryset= Producto.objects.all()
    serializer_class= ProductoSerializer

    def get_queryset(self):
        param= self.kwargs.get('param',None)
        if param:
            productos = Producto.objects.filter(categoria__iexact=param)
            if productos.exists():
                return productos
            else:
                raise NotFound(f"No se encontraron productos en la categoría: {param}")
        else:
            raise NotFound("No se proporcionó ninguna categoría.")
