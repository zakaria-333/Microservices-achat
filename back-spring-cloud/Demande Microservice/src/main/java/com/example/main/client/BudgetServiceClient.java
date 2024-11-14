package com.example.main.client;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.main.entities.Demande;

@FeignClient(name = "budget-service")

public interface BudgetServiceClient {

    @PostMapping("/budget/subcategorie/subtract")
    boolean subtractBudget(@RequestBody Demande demande);
}
