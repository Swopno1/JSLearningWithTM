// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e){

  // Hire result
  document.querySelector('#result').style.display = 'none';

  // Show Loading
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {

  // UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

    // Show result
    document.querySelector('#result').style.display = 'block';

    // Hide Loading
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hire result
  document.querySelector('#result').style.display = 'none';

  // Show Loading
  document.querySelector('#loading').style.display = 'none';
  // Create a div
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error Div above heading
  card.insertBefore(errorDiv, heading);

  // Clear after 3 sec
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}