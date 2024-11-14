package com.example.main.dto;

import com.example.main.entities.Demande;
import com.example.main.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JustificationWrapper {
    private Demande demande;
    private User user;
    private String description;
    
}
