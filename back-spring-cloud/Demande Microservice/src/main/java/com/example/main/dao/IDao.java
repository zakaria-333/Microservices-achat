package com.example.main.dao;

import java.util.List;

public interface IDao<T,k> {
    boolean update(T o);
    boolean create(T o);
    List<T> findAll();
    boolean delete(k id);
    T getById(k n); 
    
}
