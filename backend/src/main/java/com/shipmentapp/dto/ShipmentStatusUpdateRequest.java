package com.shipmentapp.dto;

import com.shipmentapp.entity.ShipmentStatus;
import lombok.Data;

@Data
public class ShipmentStatusUpdateRequest {
    private ShipmentStatus status;
} 