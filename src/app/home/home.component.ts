import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Flight } from '../flight-list';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialog } from './dialog/confirm-dialog';


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
  flightStoredList: Flight[] = [];
  insertedFlight: any;
  clicekdFlight: any;
  unselectButton: any;
  isMobile: any = true;
  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }

  ngOnInit() {
    if (window.innerWidth > 414) {
      this.isMobile = false;
    }
    this.lat = 41.996533;
    this.lng = 21.433269;
    this.loadMap();
    this.flightStoredList = [
      new Flight(1, 'Flight for Skopje', false, [{ lat: 41.99844661444293, lng: 21.423329739219184 },
      { lat: 41.99471501298107, lng: 21.426591305381294 },
      { lat: 41.99771306904096, lng: 21.437062649375434 },
      { lat: 42.00058341590042, lng: 21.434745220786567 }]),
      new Flight(2, 'Flight test', false, [{ lat: 41.999243936811226, lng: 21.414274601584907 },
      { lat: 41.99548048752913, lng: 21.420540241843696 },
      { lat: 41.9953848037141, lng: 21.42946663344526 },
      { lat: 41.99946718528414, lng: 21.4364618345561 },
      { lat: 42.000806659674026, lng: 21.430839924460884 }]),
      new Flight(3, 'Flight for Belgrade', false, [{ lat: 44.81878527453206, lng: 20.33899224826291 },
      { lat: 44.78273120677719, lng: 20.3383056027551 },
      { lat: 44.78053800298683, lng: 20.47185815402463 },
      { lat: 44.81805467255284, lng: 20.49829400607541 },
      { lat: 44.84167278051555, lng: 20.410060058321505 }]),
      new Flight(4, 'Flight for Skopje', false, [{ lat: 41.99844661444293, lng: 21.423329739219184 },
      { lat: 41.99471501298107, lng: 21.426591305381294 },
      { lat: 41.99771306904096, lng: 21.437062649375434 },
      { lat: 42.00058341590042, lng: 21.434745220786567 }]),
      new Flight(5, 'Flight test', false, [{ lat: 41.999243936811226, lng: 21.414274601584907 },
      { lat: 41.99548048752913, lng: 21.420540241843696 },
      { lat: 41.9953848037141, lng: 21.42946663344526 },
      { lat: 41.99946718528414, lng: 21.4364618345561 },
      { lat: 42.000806659674026, lng: 21.430839924460884 }]),
      new Flight(6, 'Flight for Belgrade', false, [{ lat: 44.81878527453206, lng: 20.33899224826291 },
      { lat: 44.78273120677719, lng: 20.3383056027551 },
      { lat: 44.78053800298683, lng: 20.47185815402463 },
      { lat: 44.81805467255284, lng: 20.49829400607541 },
      { lat: 44.84167278051555, lng: 20.410060058321505 }])
    ]
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
    this.initAutocomplete();
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
    this.insertedFlight = false;
    this.unselectButton = true;
    this.drawPath();
    google.maps.event.addListener(this.map, 'click', function (event) {
      _that.placeMarker(event.latLng);
    });
    this.map.setOptions({ draggableCursor: 'crosshair' })
    this.snackBarOpen("You can now click on map to insert the points!", "Close");
    if (this.isMobile) {
      this.closeMobileMenu();
    }
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
    this.snackBarOpen("The map is clear!", "Close");
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
    this.snackBarOpen("Last marker is removed!", "Close");
  }

  saveFlight() {
    this.openDialog(this.flightPoints);
  }

  saveTheSameFlight() {
    for (let i = 0; i < this.flightStoredList.length; i++) {
      if (this.flightStoredList[i].id == this.clicekdFlight.id) {
        this.flightStoredList[i].listOfPoints = this.flightPoints;
        this.flightStoredList[i].clicked = false;
        this.clearFlightPlan();
        this.snackBarOpen(this.clicekdFlight.title + " is changed!", "Clear");
      }

    }
  }

  openDialog(flightPoints: any) {
    let _that = this;
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: { flightName: '' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != '') {
        _that.flightStoredList.push(new Flight(_that.flightStoredList.length + 1, result, false, flightPoints))
        _that.unselectAll();
        _that.snackBarOpen("Succesfuly store the flight!", "Close");
      }
      else {
        _that.snackBarOpen("You shuld enter the name of flight!", "Close");
        _that.openDialog(flightPoints);
      }
    });
  }

  snackBarOpen(content: string, closeButton: string) {
    this.snackbar.open(content, closeButton, {
      duration: 3000
    });
  }

  insertFlightPath(flight: any) {
    if (this.flightPoints.length > 0) {
      this.clearFlightPlan();
    }
    var pathList = flight.listOfPoints;
    this.activateFlightPlan();
    this.insertedFlight = true;
    this.clicekdFlight = flight;
    for (let i = 0; i < pathList.length; i++) {
      var latLng = new google.maps.LatLng(pathList[i].lat, pathList[i].lng);
      this.placeMarker(latLng);
    }

    this.extendMapByBounds(pathList);
    if (this.isMobile) {
      this.closeMobileMenu();
    }
  }

  initAutocomplete() {
    let _that = this;
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    _that.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    _that.map.addListener('bounds_changed', function () {
      searchBox.setBounds(_that.map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      _that.map.fitBounds(bounds);
    });
  }


  extendMapByBounds(listOfPoints: any) {
    var bounds = new google.maps.LatLngBounds();
    listOfPoints.forEach(function (p) {
      let point = new google.maps.LatLng(p.lat, p.lng);
      bounds.extend(point);
    });
    this.map.fitBounds(bounds);
  }

  unselectAll() {
    this.clearFlightPlan();
    for (let k = 0; k < this.flightStoredList.length; k++) {
      this.flightStoredList[k].clicked = false;
    }
    this.snackBarOpen("The screen is clear!", "Close")
    this.unselectButton = false;
  }


  openMobileMenu() {
    (<HTMLElement>document.getElementsByClassName("home__left-pane")[0]).style.display = "block";
    (<HTMLElement>document.getElementsByClassName("home__left-pane")[0]).style.width = "100%";
    (<HTMLElement>document.getElementsByClassName("home__right-pane")[0]).style.display = "none";
  }

  closeMobileMenu() {
    (<HTMLElement>document.getElementsByClassName("home__left-pane")[0]).style.display = "none";
    (<HTMLElement>document.getElementsByClassName("home__right-pane")[0]).style.width = "100%";
    (<HTMLElement>document.getElementsByClassName("home__right-pane")[0]).style.display = "block";
  }




}
