package com.shipmentapp.service;

import com.shipmentapp.entity.User;
import com.shipmentapp.repository.UserRepository;
import com.shipmentapp.service.ShipmentService;
import com.shipmentapp.service.PaymentService;
import com.shipmentapp.entity.Shipment;
import com.shipmentapp.entity.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ShipmentService shipmentService;
    private final PaymentService paymentService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            ShipmentService shipmentService,
            PaymentService paymentService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.shipmentService = shipmentService;
        this.paymentService = paymentService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User save(User user) {
        // Set username to email if not provided
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(user.getEmail());
        }
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        // Set default role if not provided
        if (user.getRole() == null) {
            user.setRole(com.shipmentapp.entity.Role.USER);
        }
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    // ✅ Implemented authenticate() method
    public User authenticate(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(null);
    }

    public List<Shipment> getUserShipments(String username) {
        return shipmentService.getUserShipments(username);
    }

    public List<Payment> getUserPayments(String username) {
        return paymentService.getUserPayments(username);
    }

    public boolean userExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
