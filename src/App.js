import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MapThing from './FourSquare.js';
import ListThing from './ListThing.js';
import './style.css'



class FourSquare extends React.Component {
  state = { 
    locations: [
        {id: 0, top: false, description: 'A coeducational Roman Catholic college in the Chestnut Hill section of Philadelphia, Pennsylvania within the Archdiocese of Philadelphia.', title: 'Chestnut Hill College', ll: {lat:40.084420 , lng:-75.227920 }},
        {id: 1, top: true, description: "This is Barb's second home. A newer Whole Foods in the Plymouth Meeting Mall complex.", title: "Whole Foods Plymouth Meeting", ll: {lat:40.113899 , lng:-75.285309 }},
        {id: 2, top: true, description: "Environmental education and conservation of largest privately-owned tract of land in Philadelphia.", title: 'The Schuylkill Center', ll: {lat:40.058860 , lng:-75.244020 }},
        {id: 3, top: true, description: "Also known as the tree house, the Wissahickon Environmental Center provides environmental education to adults, children, and families, throughout Philadelphia and vicinity, through public and school and group programming.", title: 'Wissahickon Environmental Center', ll: {lat:40.085860 , lng:-75.230700 }},
        {id: 4, top: false, description: "The Morris Arboretum of the University of Pennsylvania is the official arboretum of the Commonwealth of Pennsylvania.", title: 'The Morris Arboretum', ll: {lat:40.090330 , lng:-75.226390 }}
        ]

   }


//location: {lat:40.084420 , lng:-75.227920 }
  componentDidMount() {


    //fetch(api).then(response => this.setState({ data: response.data)).catch()
 }


 

render() {
    return (

    <div>
    
      
        <MapThing locations={this.state.locations} />
      
      </div>
    )
  }
}


export default FourSquare