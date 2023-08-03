package com.bank.app.client;

import com.bank.app.account.Account;
import com.bank.app.repository.ClientRepository;
import jakarta.transaction.Transactional;
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
   // private final ClientDetailsRepository clientDetailsRepository;

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
        return new ResponseEntity<>(clientRepository.findById(idClient), HttpStatus.OK);
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public  ResponseEntity<Object> getClientById(long clientId) {


        Client client = clientRepository.findById(clientId).orElseThrow(() -> new IllegalStateException(
                "Client with id " + clientId + " does not exist."
        ));

        return new ResponseEntity<>(client, HttpStatus.OK);
    }


    public Optional<Client> getAccounts(Client client) {
        System.out.println("solaaaaaaaaaaaaaaaaaa" + client);
        Optional<Client> accountOptional = clientRepository.findClientByAccountNumber(client.getAccountNumber());
        if(accountOptional.isEmpty()){
            throw new IllegalStateException("Account number doesn't exist");
        }
//        Client clientData = accountOptional.get();
//        ClientDetails clientDetails = new ClientDetails();
//        //clientDetails.setClientId(clientData.getId());
//        clientDetails.setFirstName(clientData.getFirstName());
//        clientDetails.setLastName(clientData.getLastName());
//        clientDetails.setEmail(clientData.getEmail());
//        clientDetails.setAccountNumber(clientData.getAccountNumber());

        //return Optional.of(clientDetails);
        return accountOptional;
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

}