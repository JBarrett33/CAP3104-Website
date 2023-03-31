function calculateSavings() {
    let initialBalance = parseFloat(document.getElementById("savingsgrowth-initialbalance").value)
    let monthlyDeposit = parseFloat(document.getElementById("savingsgrowth-monthlydeposit").value)
    let interestRate = (document.getElementById("savingsgrowth-interestrate").value / 100.0).toFixed(2)
    let numberOfMonths = parseFloat(document.getElementById("savingsgrowth-durationmonths").value)

    if (!validate_savingsgrowth(initialBalance, monthlyDeposit, interestRate, numberOfMonths)) {
        return;
    }

    let ret = [];
    ret.push(initialBalance);
    for (let i = 1; i <= numberOfMonths; i++) {
        let tmp = ret[i - 1];
        tmp += monthlyDeposit;
        tmp *= (1 + (interestRate / 12.0));
        ret.push(tmp);
    }
    return ret;
}

function makeChart(vals) {
    if (vals == null) {
        return;
    }
    //const labels = utils.months({count: data.length});
    const labels = []
    for (let i = 0; i < vals.length; i++) {
        labels.push(i);
    }
    const savingsdata = {
        labels: labels,
        datasets: [{
            label: "Savings Value",
            data: vals,
            fill: false,
            borderColor: 'rgb(75, 192,192)',
            tension: 0.1
        }]
    };
    const configuration = {
        type: "line",
        data: savingsdata,
        options: {
            elements:{
                point:{
                    radius: vals.length > 50 ? 0 : 3
                }
            },
            scales: {
                y: {
                    title: {
                        text: "Value",
                        display: true
                    },
                    ticks: {
                        callback: function (value, index, ticks) {
                            return formatAsMoney(value);
                        }
                    }
                },
                x: {
                    beginAtZero: false,
                    title: {
                        text: "Number of Months",
                        display: true
                    }
                }
            }
        }
    };
    document.getElementById("savingsgrowth-chartareacontainer").innerHTML = "";
    const c = document.createElement("canvas");
    c.id = "savingsgrowth-chartarea";
    c.style = "margin-bottom:15px;"
    document.getElementById("savingsgrowth-chartareacontainer").innerHTML = ("<h3>Savings value after " + (vals.length - 1) + " months:<br/><span style='color:green'>" + formatAsMoney(vals[vals.length - 1]) + "</span></h3>")
    document.getElementById("savingsgrowth-chartareacontainer").appendChild(c)

    const frame = document.getElementById("savingsgrowth-chartarea");
    new Chart(frame, configuration);
}

function validate_savingsgrowth(initialBalance, monthlyDeposit, interestRate, numberOfMonths) {
    if (isNaN(initialBalance) || isNaN(monthlyDeposit) || isNaN(interestRate) || isNaN(numberOfMonths)) {
        alert("Please fill in all values.");
        return false;
    }
    else if (initialBalance <= 0.0) {
        alert("Initial balance must be greater than $0.00");
        return false;
    }
    else if (initialBalance > 9999999) {
        alert("Initial balance must be less than $9,999,999.00");
        return false;
    }
    else if (monthlyDeposit < 0.0) {
        alert("Monthly deposit cannot be a negative number.");
        return false;
    }
    else if (monthlyDeposit > 999999) {
        alert("Monthly deposit must be less than $1,000,000.");
        return false;
    }
    else if (interestRate < 0.0) {
        alert("Interest rate cannot be less than 0");
        return false;
    }
    else if (numberOfMonths < 0.0) {
        alert("Number of months must be greater than zero.");
        return false;
    }
    else if (interestRate > 100.0 || numberOfMonths > 1000.0) {
        return false;
    }
    else if (interestRate > 100.0) {
        alert("Interest rate must be less than 100");
        return false;
    }
    else if (numberOfMonths > 500) {
        alert("Number of months must be less than 500");
        return false;
    }
    return true;
}