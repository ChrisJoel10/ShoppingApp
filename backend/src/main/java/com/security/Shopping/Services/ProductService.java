package com.security.Shopping.Services;

import com.security.Shopping.DataAccess.AddProductRequest;
import com.security.Shopping.DataAccess.BuyProductsRequest;
import com.security.Shopping.DataAccess.ProductResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.Product;
import com.security.Shopping.Entities.User;
import java.util.List;

public interface ProductService {
    public List<ProductResponse> getAllProducts(String username);
    public List<ProductResponse> getMyProducts(String username);
    public UserResponse addProduct(AddProductRequest addProductRequest, String Username);
    public UserResponse buyProducts(List<BuyProductsRequest> buyProductsRequests, String Username);

}
