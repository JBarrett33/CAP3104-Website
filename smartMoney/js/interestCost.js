function validateInterestCost(){
    let isPopulated = !(document.getElementById("interest-salestax").value == "" || 
        document.getElementById("interest-interestrate").value == "" || 
        document.getElementById("interest-itemcost").value == "" || 
        document.getElementById("interest-monthlypayment").value == "")

    let isValidRange = document.getElementById("interest-salestax").value >= 0 &&
        document.getElementById("interest-interestrate").value >= 0 &&
        document.getElementById("interest-itemcost").value > 0 &&
        document.getElementById("interest-monthlypayment").value > 0

    return isPopulated && isValidRange
}

function updateInterest(){
    if(!validateInterestCost()){
        document.getElementById("interest-table-itemprice").innerHTML = "";
        document.getElementById("interest-table-interest").innerHTML = "";
        document.getElementById("interest-table-salestax").innerHTML = "";
        document.getElementById("interest-table-months").innerHTML = "";
        document.getElementById("interest-table-total").innerHTML = "";
        window.alert("Input error! Please check your input values.")
        return
    }
    taxRate = document.getElementById("interest-salestax").value / 100;
    interestRate = document.getElementById("interest-interestrate").value / 100;
    price = document.getElementById("interest-itemcost").value
    monthlyPayment = document.getElementById("interest-monthlypayment").value

    priceWithTax = price * (1 + taxRate);
    taxTotal = priceWithTax - price;

    periodicRate = interestRate / 12

    remaining = priceWithTax
    interestPaid = 0
    months = 0
    while (remaining - monthlyPayment > 0){
        interestPaid += remaining * (periodicRate)
        remaining = remaining - monthlyPayment
        // console.log(interestPaid)
        months++
        if(months > 1000){
            window.alert("Please enter a higher monthly payment!");
            return;
        }
    };
    interestPaid += remaining * (periodicRate)
    interestPaid = interestPaid.toFixed(2);
    months++

    totalPaid = (parseFloat(priceWithTax) + parseFloat(interestPaid))
    //totalPaid = parseFloat(totalPaid).toFixed(2);
    taxPortion = taxTotal / totalPaid;
    purchasePortion = price / totalPaid;
    interestPortion = interestPaid / totalPaid;

    // document.getElementById("interest-table-itemprice").innerHTML = formatAsMoney(price);
    // document.getElementById("interest-table-interest").innerHTML = formatAsMoney(interestPaid)
    // document.getElementById("interest-table-salestax").innerHTML = formatAsMoney(taxTotal)
    // document.getElementById("interest-table-months").innerHTML = months
    // document.getElementById("interest-table-total").innerHTML = "<span style=color:green>" + formatAsMoney(totalPaid) + "</span>"

    const creditcost_data = {
        labels: ["Purchasing outright: " + formatAsMoney(totalPaid - interestPaid), "Purchasing with credit: " + formatAsMoney(totalPaid)],
        datasets: [
          {
            label: 'Item Cost',
            data: [price, price],
            backgroundColor: 'rgb(75, 192, 192)',
          },
          {
            label: 'Sales Tax',
            data: [taxTotal, taxTotal],
            backgroundColor: 'rgb(255, 205, 86)',
          },
          {
            label: 'Credit Interest',
            data: [0, interestPaid],
            backgroundColor: 'rgb(255, 99, 132)',
          },
        ]
      };

    const configuration_creditcost = {
        type: 'bar',
        data: creditcost_data,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Cost of Credit Comparison'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      };

    document.getElementById("creditcostcalculator-chartcontainer").innerHTML = "";
    const c = document.createElement("canvas");
    c.id = "creditcostcalculator-chart";
    c.style = "margin-bottom:15px;";
    document.getElementById("creditcostcalculator-chartcontainer").appendChild(c);
    const frame_creditcost = document.getElementById("creditcostcalculator-chart");
    new Chart(frame_creditcost, configuration_creditcost);
   
}