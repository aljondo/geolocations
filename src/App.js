import React from 'react';
import $ from 'jquery';
import addToTopFiveInOrder from './utils/addToTopFiveInOrder';
import GeoLocationCard from './GeoLocationCard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      topFiveGeo: []
    }

    this.url = "https://app.wordstream.com/services/v1/wordstream/interview_data";
    this.removeCard = this.removeCard.bind(this);
  }

  componentDidMount() {
    this.getTopFiveGeo();
  }

  getTopFiveGeo() {
    $.get(this.url, response => {
      const geoLocationSums = {
        cities: [],
        zips: [],
        regions: [],
        countries: [],
      };
      response.data.forEach(r => {
        const geo = r.targeting['geo_locations'];
        if(geo) {
          const geoKey = Object.keys(geo).find(k => k !== 'location_types');
          geo[geoKey].forEach(g => {
            const key = geoKey === "countries" ? g : g.key;
            const existingKey = geoLocationSums[geoKey].find(gObj => gObj.key === key);
            if(existingKey) {
              existingKey.sum ++;
            }
            else {
              geoLocationSums[geoKey].push({
                key,
                geoKey,
                geoObject: g,
                sum: 1
              });
            }
          })
        }
      });
      let topFiveGeo = [];
      for(const geoKey in geoLocationSums) {
        geoLocationSums[geoKey].forEach(gObj => {
          topFiveGeo = addToTopFiveInOrder(gObj, topFiveGeo);
        })
      }
      this.setState({ topFiveGeo });
    })   
  }

  removeCard(key) {
    const { topFiveGeo } = this.state;
    const newCards = topFiveGeo.filter(g => {
      return g.key !== key;
    });
    this.setState({ topFiveGeo: newCards });
  }

  render() {
    const { topFiveGeo } = this.state;
    return (
      <div>
        {topFiveGeo.map((gObj, i) => 
          (<GeoLocationCard 
              geoObj={gObj}
              removeCard={this.removeCard}
              key={i}
            />)
        )}
      </div>
    )
  }  
}

export default App;