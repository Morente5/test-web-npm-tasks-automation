function loadMap() {
    initMap('#map-granada', { lat: 37.171637, lng: -3.588889 }, 'Braun Marketing & Consulting - Granada', 'https://www.google.es/maps/place/Braun+Marketing+%26+Consulting/@37.171637,-3.5910777,17z/data=!3m1!4b1!4m5!3m4!1s0xd71fcb0e2876f73:0xcfe1ba01baba8a7!8m2!3d37.171637!4d-3.588889')
    initMap('#map-marbella', { lat: 36.498222, lng: -4.798239 }, 'Braun Marketing & Consulting - Marbella', 'https://www.google.es/maps/place/Braun+Marketing+%26+Consulting/@36.49822,-4.798237,15z/data=!4m2!3m1!1s0x0:0xa8a293b9db9562e?sa=X&ved=0ahUKEwiVibG3wo3WAhUFPFAKHU5lB6EQ_BIIoAEwCg')
}

function initMap(mapSelector, position, text, url) {
    let divMap = $(mapSelector)[0]
    let initPosition = new google.maps.LatLng(position.lat, position.lng);
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
        title: text,
        map: map,
        icon: {
          url: '/img/pin.png',
          scaledSize: new google.maps.Size(48, 48), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(24, 48)
        },
        animation: google.maps.Animation.DROP
    });

    let infowindow = new google.maps.InfoWindow({
        content: `<a href="${url}" rel="nofollow" target="_blank">${text}</a>`
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}


