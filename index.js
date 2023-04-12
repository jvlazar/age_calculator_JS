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

function getDaysFromMonths(i){
    i = month;
    console.log(`we are in the function`);
   
        switch (month){
            case "jan": // jan 
                totalDays -= date.getDate() + 1;
                break;
            case "feb": // feb
                totalDays -= 31;
                break;
            case "mar": // march
                totalDays -= 59;
                break;
            case "apr": // april
                totalDays -= 90;
                
                break;
            case "may": // may
                totalDays -= 120;
                break;
            case "jun": // june
                totalDays -= 151;
                break;
            case "july": // july
                totalDays -= 181;
                break;
            case "aug": // aug
                totalDays -= 212;
                break;
            case "sept": // sept
                totalDays -= 245;
                break;
            case "oct": // oct
                totalDays -= 273;
                break;
            case "nov": // nov
                totalDays -= 304;
                break;
            case "dec": // dec
                totalDays -= 334;
                break;
            default:
                break;
        }
    
   
}

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

        console.log(month);
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
    
    console.log(`year is ${inputYears}`);


}

// does the calculations to determine the age of user and displays result on page
function calculate(){
    checkValid();
    console.log(`today's date is ${date.getDate()}`);
    
    // get leap year days
    
    leapYearDays = Math.floor((date.getFullYear() - inputYears) / 4) * 366;
    console.log(`there are ${leapYearDays} number of days due to leap year`);

    // total days calculated from years
    totalDays = leapYearDays + ((date.getFullYear() - inputYears) - (Math.floor((date.getFullYear() - inputYears) / 4))) * 365;
    console.log(`there are ${totalDays} number of days`);

    
    // get days from months
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
    

    // add the additional day if it's a leap year and the month entered is not jan or feb
    if (leapYear && (month != "jan" || month != "feb")){
        totalDays += 1;
    }


    // TODO - Cases where month is larger or the same
    //      - Cases where the day is the same (both in same month or different month)
    //      - Cases where the day is < current day

    // if month is bigger than current month or is same month but date hasn't passed 
    if ((inputMonths - 1) > date.getMonth() || ((inputMonths - 1) == date.getMonth() && inputDays > date.getDate())){
       
        // if month is bigger
        if ((inputMonths -1 ) > date.getMonth()){
            console.log(`month is bigger`);
            if (inputDays < date.getDate()){
                console.log(`date is smaller`);
                totalDays -= (inputDays-1);
            } else {
              
            
           }
            
        }
        // if current day has passed, get the difference and add it
        if (inputDays < date.getDate()){
            totalDays += date.getDate() - inputDays;
        } else {
            totalDays -= Math.abs(date.getDate() - inputDays);
            getDaysFromMonths(month);
            console.log(`month may be the same, but the day hasn't passed yet, removing the amount of days until it does`);
        }
      
    }  
    
     // if months are same and the date has passed or is the current date
    else if (((inputMonths - 1) == date.getMonth() && inputDays <= date.getDate())){
        console.log(`we are here where month is the same but day is in the future/same date`)
        // if days are less
        if (inputDays < date.getDate()){
            console.log(`the day is less than the current date`)
            getDaysFromMonths(month);
        } else {
            console.log(`the day is the same as the current date`)
        }
    } 
    
   
    else {
        // add days
        
        totalDays += Math.abs(date.getDate() - inputDays);
        //getDaysFromMonths(month);
        console.log(`month is not the same as current month. Total days ${totalDays} and actual date ${date.getDate()}`);
        if (inputDays > date.getDate()){
            // TODO - fix this
            totalDays -= Math.abs(date.getDate() - inputDays);
        }
       /*
       if (inputDays < date.getDate()){
           getDaysFromMonths(month);
       } else {
        switch (month){
            case "jan": // jan 
                totalDays += date.getDate() + 1;
                break;
            case "feb": // feb
                totalDays += 31;
                break;
            case "mar": // march
                totalDays += 59;
                break;
            case "apr": // april
                totalDays += 90;
                
                break;
            case "may": // may
                totalDays += 120;
                break;
            case "jun": // june
                totalDays += 151;
                break;
            case "july": // july
                totalDays += 181;
                break;
            case "aug": // aug
                totalDays += 212;
                break;
            case "sept": // sept
                totalDays += 245;
                break;
            case "oct": // oct
                totalDays += 273;
                break;
            case "nov": // nov
                totalDays += 304;
                break;
            case "dec": // dec
                totalDays += 334;
                break;
            default:
                break;
        }
    }
    */
       console.log(`we are here`);
       
    }

    
   





    if ((date.getMonth() - inputMonths) <= 0){
        if (inputDays > date.getDate()){
            document.getElementById("result_value_years").innerHTML = (date.getFullYear() - inputYears - 1);
        }
         else {
            document.getElementById("result_value_years").innerHTML = (date.getFullYear() - inputYears);
        }

    } else {
        document.getElementById("result_value_years").innerHTML = (date.getFullYear() - inputYears);
    }
    
   console.log(`the total amount of days since your birthday is ${totalDays}`);
    
}