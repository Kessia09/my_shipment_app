package com.shipmentapp.dto;

import com.shipmentapp.entity.ShipmentStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShipmentFilterRequest {
    private ShipmentStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
} 