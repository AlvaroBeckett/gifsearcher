$(document).ready(function () {
    var apiKey = "BnfsRo680bLfU04NsZQU5KmbZRGSRjVC";

    var places = ["Cuba", "Bahamas", "New York", "Paris", "Italy", "Thailand", "Florida"];

    function displayGifs() {
        var chosenGif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenGif + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                var still = response.data[i].images.fixed_height_still.url;
                var animated = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;
                var imageDiv = `
                <div class = "img-container">
                    <p>Rating: ${rating.toUpperCase()}</p>
                    <img src="${still}" class="giphy-gifs" data-still="${still}" data-animate="${animated}" data-state="still"/>
                </div>`;
                console.log(still);
                $(".gifs-display").prepend(imageDiv)
            }
            message();
        });
    }

    function createButtons() {

        $("#buttons-view").empty();


        for (var i = 0; i < places.length; i++) {

            var a = $("<button>");
            a.addClass("gif-btn");
            a.attr("data-name", places[i]);
            a.text(places[i]);

            $("#buttons-view").append(a);
        }
    }


    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        var topic = $("#topic-input").val().trim();

        places.push(topic);

        createButtons();
    });

    $(document).on("click", ".gif-btn", displayGifs);

    $(document).on("click", ".giphy-gifs", function (event) {
        event.preventDefault();
        var state = $(this).attr('data-state');
        console.log(state)

        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate')
        }

        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still')
        };
    });
    
    function message() {
        if ($('.gifs-display').is(':empty')){ 
            $("#message").html("<p>Choose a category above or add your own!</p>")
        }
        else {
            $("#message").html("<p>Click on a GIF to animate!</p>")
        }
        };

    createButtons();

    message();

});