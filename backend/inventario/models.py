from django.db import models

class Categoria(models.Model):
    FRUTOS_SECOS = 'Frutos secos'
    SEMILLAS = 'Semillas'
    DESHIDRATADO = 'Deshidratado'
    CEREALES = 'Cereales'
    MIXES = 'Mixes'
    HUEVOS = 'Huevos'
    ENCURTIDOS = 'Encurtidos'
    CHOCOLATES = 'Chocolates'

    CATEGORIAS_CHOICES = [
        (FRUTOS_SECOS, 'Frutos secos'),
        (SEMILLAS, 'Semillas'),
        (DESHIDRATADO, 'Deshidratado'),
        (CEREALES, 'Cereales'),
        (MIXES, 'Mixes'),
        (HUEVOS, 'Huevos'),
        (ENCURTIDOS, 'Encurtidos'),
        (CHOCOLATES, 'Chocolates'),
    ]
    
    nombre = models.CharField(max_length=255, choices=CATEGORIAS_CHOICES, unique=True)

    class Meta:
        db_table = 'categorias'

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=20, decimal_places=2)
    stock = models.DecimalField(max_digits=20 ,decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    urlfoto = models.URLField(null=True, blank=True)

    class Meta:
        db_table = 'productos'

    def __str__(self):
        return self.nombre
