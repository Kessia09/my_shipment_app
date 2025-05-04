package com.shipmentapp.controller;

import com.shipmentapp.dto.NotificationResponse;
import com.shipmentapp.entity.Notification;
import com.shipmentapp.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<NotificationResponse> getUserNotifications(@AuthenticationPrincipal UserDetails user) {
        List<Notification> notifications = notificationService.getUserNotifications(user.getUsername());
        NotificationResponse response = new NotificationResponse();
        response.setNotifications(notifications.stream().map(n -> {
            NotificationResponse.NotificationInfo info = new NotificationResponse.NotificationInfo();
            info.setId(n.getId());
            info.setMessage(n.getMessage());
            info.setRead(n.isRead());
            info.setCreatedAt(n.getCreatedAt().toString());
            return info;
        }).collect(Collectors.toList()));
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        Notification notification = notificationService.markAsRead(id);
        return ResponseEntity.ok(notification);
    }
} 