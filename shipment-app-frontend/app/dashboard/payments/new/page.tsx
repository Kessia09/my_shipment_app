"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewPaymentPage() {
  const [shipments, setShipments] = useState([]);
  const [formData, setFormData] = useState({
    shipmentId: "",
    method: "Visa",
    payNow: true,
    scheduledFor: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch user's shipments
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload: any = {
        shipmentId: Number(formData.shipmentId),
        method: formData.method,
        payNow: formData.payNow,
      };
      if (!formData.payNow && formData.scheduledFor) {
        payload.scheduledFor = formData.scheduledFor;
      }
      const response = await fetch("http://localhost:8081/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Failed to make payment");
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to make payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Make a Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="shipmentId">Shipment</Label>
                <select
                  id="shipmentId"
                  name="shipmentId"
                  value={formData.shipmentId}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select a shipment</option>
                  {shipments.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.origin} → {s.destination} (ID: {s.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="method">Payment Method</Label>
                <select
                  id="method"
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="Visa">Visa</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Stripe">Stripe</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payNow">Pay Now</Label>
                <input
                  id="payNow"
                  name="payNow"
                  type="checkbox"
                  checked={formData.payNow}
                  onChange={handleChange}
                />
              </div>
              {!formData.payNow && (
                <div className="grid gap-2">
                  <Label htmlFor="scheduledFor">Schedule For</Label>
                  <Input
                    id="scheduledFor"
                    name="scheduledFor"
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={handleChange}
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Make Payment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 