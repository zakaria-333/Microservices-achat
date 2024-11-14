package com.example.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.entities.Role;
import com.example.main.services.RoleService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/user")
public class RoleController {
    @Autowired
    private RoleService roleService;


    @GetMapping("/role/all")
    public List<Role> findAllRoles() {
        return roleService.findAll();
    }
    


    
}
