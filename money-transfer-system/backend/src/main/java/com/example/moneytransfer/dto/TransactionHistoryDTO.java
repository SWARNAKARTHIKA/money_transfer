package com.example.moneytransfer.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.UUID;

public class TransactionHistoryDTO {

    private UUID id;
    private String fromUsername;
    private String toUsername;
    private BigDecimal amount;
    private String status;
    private Timestamp createdOn;

    public TransactionHistoryDTO(UUID id, String fromUsername, String toUsername,
                                 BigDecimal amount, String status, Timestamp createdOn) {
        this.id = id;
        this.fromUsername = fromUsername;
        this.toUsername = toUsername;
        this.amount = amount;
        this.status = status;
        this.createdOn = createdOn;
    }

    // getters only (or use Lombok @Data)
}
