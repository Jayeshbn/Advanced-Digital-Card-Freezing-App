import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function TransactionHistory() {
  const transactions = useSelector((state: RootState) => state.card.transactions);

  const renderTransaction = ({ item }: any) => (
    <View style={styles.transaction}>
      <View>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
      <Text style={[
        styles.amount,
        item.type === 'credit' ? styles.credit : styles.debit
      ]}>
        {item.type === 'credit' ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2c2c2e',
  },
  merchant: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: '#666666',
    fontSize: 14,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  credit: {
    color: '#34c759',
  },
  debit: {
    color: '#ff3b30',
  },
});