package com.shipmentapp.controller;

import com.shipmentapp.dto.PaymentCreateRequest;
import com.shipmentapp.dto.PaymentHistoryResponse;
import com.shipmentapp.entity.Payment;
import com.shipmentapp.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@AuthenticationPrincipal UserDetails user,
                                                 @RequestBody PaymentCreateRequest request) {
        Payment payment = paymentService.createPayment(user.getUsername(), request);
        return ResponseEntity.ok(payment);
    }

    @GetMapping
    public ResponseEntity<PaymentHistoryResponse> getUserPayments(@AuthenticationPrincipal UserDetails user) {
        List<Payment> payments = paymentService.getUserPayments(user.getUsername());
        PaymentHistoryResponse response = new PaymentHistoryResponse();
        response.setPayments(payments.stream().map(p -> {
            PaymentHistoryResponse.PaymentInfo info = new PaymentHistoryResponse.PaymentInfo();
            info.setId(p.getId());
            info.setAmount(p.getAmount());
            info.setMethod(p.getMethod());
            info.setSuccess(p.isSuccess());
            info.setTransactionId(p.getTransactionId());
            info.setReceiptUrl(p.getReceiptUrl());
            info.setShipmentId(p.getShipment().getId().toString());
            info.setCreatedAt(p.getCreatedAt().toString());
            info.setScheduledFor(p.getScheduledFor() != null ? p.getScheduledFor().toString() : null);
            return info;
        }).collect(Collectors.toList()));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/shipment/{shipmentId}")
    public ResponseEntity<List<Payment>> getShipmentPayments(@PathVariable Long shipmentId) {
        return ResponseEntity.ok(paymentService.getShipmentPayments(shipmentId));
    }

    @GetMapping("/receipt/{transactionId}")
    public ResponseEntity<String> getReceipt(@PathVariable String transactionId) {
        // Mock receipt download: return a simple string
        Payment payment = paymentService.getPaymentByTransactionId(transactionId);
        String receipt = "Receipt for payment: " + payment.getTransactionId() + "\nAmount: $" + payment.getAmount() + "\nMethod: " + payment.getMethod();
        return ResponseEntity.ok(receipt);
    }
} 