package com.example.main.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.main.entities.Role;
import com.example.main.entities.User;
import com.example.main.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/create")
    public boolean createUser(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        
        return userService.update(user);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteUser(@PathVariable int id) {
        return userService.delete(id);
    }

    @GetMapping("/all")
    public List<User> findAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getById(id);
    }
    @GetMapping("/byRole/{id}")
    public List<User> findByRole(@PathVariable int id) {
        return userService.findByRoleId(id);
    }
}
