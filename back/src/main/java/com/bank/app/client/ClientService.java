package com.bank.app.client;

import com.bank.app.account.Account;
import com.bank.app.repository.ClientRepository;
import com.bank.app.response.ContactResponse;
import com.bank.app.response.Response;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientAccountGenerator clientAccountGenerator;

    @Autowired
    public ClientService(ClientRepository clientRepository, ClientAccountGenerator clientAccountGenerator) {
        this.clientRepository = clientRepository;
        //this.clientDetailsRepository = clientDetailsRepository;
        this.clientAccountGenerator = clientAccountGenerator;
    }

    public ResponseEntity<Object> loginClient(Client client) {
        String password = client.getPassword();
        String username = client.getUserName();

        Client clients = clientRepository.findClientByUserName(username).orElseThrow(() -> new IllegalStateException(
                "Username " + username + " don't exist, please sign up"
        ));

        if(!Objects.equals(clients.getPassword(), password)){
           throw new IllegalStateException("Incorrect password for username " + username + ", please try again");
        }

        long idClient = clients.getId();
        Response result = new Response();
        result = getClientAccounts(idClient);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public  Response getClientAccounts(long clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow(() -> new IllegalStateException(
                "Client with id " + clientId + " does not exist."
        ));

        Response result = new Response();
        result.setId(client.getId());
        result.setFirstName(client.getFirstName());
        result.setLastName(client.getLastName());
        result.setEmail(client.getEmail());
        result.setUserName(client.getUserName());
        result.setAccountBalance(client.getAccountBalance());
        List<Account> accounts =client.getAccounts();
        result.setAccountOwners(getContactAccountDetails(accounts));
        return result;
    }

    public  List<ContactResponse> getContactAccountDetails(List<Account> accounts) {
        List<ContactResponse> accountList = new ArrayList<>();
        for (Account s : accounts) {
            ContactResponse contactDetails = new ContactResponse();
            Client client=  clientRepository.findClientByAccountNumber(s.getAccountNumber());
            contactDetails.setId(s.getId());
            contactDetails.setFirstName(client.getFirstName());
            contactDetails.setLastName(client.getLastName());
            contactDetails.setAccountNumber(client.getAccountNumber());
            contactDetails.setUserName(client.getUserName());
            accountList.add(contactDetails);
        }

        return accountList;
    }

    public ContactResponse  validateAccount(Client client) {

        Client clientPresent = clientRepository.findClientByAccountNumber(client.getAccountNumber());
        ContactResponse contactDetails = new ContactResponse();

        if(Objects.isNull(clientPresent)){
            throw new IllegalStateException("Account number doesn't exist");
        }
        contactDetails.setId((clientPresent.getId()));
        contactDetails.setFirstName(clientPresent.getFirstName());
        contactDetails.setLastName(clientPresent.getLastName());
        contactDetails.setAccountNumber(clientPresent.getAccountNumber());

        return contactDetails;
    }

    public ResponseEntity<Object> addNewClient(Client client) {
        Optional<Client> clientOptional = clientRepository.findClientByUserName(client.getUserName());
        if(clientOptional.isPresent()){
            throw new IllegalStateException("Username already exist, please choose a different one");
        }

        if (!client.getPassword().equals(client.getPasswordConfirm())){
            throw new IllegalStateException("Password does not match, please type them again.");
        }

        client.setAccountNumber(clientAccountGenerator.generateAccountNumber());
        client.setAccountBalance(0.00);
        clientRepository.save(client);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    public void deleteClient(Long clientId) {
        boolean clientExists = clientRepository.existsById(clientId);
        if(!clientExists) {
            throw new IllegalStateException("Client with id " + clientId + " does not exist.");
        }
        clientRepository.deleteById(clientId);
    }

    @Transactional
    public ResponseEntity<Object> updateClient(Long clientId, String email, String telephone) {
        Client client = clientRepository.findById(clientId).orElseThrow(() -> new IllegalStateException(
                "Client with id " + clientId + " does not exist."
        ));
        if(email != null && email.length() > 5 ) {
             client.setEmail(email);
        } else {
            throw new IllegalStateException("Email must be in correct format.");
        }
        if(telephone != null && telephone.length() > 8 ) {
            client.setTelephone(telephone);
        } else {
            throw new IllegalStateException("Phone number must be in correct format.");
        }

        return new ResponseEntity<>(client, HttpStatus.OK);
    }
    @Transactional
    public ResponseEntity<String> transferMoney(Long senderId, Long recipientId, Double amount) {
        Client senderClient = clientRepository.findById(senderId).orElseThrow(() -> new IllegalStateException(
                "Sender with id " + senderId + " does not exist."
        ));
        Client recipientClient = clientRepository.findById(recipientId).orElseThrow(() -> new IllegalStateException(
                "Recipient with id " + recipientId + " does not exist."
        ));
        if(Objects.isNull(amount) || amount < 1){
            throw new IllegalStateException("Amount must be greater than 1");
        } else if (senderClient.getAccountBalance() < amount){
            throw new IllegalStateException("insufficient balance");
        }
        //add money operation
        senderClient.setAccountBalance(senderClient.getAccountBalance()-amount);
        recipientClient.setAccountBalance(recipientClient.getAccountBalance()+amount);
        return new ResponseEntity<>(amount + " sent to " + recipientClient.getFirstName(), HttpStatus.OK);
    }

}