let map;
let marker;
let watchId;
let tracking = false;

function initMap() {
    // Initialize map centered on a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco as default
        zoom: 10
    });
}

function startTracking() {
    if (navigator.geolocation) {
        tracking = true;
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // Update map center and marker
                map.setCenter(pos);
                if (marker) {
                    marker.setPosition(pos);
                } else {
                    marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: 'Your Location'
                    });
                }
                console.log('Location updated:', pos);
            },
            (error) => {
                console.error('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function stopTracking() {
    if (tracking) {
        navigator.geolocation.clearWatch(watchId);
        tracking = false;
        if (marker) {
            marker.setMap(null);
            marker = null;
        }
        console.log('Tracking stopped');
    }
}

document.getElementById('start').addEventListener('click', startTracking);
document.getElementById('stop').addEventListener('click', stopTracking);

// Initialize map on load
window.onload = initMap;