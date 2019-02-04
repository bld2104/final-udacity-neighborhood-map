import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import MapThing from './FourSquare.js';
import './style.css'

// This replaces the original two div's and <ol></ol>
// It dynamically adds the title of the bookshelf 
// Then lists out the books currently on that shelf using the Book.js component.
class ListThing extends Component {
   state = { 
    arrayListFinal: [        ],

   }


  static propTypes = {
    locations: PropTypes.array.isRequired,
  }



  componentDidMount() {
var arrayList = [];

try {
this.props.locations.forEach((location, i) => {
fetch('https://api.foursquare.com/v2/venues/search' +
          '?client_id=AN1EQZ2DUPRF3Y5VIR5NBO20OSXVJ4R3DIX3YD2R0LJHSPIT' +
          '&client_secret=YXBZRDLZ2ZE5FGZXNI2TWJ5VAH4IITYJDVLK3LMCJ50FJINW' +
          '&v=20181201&ll='+location.ll.lat+','+location.ll.lng+'&limit=5').then(res => res.json()).then((data) => {
            arrayList.push({id: location.id, address: data.response.venues[i].location.formattedAddress})
this.setState({arrayListFinal  : arrayList})
  });
});
}
catch(err) {
  document.getElementById("errors").innerHTML = "Error: The FourSquare API failed to load";
}




}




getAddress(placeid){
  
  for (var i = 0; i < this.state.arrayListFinal.length; i++) {
    if(this.state.arrayListFinal[i].id==placeid){
      return this.state.arrayListFinal[i].address
    } 

  }
}




render() {


    return (

<div>


 <ul id="locations-list" tabIndex="0" aria-label="Locations List">
  {this.props.locations.map(place => 
   <li key={place.id} id={'location'+place.id}>
   <h3>{place.title} </h3>
<p>{place.description}</p>
<h4><strong>Address from FourSqure:</strong></h4>
<h4>{this.getAddress(place.id)}</h4>

</li>

  
  )}
  </ul>
  </div>

      )

  }

}

export default ListThing;