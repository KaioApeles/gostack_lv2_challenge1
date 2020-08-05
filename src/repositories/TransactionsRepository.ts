/* eslint-disable no-console */
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface TransactionTDO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface EntireWorld {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private entireWorld: EntireWorld;

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.entireWorld = {
      transactions: this.transactions,
      balance: this.balance,
    };
  }

  public all(): EntireWorld {
    // TODO
    // const balance = this.getBalance();

    // const newTransaction = {
    //   transactions: this.transactions,
    //   balance,
    // };

    // this.entireWorld.pop();
    // this.entireWorld.push(newTransaction);
    // console.log(newTransaction);

    return this.entireWorld;
  }

  public validOutCome(value: number): number {
    // const valid = this.balance.filter(item => item.total >= value);
    if (this.balance.total >= value) {
      return 1;
    }
    return 0;
  }

  public getBalance(): Balance {
    // TODO
    const obj: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    if (this.transactions.length !== 0) {
      this.transactions.reduce((prev, curr) => {
        if (curr.type === 'income') {
          obj.income += curr.value;
        } else obj.outcome += curr.value;

        obj.total = obj.income - obj.outcome;

        return prev;
      }, 1);
    }

    this.balance = obj;

    // console.log(this.balance);

    return this.balance;
  }

  public create({ title, value, type }: TransactionTDO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    const balance = this.getBalance();

    const newTransaction = {
      transactions: this.transactions,
      balance,
    };

    this.entireWorld = newTransaction;
    // this.entireWorld.pop();
    // this.entireWorld.push(newTransaction);

    return transaction;
  }
}

export default TransactionsRepository;
