package com.security.Shopping.Repository;

import com.security.Shopping.Entities.Feedback;
import com.security.Shopping.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedBackRepository extends JpaRepository<Feedback, Long> {
    public List<Feedback> findByUser_Username(String Username);

}
