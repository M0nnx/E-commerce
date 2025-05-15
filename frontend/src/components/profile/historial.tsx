"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, Eye } from "lucide-react"

interface OrderProduct {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  products: OrderProduct[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethod: {
    cardType: string
    lastFour: string
  }
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-12345",
      date: "2023-05-15",
      total: 1250.0,
      status: "delivered",
      products: [
        {
          id: "1",
          name: "Smartphone XYZ",
          price: 999.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "2",
          name: "Funda Protectora",
          price: 25.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "3",
          name: "Cargador Rápido",
          price: 39.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "Juan Pérez",
        street: "Calle Principal 123",
        city: "Ciudad de México",
        state: "CDMX",
        postalCode: "01000",
        country: "México",
      },
      paymentMethod: {
        cardType: "visa",
        lastFour: "1111",
      },
    },
    {
      id: "ORD-12346",
      date: "2023-06-20",
      total: 450.0,
      status: "shipped",
      products: [
        {
          id: "4",
          name: "Auriculares Bluetooth",
          price: 150.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "5",
          name: "Smartwatch",
          price: 300.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "Juan Pérez",
        street: "Calle Principal 123",
        city: "Ciudad de México",
        state: "CDMX",
        postalCode: "01000",
        country: "México",
      },
      paymentMethod: {
        cardType: "mastercard",
        lastFour: "4444",
      },
    },
    {
      id: "ORD-12347",
      date: "2023-07-05",
      total: 85.0,
      status: "processing",
      products: [
        {
          id: "6",
          name: "Cable USB-C",
          price: 15.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
        {
          id: "7",
          name: "Powerbank 10000mAh",
          price: 70.0,
          quantity: 1,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        name: "Juan Pérez",
        street: "Av. Reforma 456",
        city: "Ciudad de México",
        state: "CDMX",
        postalCode: "01010",
        country: "México",
      },
      paymentMethod: {
        cardType: "visa",
        lastFour: "1111",
      },
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

  function getStatusBadge(status: Order["status"]) {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pendiente
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Procesando
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Enviado
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Entregado
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  function handleViewOrderDetails(order: Order) {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Pedidos</h2>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">No tienes pedidos realizados.</p>
            <Button className="mt-4">Ir a la Tienda</Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Pedidos</CardTitle>
            <CardDescription>Visualiza y gestiona todos tus pedidos realizados.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewOrderDetails(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Realizado el {selectedOrder && formatDate(selectedOrder.date)}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <Tabs defaultValue="products">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Productos</TabsTrigger>
                <TabsTrigger value="shipping">Envío</TabsTrigger>
                <TabsTrigger value="payment">Pago</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md bg-muted"></div>
                              <div>{product.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell className="text-right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">${selectedOrder.total.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div className="text-sm">Estado: {getStatusBadge(selectedOrder.status)}</div>
                </div>
              </TabsContent>

              <TabsContent value="shipping">
                <Card>
                  <CardHeader>
                    <CardTitle>Dirección de Envío</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state},{" "}
                        {selectedOrder.shippingAddress.postalCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {selectedOrder.paymentMethod.cardType === "visa" && "Visa"}
                        {selectedOrder.paymentMethod.cardType === "mastercard" && "Mastercard"}
                        {selectedOrder.paymentMethod.cardType === "amex" && "American Express"}
                        {selectedOrder.paymentMethod.cardType === "other" && "Tarjeta"}
                      </p>
                      <p>Terminada en {selectedOrder.paymentMethod.lastFour}</p>
                      <p className="mt-4 font-medium">Resumen</p>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline">Descargar Factura</Button>
            <Button variant="outline">Contactar Soporte</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
