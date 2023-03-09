// Code by Tahmina Jahan
// Modified by Jonah Barrett where noted

function Calculate() {
  
    // Extracting value in the amount 
    // section in the variable
    const amount = document.querySelector("#loanpaymentcalculator-amount").value;
  
    // Extracting value in the interest
    // rate section in the variable
    const rate = document.querySelector("#loanpaymentcalculator-rate").value;
  
    // Extracting value in the months 
    // section in the variable
    const months = document.querySelector("#loanpaymentcalculator-months").value;
  
    // Calculating interest per month
    const interest = (amount * (rate * 0.01)) / months;
      
    // Calculating total payment
    const total = ((amount / months) + interest).toFixed(2);
    
    // Modified this and added a ternary expression so that the result won't display invalid values such as negative numbers, NaN, and Infinity
    document.querySelector("#loanpaymentcalculator-results").innerHTML = (isNaN(total) || !isFinite(total) || total < 0)  ? ("") : ("<h2>Monthly payment : <span style='color:#1abc9c'>$" + total + "</span></h2><br/>");
    // document.querySelector("#total")
    //         .innerHTML = "EMI : ($)" + total;
}