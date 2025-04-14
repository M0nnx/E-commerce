from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('cliente', 'Cliente'),
    ]
    
    nombre = models.CharField(max_length=100, blank=True, null=True)
    apellido = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    rol = models.CharField(max_length=255, choices=ROLE_CHOICES, default='cliente')
    username = models.EmailField(max_length=255, unique=True, blank=True)
    first_name = None
    last_name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'apellido']
    
    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.rol})"


class Direccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='direcciones')
    ciudad = models.CharField(max_length=255)
    pais = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    codigo_postal = models.CharField(max_length=10) 

    class Meta:
        db_table = 'direccion'

    def __str__(self):
        return f"{self.direccion}, {self.ciudad}, {self.pais}, {self.codigo_postal}"
