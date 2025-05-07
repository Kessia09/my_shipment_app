package com.shipmentapp.dto;

import lombok.Data;

@Data
public class ShipmentUpdateRequest {
    private String origin;
    private String destination;
    private Double weight;
} 