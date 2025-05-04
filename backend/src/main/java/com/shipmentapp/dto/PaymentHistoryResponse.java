package com.shipmentapp.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentHistoryResponse {
    private List<PaymentInfo> payments;

    @Data
    public static class PaymentInfo {
        private Long id;
        private Double amount;
        private String method;
        private boolean success;
        private String transactionId;
        private String receiptUrl;
        private String shipmentId;
        private String createdAt;
        private String scheduledFor;
    }
} 