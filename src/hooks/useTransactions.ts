import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import { transactionService } from '../services/transaction.service';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(() => {
    setLoading(true);
    const data = transactionService.getTransactions();
    setTransactions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const markDealFinalized = async (transactionId: string) => {
    const updated = await transactionService.markDealFinalized(transactionId);
    setTransactions(updated);
  };

  const getDealsForDealer = (email: string) => transactions.filter(tx => tx.sellerEmail === email);
  const getOrdersForUser = (email: string) => transactions.filter(tx => tx.buyerEmail === email);

  return {
    transactions,
    loading,
    markDealFinalized,
    getDealsForDealer,
    getOrdersForUser,
    refreshTransactions: fetchTransactions
  };
}
