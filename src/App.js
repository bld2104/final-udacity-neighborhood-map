import React, { Component } from "react";
import MapThing from "./FourSquare.js";
import "./style.css";

// Hard code the locations and initialize the component.
class App extends Component {
  state = {
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
    ]
  };

  // I did not wind up putting anything in this. I realize now that maybe I didn't even need to separate out this main component
  // from the MapThing one.
  componentDidMount() {}

  render() {
    return (
      <div>
        <MapThing locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
