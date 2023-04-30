// creating variable that gets today's date
let date = new Date();

// variables that will be given a value from html input
let inputDays;
let inputMonths;
let inputYears;
let month = "";
let outputDays;
let outputMonths;
let outputYears;
let leapYear = false;
let valid;
let value;
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function changeColor(element, val){
   
    if (val == 0){
        document.getElementById(element).style.color = 'hsl(0, 1%, 44%)';
    } else {
        document.getElementById(element).style.color = 'hsl(0, 100%, 67%)';
        if (element.includes("error_message")){
             document.getElementById(element).style.fontStyle = 'italic';
        } else {
            document.getElementById(element).style.fontStyle = 'normal';
        }
    }
}



function checkDay(day, year){
    
     // get leap year
     if (year % 4 == 0){
        leapYear = true;
    }
    // makes sure that the days value is valid
    if (day < 1 || day >= 32){
      
        document.getElementById("error_message_day").innerHTML = " Must be a valid day";
        valid = false;
    } else if (month == "apr" || month == "jun" || month == "sept" || month == "nov"){
        // make sure the value is less than 30
        if (inputDays > 30){
            document.getElementById("error_message_day").innerHTML = " Must be a valid date";
            valid = false;
        } else {
            document.getElementById("error_message_day").innerHTML = "";
        }
    } else if (month == "feb"){
        
        // check to see if leap year, and input days is valid
        if ((!leapYear && day > 28) || (leapYear && day > 29) ){
            // if it's not leap year and days > 28, invalid
            // of
            // if leap year and days > 29, invalid
            document.getElementById("error_message_day").innerHTML = " Must be a valid date";
            valid = false;
        } else {
            document.getElementById("error_message_day").innerHTML = "";

        }
    } else {
        document.getElementById("error_message_day").innerHTML = "";
        
    }
    return valid;
}


// checks the month to see if input is correct, and if so stores it in a string variable for month for 
// ease of reading in future code
// returns false if invalid, else returns true
function checkMonth(months){
    if (months < 1 || months > 12){
        document.getElementById("error_message_month").innerHTML = 'Must be a valid month';
        valid = false;
    } else {
        document.getElementById("error_message_month").innerHTML = '';
        // switch statement to assign the month variable, to be used further down
        switch(months){
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
                break;
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
        }

        return valid;
}

// checks the year to ensure the year isn't in the future
// returns false if invalid, else returns true
function checkYear(year){
    // make sure year is valid
    if (year > date.getFullYear()){
        document.getElementById("error_message_year").innerHTML = " Must be in the past";
        valid = false;
    } else {
        document.getElementById("error_message_year").innerHTML = "";
    }
    return valid;
}


// checking to see if the values given by user are valid
function checkValid(){
    
    if (document.getElementById("day").value == ""  || document.getElementById("month").value == "" 
        || document.getElementById("year").value == "" ){
            if (document.getElementById("day").value == "" ){
                document.getElementById("error_message_day").innerHTML = " This field is required";
                changeColor("error_message_day", 1);
                changeColor("day_label", 1);
                
            } if (document.getElementById("month").value == ""){
                document.getElementById("error_message_month").innerHTML = " This field is required";
                changeColor("error_message_month", 1);
                changeColor("month_label", 1);
            } if (document.getElementById("year").value == ""){
                document.getElementById("error_message_year").innerHTML = " This field is required";  
                changeColor("error_message_year", 1);
                changeColor("year_label", 1);
            }
            valid = false;
        }
    
    else {
        inputDays = Number(document.getElementById("day").value);
        inputMonths = Number(document.getElementById("month").value);
        inputYears = Number(document.getElementById("year").value);

       

        // checking to see if input is valid
        
        // check month
        if (!checkMonth(inputMonths)){
            
            valid = false;
        }
        // check day
        if (!checkDay(inputDays, inputYears)){
            
            valid = false;
        } 
       
        // check year
        if (!checkYear(inputYears)){
            valid = false;
        }
            return valid;
    }
    
}



// does the calculations to determine the age of user and displays result on page
function calculate(){
    valid = true;

    if(checkValid()){
        value = 0;
        // years
        outputYears = Math.abs(inputYears - date.getFullYear()); 
        if ((inputMonths == date.getMonth() + 1 && inputDays > date.getDate()) || inputMonths > date.getMonth() + 1){
                outputYears -= 1;
        } 

        // months
        if (inputMonths < date.getMonth()+1){
            outputMonths = Math.abs(inputMonths - (date.getMonth()+1));
            // if the day hasn't passed yet, month -1
            if (inputDays > date.getDate()){
                outputMonths -= 1;
            }
        } else if (inputMonths == (date.getMonth()+1) && inputDays > date.getDate()){
            // if if's the same month and the day hasn't passed yet, month = 11
            outputMonths = 11;
        } else if (inputMonths == (date.getMonth() + 1) && inputDays == date.getDate()){
            // if it's the same month and same day, month = 0
            outputMonths = 0;
        }  else if (inputMonths == (date.getMonth()+1) && inputDays < date.getDate()){
            // if it's the same month and the day has passed, month -1
            outputMonths = Math.abs(inputMonths - date.getMonth()) - 1;
        }
        else {
            // if the month hasn't passed yet
            outputMonths = 12 - Math.abs(inputMonths - date.getMonth());
        }

        
        

        // days
        if (inputDays < date.getDate()){
            outputDays = Math.abs(inputDays - date.getDate()) ;
            if (inputMonths > date.getMonth()){
                outputMonths += 1;
            }
        } else if (inputDays == date.getDate()){
            outputDays = 0;
            outputMonths += 1;
        } 
        else {
            // if the day hasn't passed yet
            if (!leapYear && month == "feb"){
                outputDays = monthDays[inputMonths-1] - (inputDays - date.getDate()) + 3;
            } else if (leapYear && month =="feb"){
                outputDays = 29 - (inputDays - date.getDate());
            } else {
                console.log(`${monthDays[inputMonths-1]} days in the month of ${month}`);
                if (monthDays[inputMonths-1] == 30){
                    outputDays = monthDays[inputMonths-1] - (inputDays - date.getDate()) + 1;
                } else {
                    outputDays = monthDays[inputMonths-1] - (inputDays - date.getDate()) ;
                }
            }

        }

       
        
    } else {
        // if there's an error, disaply the error message and leave the output to the default
        value = 1;
        outputDays = "- -";
        outputMonths = "- -";
        outputYears = "- -";
    }

    changeColor("error_message_day", value);
    changeColor("day_label", value);
    changeColor("error_message_month", value);
    changeColor("month_label", value);
    changeColor("month_label", value);
    changeColor("error_message_year", value);
    changeColor("year_label", value);
    
    // displaying the results
    document.getElementById("result_value_years").innerHTML = outputYears;
    document.getElementById("result_value_months").innerHTML = outputMonths;
    document.getElementById("result_value_days").innerHTML = outputDays;
    
}