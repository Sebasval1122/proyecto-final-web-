import { Transaction } from '../types';
import { storageService } from './storage.service';

const TRANSACTIONS_KEY = 'drivepoint_transactions';

const defaultTransactions: Transaction[] = [
  {
    id: 'tx-001',
    carId: 'car-001',
    carTitle: 'Toyota Corolla',
    buyerEmail: 'user@drivepoint.test',
    sellerEmail: 'dealer@drivepoint.test',
    type: 'sale',
    status: 'finalizado',
    amount: 18500,
    date: '2026-05-01'
  },
  {
    id: 'tx-002',
    carId: 'car-003',
    carTitle: 'Hyundai Kona',
    buyerEmail: 'user@drivepoint.test',
    sellerEmail: 'dealer@drivepoint.test',
    type: 'rent',
    status: 'proceso',
    amount: 245,
    date: '2026-06-01'
  }
];

export const transactionService = {
  getTransactions: (): Transaction[] => {
    const txs = storageService.get<Transaction[]>(TRANSACTIONS_KEY);
    if (!txs) {
      storageService.set(TRANSACTIONS_KEY, defaultTransactions);
      return defaultTransactions;
    }
    return txs;
  },

  markDealFinalized: async (transactionId: string): Promise<Transaction[]> => {
    const txs = transactionService.getTransactions();
    const updated = txs.map(item => item.id === transactionId ? { ...item, status: 'finalizado' } as Transaction : item);
    storageService.set(TRANSACTIONS_KEY, updated);
    return updated;
  },

  getDealsForDealer: (email: string): Transaction[] => {
    return transactionService.getTransactions().filter(tx => tx.sellerEmail === email);
  },

  getOrdersForUser: (email: string): Transaction[] => {
    return transactionService.getTransactions().filter(tx => tx.buyerEmail === email);
  }
};
