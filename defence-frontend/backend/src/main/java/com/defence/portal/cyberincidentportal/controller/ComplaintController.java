package com.defence.portal.cyberincidentportal.controller;

import com.defence.portal.cyberincidentportal.model.Complaint;
import com.defence.portal.cyberincidentportal.repository.ComplaintRepository;
import com.defence.portal.cyberincidentportal.repository.UserRepository;
import com.defence.portal.cyberincidentportal.service.AuditLogService;
import com.defence.portal.cyberincidentportal.service.MLClassifierService;
import com.defence.portal.cyberincidentportal.service.NotificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MLClassifierService mlClassifierService;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Complaint createComplaint(@Valid @RequestBody Complaint complaint) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth != null ? auth.getName() : "anonymous";
        
        userRepository.findByUsername(username).ifPresent(complaint::setUser);

        String label = mlClassifierService.classify(complaint.getDescription());
        complaint.setLabel(label);

        Complaint savedComplaint = complaintRepository.save(complaint);

        if ("spam".equalsIgnoreCase(label)) {
            notificationService.sendEmail(
                    "test2026cse@gmail.com",
                    "Cyber Incident Alert",
                    "⚠️ High-risk complaint detected: " + complaint.getDescription()
            );
        }

        auditLogService.log("Submitted complaint", username, "Complaint #" + savedComplaint.getId());
        return savedComplaint;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Complaint> updateComplaint(@PathVariable Long id, @Valid @RequestBody Complaint updatedComplaint) {
        return complaintRepository.findById(id)
                .map(complaint -> {
                    complaint.setDescription(updatedComplaint.getDescription());
                    complaint.setType(updatedComplaint.getType());
                    complaint.setLabel(updatedComplaint.getLabel());
                    complaintRepository.save(complaint);
                    return ResponseEntity.ok(complaint);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        if (complaintRepository.existsById(id)) {
            complaintRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }
}
