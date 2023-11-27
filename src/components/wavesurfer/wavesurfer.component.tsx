import { Component, createRef } from "react";
import WaveSurfer from 'wavesurfer.js'
import { PlayButton } from "../../styles/waveform/waveform.styles";

interface IState {
  playing: boolean;

}

const options = {
    /** HTML element or CSS selector (required) */
    container: 'body',
    /** The height of the waveform in pixels */
    height: 128,
    /** The width of the waveform in pixels or any CSS value; defaults to 100% */
    width: 300,
    /** Render each audio channel as a separate waveform */
    // splitChannels: false,
    /** Stretch the waveform to the full height */
    normalize: false,
    /** The color of the waveform */
    waveColor: '#ff4e00',
    /** The color of the progress mask */
    progressColor: '#dd5e98',
    /** The color of the playpack cursor */
    cursorColor: '#ddd5e9',
    /** The cursor width */
    cursorWidth: 2,
    /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
    barWidth: NaN,
    /** Spacing between bars in pixels */
    barGap: NaN,
    /** Rounded borders for bars */
    barRadius: NaN,
    /** A vertical scaling factor for the waveform */
    barHeight: NaN,
    /** Vertical bar alignment **/
    // barAlign: '',
    /** Minimum pixels per second of audio (i.e. zoom level) */
    minPxPerSec: 1,
    /** Stretch the waveform to fill the container, true by default */
    fillParent: true,
    /** Audio URL */
    url: '/examples/audio/audio.wav',
    /** Whether to show default audio element controls */
    mediaControls: true,
    /** Play the audio on load */
    autoplay: false,
    /** Pass false to disable clicks on the waveform */
    interact: true,
    /** Allow to drag the cursor to seek to a new position */
    dragToSeek: false,
    /** Hide the scrollbar */
    hideScrollbar: false,
    /** Audio rate */
    audioRate: 1,
    /** Automatically scroll the container to keep the current position in viewport */
    autoScroll: true,
    /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
    autoCenter: true,
    /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
    sampleRate: 8000,
}

class Index extends Component<{}, IState> {
  private wavesurfer: WaveSurfer | null = null;
  private waveformRef = createRef<HTMLDivElement>();
  constructor(props: {}) {
    super(props);
    this.state = {
      playing: false
    }
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.wavesurfer?.playPause();
  }

  componentDidMount() {
    // Initialize WaveSurfer
    this.wavesurfer = WaveSurfer.create(options);

    // Load audio file
    this.wavesurfer.load("https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3");
  }

  componentWillUnmount() {
    // Clean up when the component is unmounted
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
  }

  render() {
    return (
      <div>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>
        <div ref={this.waveformRef}></div>
      </div>
    );
  }
}