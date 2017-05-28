import React from 'react'
import './GMap.css'

const createMap = (params, result) => {
  console.log('createMap params.elt: %O', params.elt);
  console.log('center: %O', params.options.center);
  let map = new window.google.maps.Map(params.elt, params.options);
  result.map = map; // set the 'map' variable in the component variables
  // asynchronous, cannot return a result
}

const waitForMapLibrary = (callback, mapparams, mapres) => {
    if (window.google && window.google.maps && window.google.maps.Map) {
     console.log('waitForMapLibrary library loaded, calling callback');
     callback(mapparams, mapres);
     return;
    }
    console.log('waitForMapLibrary waiting for window.google.maps.Map');
    // check every 10 ms for Google Map library loaded
    setTimeout(waitForMapLibrary, 10, callback, mapparams, mapres);
  }

class MapPanel extends React.Component {
  // props in: lat, lng, zoom
  // createMap params in & result out
  mapParams = {elt: null, options: {}}; // map DOM element & map options
  mapResult = {map: null}; // created google map

  constructor(props) {
    super(props);
    console.log('MapPanel props %O', props);
    this.mapParams.options.center = {lat: parseFloat(props.lat, 10), lng: parseFloat(props.lng, 10)};
    this.mapParams.options.zoom = parseInt(props.zoom,10);
  }

  componentDidMount() {
    console.log('MapPanel componentDidMount');
    // Wait until the Google Map js library is loaded to create the map
    waitForMapLibrary(createMap, this.mapParams, this.mapResult);
  }

  componentWillUnmount() {
    console.log('MapPanel componentWillUnmount');
  }

  render() {
    console.log('MapPanel render');
    const getRef = (elt) => {
      //console.log('setRef %O', elt);
      this.mapParams.elt = elt;
    };
    return <div className='map-container'>
      <div ref={getRef} className='map-canvas'>Loading map...</div>
    </div>;
  }
}

export default MapPanel;