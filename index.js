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
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function changeColor(element, value){
    if (value == 0){
        document.getElementById(element).style.color = 'black';
    } else {
        document.getElementById(element).style.color = 'hsl(0, 100%, 67%)';
    }
}

function checkDay(day, year){
    
     // get leap year
     if (year % 4 == 0){
        leapYear = true;
    }
    // makes sure that the days value is valid
    if (day < 1 || day >= 32){
        //console.log("Invalid day");
        document.getElementById("error_message_day").innerHTML = " Must be a valid day";
        valid = false;
    } else if (month == "apr" || month == "jun" || month == "sept" || month == "nov"){
        // make sure the value is less than 30
        if (inputDays > 30){
            document.getElementById("error_message_day").innerHTML = " Must be a valid date";
            valid = false;
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



function checkMonth(months){
    if (months < 1 || months > 12){
        document.getElementById("error_message_month").innerHTML = 'Must be a valid month';
        
        valid = false;
    } else {
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
            console.log(`the month is ${month}, which is the ${months} month of the year`);
        }

        return valid;

}

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
        console.log(valid);
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
        changeColor("error_message_day", 0);
        changeColor("day_label", 0);
        changeColor("error_message_month", 0);
        changeColor("month_label", 0);
        changeColor("error_message_year", 0);
        changeColor("year_label", 0);

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
        changeColor("error_message_day", 1);
        changeColor("day_label", 1);
        changeColor("error_message_month", 1);
        changeColor("month_label", 1);
        changeColor("error_message_year", 1);
        changeColor("year_label", 1);
        
        outputDays = "- -";
        outputMonths = "- -";
        outputYears = "- -";
    }
    document.getElementById("result_value_years").innerHTML = outputYears;
    document.getElementById("result_value_months").innerHTML = outputMonths;
    document.getElementById("result_value_days").innerHTML = outputDays;
    console.log(`${outputYears} years, ${outputMonths} months, and ${outputDays} days`);

    
}