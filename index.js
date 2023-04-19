// creating variable that gets today's date
let date = new Date();

// variables that will be given a value from html input
let inputDays;
let inputMonths;
let inputYears;
let month = "";
let totalDays;
let leapYearDays;
let outputDays;
let outputMonths;
let outputYears;
let leapYear = false;
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];




// checking to see if the values given by user are valid
function checkValid(){
    inputDays = Number(document.getElementById("day").value);
    inputMonths = Number(document.getElementById("month").value);
    inputYears = Number(document.getElementById("year").value);
    
    // checking to see if input is valid
    if (inputYears > date.getFullYear()){
        document.getElementById("error_message_year").innerHTML = 'Must be a valid year';
    }
    
    if (inputMonths < 1 || inputMonths > 12){
        document.getElementById("error_message_month").innerHTML = 'Must be a valid month';
    } else {
        // switch statement to assign the month variable, to be used further down
        switch(inputMonths){
            case 1:
                month = "jan";
                break;
            case 2:
                month = "feb";
                break;
            case 3:
                month = "mar";
                break;
            case 4:
                month = "apr";
                break;
            case 5: 
                month = "may";
            case 6:
                month = "jun";
                break;
            case 7:
                month = "jul";
                break;
            case 8:
                month = "aug";
                break;
            case 9:
                month = "sept";
                break;
            case 10:
                month = "oct";
                break;
            case 11:
                month = "nov";
                break;
            case 12:
                month = "dec";
                break;
            default:
                break;
        }

        console.log(`the month is ${month}, which is the ${inputMonths} month of the year`);
    }


    // get leap year
    if (inputYears % 4 == 0){
        leapYear = true;
    }

    // makes sure that the days value is valid
    if (inputDays < 1 || inputDays > 32){
        //console.log("Invalid day");
        document.getElementById("error_message_day").innerHTML = " Must be a valid day";
    } else if (month == "apr" || month == "jun" || month == "sept" || month == "nov"){
        // make sure the value is less than 30
        if (inputDays > 30){
            document.getElementById("error_message_day").innerHTML = " Must be a valid date";
        }
    } else if (month == "feb"){
       
        // check to see if leap year, and input days is valid
        if ((!leapYear && inputDays > 28) || (leapYear && inputDays > 29) ){
            // if it's not leap year and days > 28, invalid
            // of
            // if leap year and days > 29, invalid
            document.getElementById("error_message_day").innerHTML = " Must be a valid date";
        } else {
            document.getElementById("error_message_day").innerHTML = "";

        }
    } else {
        document.getElementById("error_message_day").innerHTML = "";
    }

    // make sure the month is valid
    if (inputMonths < 1 || inputMonths > 12){
        document.getElementById("error_message_month").innerHTML = " Must be a valid month";
    } else {
        document.getElementById("error_message_month").innerHTML = "";
    }

    // make sure year is valid
    if (inputYears > date.getFullYear()){
        document.getElementById("error_message_year").innerHTML = " Must be in the past";
    } else {
        document.getElementById("error_message_year").innerHTML = "";
    }
    
}



// does the calculations to determine the age of user and displays result on page
function calculate(){
    checkValid();
  
    
    // get leap year days
    
    leapYearDays = Math.floor((date.getFullYear() - inputYears) / 4) * 366;
    console.log(`there are ${leapYearDays} number of days due to leap year`);

    // total days calculated from years
    totalDays = leapYearDays + ((date.getFullYear() - inputYears) - (Math.floor((date.getFullYear() - inputYears) / 4))) * 365;
    console.log(`there are ${totalDays} number of days`);
    
    // add the additional day if it's a leap year and the month entered is not jan or feb
    if (leapYear && (month != "jan" || month != "feb")){
        totalDays += 1;
    }


    // check to see if the current month is the same
    if ((inputMonths-1) == date.getMonth()){
        // check to see if day has passed (i.e. they're older)
        if (inputDays < date.getDate()){
            // do number of years + (inputDays - date.getDate))
            totalDays += Math.abs(inputDays - date.getDate());
        } else if (inputDays > date.getDate()){
            // if the day hasn't passed yet
            totalDays -= Math.abs(inputDays - date.getDate());
            // do number of years - (inputDays - date.getDate)
        } else {
            // if the day is the same
            // total days = 0
        }
    } else if ((inputMonths - 1) < date.getMonth()){
        //if the input month is before the current month
        // add the days from the month
        switch (date.getMonth()){
            case 0: // jan 
                break;
            case 1: // feb
                totalDays += 31;
                break;
            case 2: // march
                totalDays += 59;
                break;
            case 3: // april
                totalDays += 90;
                console.log(`printing here with total days ${totalDays}`);
                break;
            case 4: // may
                totalDays += 120;
                break;
            case 5: // june
                totalDays += 151;
                break;
            case 6: // july
                totalDays += 181;
                break;
            case 7: // aug
                totalDays += 212;
                break;
            case 8: // sept
                totalDays += 245;
                break;
            case 9: // oct
                totalDays += 273;
                break;
            case 10: // nov
                totalDays += 304;
                break;
            case 11: // dec
                totalDays += 334;
                break;
            default:
                break;
        }
        // add the input day
        totalDays += Math.abs(inputDays - date.getDate());
       
    } else {
        // the input month hasn't passed
        // remove the days from the month
        // iterate through the array to see how many months are left
        for (let i = date.getMonth(); i < inputMonths-1; i++){
            totalDays -= monthDays[i];
        }
        
        // add the input day
        // if the day is less than current (i.e. it passed, add days)
        if (inputDays < date.getDate()){
            totalDays += Math.abs(inputDays - date.getDate());
        } else {
            totalDays -= Math.abs(inputDays - date.getDate());
        }
        
    }

    outputYears = Math.abs(inputYears - date.getFullYear()); 
    
    if ((inputMonths == date.getMonth() + 1 && inputDays > date.getDate()) || inputMonths > date.getMonth() + 1){
            outputYears -= 1;
    } 


    if (inputMonths < date.getMonth()+1){
        outputMonths = Math.abs(inputMonths - date.getMonth()) + 1;
    } else if (inputMonths == date.getMonth()+1 && inputDays > date.getDate()){
        outputMonths = 11;
    } else if (inputMonths == date.getMonth() + 1 && inputDays == date.getDate()){
        outputMonths = 0;
    }
    else {
        outputMonths = 12 - Math.abs(inputMonths - date.getMonth());
        
        
    }
    if (inputDays < date.getDate()){
        outputDays = Math.abs(inputDays - date.getDate());
    } else if (inputDays == date.getDate()){
        outputDays = 0;
    } 
    else {
        outputDays = monthDays[inputMonths-1] - (inputDays - date.getDate()) + 1;
    }
    document.getElementById("result_value_years").innerHTML = outputYears;
    document.getElementById("result_value_months").innerHTML = outputMonths;
    document.getElementById("result_value_days").innerHTML = outputDays;
    
    
    console.log(`the total amount of days since your birthday is ${totalDays}`);
    console.log(`${outputYears} years, ${outputMonths} months, and ${outputDays} days`);

    
}