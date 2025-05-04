package com.shipmentapp.controller;

import com.shipmentapp.dto.ShipmentFilterRequest;
import com.shipmentapp.entity.Shipment;
import com.shipmentapp.entity.ShipmentStatus;
import com.shipmentapp.entity.User;
import com.shipmentapp.service.ShipmentService;
import com.shipmentapp.service.UserService;
import com.shipmentapp.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final ShipmentService shipmentService;
    private final PaymentService paymentService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/shipments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Shipment>> listAllShipments(@RequestBody(required = false) ShipmentFilterRequest filter) {
        if (filter != null) {
            return ResponseEntity.ok(shipmentService.filterAllShipments(filter));
        } else {
            return ResponseEntity.ok(shipmentService.findAll());
        }
    }

    @PatchMapping("/shipments/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Shipment> updateShipmentStatus(@PathVariable Long id, @RequestBody ShipmentStatusUpdateRequest request) {
        Shipment updated = shipmentService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/payments")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> listAllPayments() {
        return ResponseEntity.ok(paymentService.findAll());
    }
} 