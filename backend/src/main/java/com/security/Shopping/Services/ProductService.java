package com.security.Shopping.Services;

import com.security.Shopping.DataAccess.*;
import com.security.Shopping.Entities.Feedback;
import com.security.Shopping.Entities.Product;
import com.security.Shopping.Entities.User;
import java.util.List;

public interface ProductService {
    public List<ProductResponse> getAllProducts(String username);
    public List<ProductResponse> getMyProducts(String username);
    public UserResponse addProduct(AddProductRequest addProductRequest, String Username);
    public UserResponse buyProducts(List<BuyProductsRequest> buyProductsRequests, String Username);
    public UserResponse AddFeedBack(AddFeedBackRequest addFeedBackRequest, String Username);
    public List<FeedBackResponse> getFeedBacks(String Username);

}
