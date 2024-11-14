package com.example.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.main.dao.IDao;
import com.example.main.entities.Role;
import com.example.main.entities.User;
import com.example.main.repositories.UserRepository;

@Service
public class UserService implements IDao<User> {
 
   @Autowired
   private UserRepository userRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Override
   public User update(User user) {
      if (userRepository.existsById(user.getId())) {
         userRepository.save(user);
         return user;
      }
      return user;
   }

   @Override
   public boolean create(User user) {
      user.setMdp(passwordEncoder.encode(user.getMdp()));
      userRepository.save(user);
      return true;
   }

   @Override
   public boolean delete(int id) {
      if (userRepository.existsById((Integer) id)) {
         userRepository.deleteById((Integer) id);
         return true;
      }
      return false;
   }

   @Override
   public List<User> findAll() {
      return userRepository.findAll();
   }

   @Override
   public User getById(int id) {
      Optional<User> user = userRepository.findById(id);
      return user.orElse(null);
   }


   public List<User> findByRoleId(int id) {
      return  userRepository.findByRoleId(id)  ;
    }
}
