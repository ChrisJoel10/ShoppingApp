package com.security.Shopping.Services;

import com.security.Shopping.DataAccess.AddProductRequest;
import com.security.Shopping.DataAccess.BuyProductsRequest;
import com.security.Shopping.DataAccess.ProductResponse;
import com.security.Shopping.DataAccess.UserResponse;
import com.security.Shopping.Entities.Product;
import com.security.Shopping.Entities.User;
import com.security.Shopping.Repository.ProductRepository;
import com.security.Shopping.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{
    private ProductRepository productRepository;
    private UserRepository userRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository)
    {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    @Override
    public List<ProductResponse> getAllProducts(String username) {
        List<ProductResponse> result = this.productRepository.findByUser_UsernameNot(username).stream().map(this::getProductResponse).toList();
        return result;
    }

    @Override
    public List<ProductResponse> getMyProducts(String username) {
        List<ProductResponse> result = this.productRepository.findByUser_Username(username).stream().map(this::getProductResponse).toList();
        return result;
    }

    private ProductResponse getProductResponse(Product product)
    {
        User seller = product.getUser();
        return new ProductResponse(product.getId(), product.getName(), product.getdescription(), product.getNumberofavailable(), seller.getEmail(), seller.getFirstname(), seller.getLastname());
    }

    @Override
    public UserResponse addProduct(AddProductRequest addProductRequest, String Username) {
        User user = this.userRepository.findByUsername(Username);
        Product product = new Product(addProductRequest.name, addProductRequest.description, addProductRequest.numberofavailable, user);

        Product response = this.productRepository.save(product);
        if(response == null)
        {
            return new UserResponse(false, "Product Not Added", 0);
        }
        else
        {
            return new UserResponse(true, "Product Added", 1);
        }
    }

    @Override
    public UserResponse buyProducts(List<BuyProductsRequest> buyProductsRequests, String Username) {
        List<Long> ids = buyProductsRequests.stream().map(elt -> elt.id).toList();
        List<Product> products = this.productRepository.findAllById(ids);
        for(int i = 0; i < buyProductsRequests.size(); i++)
        {
            for(int j = 0; j < products.size(); j++)
            {
                if(buyProductsRequests.get(i).id == products.get(j).getId())
                {
                    products.get(j).buyCount(buyProductsRequests.get(i).buycount);
                }
            }
        }
        List<Product> result = productRepository.saveAll(products);
        if(result != null)
        {
            return new UserResponse(true, "Purchase Successful", 1);
        }
        else
        {
            return new UserResponse(false, "Purchase failed", 0);

        }

    }
}
