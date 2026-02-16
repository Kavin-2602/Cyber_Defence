package com.defence.portal.cyberincidentportal.repository;

import com.defence.portal.cyberincidentportal.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
