package com.shipmentapp.dto;

import lombok.Data;

import java.util.List;

@Data
public class NotificationResponse {
    private List<NotificationInfo> notifications;

    @Data
    public static class NotificationInfo {
        private Long id;
        private String message;
        private boolean read;
        private String createdAt;
    }
} 