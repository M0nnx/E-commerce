from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=20, decimal_places=2)
    stock = models.DecimalField(max_digits=20 ,decimal_places=2)
    categoria = models.CharField(max_length=255)
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)

    class Meta:
        db_table = 'productos'

    def __str__(self):
        return self.nombre
