from rest_framework import generics, status
from .models import Producto
from .serializer import ProductoSerializer
from rest_framework import filters , viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.decorators import action


class postProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class getProducto(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class postProducto(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'id' 

    def get(self, request, *args, **kwargs):
        producto = self.get_object() 
        return Response(self.serializer_class(producto).data)  

    def update(self, request, *args, **kwargs):
        producto = self.get_object()  

        if 'nombre' in request.data:
            producto.nombre = request.data['nombre']
        if 'descripcion' in request.data:
            producto.descripcion = request.data['descripcion']
        if 'precio' in request.data:
            producto.precio = request.data['precio']
        if 'stock' in request.data:
            producto.stock = request.data['stock']
        if 'categoria' in request.data:
            producto.categoria = request.data['categoria']
        if 'urlfoto' in request.data:
            producto.urlfoto = request.data['urlfoto']

        producto.save()
        return Response(self.serializer_class(producto).data)

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

class verProducto(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail=True, methods=['post'])
    def cambiarImagen(self, request, pk=None):
        producto = self.get_object()
        imagen = request.FILES.get('imagen')
        if imagen:
            resultado = cloudinary.uploader.upload(imagen, folder="productos")
            producto.urlfoto = resultado.get("secure_url")
            producto.save()
            return Response({'url': producto.urlfoto})
        return Response({'error': 'No se envió imagen'}, status=400)