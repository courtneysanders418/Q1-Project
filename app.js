'use strict'

$(document).ready(function() {
    $('.parallax').parallax();


    // var space = searchTerm.replace(/' '/g, '%20');


    $('.submitButton').click(function(e) {
        e.preventDefault();

        getInfo();
    })


    function getInfo() {
      var searchTerm = $('#text').val();
      console.log( "search" + searchTerm);
      var encoded = encodeURIComponent(searchTerm)
        console.log("encoded" + encoded);
        $.ajax({
            method: 'POST',
            url: `https://serene-meadow-60538.herokuapp.com/api/crags/search/${encoded}`,
            datatype: 'json',
            success: function(data) {
                if(!data.items.length){
                  Materialize.toast('please enter another search term')
                }
                var long = data.items[0].location.longitude;
                var lat = data.items[0].location.latitude;
                console.log(data);
                // console.log(lat);

                $.ajax({
                    method: 'GET',
                    url: `https://api.forecast.io/forecast/809a83b8b5c17d7f929dda132a82066d/${lat},${long}`,
                    datatype: 'json',
                    success: function(data) {
                        console.log(data);
                    }
                })
            },
            error: function (err) {
              console.log('there was an error:',err);

            }
        })
    }

    function getWeather(long, lat) {

    }

    L.mapbox.accessToken = 'pk.eyJ1IjoiY3N3b29kczg4IiwiYSI6ImNpc2kzZW16bjAwMnAzMHB1bG5lNzJ0NWIifQ.qm4p6yO3ABYa_YXYXZNlpg';
    var mymap = L.mapbox.map('mapid', 'mapbox.streets');
    .setView([40, -75], 9);
    L.control.locate().addTo(mymap);




});
