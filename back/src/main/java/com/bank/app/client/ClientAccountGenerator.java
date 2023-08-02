package com.bank.app.client;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class ClientAccountGenerator {
    public String generateAccountNumber() {
        List<Integer> randomNumbers = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i <= 24; i++) {
            int randomNumber = random.nextInt(10);
            randomNumbers.add(randomNumber);
        }

        StringBuilder cleanString = new StringBuilder();

        for (Integer number : randomNumbers) {
            cleanString.append(number);
        }

        return cleanString.toString();
    }
}
