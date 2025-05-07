"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Truck, MapPin, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import ShipmentTimeline from "@/components/shipment-timeline"
import axios from "axios"

interface Shipment {
  id: string;
  createdAt: string;
  status: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  weight: string;
}

interface Payment {
  id: string;
  amount: number;
  success: boolean;
  date: string;
  method: string;
  transactionId: string;
}

export default function ShipmentDetailPage() {
  const params = useParams()
  const shipmentId = params.id as string
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Shipment>>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8081/api/shipments/${shipmentId}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setShipment(data))
      .catch(() => setShipment(null));
    fetch(`http://localhost:8081/api/payments/shipment/${shipmentId}`, {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setPayment(data[0] || null))
      .catch(() => setPayment(null));
    setIsLoading(false);
  }, [shipmentId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "default"
      case "IN_TRANSIT":
        return "secondary"
      case "PENDING":
        return "outline"
      default:
        return "default"
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setEditData({
      origin: shipment?.origin || "",
      destination: shipment?.destination || "",
      weight: shipment?.weight || "",
      estimatedDelivery: shipment?.estimatedDelivery || ""
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleSaveEdit = async () => {
    if (!shipment) return;
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/api/shipments/${shipment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      credentials: "include",
      body: JSON.stringify(editData)
    });
    if (response.ok) {
      const updated = await response.json();
      setShipment(updated);
      setIsEditing(false);
      setEditData({});
    } else {
      alert("Failed to update shipment.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading shipment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Shipment {shipment?.id}
                </CardTitle>
                <CardDescription>
                  Created on {shipment?.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : ""}
                </CardDescription>
              </div>
              <Badge variant={getStatusColor(shipment?.status ?? "")} className="text-sm">
                {shipment?.status ? shipment.status.replace("_", " ") : ""}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Shipment Details</h3>
                  <div className="space-y-2">
                    {isEditing ? (
                      <>
                        <div className="flex items-start">
                          <input name="origin" value={editData.origin} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex items-start">
                          <input name="destination" value={editData.destination} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex items-start">
                          <input name="weight" value={editData.weight} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex items-start">
                          <input name="estimatedDelivery" value={editData.estimatedDelivery} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button onClick={handleSaveEdit}>Save</Button>
                          <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Origin</p>
                            <p className="text-sm">{shipment?.origin}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Destination</p>
                            <p className="text-sm">{shipment?.destination}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Estimated Delivery</p>
                            <p className="text-sm">{shipment?.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : ""}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Package className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Weight</p>
                            <p className="text-sm">{shipment?.weight}</p>
                          </div>
                        </div>
                        <Button className="mt-2" onClick={handleEditClick}>Edit</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Payment ID</p>
                  <p className="text-sm">{payment?.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-sm">{payment?.amount ? `$${payment.amount.toFixed(2)}` : ""}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={payment?.success ? "default" : "secondary"}>{payment?.success ? "Paid" : "Pending"}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{payment?.date ? new Date(payment.date).toLocaleDateString() : ""}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm">{payment?.method}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button className="w-full" onClick={async () => {
              if (!payment?.transactionId) return;
              const token = localStorage.getItem('token');
              const res = await fetch(`http://localhost:8081/api/payments/receipt/${payment.transactionId}`, {
                headers: {
                  ...(token ? { "Authorization": `Bearer ${token}` } : {})
                }
              });
              const blob = new Blob([await res.text()], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `invoice_${payment.transactionId}.txt`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            }}>Download Invoice</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
