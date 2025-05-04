package com.shipmentapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "shipment_id", nullable = false)
    private Shipment shipment;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String method; // e.g., Visa, Apple Pay, Stripe

    @Column(nullable = false)
    private boolean success;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime scheduledFor;

    private String transactionId;

    private String receiptUrl;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 