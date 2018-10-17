import React, { Component } from 'react'
import grandmaPng from '../assets/images/grandma.png'
import coinPng from '../assets/images/coin.png'
import './App.css'
import Sound from 'react-sound'
import stories from '../assets/stories'
import _ from 'lodash'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: Sound.status.STOPPED,
      story: _.sample(stories)
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  }

  randomSong() {
    return _.sample([
      'assets/sounds/dreamy-eyeliner.mp3',
      'assets/sounds/playful-duck-soup.mp3',
      'assets/sounds/playful-mr-badger.mp3',
      'assets/sounds/playful-quirky-moments.mp3',
      'assets/sounds/playful-sneaky-steps.mp3',
      'assets/sounds/playful-squirreling.mp3',
    ])
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({
      playing: Sound.status.PLAYING,
      song: this.randomSong(),
      story: _.sample(stories)
    })

    const grandma = document.getElementById("grandma")
    let coords = { bottom: -1000 }
    let tween = new global.TWEEN.Tween(coords)
      .to({ bottom: 0 }, 1000)
      .easing(global.TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
        grandma.style.setProperty('bottom', `${coords.bottom}px`);
      })
      .start();
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="App-story">
            <p>
              Why can't you be more like your cousin?
            </p>
            <p>
              {this.state.story}
            </p>
            <p>
              At your rate, you won't even get into UC Berkeley. You should study more
              now that you've given up piano lessons and have more free time!
            </p>
          </div>

          <Sound
            url={this.state.song}
            playStatus={this.state.playing}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />

          <a onClick={this.handleClick}>
            <img src={coinPng} id="coin" className="coin" alt="Insert Coin" />
          </a>
        </div>
        <img src={grandmaPng} id="grandma" className="grandma" alt="Gossip Grandma" />
      </div>
    )
  }
}

export default App
