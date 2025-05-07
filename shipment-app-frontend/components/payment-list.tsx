import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Package } from "lucide-react"
import Link from "next/link"

interface Payment {
  id: string
  amount: number
  status: string
  date: string
  shipmentId: string
}

interface PaymentListProps {
  payments: Payment[]
}

export default function PaymentList({ payments }: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No payments found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card key={payment.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium flex items-center">
                    Payment {payment.id}
                    <Badge variant={payment.status === "COMPLETED" ? "success" : "warning"} className="ml-2">
                      {payment.status}
                    </Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Processed on {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-lg font-medium">${payment.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Package className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Shipment ID</p>
                    <Link href={`/dashboard/shipment/${payment.shipmentId}`} className="text-sm hover:underline">
                      {payment.shipmentId}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Date</p>
                    <p className="text-sm">{new Date(payment.date).toLocaleDateString()}</p>
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
