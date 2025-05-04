package com.shipmentapp.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private String cardNumber;
    private String cardHolder;
    private String expiryDate;
    private String cvv;
    private Double amount;
} 