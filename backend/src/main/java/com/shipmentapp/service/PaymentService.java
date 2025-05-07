package com.shipmentapp.service;

import com.shipmentapp.dto.PaymentCreateRequest;
import com.shipmentapp.entity.*;
import com.shipmentapp.repository.PaymentRepository;
import com.shipmentapp.repository.ShipmentRepository;
import com.shipmentapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;

    public Payment createPayment(String username, PaymentCreateRequest request) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Shipment shipment = shipmentRepository.findById(request.getShipmentId()).orElseThrow();
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setShipment(shipment);
        payment.setAmount(shipment.getCost());
        payment.setMethod(request.getMethod());
        payment.setSuccess(request.isPayNow()); // true if payNow, false if not
        payment.setTransactionId(java.util.UUID.randomUUID().toString());
        if (request.isPayNow()) {
            payment.setScheduledFor(LocalDateTime.now());
        } else {
            payment.setScheduledFor(request.getScheduledFor());
        }
        payment.setReceiptUrl("/api/payment/receipt/" + payment.getTransactionId());
        return paymentRepository.save(payment);
    }

    public List<Payment> getUserPayments(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return paymentRepository.findByUser(user);
    }

    public List<Payment> getShipmentPayments(Long shipmentId) {
        Shipment shipment = shipmentRepository.findById(shipmentId).orElseThrow();
        return paymentRepository.findByShipment(shipment);
    }

    public Payment getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findAll().stream()
                .filter(p -> transactionId.equals(p.getTransactionId()))
                .findFirst().orElseThrow();
    }

    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    public Payment findById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        paymentRepository.deleteById(id);
    }

    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }
} 