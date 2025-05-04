package com.shipmentapp.controller;

import com.shipmentapp.dto.*;
import com.shipmentapp.entity.Shipment;
import com.shipmentapp.entity.ShipmentStatus;
import com.shipmentapp.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {
    private final ShipmentService shipmentService;

    @PostMapping
    public ResponseEntity<Shipment> createShipment(@AuthenticationPrincipal UserDetails user,
                                                   @RequestBody ShipmentCreateRequest request) {
        Shipment shipment = shipmentService.createShipment(user.getUsername(), request);
        return ResponseEntity.ok(shipment);
    }

    @GetMapping
    public ResponseEntity<List<Shipment>> getUserShipments(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(shipmentService.getUserShipments(user.getUsername()));
    }

    @PostMapping("/filter")
    public ResponseEntity<List<Shipment>> filterUserShipments(@AuthenticationPrincipal UserDetails user,
                                                              @RequestBody ShipmentFilterRequest filter) {
        return ResponseEntity.ok(shipmentService.filterUserShipments(user.getUsername(), filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shipment> getShipment(@PathVariable Long id) {
        return shipmentService.getShipment(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Shipment> updateStatus(@PathVariable Long id,
                                                 @RequestBody ShipmentStatusUpdateRequest request) {
        Shipment updated = shipmentService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }
} 