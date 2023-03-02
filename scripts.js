<script>
const loanAmountInput = document.getElementById("loanAmount");
const loanTypeSelect = document.getElementById("loanType");
const bankSelect = document.getElementById("bank");
const loanTermInput = document.getElementById("loanTerm");
const loanAmountSlider = document.getElementById("loanAmountSlider");
const loanTermSlider = document.getElementById("loanTermSlider");
const calculateBtn = document.getElementById("calculateBtn");
const resultEl = document.getElementById("result");
const totalResultEl = document.getElementById("totalResult");
const currencyFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

loanAmountSlider.addEventListener("input", function() {
  const value = this.value.replace(/[^\d]/g, '');
  loanAmountInput.value = currencyFormat.format(value);
});

loanTermSlider.addEventListener("input", function() {
  loanTermInput.value = this.value;
});

const interestRates = {
  personal: {
    bank1: 0.0131,
    bank2: 0,
    bank3: 0.7
  },
  home: {
    bank1: 0.5,
    bank2: 0.7,
    bank3: 0.9
  },
  car: {
    bank1: 0.7,
    bank2: 0.9,
    bank3: 0.11
  }
};

let interestRate;

loanTypeSelect.addEventListener("change", function() {
  interestRate = interestRates[this.value][bankSelect.value];
});

bankSelect.addEventListener("change", function() {
  interestRate = interestRates[loanTypeSelect.value][this.value];
});

calculateBtn.addEventListener("click", function() {
  const loanAmountStr = loanAmountInput.value;
  const whatsappContainer = document.getElementById('whatsapp-container');
  const loanTerm = parseFloat(loanTermInput.value);
  const monthlyRate = parseFloat(interestRates[loanTypeSelect.value][bankSelect.value]);
  const loanAmount = Number(loanAmountStr.replace(/\D/g, ''))/100;
  const totalPayment = loanAmount*((1 + monthlyRate)**loanTerm);
  resultEl.innerHTML = currencyFormat.format(totalPayment / loanTerm);
  totalResultEl.innerHTML = currencyFormat.format(totalPayment);
  whatsappContainer.style.display = 'block';
 
  if(isNan(totalPayment)) 
    resultEl.innerHTML = h8;
    totalResultEl.innerHTML = h9;
});
</script>
