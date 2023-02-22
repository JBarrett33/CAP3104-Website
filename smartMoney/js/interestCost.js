function validate(){
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
    if(!validate()){
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
        console.log(interestPaid)
        months++
    };
    interestPaid += remaining * (periodicRate)
    months++

    totalPaid = priceWithTax + interestPaid;
    taxPortion = taxTotal / totalPaid;
    purchasePortion = price / totalPaid;
    interestPortion = interestPaid / totalPaid;

    document.getElementById("interest-table-itemprice").innerHTML = formatAsMoney(price);
    document.getElementById("interest-table-interest").innerHTML = formatAsMoney(interestPaid)
    document.getElementById("interest-table-salestax").innerHTML = formatAsMoney(taxTotal)
    document.getElementById("interest-table-months").innerHTML = months
    document.getElementById("interest-table-total").innerHTML = "<span style=color:green>" + formatAsMoney(totalPaid) + "</span>"
   
}