function calculateAge() {
    var birthdate = new Date(document.getElementById("birthdate").value);
    var today = new Date();

    if (birthdate > today) {
        document.getElementById("result").innerHTML = "Error: La fecha de nacimiento no puede superar la fecha actual.";
        localStorage.removeItem('ageData');
        return;
    }

    var age = today.getFullYear() - birthdate.getFullYear();
    var months = today.getMonth() - birthdate.getMonth();
    var days = today.getDate() - birthdate.getDate();
    var hours = Math.floor((today - birthdate) / (1000 * 60 * 60));
    
    if (months < 0 || (months === 0 && today.getDate() < birthdate.getDate())) {
        age--;
        months += 12;
    }

    if (days < 0) {
        months--;
        var daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += daysInLastMonth;
    }

    var ageData = {
        years: age,
        months: months,
        days: days,
        hours: hours
    };

    localStorage.setItem('ageData', JSON.stringify(ageData));
    displayAgeData(ageData);
}

function displayAgeData(data) {
    document.getElementById("result").innerHTML = "Edad: " + data.years + " años<br>" +
                                                 "Meses: " + data.months + "<br>" +
                                                 "Días: " + data.days + "<br>" +
                                                 "Horas: " + data.hours;
}

window.onload = function() {
    var savedData = localStorage.getItem('ageData');
    if (savedData) {
        var ageData = JSON.parse(savedData);
        displayAgeData(ageData);
    }
};
