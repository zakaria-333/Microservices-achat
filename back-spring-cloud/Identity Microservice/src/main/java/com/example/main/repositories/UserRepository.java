package com.example.main.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  Boolean existsUserByEmail(String email);
  List<User> findByRoleId(int id);
}
