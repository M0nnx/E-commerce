from rest_framework import viewsets, permissions
from .models import Producto, Categoria
from .serializers import ProductoSerializer, CategoriaSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from cloudinary.uploader import upload, destroy
from urllib.parse import urlparse

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    pagination_class = None

    filterset_fields = ['nombre', 'categoria__nombre']
    search_fields = ['nombre']
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def filtrado_categoria(self, request):
        categoria_nombre = request.query_params.get('categoria', None)
        if categoria_nombre:
            categoria = Categoria.objects.filter(nombre=categoria_nombre).first()
            if categoria:
                productos = Producto.objects.filter(categoria=categoria)
                serializer = self.get_serializer(productos, many=True)
                return Response(serializer.data)
            return Response({'detail': 'Categoría no encontrada'}, status=404)
        return Response({'detail': 'Debe proporcionar un nombre de categoría'}, status=400)

    def crear_imagen(self, serializer):
        producto = serializer.save()
        imagen = self.request.FILES.get('imagen')
        if imagen:
            try:
                folder_path = f"productos/{producto.id}-{producto.nombre}"
                response = upload(imagen, folder=folder_path)
                producto.urlfoto = response['secure_url']
                producto.save()
            except Exception as e:
                producto.delete()
                raise e

    def actualizar_imagen(self, serializer):
        producto = self.get_object()
        imagen = self.request.FILES.get('imagen')
        if imagen:
            try:
                if producto.urlfoto:
                    parsed_url = urlparse(producto.urlfoto)
                    public_id_with_extension = parsed_url.path.split("/")[-1]
                    public_id = public_id_with_extension.rsplit(".", 1)[0]
                    destroy(public_id)
                folder_path = f"productos/{producto.id}-{producto.nombre}"
                response = upload(imagen, folder=folder_path)
                producto.urlfoto = response['secure_url']
            except Exception as e:
                raise e
    
        serializer.save()

    def borrar_imagen(self, instance):
        if instance.urlfoto:
            parsed_url = urlparse(instance.urlfoto)
            public_id_with_extension = parsed_url.path.split("/")[-1]
            public_id = public_id_with_extension.rsplit(".", 1)[0]
            try:
                destroy(public_id)
            except Exception as e:
                pass
        
        super().perform_destroy(instance)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
