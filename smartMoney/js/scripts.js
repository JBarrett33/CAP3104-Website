/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function updatePieChart(){
    taxRate = document.getElementById("salestax").value / 100;
    interestRate = document.getElementById("interestrate").value / 100;
    price = document.getElementById("itemcost").value
    monthlyPayment = document.getElementById("monthlypayment").value

    priceWithTax = price * (1 + taxRate);
    taxTotal = priceWithTax - price;

    periodicRate = interestRate / 12

    remaining = priceWithTax
    interestPaid = 0
    do{
        interestPaid += remaining * (periodicRate)
        remaining = remaining - monthlyPayment
        console.log(interestPaid)
    }while (remaining - monthlyPayment > 0);
    interestPaid += remaining * (periodicRate)

    totalPaid = priceWithTax + interestPaid;
    taxPortion = taxTotal / totalPaid;
    purchasePortion = price / totalPaid;
    interestPortion = interestPaid / totalPaid;

    

    var canvas = document.getElementById("can")
    var ctx = canvas.getContext("2d")
    var lastend = 0;
    var data = [360 * taxPortion, 360*purchasePortion, 360 * interestPortion];
    var myTotal = 0;
    var myColor = ['orange', 'green','red'];

    for(var e = 0; e < data.length; e++)
    {
        myTotal += data[e];
    }
    var off = 10
    var w = (canvas.width - off) / 2
    var h = (canvas.height - off) / 2
    for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.strokeStyle ='white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w,h);
    var len =  (data[i]/myTotal) * 2 * Math.PI
    var r = h - off / 2
    ctx.arc(w , h, r, lastend,lastend + len,false);
    ctx.lineTo(w,h);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle ='white';
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var mid = lastend + len / 2
    lastend += Math.PI*2*(data[i]/myTotal);
    }
}
