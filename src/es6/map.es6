function loadMap() {
    initMap(37.171204, -3.598550)
}

function initMap(lat, lng) {
    let divMap = $("#map")[0]
    let initPosition = new google.maps.LatLng(37.1715711, -3.5888382);
    let coords = [initPosition];
    let map = new google.maps.Map(divMap, {
        center: initPosition,
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
        icon: {
          url: '/img/favicon.ico',
          scaledSize: new google.maps.Size(32, 32), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(16, 32)
        },
        animation: google.maps.Animation.DROP
    });
}


