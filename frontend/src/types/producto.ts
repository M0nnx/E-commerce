export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    urlfoto: string | File;

  }
  export interface Categoria {
    id: number;
    nombre: string;
  }

  export interface Usuario {
    id: number;
    nombre: string;
  }

  