package com.shipmentapp.repository;

import com.shipmentapp.entity.Payment;
import com.shipmentapp.entity.User;
import com.shipmentapp.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser(User user);
    List<Payment> findByShipment(Shipment shipment);
} 