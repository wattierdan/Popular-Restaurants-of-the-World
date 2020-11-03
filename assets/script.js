//zomato variables
//var zomatoURL = "https://developers.zomato.com/api/v2.1/search?count=10$"
//var zomatoKey = "121bbb71dd9ca77169dfb8af142d6e46"


var mapsURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" 
var GoogleKey = "&key=AIzaSyDuD7uhRf2B88H4rdS3LPR7JYbZSUlQnCI"
//globally declaring variables for user inputs of location and food type
var aPlace = ""
var foodType = ""
//starting lat and lng is sacramento we can change to user location later on
var latitude = 38.5816
var longitude = -121.4944
//globally delcaring variable
var infoWindow


//map loads
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: latitude, lng: longitude},
        zoom: 13
    });

    //creates search params
    var request = {
        location: {lat: latitude, lng: longitude},
        radius: '8000',
        type: ['restaurant'],
        keyword: foodType,
        rating: 5
    };
    console.log(request)
    infoWindow = new google.maps.InfoWindow()
    
    var service = new google.maps.places.PlacesService(map)
      service.nearbySearch(request, callback)
      
    //returns all results and creates maker for that result
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        }
    }

    //creates a new marker 
    function createMarker(place) {
        var placeLoc = place.geometry.location 
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        })
        //when a marker is clicked
        google.maps.event.addListener(marker, 'click', function(){
            //console logs place object
            console.log(place)
            //display name of this resaurant
            infoWindow.setContent(place.name + "<p>this is a place to display all info about a resaurant</p>")
            infoWindow.open(map, this)
        })
    }

}

//on click user input geocoded and latidtude and longitude variables reset
$('#search').on('click', function(e){
    e.preventDefault()
    console.log(latitude, longitude)
    aPlace = $('#location').val().trim()
    foodType = $('#foodType').val().trim()
    $.ajax({
        url: mapsURL + aPlace + GoogleKey,
        method: "get"
    }).then(function(response) {
        latitude = response.results[0].geometry.location.lat
        longitude = response.results[0].geometry.location.lng
    //updates map with new lat lng and new markers
    initMap()
    });








/*
zomato function
setTimeout(function(){
    var locSearch =  "&lat=" + latitude + "&lon=" + longitude

var wholeURL = zomatoURL + locSearch
console.log(locSearch)
$.ajax({
    url: zomatoURL + locSearch,
    method: "get",
    headers: {
        "user-key": zomatoKey
      }
}).then(function(response) {
    console.log(latitude, longitude)   
for (var i = 0; i < response.restaurants.length; i++){
    console.log(response.restaurants[i].restaurant.name)
    console.log("lat: " + response.restaurants[i].restaurant.location.latitude + 
    " lng: " + response.restaurants[i].restaurant.location.longitude)  
}
});
}, 1000)
*/
});






