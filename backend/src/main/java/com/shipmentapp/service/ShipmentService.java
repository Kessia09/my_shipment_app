package com.shipmentapp.service;

import com.shipmentapp.dto.ShipmentCreateRequest;
import com.shipmentapp.dto.ShipmentFilterRequest;
import com.shipmentapp.dto.ShipmentUpdateRequest;
import com.shipmentapp.entity.Shipment;
import com.shipmentapp.entity.ShipmentStatus;
import com.shipmentapp.entity.User;
import com.shipmentapp.repository.ShipmentRepository;
import com.shipmentapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShipmentService {
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;

    public Shipment createShipment(String username, ShipmentCreateRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Shipment shipment = new Shipment();
        shipment.setOrigin(request.getOrigin());
        shipment.setDestination(request.getDestination());
        shipment.setWeight(request.getWeight());
        shipment.setUser(user);
        shipment.setStatus(ShipmentStatus.CREATED);
        shipment.setInsurance(request.isInsurance());
        // Calculate cost and insuranceCost as needed
        shipment.setCost(100.0); // Placeholder
        shipment.setInsuranceCost(request.isInsurance() ? 10.0 : 0.0); // Placeholder
        shipment.setCreatedAt(LocalDateTime.now());
        shipment.setEstimatedDelivery(LocalDateTime.now().plusDays(7));
        return shipmentRepository.save(shipment);
    }

    public List<Shipment> getUserShipments(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return shipmentRepository.findByUser(user);
    }

    public List<Shipment> filterUserShipments(String username, ShipmentFilterRequest filter) {
        User user = userRepository.findByUsername(username).orElseThrow();
        if (filter.getStatus() != null) {
            return shipmentRepository.findByUserAndStatus(user, filter.getStatus());
        } else if (filter.getStartDate() != null && filter.getEndDate() != null) {
            return shipmentRepository.findByUserAndCreatedAtBetween(user, filter.getStartDate(), filter.getEndDate());
        } else {
            return shipmentRepository.findByUser(user);
        }
    }

    public Optional<Shipment> getShipment(Long id) {
        return shipmentRepository.findById(id);
    }

    public Shipment updateStatus(Long id, ShipmentStatus status) {
        Shipment shipment = shipmentRepository.findById(id).orElseThrow();
        shipment.setStatus(status);
        return shipmentRepository.save(shipment);
    }

    public List<Shipment> filterAllShipments(ShipmentFilterRequest filter) {
        if (filter.getStatus() != null) {
            return shipmentRepository.findByStatus(filter.getStatus());
        } else if (filter.getStartDate() != null && filter.getEndDate() != null) {
            return shipmentRepository.findByCreatedAtBetween(filter.getStartDate(), filter.getEndDate());
        } else {
            return shipmentRepository.findAll();
        }
    }

    public List<Shipment> findAll() {
        return shipmentRepository.findAll();
    }

    public Shipment findById(Long id) {
        return shipmentRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        shipmentRepository.deleteById(id);
    }

    public Shipment save(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    public Shipment updateShipment(Long id, ShipmentUpdateRequest request, String username) {
        Shipment shipment = shipmentRepository.findById(id).orElseThrow();
        if (shipment.getUser() == null || !shipment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }
        if (request.getOrigin() != null) shipment.setOrigin(request.getOrigin());
        if (request.getDestination() != null) shipment.setDestination(request.getDestination());
        if (request.getWeight() != null) shipment.setWeight(request.getWeight());
        return shipmentRepository.save(shipment);
    }
} 