/////////////////////////////////////////////////////////////////////
// Create and Style the Map
/////////////////////////////////////////////////////////////////////
        var locations = [
        {id: 0, top: false, description: 'A coeducational Roman Catholic college in the Chestnut Hill section of Philadelphia, Pennsylvania within the Archdiocese of Philadelphia.', title: 'Chestnut Hill College', location: {lat:40.084420 , lng:-75.227920 }},
        {id: 1, top: true, description: "This is Barb's second home. A newer Whole Foods in the Plymouth Meeting Mall complex.", title: "Whole Foods Plymouth Meeting", location: {lat:40.113899 , lng:-75.285309 }},
        {id: 2, top: true, description: "Environmental education and conservation of largest privately-owned tract of land in Philadelphia.", title: 'The Schuylkill Center', location: {lat:40.058860 , lng:-75.244020 }},
        {id: 3, top: true, description: "Also known as the tree house, the Wissahickon Environmental Center provides environmental education to adults, children, and families, throughout Philadelphia and vicinity, through public and school and group programming.", title: 'Wissahickon Environmental Center', location: {lat:40.085860 , lng:-75.230700 }},
        {id: 4, top: false, description: "The Morris Arboretum of the University of Pennsylvania is the official arboretum of the Commonwealth of Pennsylvania.", title: 'The Morris Arboretum', location: {lat:40.090330 , lng:-75.226390 }}
        ];

        var map;
      // Create a new blank array for all the listing markers.
      var markers = [];
      function initMap() {
        var styles = [
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
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.094920, lng: -75.264670},
          zoom: 13,
          styles: styles,
          mapTypeControl: false
        });
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.

        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        var defaultIcon = makeMarkerIcon('0091ff');
        var highlightedIcon = makeMarkerIcon('FFFF24');

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          var description = locations[i].description;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
             map: map,
            position: position,
            description: description,
            title: title,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          marker.addListener('mouseover', function(){
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function(){
            this.setIcon(defaultIcon);
          });
        }

      }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div><div>' + marker.description + '</div><div>'+books.venueName+'</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }


      createPlaceHTML = (place) => {
  const li = document.createElement('li');
li.setAttribute("id", "location"+place.id);
  /*const image = document.createElement('img');
  image.className = 'location-img';
  image.src = DBHelper.imageUrlForPlace(place);
  image.alt = `${place.title}`;
  li.append(image);*/

  const name = document.createElement('h1');
  name.innerHTML = place.title;
  li.append(name);

  const top = document.createElement('p');
  if(place.top == true){
  top.innerHTML = "This is one of Barb's favorite places";
} else{
 top.innerHTML = "This is NOT one of Barb's favorite places"; 
}
  li.append(top);

    const description = document.createElement('p');
  description.innerHTML = place.description;
  li.append(description);


  //const more = document.createElement('a');
  //more.innerHTML = 'View Details';
  //more.href = DBHelper.urlForRestaurant(restaurant);
  //more.setAttribute('aria-label', `More info about ${restaurant.name}`)
  //li.append(more)

  return li
}

/////////////////////////////////////////////////////////////////////
// Dynamically fill HTML
/////////////////////////////////////////////////////////////////////
fillPlacesHTML = (places = self.places) => {
  const ul = document.getElementById('locations-list');
  places.forEach(place => {
    ul.append(createPlaceHTML(place));
  });

}

fillPlacesHTML(locations);

  // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;

updateLocations = () => {
  
    const nSelect = document.getElementById('locations-select');
  const nIndex = nSelect.selectedIndex;
  const topornot = nSelect[nIndex].value;
        // The following group uses the location array to create an array of markers on initialize.
  
if(topornot == 'top')      {
  
   for (var i = 0; i < locations.length; i++) {
    if(locations[i].top == true){
  markers[i].setMap(map);
  document.getElementById('location'+locations[i].id).style.cssText = "display:block"; 
} else{
   markers[i].setMap(null);
   document.getElementById('location'+locations[i].id).style.cssText = "display:none"; 
}
}
} else if(topornot == 'bottom'){
     for (var i = 0; i < locations.length; i++) {
    if(locations[i].top == false){
  markers[i].setMap(map);
  document.getElementById('location'+locations[i].id).style.cssText = "display:block"; 
} else{
   markers[i].setMap(null);
   document.getElementById('location'+locations[i].id).style.cssText = "display:none"; 
}
}

} else{
     for (var i = 0; i < locations.length; i++) {
document.getElementById('location'+locations[i].id).style.cssText = "display:block"; 
  markers[i].setMap(map);
} 
}

            }



search_books = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.changeBookShelf(books)
          this.setState(() => {
            return {Books: books}
          })
        } else {
          this.setState({ Books: [] })
        }
      })
    } else {
      this.setState({Books: []})
    }
  }


BooksAPI.search(val, 10).then(books).catch(err => {
  console.error(err) // not necessary, but can help you debug
  this.setState({ Books: [] })
})


