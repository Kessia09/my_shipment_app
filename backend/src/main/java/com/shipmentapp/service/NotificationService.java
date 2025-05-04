package com.shipmentapp.service;

import com.shipmentapp.entity.Notification;
import com.shipmentapp.entity.User;
import com.shipmentapp.repository.NotificationRepository;
import com.shipmentapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public Notification createNotification(String username, String message) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        return notificationRepository.save(notification);
    }

    public List<Notification> getUserNotifications(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return notificationRepository.findByUser(user);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow();
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
} 