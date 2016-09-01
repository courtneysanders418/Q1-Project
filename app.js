'use strict'

$(document).ready(function() {
    // map
    L.mapbox.accessToken = 'pk.eyJ1IjoiY3N3b29kczg4IiwiYSI6ImNpc2kzZW16bjAwMnAzMHB1bG5lNzJ0NWIifQ.qm4p6yO3ABYa_YXYXZNlpg'
    var map = L.mapbox.map('map', 'mapbox.streets')
    L.control.locate().addTo(map)

    // Search Icon toggles back and forth between maps/weather and parralax
    $('#reSearch').click(function() {
        $('#index-banner').toggle()
    })

    $('.myInput').keypress(function(event) {
            if (event.which == 13) {
                event.preventDefault()
                getInfo()
            }
        })

        // Api communication
    function getInfo() {
        var lat
        var long
        var searchTerm = $('.myInput').val()
        var encoded = encodeURIComponent(searchTerm)

        // island.io API
        $.ajax({
            method: 'POST',
            url: `https://serene-meadow-60538.herokuapp.com/api/crags/search/${encoded}`,
            datatype: 'json',
            success: function(data) {
                if (!data.items.length) {
                    Materialize.toast('Location not found', 3000)
                }
                long = data.items[0].location.longitude
                lat = data.items[0].location.latitude

                // Initalizing map and giving access to current location
                map.setView([lat, long], 9)
                L.marker([lat, long]).bindPopup(`This is ${searchTerm}`).addTo(map)

                // display weather
                $('#index-banner').hide()
                $('#weatherDiv').html(`<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="https://forecast.io/embed/#lat=${lat}&lon=${long}&name=${searchTerm}&color=#00aaff&font=Georgia&units=uk"></iframe>`)
            },
            error: function(err) {
                console.log('there was an error:', err)
            }
        })
    }
    // parralax
    $('.parallax').parallax()
})
