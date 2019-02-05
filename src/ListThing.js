import React, { Component } from "react";
import { PropTypes } from "prop-types";
import "./style.css";

class ListThing extends Component {
  state = {
    arrayListFinal: []
  };

  static propTypes = {
    locations: PropTypes.array.isRequired,
    markers: PropTypes.array.isRequired
  };

  componentDidMount() {
    var arrayList = [];

    try {
      // This calls the FourSquare API to get the addresses of the five locations in the locations list.
      this.props.locations.forEach((location, i) => {
        fetch(
          "https://api.foursquare.com/v2/venues/search" +
            "?client_id=AN1EQZ2DUPRF3Y5VIR5NBO20OSXVJ4R3DIX3YD2R0LJHSPIT" +
            "&client_secret=YXBZRDLZ2ZE5FGZXNI2TWJ5VAH4IITYJDVLK3LMCJ50FJINW" +
            "&v=20181201&ll=" +
            location.ll.lat +
            "," +
            location.ll.lng +
            "&limit=5"
        )
          .then(res => res.json())
          .then(data => {
            arrayList.push({
              id: location.id,
              address: data.response.venues[0].location.address,
              city: data.response.venues[0].location.city,
              state: data.response.venues[0].location.state
            });
            this.setState({ arrayListFinal: arrayList });
          });
      });
    } catch (err) {
      document.getElementById("errors").innerHTML =
        "Error: The FourSquare API failed to load";
    }
  }

  // Could this have been done more efficiently? Yes. I ran out of time though!
  // So it is three separate functions - one for extracting the address, one for the city, and one for the state
  // from the arrayListFinal item in state.


  getAddress(placeid) {
    for (var i = 0; i < this.state.arrayListFinal.length; i++) {
      if (this.state.arrayListFinal[i].id === placeid) {
        return this.state.arrayListFinal[i].address;
      }
    }
  }

  getCity(placeid) {
    for (var i = 0; i < this.state.arrayListFinal.length; i++) {
      if (this.state.arrayListFinal[i].id === placeid) {
        return this.state.arrayListFinal[i].city;
      }
    }
  }

  getState(placeid) {
    for (var i = 0; i < this.state.arrayListFinal.length; i++) {
      if (this.state.arrayListFinal[i].id === placeid) {
        return this.state.arrayListFinal[i].state;
      }
    }
  }



  // list out the locations to the left of the screen.
  render() {
    return (
      <div>
        <ul id="locations-list" tabIndex="0" aria-label="Locations List">
          {this.props.locations.map(place => (
            <li key={place.id} id={"location" + place.id}>
              <h3>{place.title} </h3>
              <p>{place.description}</p>
              <h4>
                <strong>Address from FourSquare:</strong>
              </h4>
              <h4>{this.getAddress(place.id)}</h4>
              <h4>
                {this.getCity(place.id)}, {this.getState(place.id)}
              </h4>
              <button id={"button"+place.id} >Select</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListThing;
