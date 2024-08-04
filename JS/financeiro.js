document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionsContainer = document.querySelector('.transactions');
    const balanceAmountElement = document.querySelector('.balance-amount');
    let transactions = [];

    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const description = event.target['transaction-description'].value;
        const amount = parseFloat(event.target['transaction-amount'].value.replace(',', '.'));
        const type = event.target['transaction-type'].value;

        const transaction = {
            description,
            amount,
            type
        };

        transactions.push(transaction);
        updateTransactions();
        transactionForm.reset();
    });

    function updateTransactions() {
        transactionsContainer.innerHTML = '';
        let balance = 0;

        transactions.forEach((transaction, index) => {
            const transactionItemElement = document.createElement('div');
            transactionItemElement.classList.add('transaction-item');
            const transactionAmountClass = transaction.type === 'expense' ? 'transaction-amount expense' : 'transaction-amount';
            transactionItemElement.innerHTML = `
                <span>${transaction.description}</span>
                <span class="${transactionAmountClass}">R$ ${transaction.amount.toFixed(2).replace('.', ',')}</span>
                <button onclick="removeTransaction(${index})">Remover</button>
            `;

            transactionsContainer.appendChild(transactionItemElement);

            balance += transaction.type === 'expense' ? -transaction.amount : transaction.amount;
        });

        balanceAmountElement.textContent = `R$ ${balance.toFixed(2).replace('.', ',')}`;
    }

    window.removeTransaction = (index) => {
        transactions.splice(index, 1);
        updateTransactions();
    }
});
