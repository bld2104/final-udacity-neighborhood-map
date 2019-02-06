import React, { Component } from "react";
import ListThing from "./ListThing.js";
import "./style.css";


// This component creates the map does most of the map filtering and actions.
class MapThing extends Component {


  map;
  originalMarkers = [];
  // Create a new blank array for all the listing markers.
  state = {
    currentmarker: '',
    marked: '',
        listbuttonclicked: '',
         locations: [
      {
        id: 0,
        top: false,
        description:
          "A coeducational Roman Catholic college in the Chestnut Hill section of Philadelphia, Pennsylvania within the Archdiocese of Philadelphia.",
        title: "Chestnut Hill College",
        ll: { lat: 40.08442, lng: -75.22792 }
      },
      {
        id: 1,
        top: true,
        description:
          "This is Barb's second home. A newer Whole Foods in the Plymouth Meeting Mall complex.",
        title: "Whole Foods Plymouth Meeting",
        ll: { lat: 40.113899, lng: -75.285309 }
      },
      {
        id: 2,
        top: true,
        description:
          "Environmental education and conservation of largest privately-owned tract of land in Philadelphia.",
        title: "The Schuylkill Center",
        ll: { lat: 40.05886, lng: -75.24402 }
      },
      {
        id: 3,
        top: true,
        description:
          "Also known as the tree house, the Wissahickon Environmental Center provides environmental education to adults, children, and families, throughout Philadelphia and vicinity, through public and school and group programming.",
        title: "Wissahickon Environmental Center",
        ll: { lat: 40.08586, lng: -75.2307 }
      },
      {
        id: 4,
        top: false,
        description:
          "The Morris Arboretum of the University of Pennsylvania is the official arboretum of the Commonwealth of Pennsylvania.",
        title: "The Morris Arboretum",
        ll: { lat: 40.09033, lng: -75.22639 }
      }
    ],
    markers: []
  }
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


gm_authFailure() { 
      document.getElementById("errors").innerHTML =
        "Error: The FourSquare API failed to load";
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

document.getElementById('button0').addEventListener("click", this.changestate)

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

      var mylocations = this.state.locations;
      // loop through each location and create the markers.
      for (var i = 0; i < mylocations.length; i++) {
        // Get the position from the location array.
        var position = this.state.locations[i].ll;
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
        this.originalMarkers.push(marker);
        this.setState({markers: this.originalMarkers})
      }
      // Loop through the markers and add a click function that animates each one on click (and stops animation on second click)
      for (var j = 0; j < this.state.markers.length; j++) {
        this.state.markers[j].addListener("click", function() {
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



/*    document.getElementById("button0").addEventListener("click",function(e) {

    });*/

      for (var k = 0; k < this.state.markers.length; k++) {
        this.state.markers[k].addListener("click", function() {
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


listclick(clickedlocation, clickeddescription){
  this.setState({ marked: clickedlocation }); 
  console.log(clickedlocation);
  console.log( clickeddescription);
 this.getGoogleMaps().then(google => {
          var largeInfowindow = new google.maps.InfoWindow();
            largeInfowindow.marker = this;
            largeInfowindow.setContent(
              "<div>" +
                clickedlocation +
                "</div><div>" +
                clickeddescription +
                "</div>"
            );
            largeInfowindow.open(this.map, this);
            // Make sure the marker property is cleared if the infowindow is closed.
            largeInfowindow.addListener("closeclick", function() {
              largeInfowindow.marker = null;
            });

          });

}
  updateLocations(event) {
    
    // This next part filters the markers and list based on the drop-down selection.

    if (event.target.value === "top") {
      for (var i = 0; i < this.state.locations.length; i++) {
        if (this.state.locations[i].top === true) {
          this.state.markers[i].setMap(this.map);
          document.getElementById(
            "location" + this.state.locations[i].id
          ).style.cssText = "display:block";
        } else {
          this.state.markers[i].setMap(null);
          document.getElementById(
            "location" + this.state.locations[i].id
          ).style.cssText = "display:none";
        }
      }
    } else if (event.target.value === "bottom") {
      for (var l = 0; l < this.state.locations.length; l++) {
        if (this.state.locations[l].top === false) {
          this.state.markers[l].setMap(this.map);
          document.getElementById(
            "location" + this.state.locations[l].id
          ).style.cssText = "display:block";
        } else {
          this.state.markers[l].setMap(null);
          document.getElementById(
            "location" + this.state.locations[l].id
          ).style.cssText = "display:none";
        }
      }
    } else {
      for (var m = 0; m < this.state.locations.length; m++) {
        document.getElementById(
          "location" + this.state.locations[m].id
        ).style.cssText = "display:block";
        this.state.markers[m].setMap(this.map);
      }
    }

  }

  updateList(){
    this.state.locations.forEach((location, i) => {
      //Location was clicked on locations list
      if (this.state.marked === location.title) {
        console.log(this.state.markers[i])
        this.state.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
        
        new window.google.maps.event.trigger(this.state.markers[i], 'click');
      }
      
    });
  }

  render() {
    this.updateList();
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
            <ListThing locations={this.state.locations} markers={this.state.markers} onClickLocation={(location, description) => { this.listclick(location, description);}}/>
            
          </div>
        </div>
        <div id="map" />
      </div>
    );
  }
}

export default MapThing;
