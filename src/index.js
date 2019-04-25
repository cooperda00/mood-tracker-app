import {getNewCalendar} from "./calendar"
import moment from "moment"
import {createDateData} from "./mood"

//DOM Nodes
const yearSelect = document.querySelector("#date-year-select")
const monthSelect = document.querySelector("#date-month-select")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")
const moodSelect = document.querySelector("#mood-selector")

//State Management Variables
let data = []
let selectedColor = moodSelect.value

//Get current dates and set default value of dropdowns
let currentMonth = moment().month()
let currentYear = moment().format("YYYY")
const currentDay = moment().format("D")
yearSelect.value = currentYear
monthSelect.value = currentMonth

//Initial Population of Calendar based on today's date
getNewCalendar()

//Move forward or back one month functions
const incrementMonth = () => {
    let month = parseInt(monthSelect.value, 10)
    let year = parseInt(yearSelect.value, 10)
    if (month === 11 && year === 2027) {
    } else if (month <= 10) {
        month++
        monthSelect.value++
        getNewCalendar()
    } else if (month === 11) {
        month = 0
        monthSelect.value = 0
        year++
        yearSelect.value++
        getNewCalendar()
    }
    currentMonth = month
    currentYear = year
}

const decrementMonth = () => {
    let month = parseInt(monthSelect.value, 10)
    let year = parseInt(yearSelect.value, 10)
    if (month === 0 && year === 2018) {
        console.log("No More Years")
    } else if (month >= 1) {
        month--
        monthSelect.value--
        getNewCalendar()
    } else if (month === 0) {
        month = 11
        monthSelect.value = 11
        year--
        yearSelect.value--
        getNewCalendar()
    }
    currentMonth = month
    currentYear = year
}

//Change Styling of Todays Date Function
const findToday = () => {
    document.querySelectorAll("td").forEach( (cell) => {
        const selectedMonth = Number(monthSelect.value)
        const selectedYear = Number(yearSelect.value)
        const nowYear = Number(currentYear)
        if(cell.textContent === currentDay && selectedMonth === currentMonth && selectedYear === nowYear) {
            cell.classList.add("today")
        }
    })
}

//UI control events
//Event Listeners for changing date:
yearSelect.addEventListener("change", () => {
    getNewCalendar()
    findToday()
    currentYear = Number(yearSelect.value)
    currentMonth = Number(monthSelect.value)
    renderMood()
})

monthSelect.addEventListener("change", () => {
    getNewCalendar()
    findToday()
    
    currentYear = Number(yearSelect.value)
    currentMonth = Number(monthSelect.value)
    renderMood()
})

forwardButton.addEventListener("click", () => {
    incrementMonth()
    findToday()
    renderMood()
})

backButton.addEventListener("click", () => {
    decrementMonth()
    findToday()
    renderMood()
})

window.addEventListener("keydown", (e) => {
    if(e.code === "ArrowLeft") {
        decrementMonth()
        renderMood()
    } else if (e.code === "ArrowRight") {
        incrementMonth() 
        renderMood()  
    }
    findToday()
})

//Initial call of findToday to show on load
findToday()

//Event Listener for grid
document.querySelector("table").addEventListener("click", (e) => {
    if (e.target.tagName === "TD" && e.target.textContent !== "") {
        const style = window.getComputedStyle(e.target)
        //Create New Data Object
        const dateData = createDateData(e.target.textContent, currentMonth, currentYear, `#${selectedColor}`)
        //Check To See if The Piece of data exists already and delete it
        data.forEach( (day, index) => {
            if (day.day === dateData.day && day.month === dateData.month && day.year === dateData.year) {
                data.splice(index, 1)
            } 
        })
        //Add new (or replace)
        data.push(dateData)
        //Re-Render
        renderMood()
        //Update local storage
        localStorage.setItem("mood", JSON.stringify(data))
    }  
})

// Get data from localstorage upon window load
window.onload = () => {
    //If local storage is empty, set an empty object
    if (localStorage.getItem("mood") === null) {
        data = []
    } else {
        data = JSON.parse(localStorage.getItem("mood"))
    }  
    renderMood()
}

//Render Colors to the page
const renderMood = () => {
    //Loop through the cells on the page
    document.querySelectorAll("td").forEach( (td) => {
        //For each cell (that isn't blank) loop through the data array and if the values match, update the bg color
        if (td.textContent !== "") {
            data.forEach( (datum) => {
                if (td.textContent === datum.day && currentMonth === datum.month && Number(currentYear) === Number(datum.year)) {
                    td.style.backgroundColor = datum.bgColor
                }
            })
            // if (td.style.backgroundColor === "blue") {
            //     td.style.color = "white"
            // }
        }    
    }) 
}

//Event for changing selected mood
moodSelect.addEventListener("change", (e) => {
    selectedColor = e.target.value
})





