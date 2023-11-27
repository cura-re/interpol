import { Component, createRef } from "react";
import WaveSurfer from 'wavesurfer.js'
import { PlayButton } from "../../styles/waveform/waveform.styles";

interface IState {
  playing: boolean;

}

type WaveSurferProps = {
  audioId: string;
  fileName: string;
  audioData: Int32Array;
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
    url: "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3",
    /** Whether to show default audio element controls */
    mediaControls: true,
    /** Play the audio on load */
    autoplay: false,
    /** Pass false to disable clicks on the waveform */
    interact: true,
    /** Allow to drag the cursor to seek to a new position */
    dragToSeek: true,
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

class DisplayWave extends Component<WaveSurferProps, IState> {
  private wavesurfer: WaveSurfer | null = null;
  private waveformRef = createRef<HTMLDivElement>();
  private audio = new Audio();
  private audioContext: AudioContext | null;
  private audioRef: React.RefObject<HTMLAudioElement>;
  private eqBands: Array<number> = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  private filters: Array<BiquadFilterNode> | null;
  //  = this.eqBands.map((band) => {
  //   const filter = this.audioContext.createBiquadFilter()
  //   filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
  //   filter.gain.value = Math.random() * 40 - 20
  //   filter.Q.value = 1 // resonance
  //   filter.frequency.value = band // the cut-off frequency
  //   return filter
  // });
  constructor(props: WaveSurferProps) {
    super(props);
    this.state = {
      playing: false
    }
    this.audioContext = null;
    this.audioRef = createRef();
    this.filters = null;
  }

  // setWave() {
  //   const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  //   if (AudioContext) {
  //     this.audioContext = new AudioContext();
  //     const audioElement = this.audioRef.current;
  //     if (audioElement && this.audioContext) {
  //       const source = this.audioContext.createMediaElementSource(audioElement);
  //       source.connect(this.audioContext.destination);
  //     }
  //   } else {
  //     console.error("Web Audio API is not supported in this browser");
  //   }
  // }

  // cleanupAudio() {
  //   if (this.audioContext) {
  //     this.audioContext.close();
  //   }
  // }

  setupAudio() {
    this.audioContext = new AudioContext()
    this.filters = this.eqBands.map((band) => {
      const filter = this.audioContext!.createBiquadFilter()
      filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
      filter.gain.value = Math.random() * 40 - 20
      filter.Q.value = 1 // resonance
      filter.frequency.value = band // the cut-off frequency
      return filter
    });
  }

  handleAudio() {
    this.audio.controls = true
    this.audio.src = `data:audio/wav;base64, ${this.props.audioData}`;
    this.audio.addEventListener(
      'canplay',
      () => {
        // Create a MediaElementSourceNode from the audio element
        if (this.filters && this.audioContext) {
          const mediaNode = this.audioContext.createMediaElementSource(this.audio)
          
          // Connect the filters and media node sequentially
          const equalizer = this.filters.reduce((prev, curr) => {
            prev.connect(curr)
            return curr
          }, mediaNode)
          
          // Connect the filters to the audio output
          equalizer.connect(this.audioContext.destination)
        }
        },
        { once: true },
    )
  }

  createSlider() {
    const container = document.createElement('p');
    if (this.filters) {
      this.filters.forEach((filter) => {
        const slider = document.createElement('input')
        slider.type = 'range'
        // slider.orient = 'vertical'
        slider.style.appearance = 'slider-vertical'
        slider.style.width = '8%'
        slider.min = "-40"
        slider.max = "40"
        slider.value = filter.gain.value.toString()
        slider.step = "0.1"
        // slider.oninput = (e) => (filter.gain.value = e.target.value)
        container.appendChild(slider)
        document.body.appendChild(container);
      });
    }
  }
  handlePlay() {
    this.setState({ playing: !this.state.playing });
    this.wavesurfer?.playPause();
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create(options);
    this.createSlider();
    // this.handleAudio();
    // this.setWave();
  }

  componentWillUnmount() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
    // this.cleanupAudio();
  }

  render() {
    return (
      <div>
        {/* <audio ref={this.audioRef} controls>
          <source src={`data:audio/mp3;base64, ${this.props.audioData}`} type="audio/mp3"/>
        </audio> */}
      </div>
    );
  }
}

export default DisplayWave;