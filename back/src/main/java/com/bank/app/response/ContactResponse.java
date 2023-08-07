package com.bank.app.response;

import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String accountNumber;
}
