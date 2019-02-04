import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import ListThing from './ListThing.js';
import './style.css'

// This replaces the original two div's and <ol></ol>
// It dynamically adds the title of the bookshelf 
// Then lists out the books currently on that shelf using the Book.js component.
class MapThing extends Component {
  map;
      // Create a new blank array for all the listing markers.
  markers = [];

  styles = [
        {
        featureType: 'water',
        stylers: [
        {color: '#19a0db'}]
},{
  featureType: 'administrative',
  elementType: 'labels.text.stroke',
  stylers: [
        {color: '#ffffff'},
        {weight: 6}
  ]
}, {
  featureType: 'administrative',
  elementType: 'labels.text.fill',
  stylers: [
  {color: '#e85113'}]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [
  {color: '#efe934'},
  {lightness: -40}]
}, {
  featureType: 'transit.station',
  stylers: [
  {weight: 9},
  {hue: '#e85113'}]
}, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ];

  static propTypes = {
    locations: PropTypes.array.isRequired,
    
  }




/*
   *  Load google maps using ReactJS.
   *  Code reference from - https://stackoverflow.com/questions/48493960/using-google-map-in-react-component/48494032#48494032
   */
  getGoogleMaps() {
    // If we haven't already defined the promise, define it
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
        //Set yout Google Maps API key here
        const API = 'AIzaSyDktdBRgynxsyoSnHm9onezl_C2bZfch6c';
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
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }


populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.

      }


  componentDidMount() {



    this.getGoogleMaps().then((google) => {
    
         var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();



      this.map = !this.map ? new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.094920, lng: -75.264670},
          zoom: 13,
          styles: this.styles,
          mapTypeControl: false
      }) : this.map;

        var mylocations=this.props.locations;

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
            
            
            //icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          this.markers.push(marker);

          
        }

        for(var i = 0; i < this.markers.length; i++){
          this.markers[i].addListener('click', function(){
          if(this.animation === null) {
            this.setAnimation(google.maps.Animation.BOUNCE);
            /*setTimeout(function() {
        this.markers[i].setAnimation(null)
    }, 3000);*/
          } else{
            this.setAnimation(null);
          }
          });
        }

      for(var i = 0; i < this.markers.length; i++){
        this.markers[i].addListener('click', function() {
        if (largeInfowindow.marker != this) {
          largeInfowindow.marker = this;
          largeInfowindow.setContent('<div>' + this.title + '</div><div>' + this.description + '</div><div>'+this.address1+'</div>');
          largeInfowindow.open(this.map, this);
          // Make sure the marker property is cleared if the infowindow is closed.
          largeInfowindow.addListener('closeclick', function() {
            largeInfowindow.marker = null;

          });
        }
          });

        }
        

// Update Markers


    });



} //end componentDidMount

updateLocations(event){
  const nSelect = document.getElementById('locations-select');
  const nIndex = nSelect.selectedIndex;
  const topornot = nSelect[nIndex].value;
        // The following group uses the location array to create an array of markers on initialize.
  
if(event.target.value == 'top')      {
  
   for (var i = 0; i < this.props.locations.length; i++) {
    if(this.props.locations[i].top == true){
  this.markers[i].setMap(this.map);
  document.getElementById('location'+this.props.locations[i].id).style.cssText = "display:block"; 
} else{
   this.markers[i].setMap(null);
   document.getElementById('location'+this.props.locations[i].id).style.cssText = "display:none"; 
}
}
} else if(event.target.value == 'bottom'){
     for (var i = 0; i < this.props.locations.length; i++) {
    if(this.props.locations[i].top == false){
  this.markers[i].setMap(this.map);
   document.getElementById('location'+this.props.locations[i].id).style.cssText = "display:block"; 
} else{
   this.markers[i].setMap(null);
    document.getElementById('location'+this.props.locations[i].id).style.cssText = "display:none"; 
}
}

} else{
     for (var i = 0; i < this.props.locations.length; i++) {
document.getElementById('location'+this.props.locations[i].id).style.cssText = "display:block"; 
  this.markers[i].setMap(this.map);
} 
}
}



render() {


    return (

       <div>
       <div className="options-box">
          <h1>Barb's Favorite Places</h1>
          <div id="errors"></div>
                <div className="filter-options" tabIndex="0" aria-label="Filter Results">
        <h2>Filter Results</h2>
                <select id="locations-select" name="locations" onChange={this.updateLocations.bind(this)} aria-label="Select Location">
          <option value="all">All Locations</option>
          <option value="top">Top 3 Locations</option>
          <option value="bottom">Bottom 2 Locations</option>
        </select>
<ListThing locations={this.props.locations}/>
   </div>
   </div>
         <div id="map"></div>
       </div>

      )

  }

}

export default MapThing;