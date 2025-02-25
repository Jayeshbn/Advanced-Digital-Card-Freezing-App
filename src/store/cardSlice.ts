import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import { faker } from '@faker-js/faker';

const ENCRYPTION_KEY = 'your-secret-key';

interface CardState {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isFrozen: boolean;
  isFlipped: boolean;
  showPinModal: boolean;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  date: string;
  type: 'credit' | 'debit';
}

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    amount: parseFloat(faker.finance.amount(10, 1000)),
    merchant: faker.company.name(),
    date: faker.date.recent().toISOString(),
    type: faker.helpers.arrayElement(['credit', 'debit'] as const),
  }));
};

const initialState: CardState = {
  cardNumber: encryptData(faker.finance.creditCardNumber('#### #### #### ####')),
  expiryDate: encryptData(faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })),
  cvv: encryptData(faker.finance.creditCardCVV()),
  isFrozen: false,
  isFlipped: false,
  showPinModal: false,
  transactions: generateTransactions(10),
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    toggleFreeze: (state) => {
      if (!state.isFrozen) {
        state.isFrozen = true;
      } else {
        state.showPinModal = true;
      }
    },
    confirmUnfreeze: (state) => {
      state.isFrozen = false;
      state.showPinModal = false;
    },
    cancelUnfreeze: (state) => {
      state.showPinModal = false;
    },
    flipCard: (state) => {
      state.isFlipped = !state.isFlipped;
    },
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      state.transactions.unshift({
        id: faker.string.uuid(),
        ...action.payload,
      });
    },
  },
});

export const { toggleFreeze, confirmUnfreeze, cancelUnfreeze, flipCard, addTransaction } = cardSlice.actions;
export const selectDecryptedCardData = (state: { card: CardState }) => ({
  cardNumber: state.card.isFrozen ? 
    '•••• •••• •••• ' + decryptData(state.card.cardNumber).slice(-4) : 
    decryptData(state.card.cardNumber),
  expiryDate: decryptData(state.card.expiryDate),
  cvv: state.card.isFrozen ? '•••' : decryptData(state.card.cvv),
});

export default cardSlice.reducer;