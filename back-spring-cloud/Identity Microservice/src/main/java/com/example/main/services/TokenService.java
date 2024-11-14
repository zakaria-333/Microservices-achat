package com.example.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.main.repositories.TokenRepo;

@Service
public class TokenService {
    @Autowired
    private TokenRepo tokenRepo;
    
}
