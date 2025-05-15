"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  phone: z.string().min(10, {
    message: "El número de teléfono debe tener al menos 10 dígitos.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Función para obtener el perfil del usuario desde la API (puedes modificarla según tu implementación)
async function getUserProfile() {
  const token = localStorage.getItem("authToken") // Asumiendo que el token JWT está almacenado en localStorage

  const response = await fetch("/api/perfil/", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Error al obtener el perfil.")
  }

  return await response.json()
}

// Función para actualizar el perfil
async function updateProfile(values: ProfileFormValues) {
  const token = localStorage.getItem("authToken")

  const response = await fetch("/api/perfil/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error("Error al actualizar el perfil.")
  }

  return await response.json()
}

export default function ProfileInfo() {
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<Partial<ProfileFormValues>>({})
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Cargar los datos del perfil al montar el componente
  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getUserProfile()
        setUserProfile({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar tu perfil. Intenta nuevamente.",
          variant: "destructive",
        })
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: userProfile, // Asignar los datos cargados del perfil
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    try {
      await updateProfile(data)
      toast({
        title: "Perfil actualizado",
        description: "Tu información personal ha sido actualizada correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar tu información. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Mostrar un cargador mientras se obtienen los datos del perfil
  if (loadingProfile) {
    return <div>Cargando...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu número de teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
