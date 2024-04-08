package com.security.Shopping.DataAccess;

public class ProductResponse {
    public Long id ;
    public String name ;
    public String description ;
    public Long numberofavailable ;
    public String sellerUserEmail ;
    public String sellerFirstName ;
    public String sellerLastName ;

    public ProductResponse(Long id, String name, String description, Long numberofavailable, String sellerUserEmail, String sellerFirstName, String sellerLastName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.numberofavailable = numberofavailable;
        this.sellerUserEmail = sellerUserEmail;
        this.sellerFirstName = sellerFirstName;
        this.sellerLastName = sellerLastName;
    }

    public ProductResponse() {
    }


}
