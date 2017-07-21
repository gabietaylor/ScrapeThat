// Grab the articles as a json
$.getJSON("/article", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#article").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// Click the tag
$(document).on("click", "p", function() {
    // Empty the note from the note section
    $("#note").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/article/" + thisId
        })
        .done(function(data) {
            console.log(data);
            $("#note").append("<h2>" + data.title + "</h2>");
            $("#note").append("<input id='titleinput' name='title' >");
            $("#note").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#note").append("<button data-id='" + data._id + "' id='savenote'>Save note</button>");

            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

// Click Save
$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/article/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .done(function(data) {
            console.log(data);
            $("#note").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});