package com.bank.app.account;

import com.bank.app.client.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table (name = "accounts")
public class Account {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "clientDetails_generator"
    )
    private long id;
    private String accountNumber;

    @ManyToOne
    @JoinColumn(name = "client_id")
    //@OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore
    private Client client;

    public Account() {
    }

    public Account (String firstName, String lastName, String email, String accountNumber){

        this.accountNumber= accountNumber;
    }


    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Accounts{" +
                ", accountNumber='" + accountNumber + '\'' +
                '}';
    }

    public void setClient(Client client) {
        // Ensure bidirectional relationship is maintained
        if (this.client != null) {
            this.client.getAccounts().remove(this);
        }

        this.client = client;

        if (client != null) {
            client.getAccounts().add(this);
        }
    }
}
