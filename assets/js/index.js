$(document).ready(function () {

    //////////// PAGE LAYOUT ////////////
    // date and time 
    let currentDate = moment().format("dddd Do MMMM, YYYY");
    $("#currentDay").text(currentDate);

    // hour display 
    let timeValues = [];

    for (let i = 9; i <= 17; i++) {
        let hourValues = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        timeValues.push(hourValues);
    }

    let timeOut;
    let saveMessage = $("<p>").addClass("message").text("Your actvity has been saved");

    timeValues.forEach((element, index) => {
        let hourBlock = $("<div>").addClass("time-block row");
        let hour = $("<div>").addClass("hour col-2").text(element);
        let schedule = $("<input>")
            .addClass("scheduleInput col-8")
            .attr("id", `input-${index}`); // input-index to ensure each element has a unique id
        let currentInputActivity = `inputActivity${index}`;

        let storedSchedule = localStorage.getItem(currentInputActivity);

        // if item does not match todays date then remove it from schedule
        if (storedSchedule) {
            // remove <>
            let splitInputActivity = storedSchedule.split("<>");
            // if the date part of string is todays date then show the activity part of string
            if (splitInputActivity[1] === currentDate) {
                schedule.val(splitInputActivity[0]);
            } else {
                // if not todays date then remove activity from local storage
                localStorage.removeItem(currentInputActivity);
            }
        }

        let saveBtn = $("<button>")
            .addClass("saveBtn col-2")
            .html("<i class='fas fa-save'></i>");

        saveBtn.click(function () {
            // saves input activty to local storage with todays date added
            localStorage.setItem(
                currentInputActivity,
                schedule.val() + "<>" + currentDate
            );

            // replaces save message with another save message if save button clicked more than once
            if (timeOut != null) {
                clearTimeout(timeOut);
            } else {
                $(".jumbotron").append(saveMessage);
            }

            // save message displays for 3 seconds
            timeOut = setTimeout(function () {
                saveMessage.remove();
                timeOut = null;
            }, 3000);
        });

        hourBlock.append(hour).append(schedule).append(saveBtn);

        $(".container").append(hourBlock);

    });

    // check if the hour is in the past present or future and assign a class
    for (let i = 0; i < timeValues.length; i++) {

        // starts at 0 so +9 (0 + 9) so that it represents 9am
        let eachHourBlock = moment().hour(i + 9);
        // input-${i} corresponds with the unique id of each element 
        let currentIndex = $(`#input-${i}`);

        if (moment().isBefore(eachHourBlock)) {
            currentIndex.addClass("future");
        } else if (moment().isAfter(eachHourBlock)) {
            currentIndex.addClass("past");
        } else {
            currentIndex.addClass("present");
        }
    }
});









