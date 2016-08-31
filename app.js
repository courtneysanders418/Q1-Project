'use strict'

$(document).ready(function() {
    $('.parallax').parallax();


    var searchTerm;


    function getInfo() {
        $.ajax({
            method: 'POST',
            url: `https://serene-meadow-60538.herokuapp.com/api/crags/search/${searchTerm}`,
            datatype: 'json',
            success: function(data) {
                // console.log(data);
                // $('.guidebook').append(data.items[0].overview);
                var long = data.items[0].location.longitude;
                var lat = data.items[0].location.latitude;
                console.log(long);
                console.log(lat);
                getWeather(long,lat)
            }
        })
    }

    function getWeather(long, lat) {
        $.ajax({
            method: 'GET',
            url: `https://api.forecast.io/forecast/809a83b8b5c17d7f929dda132a82066d/${long}/${lat}`,
            datatype: 'json',
            success: function(data) {
                console.log(data);
            }
        })
    }

    $('.submitButton').click(function(e) {
        searchTerm = $('#text').val();
        getInfo();
        e.preventDefault();
    })


    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    var marker = L.marker([51.5, -0.09]).addTo(mymap);
    // var polygon = L.polygon([
    //     [51.509, -0.08],
    //     [51.503, -0.06],
    //     [51.51, -0.047]
    // ]).addTo(mymap);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3N3b29kczg4IiwiYSI6ImNpc2kzZW16bjAwMnAzMHB1bG5lNzJ0NWIifQ.qm4p6yO3ABYa_YXYXZNlpg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox://styles/mapbox/outdoors-v9',
        accessToken: 'pk.eyJ1IjoiY3N3b29kczg4IiwiYSI6ImNpc2kzZW16bjAwMnAzMHB1bG5lNzJ0NWIifQ.qm4p6yO3ABYa_YXYXZNlpg'
    }).addTo(mymap);
    $('#mapid').append(mymap)


});
