package com.leaveTracker.demo.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.leaveTracker.demo.model.Admin;
import com.leaveTracker.demo.model.Employee;
import com.leaveTracker.demo.repository.AdminRepository;
import com.leaveTracker.demo.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.InputStream;
import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // Load data.json from resources
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("data.json")) {
            if (inputStream == null) {
                throw new RuntimeException("data.json not found in src/main/resources!");
            }

            JsonNode root = mapper.readTree(inputStream);

            // Load admin
            JsonNode adminNode = root.get("admin");
            if (adminNode != null) {
                Admin admin = new Admin();
                admin.setId(adminNode.get("id").asText());
                admin.setPassword(adminNode.get("password").asText());
                adminRepository.save(admin);
            }

            // Load employees
            JsonNode employeesNode = root.get("employees");
            if (employeesNode != null && employeesNode.isArray()) {
                for (JsonNode empNode : employeesNode) {
                    Employee emp = new Employee();
                    emp.setId(empNode.get("id").asText());
                    emp.setPassword(empNode.get("password").asText());
                    emp.setName(empNode.get("name").asText());
                    emp.setEmail(empNode.get("email").asText());
                    emp.setGender(empNode.get("gender").asText());
                    emp.setRole(empNode.get("role").asText());
                    emp.setDateOfJoining(LocalDate.parse(empNode.get("dateOfJoining").asText()));

                    // ✅ Updated setters for balances
                    emp.setLeaveBalance(empNode.get("leaveBalance").asInt());
                    emp.setCasualLeave(empNode.get("casualLeave").asInt());
                    emp.setSickLeave(empNode.get("sickLeave").asInt());
                    emp.setWorkFromHome(empNode.get("workFromHome").asInt());

                    employeeRepository.save(emp);
                }
            }

            System.out.println("✅ Admin & Employees loaded from JSON into DB");
        }
    }
}
