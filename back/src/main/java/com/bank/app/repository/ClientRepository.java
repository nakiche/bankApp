package com.bank.app.repository;

import com.bank.app.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findClientByUserName(String userName);
    Client findClientByAccountNumber(String account_number);
    Optional<Client> findById(Long Long);
}
