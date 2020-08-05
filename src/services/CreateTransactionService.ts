import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    // console.log(type);
    if (type === 'outcome') {
      const valid = this.transactionsRepository.validOutCome(value);

      if (valid === 0) {
        throw Error('income less then outcome');
      }
    }

    const Newtransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return Newtransaction;
  }
}

export default CreateTransactionService;
