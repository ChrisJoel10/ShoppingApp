package com.security.Shopping.Repository;

import com.security.Shopping.DataAccess.ProductResponse;
import com.security.Shopping.Entities.Product;
import com.security.Shopping.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public List<Product> findByUser_UsernameNot(String Username);
    public List<Product> findByUser_Username(String Username);

}
