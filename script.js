document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transactionForm');
    const transactionsList = document.getElementById('transactions');
    const expenseChart = document.getElementById('expenseChart').getContext('2d');
    
    let transactions = [];

    const updateChart = () => {
        const categories = {};
        transactions.forEach(transaction => {
            const category = transaction.category;
            categories[category] = (categories[category] || 0) + transaction.amount;
        });

        const labels = Object.keys(categories);
        const data = Object.values(categories);

        new Chart(expenseChart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Amount',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    transactionForm.addEventListener('submit', event => {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (description && !isNaN(amount) && category) {
            transactions.push({ description, amount, category });

            const listItem = document.createElement('li');
            listItem.textContent = `${description}: $${amount.toFixed(2)} (${category})`;
            transactionsList.appendChild(listItem);

            updateChart();
            transactionForm.reset();
        }
    });
});
