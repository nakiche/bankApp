package com.bank.app.transfer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferBody {
    private Long senderId;
    private Long recipientId;
    double amount;
}
