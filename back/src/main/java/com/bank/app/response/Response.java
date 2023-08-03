package com.bank.app.response;

import com.bank.app.account.Account;
import com.bank.app.client.Client;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private Long id;
    private String firstName;
    private String lastName;
    private double accountBalance;
    private String email;
    List<ContactResponse> accountOwners;

}
