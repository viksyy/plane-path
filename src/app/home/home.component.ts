import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: number;
  lng: number;
  flightMarkers: any = [];
  flightPoints: any = [];
  flightPath: any = [];
  flightStoredList: any = [];
  constructor() { }

  ngOnInit() {
    this.lat = 41.996533;
    this.lng = 21.433269;
    this.loadMap();
    this.flightStoredList = ["aa","ss"]
  }

  findMyCoordinates() {
    // debugger;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // var pos = {
        // lat: position.coords.latitude,
        // lng: position.coords.longitude
        // };

        // this.map.setCenter(pos);
      }, function () {
      });
    } else {

    }
  }


  loadMap() {
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.LEFT_BOTTOM,
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.HYBRID
        ]
      },
      zoomControl: true,
      scaleControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "geometry",
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
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
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
        }
      ]
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF0000',
        fillOpacity: 0.9,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 1,
        scale: 4
      }
    });
    this.flightMarkers.push(marker);
    this.flightPoints.push({ lat: location.lat(), lng: location.lng() })
    this.flightPath.getPath().setAt(this.flightMarkers.length - 1, location);
  }

  drawPath() {
    this.flightPath = new google.maps.Polyline({
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.flightPath.setMap(this.map);
  }

  activateFlightPlan() {
    let _that = this;
    this.drawPath();
    google.maps.event.addListener(this.map, 'click', function (event) {
      _that.placeMarker(event.latLng);
    });
    this.map.setOptions({ draggableCursor: 'crosshair' })

  }

  clearFlightPlan() {
    this.flightPath.setMap(null);

    for (var i = 0; i < this.flightMarkers.length; i++) {
      this.flightMarkers[i].setMap(null);
    }
    this.flightMarkers = [];
    this.flightPoints = [];

    google.maps.event.clearListeners(this.map, 'click');
    this.map.setOptions({ draggableCursor: 'pointer' })
  }


  removeLastMarker() {
    if (this.flightMarkers.length == 1) {
      this.clearFlightPlan();
      return;
    }
    var lastIndex = this.flightMarkers.length - 1;
    this.flightMarkers[lastIndex].setMap(null);
    this.flightMarkers.splice(lastIndex, 1);
    this.flightPoints.splice(lastIndex, 1);
    this.flightPath.getPath().removeAt(lastIndex);
  }

}
