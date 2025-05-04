package com.shipmentapp.dto;

import lombok.Data;

@Data
public class ShipmentCreateRequest {
    private String origin;
    private String destination;
    private Double weight;
    private boolean insurance;
} 