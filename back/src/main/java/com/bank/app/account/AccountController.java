package com.bank.app.account;

import com.bank.app.client.Client;
import com.bank.app.repository.ClientRepository;
import com.bank.app.repository.AccountRepository;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//@CrossOrigin(origins = "*", maxAge = 3600, methods = {})
@RestController
@RequestMapping(path = "api/v1/clients")
public class AccountController {

   // private final AccountService accountService;

    @Autowired
   private AccountRepository accountRepository;

    @Autowired
   private ClientRepository clientRepository;


    public AccountController() {
    }

//    @GetMapping(path = "/accounts/{clientId}")
//    public ResponseEntity<List<Account>> findByClientDetailId(@PathVariable(value = "clientId") Long clientId) {
//
//        boolean clientExists = clientRepository.existsById(clientId);
//        if(!clientExists) {
//            throw new IllegalStateException("Client with id " + clientId + " does not exist.");
//        }else {
//            System.out.println("sssssssssssssssssssssss");
//        }
//        List<Account> accounts=new ArrayList<Account>();
////        List<Account> accounts = accountRepository.findAccountById(clientId);
//        return new ResponseEntity<>(accounts, HttpStatus.OK);
//
//    }

    @PostMapping("/accounts/{clientId}")
    public ResponseEntity<Account> addAccount(@PathVariable(value = "clientId") Long clientId,
                                                 @RequestBody Account accountToAdd) {



        Account account = clientRepository.findById(clientId).map(client -> {

            if(Objects.equals(client.getAccountNumber(), accountToAdd.getAccountNumber())){
                throw new IllegalStateException("You can't add your own account");
            }

        List<Account> noRepeatedAccounts = client.getAccounts();
                for (Account s : noRepeatedAccounts) {
                    if (accountToAdd.getAccountNumber().equals(s.getAccountNumber())) {
                        throw new IllegalStateException("Account Already saved for this client");
                    }
                }
            accountToAdd.setClient(client); //relaciono la cuenta con el cliente al que pertenece
            return accountRepository.save(accountToAdd);
        }).orElseThrow(() -> new IllegalStateException("Not found client with id = " + clientId));

        return new ResponseEntity<>(account, HttpStatus.CREATED);
    }

    @DeleteMapping("/accounts/{clientId}")
    public ResponseEntity deleteAccount(@PathVariable(value = "clientId") Long clientId,
                                                    @RequestBody Account accountToDelete) {
       clientRepository.findById(clientId).orElseThrow(() -> new IllegalStateException(
                "Client with id " + clientId + " does not exist."
       ));
       accountRepository.deleteById(accountToDelete.getId());
       return ResponseEntity.status(HttpStatus.OK).body("Account deleted" );
    }

}
