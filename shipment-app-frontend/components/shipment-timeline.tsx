import { CheckCircle, Circle } from "lucide-react"

interface TimelineEvent {
  date: string
  location: string
  status: string
}

interface ShipmentTimelineProps {
  events: TimelineEvent[]
}

export default function ShipmentTimeline({ events }: ShipmentTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            {index === 0 ? (
              <CheckCircle className="h-6 w-6 text-primary" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
            {index < events.length - 1 && <div className="h-full w-px bg-muted-foreground/20 my-1" />}
          </div>
          <div className="space-y-1 pb-4">
            <p className="text-sm font-medium">{event.status}</p>
            <div className="text-xs text-muted-foreground">
              <p>{event.location}</p>
              <p>{event.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
