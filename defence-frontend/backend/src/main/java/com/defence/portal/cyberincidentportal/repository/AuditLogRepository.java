package com.defence.portal.cyberincidentportal.repository;

import com.defence.portal.cyberincidentportal.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
