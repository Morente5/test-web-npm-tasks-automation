function loadMap() {
    initMap(37.171204, -3.598550)
}

function initMap(lat, lng) {
    let divMap = $("#map")[0]
    let initPosition = new google.maps.LatLng(37.1715711, -3.5888382);
    let coords = [initPosition];
    let map = new google.maps.Map(divMap, {
        center: new google.maps.LatLng(37.1717038, -3.5937112),//initPosition,
        zoom: 15,
        disableDefaultUI: false,//true,
        styles:
        [
            {
                "featureType": "all",
                "stylers": [
                    {
                        "saturation": 0
                    },
                    {
                        "hue": "#e7ecf0"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "saturation": -70
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": -60
                    }
                ]
            }
        ]
    });

    let marker = new google.maps.Marker({
        position: initPosition,
        title: '#' + coords.length,
        map: map,
        //icon: 'resources/marker.png',
        animation: google.maps.Animation.DROP
    });
}


