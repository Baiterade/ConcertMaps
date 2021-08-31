// Set current day

$("#currentDay").append(moment().format("MMM Do"));

// Generate time blocks

var times = ["10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm"];

// Generate a time block for each hour, 9am-5pm

var currentHourActual = moment().format("h a");
console.log(currentHourActual);

for (i = 0; i < times.length; i++) {

    // Create Block

    var currentTimeBlock = $("<li>");
    $(currentTimeBlock).addClass("d-flex flex-row m-3 border rounded");

    // Create column displaying hour

    var currentHour = document.createElement("div");
    $(currentHour).addClass("currentHourEl flex-col border p-3");

    currentHour.textContent = times[i];

    $(currentTimeBlock).append(currentHour);

    // Column for text input

    var textField = $("<input>");
    $(textField).addClass("textFieldEl flex-col flex-grow-1 border p-3");

    // If data exists in local storage, retrieve and display it.

    if (localStorage.getItem(times[i])) {
        textField.val(localStorage.getItem(times[i]));
    }

    $(currentTimeBlock).append(textField);

    // Column for save button

    var saveBtn = $("<button>");
    $(saveBtn).addClass("saveButtonEl flex-col border p-3");
    $(saveBtn).text("Save");

    $(currentTimeBlock).append(saveBtn);

    // Color each block based on past, present, or future status

    if (times[i] === currentHourActual) {
        currentTimeBlock.addClass("bg-warning");
    } else if (times[i] < currentHourActual) {
        currentTimeBlock.addClass("bg-secondary");
    } else {
        currentTimeBlock.addClass("bg-primary");
    }

    $(".container").append(currentTimeBlock);

}

//Function: When the save button is clicked on a time block, 
//the text field content is saved in local storage.

$(".saveButtonEl").click(function () {
    localStorage.setItem($(this).siblings(".currentHourEl").text(), $(this).siblings(".textFieldEl").val());
    alert("Click 'OK' to save content for " + $(this).siblings(".currentHourEl").text() + "!");
});