import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Shipment {
  id: string
  origin: string
  destination: string
  status: string
  createdAt: string
  estimatedDelivery: string
}

interface ShipmentListProps {
  shipments: Shipment[]
}

export default function ShipmentList({ shipments }: ShipmentListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "success"
      case "IN_TRANSIT":
        return "warning"
      case "PENDING":
        return "secondary"
      default:
        return "default"
    }
  }

  if (shipments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No shipments found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium flex items-center">
                    Shipment {shipment.id}
                    <Badge variant={getStatusColor(shipment.status)} className="ml-2">
                      {shipment.status.replace("_", " ")}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Created on {new Date(shipment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild className="mt-2 md:mt-0">
                  <Link href={`/dashboard/shipment/${shipment.id}`}>
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Origin</p>
                    <p className="text-sm">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Destination</p>
                    <p className="text-sm">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                    <p className="text-sm">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
