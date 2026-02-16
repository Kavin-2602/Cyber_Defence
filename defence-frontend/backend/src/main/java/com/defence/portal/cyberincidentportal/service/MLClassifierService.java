package com.defence.portal.cyberincidentportal.service;
import org.springframework.stereotype.Service;

@Service
public class MLClassifierService {

    public String classify(String description) {
        if (description == null || description.isEmpty()) {
            return "unknown";
        }

        String text = description.toLowerCase();

        // Simple demo rules — replace with real ML later
        if (text.contains("hacked") || text.contains("click here") || text.contains("password")) {
            return "spam";
        } else {
            return "ham";
        }
    }
}

