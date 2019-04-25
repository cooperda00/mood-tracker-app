const createDateData = (day, month, year, color) => {
    let dayData = {
        day: day,
        month: month,
        year: year,
        bgColor: color,
    }
    return dayData
}

export {createDateData}