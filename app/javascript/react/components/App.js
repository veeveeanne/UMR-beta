import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
        token: "",
        deviceId: "",
        loggedIn: false,
        error: "",
        trackName: "",
        artistName: "",
        albumName: "",
        playing: false,
        position: 0,
        duration: 0
      }
      this.playerCheckInterval = null

      this.handleLogin = this.handleLogin.bind(this)
      this.onPreviousClick = this.onPreviousClick.bind(this)
      this.onPlayClick = this.onPlayClick.bind(this)
      this.onNextClick = this.onNextClick.bind(this)
  }

  handleLogin() {
    if (this.state.token !== "") {
      this.setState({ loggedIn: true })
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000)
    }
  }

  checkForPlayer() {
    const { token } = this.state

    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval)
      this.player = new window.Spotify.Player({
        name: "Vivian's UM Spotify Player",
        getOAuthToken: cb => { cb(token) }
      })
      this.createEventHandlers()
    }

    this.player.connect()
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    this.player.on('player_state_changed', state => {
      this.onStateChanged(state)
      console.log(state)
    });

    // Ready
    this.player.on('ready', data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
    });
  }

  onStateChanged(state) {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window

      const trackName = currentTrack.name
      const albumName = currentTrack.album.name
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ")
      const playing = !state.paused

      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      })
    }
  }

  onPreviousClick() {
    this.player.previousTrack()
  }

  onPlayClick() {
    this.player.togglePlay()
  }

  onNextClick() {
    this.player.nextTrack()
  }

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing
    } = this.state

    return (
      <div>
        <div>
          <h2>Now Playing</h2>
        </div>

        {error && <p>Error: {error}</p>}

        {loggedIn ?
          (<div>
            <p>Track: {trackName}</p>
            <p>Artist: {artistName}</p>
            <p>Album: {albumName}</p>
            <p>
              <button className="button" onClick={this.onPreviousClick}>Previous</button>
              <button className="button" onClick={this.onPlayClick}>{ playing ? "Pause" : "Play" }</button>
              <button className="button" onClick={this.onNextClick}>Next</button>
            </p>
          </div>)
          :
          (<div>
            <p>
              Enter your Spotify access token. Get it from {" "}
              <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
              here
              </a>
            </p>
            <p>
              <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
            </p>
            <p>
              <button className="button" onClick={this.handleLogin}>Go</button>
            </p>
          </div>)
        }
      </div>
    )
  }
}

export default App
