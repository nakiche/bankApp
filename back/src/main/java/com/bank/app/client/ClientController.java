package com.bank.app.client;

import com.bank.app.account.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "api/v1/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping(path = "/login") //loginValidation
    public ResponseEntity<Object> loginClient(@RequestBody Client client){
       return clientService.loginClient(client);
    }

    @GetMapping()
    public List<Client> getClients()
    {
        return clientService.getClients();
    }

    @GetMapping(path = "{clientId}")
    public ResponseEntity<Object> getClientById(@PathVariable("clientId") Long clientId)
    {
        return clientService.getClientById(clientId);
    }




//    @GetMapping(path = "/accounts")
//    public Optional<ClientDetails> getAllAccounts(@RequestBody Client client)
//    {
//        return clientService.getAccounts(client);
//    }

//    @PostMapping(path = "/account/save")
//    public ResponseEntity<Object> postAccount(@RequestBody Client client)
//    {
//        return clientService.saveAccount(client);
//    }

    @PostMapping
    public ResponseEntity<Object> registerNewClient(@RequestBody Client client){
      return clientService.addNewClient(client);
    }

    @DeleteMapping(path = "{clientId}")
    public void deleteClient(@PathVariable("clientId") Long clientId){
        clientService.deleteClient(clientId);
    }

    @PutMapping(path = "{clientId}")
    public ResponseEntity<Object> updateClient(
            @PathVariable("clientId") Long clientId,
            @RequestParam(required = true) String email,
            @RequestParam(required = true) String telephone)
            {
                return   clientService.updateClient(clientId, email, telephone);
    }
}
