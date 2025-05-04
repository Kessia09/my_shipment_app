package com.shipmentapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
@Data
@NoArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ShipmentStatus status = ShipmentStatus.CREATED;

    @Column(nullable = false)
    private boolean insurance = false;

    @Column(nullable = false)
    private Double insuranceCost = 0.0;

    private LocalDateTime paymentScheduledDate;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 