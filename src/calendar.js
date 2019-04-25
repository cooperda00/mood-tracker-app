import calendar from "calendar-js";

//Table DOM-node
const table = document.querySelector("table")

//Function to get new calendar based on user-selected values
const updatedCalendar = () => {
    let year = Number(document.querySelector("#date-year-select").value)
    year = Number(year)
    let month = document.querySelector("#date-month-select").value
    month = Number(month)
    return calendar().of(year, month)
}

//Function to create rows based on given year and month
const createRows = (thisMonth) => {
    const weeksInMonth = thisMonth.calendar
    let counter = 0;
    weeksInMonth.forEach( (week) => {
        let rowOutput = document.createElement("tr")
        rowOutput.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `
        rowOutput.classList.add("row")
        counter++
        document.querySelector("table").appendChild(rowOutput);
    })
}

//Function to populate rows with days of the month
const populateRows = (thisMonth) => {
    //get nodelist of all cells
    const allCells = document.querySelectorAll("td")
    //Get days start cell
    const firstDay = thisMonth.firstWeekday
    //Get Days end cell
    const endDay = thisMonth.lastWeekday
    //Total days
    const totalDays = thisMonth.days
    //Set counter to increment over cells
    let cellCounter = 0
    //Set counter to keep track of days
    let dayCounter = 1;
    //Loop over array starting at index of first day
    allCells.forEach( (cell) => {
        //Set the first day to the proper cell and start counting days
        if (cellCounter >= firstDay && dayCounter <= totalDays) {
            cell.textContent = dayCounter;
            dayCounter++
        //If over total days, set cell background back to white
        } else if (dayCounter > totalDays) {
            cell.style.background = "white"
        }
        cellCounter++
    })      
}

//Set title function
const setTitle = (thisMonth) => {
    document.querySelector("#calendar-month").textContent = thisMonth.month
    document.querySelector("#calendar-year").textContent = thisMonth.year
}

//Create Calendar Function
const createCalendar = (thisMonth) => {
    createRows(thisMonth)
    populateRows(thisMonth)
    setTitle(thisMonth)
}

//Create New Calendar Function
const getNewCalendar = () => {
    const newCalendar = updatedCalendar()
    table.innerHTML = ""
    table.innerHTML = `
    <tr id="calendar-title">
        <th colspan="7"><span id="calendar-month"></span>, <span id="calendar-year"></span></th> 
    </tr>
    <tr id="calendar-days">
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>  
    </tr>
    `
    createCalendar(newCalendar)
}

export {createCalendar, updatedCalendar, createRows, populateRows, setTitle, getNewCalendar}