package project.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.capstone.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByAdminId(String adminId);
}
