let map;
let marker;
let geocoder;

function initMap() {
    var utd = new google.maps.LatLng(32.985771, -96.750003);
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: utd,
        mapTypeControl: true,
    });
    geocoder = new google.maps.Geocoder();

    const inputText = document.createElement("input");

    inputText.type = "text";
    inputText.placeholder = "UTD";

    const submitButton = document.createElement("input");

    submitButton.type = "button";
    submitButton.value = "Search";
    submitButton.classList.add("button", "button-primary");

    const clearButton = document.createElement("input");

    clearButton.type = "button";
    clearButton.value = "Clear";
    clearButton.classList.add("button", "button-secondary");

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    marker = new google.maps.Marker({
        map,
    });
    submitButton.addEventListener("click", () =>
        geocode({ address: inputText.value })
    );
    clearButton.addEventListener("click", () => {
        clear();
    });
    clear();
}

function clear() {
    marker.setMap(null);
}

function geocode(request) {
    clear();
    geocoder
        .geocode(request)
        .then((result) => {
            const { results } = result;

            map.setCenter(results[0].geometry.location);

            var request = {
                location: results[0].geometry.location,
                radius: '1500',
                type: ['hospital']
            };

            nearbySearch(request);
        })
        .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
        });
}

function nearbySearch(request) {
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            new google.maps.Marker({
                map,
                title: results[i].name,
                position: results[i].geometry.location,
            });
        }
    }
}