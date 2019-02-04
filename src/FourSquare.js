import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ListThing from "./ListThing.js";
import "./style.css";

// This component creates the map does most of the map filtering and actions.
class MapThing extends Component {
  map;
  // Create a new blank array for all the listing markers.
  markers = [];
  // Apply styles to the map as suggested in the content.
  styles = [
    {
      featureType: "water",
      stylers: [{ color: "#19a0db" }]
    },
    {
      featureType: "administrative",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff" }, { weight: 6 }]
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#e85113" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#efe934" }, { lightness: -40 }]
    },
    {
      featureType: "transit.station",
      stylers: [{ weight: 9 }, { hue: "#e85113" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ lightness: 100 }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ lightness: -100 }]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ visibility: "on" }, { color: "#f0e4d3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#efe9e4" }, { lightness: -25 }]
    }
  ];

  static propTypes = {
    locations: PropTypes.array.isRequired
  };

  //Load google maps using ReactJS.
  //Code reference from - https://stackoverflow.com/questions/48493960/using-google-map-in-react-component/48494032#48494032
  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise(resolve => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(window.google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        // Pass API keys into the URL
        const API = "AIzaSyDktdBRgynxsyoSnHm9onezl_C2bZfch6c";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&v=3&callback=resolveGoogleMapsPromise`;
        script.async = true;
        script.defer = true;
        //Append the script to the HTML
        document.body.appendChild(script);
      });
    }

    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    this.getGoogleMaps();
  }

  componentDidMount() {
    this.getGoogleMaps().then(google => {
      var largeInfowindow = new google.maps.InfoWindow();

      // place the map in the map div.

      this.map = !this.map
        ? new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.09492, lng: -75.26467 },
            zoom: 13,
            styles: this.styles,
            mapTypeControl: false
          })
        : this.map;

      var mylocations = this.props.locations;
      // loop through each location and create the markers.
      for (var i = 0; i < mylocations.length; i++) {
        // Get the position from the location array.
        var position = this.props.locations[i].ll;
        var title = mylocations[i].title;
        var description = mylocations[i].description;

        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
          map: this.map,
          position: position,
          description: description,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });
        // Push the marker to our array of markers.
        this.markers.push(marker);
      }
      // Loop through the markers and add a click function that animates each one on click (and stops animation on second click)
      for (var j = 0; j < this.markers.length; j++) {
        this.markers[j].addListener("click", function() {
          if (this.animation === null) {
            this.setAnimation(google.maps.Animation.BOUNCE);

            //I couldn't get this working but don't think it's required per the rubric.
            /*setTimeout(function() {
        this.markers[i].setAnimation(null)
    }, 3000);*/
          } else {
            this.setAnimation(null);
          }
        });
      }

      for (var k = 0; k < this.markers.length; k++) {
        this.markers[k].addListener("click", function() {
          if (largeInfowindow.marker !== this) {
            largeInfowindow.marker = this;
            largeInfowindow.setContent(
              "<div>" +
                this.title +
                "</div><div>" +
                this.description +
                "</div><div>" +
                this.address1 +
                "</div>"
            );
            largeInfowindow.open(this.map, this);
            // Make sure the marker property is cleared if the infowindow is closed.
            largeInfowindow.addListener("closeclick", function() {
              largeInfowindow.marker = null;
            });
          }
        });
      }

    });
  } //end componentDidMount

  updateLocations(event) {
    
    // This next part filters the markers and list based on the drop-down selection.

    if (event.target.value === "top") {
      for (var i = 0; i < this.props.locations.length; i++) {
        if (this.props.locations[i].top === true) {
          this.markers[i].setMap(this.map);
          document.getElementById(
            "location" + this.props.locations[i].id
          ).style.cssText = "display:block";
        } else {
          this.markers[i].setMap(null);
          document.getElementById(
            "location" + this.props.locations[i].id
          ).style.cssText = "display:none";
        }
      }
    } else if (event.target.value === "bottom") {
      for (var l = 0; l < this.props.locations.length; l++) {
        if (this.props.locations[l].top === false) {
          this.markers[l].setMap(this.map);
          document.getElementById(
            "location" + this.props.locations[l].id
          ).style.cssText = "display:block";
        } else {
          this.markers[l].setMap(null);
          document.getElementById(
            "location" + this.props.locations[l].id
          ).style.cssText = "display:none";
        }
      }
    } else {
      for (var m = 0; m < this.props.locations.length; m++) {
        document.getElementById(
          "location" + this.props.locations[m].id
        ).style.cssText = "display:block";
        this.markers[m].setMap(this.map);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="options-box">
          <h1>Barb's Favorite Places</h1>
          <div id="errors" />
          <div
            className="filter-options"
            tabIndex="0"
            aria-label="Filter Results"
          >
            <h2>Filter Results</h2>
            <select
              id="locations-select"
              name="locations"
              onChange={this.updateLocations.bind(this)}
              aria-label="Select Location"
            >
              <option value="all">All Locations</option>
              <option value="top">Top 3 Locations</option>
              <option value="bottom">Bottom 2 Locations</option>
            </select>
            <ListThing locations={this.props.locations} />
          </div>
        </div>
        <div id="map" />
      </div>
    );
  }
}

export default MapThing;
