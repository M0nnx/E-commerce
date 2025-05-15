"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Home, Building, MapPin, Pencil, Trash } from "lucide-react"

// Definir el esquema para la dirección
const addressFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  street: z.string().min(5, {
    message: "La calle debe tener al menos 5 caracteres.",
  }),
  city: z.string().min(2, {
    message: "La ciudad es requerida.",
  }),
  state: z.string().min(2, {
    message: "El estado es requerido.",
  }),
  postalCode: z.string().min(5, {
    message: "El código postal debe tener al menos 5 caracteres.",
  }),
  country: z.string().min(2, {
    message: "El país es requerido.",
  }),
})

type AddressFormValues = z.infer<typeof addressFormSchema>

// Tipo para una dirección
interface Address extends AddressFormValues {
  id: string
  isDefault: boolean
  type: "home" | "work" | "other"
}

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Casa",
      street: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      postalCode: "01000",
      country: "México",
      isDefault: true,
      type: "home",
    },
    {
      id: "2",
      name: "Oficina",
      street: "Av. Reforma 456",
      city: "Ciudad de México",
      state: "CDMX",
      postalCode: "01010",
      country: "México",
      isDefault: false,
      type: "work",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "México",
    },
  })

  function onAddAddress(data: AddressFormValues) {
    const newAddress: Address = {
      ...data,
      id: Date.now().toString(),
      isDefault: addresses.length === 0,
      type: "home",
    }

    setAddresses([...addresses, newAddress])
    setIsAddDialogOpen(false)
    form.reset()

    toast({
      title: "Dirección agregada",
      description: "Tu nueva dirección ha sido agregada correctamente.",
    })
  }

  function onEditAddress(data: AddressFormValues) {
    if (!currentAddress) return

    const updatedAddresses = addresses.map((address) =>
      address.id === currentAddress.id ? { ...address, ...data } : address,
    )

    setAddresses(updatedAddresses)
    setIsEditDialogOpen(false)
    setCurrentAddress(null)

    toast({
      title: "Dirección actualizada",
      description: "Tu dirección ha sido actualizada correctamente.",
    })
  }

  function handleEditClick(address: Address) {
    setCurrentAddress(address)
    form.reset({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    })
    setIsEditDialogOpen(true)
  }

  function handleDeleteAddress(id: string) {
    setAddresses(addresses.filter((address) => address.id !== id))

    toast({
      title: "Dirección eliminada",
      description: "La dirección ha sido eliminada correctamente.",
    })
  }

  function setDefaultAddress(id: string) {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }))

    setAddresses(updatedAddresses)

    toast({
      title: "Dirección predeterminada",
      description: "La dirección ha sido establecida como predeterminada.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Direcciones</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Dirección</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Dirección</DialogTitle>
              <DialogDescription>Ingresa los detalles de tu nueva dirección de envío.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddAddress)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Casa, Trabajo, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calle y número</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Calle, número, colonia, referencias..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ciudad</FormLabel>
                        <FormControl>
                          <Input placeholder="Ciudad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código Postal</FormLabel>
                        <FormControl>
                          <Input placeholder="Código Postal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input placeholder="País" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Dirección</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">No tienes direcciones guardadas.</p>
            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              Agregar Dirección
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {address.type === "home" ? (
                      <Home className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Building className="h-5 w-5 text-muted-foreground" />
                    )}
                    <CardTitle className="text-lg">{address.name}</CardTitle>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Predeterminada</span>
                  )}
                </div>
                <CardDescription>{address.street}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">
                  {address.city}, {address.state}, {address.postalCode}
                </p>
                <p className="text-sm">{address.country}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div>
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => setDefaultAddress(address.id)}>
                      Establecer como predeterminada
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(address)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Dirección</DialogTitle>
            <DialogDescription>Actualiza los detalles de tu dirección.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditAddress)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Casa, Trabajo, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle y número</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Calle, número, colonia, referencias..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Postal</FormLabel>
                      <FormControl>
                        <Input placeholder="Código Postal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input placeholder="País" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Actualizar Dirección</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
