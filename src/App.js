import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MapPanel from './GMap'

const Home = () => (
  <div className='home'>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div className='about'>
    <h2>About</h2>
  </div>
)

const GoogleMapDemo = () => (
  <Router>
    <div className='app-container'>
      <div className='panels'>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/map" render={() => <MapPanel  lat='-32.077655' lng='115.75326' zoom='16' />}/>
      </div>

      <div className='menu-panel'>
        <span className='menu'><Link to="/">Home</Link></span>
        <span className='menu'><Link to="/about">About</Link></span>
        <span className='menu'><Link to="/map">map</Link></span>
      </div>
    </div>
  </Router>
)
export default GoogleMapDemo
