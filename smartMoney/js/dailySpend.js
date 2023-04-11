function dailyspend_validate(){
    let payPeriodDays = parseFloat(document.getElementById("dailyspend-payperiod").value);
    let payAmount = parseFloat(document.getElementById("dailyspend-payamount").value);
    let taxAmount = parseFloat(document.getElementById("dailyspend-taxamount").value) / 100;
    let savingsAmount = parseFloat(document.getElementById("dailyspend-savingsamount").value) / 100;
    let accountForTaxes = !document.getElementById("dailyspend-deducttaxes").checked;

    if(isNaN(payAmount) || isNaN(taxAmount) || isNaN(savingsAmount) || isNaN(payPeriodDays)){
        alert("Please fill in all values.")
        return false;
    }
    else if(payAmount < 0 || payAmount > 999999){
        alert("Pay amount out of range.")
        return false;
    }
    else if(taxAmount < 0.0 || taxAmount > .50){
        alert("Tax percentage out of range.")
        return false;
    }
    else if(savingsAmount < 0.0 || savingsAmount > .50){
        alert("Savings percentage out of range.")
        return false;
    }
    else if(payPeriodDays > 100){
        alert("Paycheck period out of range.")
        return false;
    }
    return true;
}

function getDailySpendGoal(){
    if(!dailyspend_validate()){
        return;
    }
    document.getElementById("dailyspend-results").innerHTML = "";
    let payPeriodDays = parseFloat(document.getElementById("dailyspend-payperiod").value);
    let payAmount = parseFloat(document.getElementById("dailyspend-payamount").value);
    let taxAmount = parseFloat(document.getElementById("dailyspend-taxamount").value) / 100;
    let savingsAmount = parseFloat(document.getElementById("dailyspend-savingsamount").value) / 100;
    let accountForTaxes = !document.getElementById("dailyspend-deducttaxes").checked;

    let dailyGoal = 0;
    if(accountForTaxes){
        dailyGoal = (payAmount * (1-taxAmount-savingsAmount) / payPeriodDays);
    }
    else{
        dailyGoal = (payAmount * (1-savingsAmount) / payPeriodDays);
    }

    document.getElementById("dailyspend-results").innerHTML = (`
        <table class='table'>
            <tr>
                <th>Paycheck amount</th>
                <th>Days between paychecks</th>
                <th>Set aside for taxes</th>
                <th>Set aside for savings</th>
                <th>Daily spending goal</th>
            </tr>
            <tr>
                <td>${formatAsMoney(payAmount)}</td>
                <td>${payPeriodDays}</td>
                <td>${accountForTaxes ? formatAsMoney(payAmount * taxAmount) : '$0.00'}</td>
                <td>${formatAsMoney(payAmount * savingsAmount)}</td>
                <td><span style="color:green">${formatAsMoney(dailyGoal)}</span></td>
            </tr>
        </table>`)
    
}