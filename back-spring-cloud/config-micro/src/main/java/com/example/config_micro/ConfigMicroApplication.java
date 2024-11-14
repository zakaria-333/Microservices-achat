package com.example.config_micro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ConfigMicroApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigMicroApplication.class, args);
	}
}
