# 🛒 E-commerce de Productos Alimenticios

Sitio web desarrollado para un negocio de **venta de productos alimenticios**, que permite gestionar productos, mostrar un catálogo online y sentar las bases para funcionalidades de compra y pago.  
El proyecto utiliza una arquitectura basada en **MTV (Modelo-Vista-Template)** de Django, combinando backend robusto y frontend moderno.

---

## 🚀 Tecnologías utilizadas

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL
- Cloudinary (para gestión de imágenes)

### Frontend
- Next.js
- Tailwind CSS
- Lucide Icons
- ShadCN UI

---

## 🧩 Funcionalidades principales

- 🛍️ Catálogo de productos alimenticios
- 📦 Gestión de productos desde el panel de administrador
- 🔄 Comunicación API REST entre Django y Next.js
- 🌄 Carga y almacenamiento de imágenes en Cloudinary
- 🎨 Interfaz moderna y responsiva con Tailwind y ShadCN
- 🔐 Autenticación y control de acceso (en desarrollo)

---

## 📦 Instalación y ejecución

### 🔧 Backend (Django)

```bash
# Clona el repositorio
git clone https://github.com/tu_usuario/ecommerce-alimentos.git
cd ecommerce/backend
# Crea y activa entorno virtual
python -m venv venv
venv\Scripts\activate
# Instala dependencias
pip install -r requirements.txt
# Aplica migraciones
python manage.py migrate
# Crea un superusuario
python manage.py createsuperuser
# Ejecuta el servidor
python manage.py runserver
```
### 💻 Frontend (Next.js)

```bash
cd ecommerce-alimentos/frontend
# Instala dependencias
npm install
# Inicia servidor de desarrollo
npm run dev
```

