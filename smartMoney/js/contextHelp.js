function help_homepage() {
    let pos = window.scrollY
    if(pos < 500){
        console.log("Top of page");
        window.alert("Welcome to SmartMoney's context-sensitive help! Scroll to a section and click me again to learn more!")
    }
    else if(pos < 1500){
        console.log("Calculators")
        window.alert("SmartMoney offers six different calculators designed to help you accomplish the most common personal finance tasks. Select one and click me again to learn more!")
    }
    else if(pos < 2100){
        console.log("About")
        window.alert("The about section is where you can learn about our mission as a company.")
    }
    else{
        console.log("Glossary")
        window.alert("The glossary can be used to look up common finance terms! Just type one in and click search.")
    }
}

function help_creditcost(){
    window.alert("Understanding how much more you pay when using a credit card for a purchase can be difficult. The cost of interest calculator will show you how much you'll pay in total based on your purchase amount, your interest rate (APR), your monthly payment, and applicable sales tax!")
}

function help_savingsgrowth(){
    window.alert("A high-interest savings account is a great way to make your money work for you. Use our savings growth calculator to compare interest rates, and to understand the importance of making regular monthly deposits.")
}
function help_loanpayment(){
    window.alert("Understanding the relationship between amount borrowed, interest rate, and loan term is important when making decisions about borrowing money. Our payment calculator will help you estimate how much you'l wind up paying per month based on these factors.")
}