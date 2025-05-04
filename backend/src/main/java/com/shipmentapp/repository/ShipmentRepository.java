package com.shipmentapp.repository;

import com.shipmentapp.entity.Shipment;
import com.shipmentapp.entity.User;
import com.shipmentapp.entity.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByUser(User user);
    List<Shipment> findByUserAndStatus(User user, ShipmentStatus status);
    List<Shipment> findByUserAndCreatedAtBetween(User user, LocalDateTime start, LocalDateTime end);
    List<Shipment> findByStatus(ShipmentStatus status);
    List<Shipment> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
