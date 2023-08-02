package com.bank.app.client;

import com.bank.app.account.Account;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "clients")
public class Client {
    @Id
    @SequenceGenerator(
            name = "client_sequence",
            sequenceName = "client_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "client_sequence"
    )
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String Password;
    @Transient
    private String PasswordConfirm;
    private String accountNumber;
    private Double accountBalance;

    private String email;

    private String telephone;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<Account> accounts = new ArrayList<>();
    public Client() {

    }

    public Client(String firstName, String lastName, String userName, String password, String accountNumber, Double accountBalance,String email, String telephone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        Password = password;
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
        this.telephone = telephone;
        this.email = email;
    }

    public void addAccount(Account account) {
        accounts.add(account);
        account.setClient(this);
    }

    // Add a method to remove accounts from the client
    public void removeAccount(Account account) {
        accounts.remove(account);
        account.setClient(null);
    }

    // Get the list of accounts associated with this client
    public List<Account> getAccounts() {
        return accounts;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPasswordConfirm() {
        return PasswordConfirm;
    }

    public String getEmail(){return email;}
    public void setEmail(String email){this.email= email;}

    public String getTelephone(){return telephone;}
    public void setTelephone(String telephone){this.telephone= telephone;}

    public void setPasswordConfirm(String passwordConfirm) {
        PasswordConfirm = passwordConfirm;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userName='" + userName + '\'' +
                ", Password='" + Password + '\'' +
                ", accountNumber='" + accountNumber + '\'' +
                ", accountBalance='" + accountBalance + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
