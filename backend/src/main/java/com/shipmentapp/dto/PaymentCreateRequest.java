package com.shipmentapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentCreateRequest {
    private Long shipmentId;
    private String method; // Visa, Apple Pay, Stripe
    private boolean payNow;
    private LocalDateTime scheduledFor; // if pay later
} 