from rest_framework import generics, status
from .models import Producto
from .serializer import ProductoSerializer
from rest_framework import filters , viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from cloudinary.uploader import upload, cloudinary
from django.http import JsonResponse


class addProducto(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    def create(self, request, *args, **kwargs):
        # Procedemos a guardar el producto inicialmente (sin imagen)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        producto = serializer.save()  # Aquí ya tenemos el objeto producto con el id asignado

        if 'imagen' in request.FILES:
            imagen = request.FILES['imagen']
            try:
  
                folder_path = f"productos/{producto.id}-{producto.nombre}"
                response = cloudinary.uploader.upload(imagen, folder=folder_path)
                urlfoto = response['secure_url']

                producto.urlfoto = urlfoto
                producto.save()
            except Exception as e:
                return Response({'error': 'Error al subir la imagen a Cloudinary', 'detalle': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(self.get_serializer(producto).data, status=status.HTTP_201_CREATED)

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

@csrf_exempt
def actualizar_imagen(request, id):
    try:
  
        producto = Producto.objects.get(id=id)

        if producto.urlfoto:
            from urllib.parse import urlparse

            parsed_url = urlparse(producto.urlfoto)
            public_id_with_extension = parsed_url.path.split("/")[-1]
            public_id = public_id_with_extension.rsplit(".", 1)[0]

            cloudinary.uploader.destroy(public_id)
        imagen = request.FILES['imagen']
        folder_path = f"productos/{producto.id}-{producto.nombre}"
        response = cloudinary.uploader.upload(imagen, folder=folder_path)

        producto.urlfoto = response['secure_url']
        producto.save()

        return JsonResponse({'Correcto': True, 'urlfoto': producto.urlfoto})

    except Producto.DoesNotExist:
        return JsonResponse({'Correcto': False, 'error': 'Producto no encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'Correcto': False, 'error': str(e)}, status=500)