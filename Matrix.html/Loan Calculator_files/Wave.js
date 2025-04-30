document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const rateInput = document.getElementById("rate");
  const yearsInput = document.getElementById("years");
  const yearSlider = document.getElementById("year-slider");
  const calculateBtn = document.getElementById("calculate");

  const monthlyPaymentEl = document.getElementById("monthly-payment");
  const totalPaymentEl = document.getElementById("total-payment");
  const totalInterestEl = document.getElementById("total-interest");

  let chart;

  // Sync slider with input field
  yearSlider.addEventListener("input", () => {
    yearsInput.value = yearSlider.value;
  });

  yearsInput.addEventListener("input", () => {
    yearSlider.value = yearsInput.value;
  });

  calculateBtn.addEventListener("click", function () {
    const principal = parseFloat(amountInput.value);
    const interestRate = parseFloat(rateInput.value) / 100 / 12;
    const totalMonths = parseInt(yearsInput.value) * 12;

    if (isNaN(principal) || isNaN(interestRate) || isNaN(totalMonths)) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }

    // Calculate monthly payment using amortization formula
    const x = Math.pow(1 + interestRate, totalMonths);
    const monthly = (principal * x * interestRate) / (x - 1);

    if (isFinite(monthly)) {
      const totalPayment = monthly * totalMonths;
      const totalInterest = totalPayment - principal;

      monthlyPaymentEl.textContent = `Monthly Payment: ₦${monthly.toFixed(2)}`;
      totalPaymentEl.textContent = `Total Payment: ₦${totalPayment.toFixed(2)}`;
      totalInterestEl.textContent = `Total Interest: ₦${totalInterest.toFixed(
        2
      )}`;

      // Update chart
      renderChart(principal, totalInterest);
    } else {
      alert("Calculation failed. Check your inputs.");
    }
  });

  function renderChart(principal, interest) {
    const ctx = document.getElementById("payment-chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            data: [principal, interest],
            backgroundColor: ["#4CAF50", "#FF9800"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  // Optional: Dark mode toggle
  const darkModeSwitch = document.getElementById("dark-mode-switch");
  darkModeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });
});
