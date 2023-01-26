$(document).ready(function () {
    var currentDay = moment().format("dddd Do MMMM YYYY");
    $("#currentDay").text(currentDay);
});

// schedual Layout
for (var i = 9; i <= 17; i++) {
    var timeblock = $("<div>").addClass("time-block row");
    var hour = $("<div>")
        .addClass("hour col-2")
        .text(i + ":00");
    var schedule = $("<input>")
        .addClass("schedule col-8").attr("id", "input1")
        .attr("data-time", i);
    var saveBtn = $("<button>")
        .addClass("saveBtn col-2")
        .html("<i class='fas fa-save'></i>");

    timeblock.append(hour, schedule, saveBtn);
    $(".container").append(timeblock);

    // check if the hour is in the past present or future
    if (moment().isBefore(moment().hour(i))) {
        schedule.addClass("future");
    } else if (moment().isAfter(moment().hour(i))) {
        schedule.addClass("past");
    } else {
        schedule.addClass("present");
    }
}

// Input 
$("#saveBtn").on("click", function () {
    localStorage.setItem("input1".val());
    // display message at top of table sayng item has been saved 
})

if (localStorage.getItem("input1")) {
    $("#input1").val(localStorage.getItem("input1"));
}










