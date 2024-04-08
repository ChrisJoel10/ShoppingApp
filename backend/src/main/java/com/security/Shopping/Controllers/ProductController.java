package com.security.Shopping.Controllers;

import com.security.Shopping.DataAccess.AddProductRequest;
import com.security.Shopping.DataAccess.BuyProductsRequest;
import com.security.Shopping.DataAccess.ProductResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.Product;
import com.security.Shopping.Entities.User;
import com.security.Shopping.Services.ProductService;
import com.security.Shopping.util.LoggedinUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/product")
public class ProductController {

    private ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getProducts")
    public List<ProductResponse> getProducts()
    {
        String username = LoggedinUser.getUsername();
        return productService.getAllProducts(username);
    }

    @GetMapping("/getMyProducts")
    public List<ProductResponse> getMyProducts()
    {
        String username = LoggedinUser.getUsername();
        return productService.getMyProducts(username);
    }

    @PostMapping("/AddProduct")
    public UserResponse addProduct(@RequestBody AddProductRequest addProductRequest)
    {
        String username = LoggedinUser.getUsername();
        return productService.addProduct(addProductRequest, username);
    }

    @PostMapping("/buyProducts")
    public UserResponse buyProducts(@RequestBody List<BuyProductsRequest> buyProductsRequests)
    {
        String username = LoggedinUser.getUsername();
        return productService.buyProducts(buyProductsRequests, username);
    }
}
