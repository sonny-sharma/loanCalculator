// listen to submit
document
  .getElementById('loan-form')
  .addEventListener('submit', calculateResult);

document.getElementById('reset').addEventListener('click', reset);

function calculateResult(e) {
  e.preventDefault();
  console.log('claculated');
  // ui variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // calculated monthly payment calculation
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
  } else {
    showError('Please check your numbers');
  }
}

function reset() {
  document.getElementById('amount').value = '';
  document.getElementById('interest').value = '';
  document.getElementById('years').value = '';
  document.getElementById('monthly-payment').value = '';
  document.getElementById('total-payment').value = '';
  document.getElementById('total-interest').value = '';
}

function showError(message) {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'alert alert-danger';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.appendChild(document.createTextNode(message));

  // insert above heading

  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 2000);
}
