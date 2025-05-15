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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CreditCard, Pencil, Trash, AlertCircle } from "lucide-react"

// Definir el esquema para el método de pago
const paymentMethodSchema = z.object({
  cardName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  cardNumber: z
    .string()
    .min(16, {
      message: "El número de tarjeta debe tener al menos 16 dígitos.",
    })
    .max(19),
  expiryMonth: z.string().min(1, {
    message: "Selecciona un mes.",
  }),
  expiryYear: z.string().min(1, {
    message: "Selecciona un año.",
  }),
  cvv: z
    .string()
    .min(3, {
      message: "El CVV debe tener al menos 3 dígitos.",
    })
    .max(4),
})

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>

// Tipo para un método de pago
interface PaymentMethod {
  id: string
  cardName: string
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cardType: "visa" | "mastercard" | "amex" | "other"
  isDefault: boolean
}

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      cardName: "Juan Pérez",
      cardNumber: "4111111111111111",
      expiryMonth: "12",
      expiryYear: "2025",
      cardType: "visa",
      isDefault: true,
    },
    {
      id: "2",
      cardName: "Juan Pérez",
      cardNumber: "5555555555554444",
      expiryMonth: "10",
      expiryYear: "2024",
      cardType: "mastercard",
      isDefault: false,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod | null>(null)

  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  })

  // Función para determinar el tipo de tarjeta basado en el número
  function getCardType(cardNumber: string): "visa" | "mastercard" | "amex" | "other" {
    const firstDigit = cardNumber.charAt(0)
    const firstTwoDigits = cardNumber.substring(0, 2)

    if (firstDigit === "4") return "visa"
    if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "mastercard"
    if (firstDigit === "3" && (cardNumber.charAt(1) === "4" || cardNumber.charAt(1) === "7")) return "amex"

    return "other"
  }

  // Función para formatear el número de tarjeta (mostrar solo los últimos 4 dígitos)
  function formatCardNumber(cardNumber: string): string {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`
  }

  function onAddPaymentMethod(data: PaymentMethodFormValues) {
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      cardName: data.cardName,
      cardNumber: data.cardNumber,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      cardType: getCardType(data.cardNumber),
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setIsAddDialogOpen(false)
    form.reset()

    toast({
      title: "Método de pago agregado",
      description: "Tu nuevo método de pago ha sido agregado correctamente.",
    })
  }

  function onEditPaymentMethod(data: PaymentMethodFormValues) {
    if (!currentPaymentMethod) return

    const updatedPaymentMethods = paymentMethods.map((method) =>
      method.id === currentPaymentMethod.id
        ? {
            ...method,
            cardName: data.cardName,
            cardNumber: data.cardNumber,
            expiryMonth: data.expiryMonth,
            expiryYear: data.expiryYear,
            cardType: getCardType(data.cardNumber),
          }
        : method,
    )

    setPaymentMethods(updatedPaymentMethods)
    setIsEditDialogOpen(false)
    setCurrentPaymentMethod(null)

    toast({
      title: "Método de pago actualizado",
      description: "Tu método de pago ha sido actualizado correctamente.",
    })
  }

  function handleEditClick(method: PaymentMethod) {
    setCurrentPaymentMethod(method)
    form.reset({
      cardName: method.cardName,
      cardNumber: method.cardNumber,
      expiryMonth: method.expiryMonth,
      expiryYear: method.expiryYear,
      cvv: "",
    })
    setIsEditDialogOpen(true)
  }

  function handleDeletePaymentMethod(id: string) {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))

    toast({
      title: "Método de pago eliminado",
      description: "El método de pago ha sido eliminado correctamente.",
    })
  }

  function setDefaultPaymentMethod(id: string) {
    const updatedPaymentMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedPaymentMethods)

    toast({
      title: "Método de pago predeterminado",
      description: "El método de pago ha sido establecido como predeterminado.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Métodos de Pago</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Agregar Método de Pago</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Método de Pago</DialogTitle>
              <DialogDescription>
                Ingresa los detalles de tu tarjeta. Tu información está segura y encriptada.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddPaymentMethod)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre en la tarjeta</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre como aparece en la tarjeta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de tarjeta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          {...field}
                          onChange={(e) => {
                            // Solo permitir números
                            const value = e.target.value.replace(/\D/g, "")
                            field.onChange(value)
                          }}
                          maxLength={19}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mes</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Mes" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, "0")
                              return (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Año</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Año" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString()
                              return (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123"
                            {...field}
                            onChange={(e) => {
                              // Solo permitir números
                              const value = e.target.value.replace(/\D/g, "")
                              field.onChange(value)
                            }}
                            maxLength={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <p>Tu información de pago está segura y encriptada</p>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Método de Pago</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">No tienes métodos de pago guardados.</p>
            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              Agregar Método de Pago
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">
                      {method.cardType === "visa" && "Visa"}
                      {method.cardType === "mastercard" && "Mastercard"}
                      {method.cardType === "amex" && "American Express"}
                      {method.cardType === "other" && "Tarjeta"}
                    </CardTitle>
                  </div>
                  {method.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Predeterminada</span>
                  )}
                </div>
                <CardDescription>{formatCardNumber(method.cardNumber)}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm">{method.cardName}</p>
                <p className="text-sm">
                  Expira: {method.expiryMonth}/{method.expiryYear}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div>
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => setDefaultPaymentMethod(method.id)}>
                      Establecer como predeterminada
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(method)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeletePaymentMethod(method.id)}>
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
            <DialogTitle>Editar Método de Pago</DialogTitle>
            <DialogDescription>Actualiza los detalles de tu tarjeta.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditPaymentMethod)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre en la tarjeta</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre como aparece en la tarjeta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de tarjeta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        onChange={(e) => {
                          // Solo permitir números
                          const value = e.target.value.replace(/\D/g, "")
                          field.onChange(value)
                        }}
                        maxLength={19}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mes</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Mes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = (i + 1).toString().padStart(2, "0")
                            return (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Año" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = (new Date().getFullYear() + i).toString()
                            return (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          {...field}
                          onChange={(e) => {
                            // Solo permitir números
                            const value = e.target.value.replace(/\D/g, "")
                            field.onChange(value)
                          }}
                          maxLength={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Actualizar Método de Pago</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
