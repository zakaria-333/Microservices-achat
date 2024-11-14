package com.example.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.services.TokenService;

@RestController
@RequestMapping("/token")
public class TokenControoller {
    @Autowired
    private TokenService tokenService;
    
}
