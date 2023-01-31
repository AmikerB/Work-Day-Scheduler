$(document).ready(function () {

    //////////// PAGE LAYOUT ////////////
    // date and time 
    function currentDay() {
        let currentDay = moment().format("dddd Do MMMM, YYYY");
        $("#currentDay").text(currentDay)
    };
    // time automatically updates every minute
    setInterval(function () {
        currentDay();
    }, 1000);


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
        let itemValue = localStorage.getItem(`inputActivity${index}`);
        // if item does not match todays date then remove it from schedule
        if (itemValue) {
            // remove <>
            let splitInputActivity = itemValue.split("<>");
            // if the date part of string is todays date then show the activity part of string
            if (splitInputActivity[1] === moment().format("DD-MM-YYYY")) {
                schedule.val(splitInputActivity[0]);
            } else {
                // if not todays date then remove activity from local storage
                localStorage.removeItem(`inputActivity${index}`);
            }
        }

        let saveBtn = $("<button>")
            .addClass("saveBtn col-2")
            .html("<i class='fas fa-save'></i>");

        saveBtn.click(function () {
            localStorage.setItem(
                `inputActivity${index}`,
                schedule.val() + "<>" + moment().format("DD-MM-YYYY")
            );

            if (timeOut != null) {
                clearTimeout(timeOut);
            } else {
                $(".jumbotron").append(saveMessage);
            }

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
        if (moment().isBefore(moment().hour(i + 9))) {
            // starts at 0 so +9 (0 + 9) so that it represents 9am
            $(`#input-${i}`).addClass("future");
            // input-${i} corresponds with the unique id of each element
        } else if (moment().isAfter(moment().hour(i + 9))) {
            $(`#input-${i}`).addClass("past");
        } else {
            $(`#input-${i}`).addClass("present");
        }
    }
});









