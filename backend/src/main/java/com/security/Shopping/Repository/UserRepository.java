package com.security.Shopping.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.security.Shopping.Entities.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);

}
