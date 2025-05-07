"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, CreditCard, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import ShipmentList from "@/components/shipment-list"
import PaymentList from "@/components/payment-list"
import DashboardStats from "@/components/dashboard-stats"
import axios from "axios"

interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  createdAt: string;
  estimatedDelivery: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  date: string;
  shipmentId: string;
}

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8081/api/shipments", {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setShipments(data))
      .catch(() => setShipments([]));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8081/api/payments", {
      headers: {
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setPayments(data.payments || data))
      .catch(() => setPayments([]));
  }, []);

  // Filter shipments based on search term
  const filteredShipments = searchTerm
    ? shipments.filter(
        (shipment) =>
          shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : shipments

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your shipments and payments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/create-shipment">
              <Plus className="mr-2 h-4 w-4" /> Create Shipment
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/payments/new">
              <CreditCard className="mr-2 h-4 w-4" /> Make Payment
            </Link>
          </Button>
        </div>
      </div>

      <DashboardStats
        totalShipments={shipments.length}
        inTransit={shipments.filter((s) => s.status === "IN_TRANSIT").length}
        delivered={shipments.filter((s) => s.status === "DELIVERED").length}
        totalSpent={payments.reduce((sum, payment) => sum + payment.amount, 0)}
      />

      <div className="my-8 flex items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shipments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="shipments">
        <TabsList className="mb-4">
          <TabsTrigger value="shipments">
            <Package className="mr-2 h-4 w-4" />
            Shipments
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="shipments">
          <ShipmentList shipments={filteredShipments} />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentList payments={payments} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
