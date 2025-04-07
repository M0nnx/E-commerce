from rest_framework import serializers
from .models import Producto, Categoria

class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.StringRelatedField(source='categoria')
    
    class Meta:
        model = Producto
        fields = '__all__'
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Categoria
        fields = '__all__'