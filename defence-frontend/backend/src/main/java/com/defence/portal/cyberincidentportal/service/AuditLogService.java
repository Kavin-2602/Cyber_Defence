package com.defence.portal.cyberincidentportal.service;

import com.defence.portal.cyberincidentportal.model.AuditLog;
import com.defence.portal.cyberincidentportal.repository.AuditLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void log(String action, String username) {
        System.out.println("AUDIT: " + action + " by " + username + " at " + LocalDateTime.now());
        auditLogRepository.save(new AuditLog(action, username));
    }

    public void log(String action, String username, String resource) {
        System.out.println("AUDIT: " + action + " by " + username + " on " + resource + " at " + LocalDateTime.now());
        auditLogRepository.save(new AuditLog(action, username, resource));
    }
}
