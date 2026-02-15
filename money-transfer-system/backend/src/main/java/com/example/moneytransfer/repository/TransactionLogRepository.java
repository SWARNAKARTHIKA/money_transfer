package com.example.moneytransfer.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.moneytransfer.domain.entity.TransactionLog;
import com.example.moneytransfer.dto.TransactionHistoryDTO;

@Repository
public interface TransactionLogRepository extends JpaRepository<TransactionLog, UUID> {

    // Fetch logs where the account is either sender or receiver
    List<TransactionLog> findByFromAccountIdOrToAccountId(Long fromAccountId, Long toAccountId);

    // Idempotency lookup (prevents duplicates)
    Optional<TransactionLog> findByIdempotencyKey(String idempotencyKey);

    @Query("""
SELECT new com.example.moneytransfer.dto.TransactionHistoryDTO(
    t.id,
    uf.username,
    ut.username,
    t.amount,
    t.status,
    t.createdOn
)
FROM TransactionLog t
JOIN Account af ON t.fromAccountId = af.id
JOIN af.user uf
JOIN Account at ON t.toAccountId = at.id
JOIN at.user ut
ORDER BY t.createdOn DESC
""")
List<TransactionHistoryDTO> getFullHistory();

}