import { Component } from "react";
import WaveSurfer from 'wavesurfer.js'
import Regions from 'wavesurfer.js/dist/plugins/regions.js'

class Index extends Component {

  render() {
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: '/audio.mp3',
    });
    return (
      <h1>Hello</h1>
      w
    );
  }
}

export default Index;