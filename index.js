// creating variable that gets today's date
let date = new Date();

// variables that will be given a value from html input
let inputDays;
let inputMonths;
let inputYears;

// checking to see if the values given by user are valid
function checkValid(){
    inputDays = Number(document.getElementById("day").value);
    inputMonths = Number(document.getElementById("month").value);
    inputYears = Number(document.getElementById("year").value);
    
    
    // checking to see if input is valid
    if (inputDays < 1 || inputDays > 32){
        //console.log("Invalid day");
        document.getElementById("error_message_day").innerHTML = "<br> Must be a valid day";
    } 

    if (inputMonths < 1 || inputMonths > 12){
        document.getElementById("error_message_month").innerHTML = 'Must be a valid month';
    }

    if (inputYears > date.getFullYear()){
        document.getElementById("error_message_year").innerHTML = 'Must be a valid year';
    }
}

// does the calculations to determine the age of user and displays result on page
function calculate(){
    checkValid();
    console.log(`today's date is ${date.getDate()}`);
    // fix this, this is wrong
    document.getElementById("result_value_days").innerHTML = (inputDays - date.getDate());

}