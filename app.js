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
                console.log(data);
                // $('.guidebook').append(data.items[0].overview);
                console.log(data.items[0].location.latitude)
                console.log(data.items[0].location.longitude);
            }
        })
    }

    $('.submitButton').click(function() {
        searchTerm = $('#text').val()
        getInfo()
    })


var mymap = L.map('mapid').setView([51.505, -0.09], 13);



});
