package com.security.Shopping.Entities;

import jakarta.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private long numberofavailable;
    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getdescription() {
        return description;
    }

    public void setdescription(String desc) {
        this.description = desc;
    }

    public long getNumberofavailable() {
        return numberofavailable;
    }

    public void setNumberofavailable(long numberofavailable) {
        this.numberofavailable = numberofavailable;
    }

    public void buyCount(long count)
    {
        this.numberofavailable -= count;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product(String name, String description, long numberofavailable, User user) {
        this.name = name;
        this.description = description;
        this.numberofavailable = numberofavailable;
        this.user = user;
    }

    public Product() {}
}
