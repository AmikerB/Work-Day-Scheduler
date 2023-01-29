$(document).ready(function () {

    //////////// PAGE LAYOUT ////////////
    // date and time 
    function currentDay() {
        let currentDay = moment().format("dddd Do MMMM, YYYY, HH:mma");
        $("#currentDay").text(currentDay)
    };
    // time automatically updates every minute
    setInterval(function () {
        currentDay();
    }, 1000);


    // hour display 
    var timeValues = [];
    for (var i = 9; i <= 17; i++) {
        var hourValues = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        timeValues.push(hourValues);
    }

    let timeOut;
    var saveMessage = $("<p>").addClass("message").text("Your actvity has been saved");

    timeValues.forEach((element, index) => {
        var hourBlock = $("<div>").addClass("time-block row");
        var hour = $("<div>")
            .addClass("hour col-2")
            .text(element);
        var schedule = $("<input>")
            .addClass("scheduleInput col-8").attr("id", `input-${index}`); // input-index to ensure each element has a unique id
        var itemValue = localStorage.getItem('inputActivity' + index)
        if (itemValue) {
            schedule.val(itemValue);
        }
        var saveBtn = $("<button>")
            .addClass("saveBtn col-2")
            .html("<i class='fas fa-save'></i>");

        saveBtn.click(function () {
            localStorage.setItem('inputActivity' + index, schedule.val());

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

})



//////// TO DO ///////
// add date to each entry into local storage etc jan<>have coffee
// use splice to get rid of <> etc splice(<>)
// ahould be returned with (jan26 have coffee)
// can then compare the date to the current day and if past date delete activity
    // storedSchedule.value = "";







