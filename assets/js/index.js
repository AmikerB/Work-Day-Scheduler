$(document).ready(function () {

    // date and time
    let currentDay = moment().format("dddd Do MMMM, YYYY, HH:mma");
    $("#currentDay").text(currentDay);
});

// schedual Layout
function pastPresentOrFuture() {
    // check if the hour is in the past present or future
    if (moment().isBefore(moment().hour(i))) {
        schedule.addClass("future");
    } else if (moment().isAfter(moment().hour(i))) {
        schedule.addClass("past");
    } else {
        schedule.addClass("present");
    }
}

for (var i = 9; i <= 17; i++) {
    var timeblock = $("<div>").addClass("time-block row");
    var hour = $("<div>")
        .addClass("hour col-2")
        .text(moment(i, "H").format("HHa"));
    var schedule = $("<input>")
        .addClass("scheduleInput col-8").attr("id", "input1")
        .attr("data-time", i);
    var saveBtn = $("<button>")
        .addClass("saveBtn col-2")
        .html("<i class='fas fa-save'></i>");

    timeblock.append(hour, schedule, saveBtn);
    $(".container").append(timeblock);

    console.log(hour);

    pastPresentOrFuture();
}


function saveMessage() {
    // item has been saved message
    let saveMessage = document.createElement("p");
    saveMessage.text("Your activity has been saved");
    saveMessage.classList.add("message", "saved");
    CSSContainerRule.appendChild(saveMessage);

    setTimeout(function () {
        saveMessage.style.display = "none";
    }, 2000);
}


// Save to local storage 
$("#saveBtn").on("click", function () {

    if (schedule === "") {
        return;
    }

    let scheduleString = localStorage.getItem("storedSchedule");

    let storedSchedule;

    if (scheduleString === null) {
        storedSchedule = [];
    } else {
        storedSchedule = JSON.parse(scheduleString);
    }

    let schedualObject = {
        time: hour,
        schedule: scheduleInput
    };

    storedSchedule.push(schedualObject);

    localStorage.setItem("storedSchedule", JSON.stringify(storedSchedule));

    saveMessage();
})





// use .trim() so it gets rid of spaces and stores as a neat string

// delete after ech day
    // storedSchedule.value = "";

//////// ISSUES ///////

// after 12pm it 13pm 14pm and so on
// display a message at top of screen saying item has been saved
// save items to local storage
// delete items at end of the day








