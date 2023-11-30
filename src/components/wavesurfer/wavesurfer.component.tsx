import { ChangeEvent, Component } from "react";
import WaveSurfer from 'wavesurfer.js';
import { PlayButton } from "../../styles/waveform/waveform.styles";

interface IState {
  playing: boolean;
  zoomLevel: string;

}

type WaveSurferProps = {
  audioId: string;
  fileName: string;
  audioData: Int32Array;
}

class DisplayWave extends Component<WaveSurferProps, IState> {
  private wavesurfer: WaveSurfer | null = null;
  private audio = new Audio();
  private audioContext: AudioContext | null;
  private eqBands: Array<number> = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  private filters: Array<BiquadFilterNode> | null;
  private playButton: HTMLElement | null;
  private forwardButton: HTMLElement | null; 
  private backButton: HTMLElement | null;

  constructor(props: WaveSurferProps) {
    super(props);
    this.state = {
      playing: false,
      zoomLevel: "100"
    }
    this.audioContext = null;
    this.filters = null;
    this.playButton = null;
    this.forwardButton = null;
    this.backButton = null;
    this.handleChange = this.handleChange.bind(this);
    this.zoomFunctionality = this.zoomFunctionality.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  handleClick(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  zoomFunctionality() {
    this.playButton = document.querySelector('#play');
    this.forwardButton = document.querySelector('#forward');
    this.backButton = document.querySelector('#backward');
    this.wavesurfer?.once('decode', () => {
      document.querySelectorAll('input[type="checkbox"]').forEach((input: any) => {
        input.onchange = (e: ChangeEvent<HTMLInputElement>) => {
          this.wavesurfer?.setOptions({
            [input.value]: e.target.checked,
          })
        }
      });

      if (this.playButton) {
        this.playButton.onclick = () => {
          this.setState({ playing: !this.state.playing });
          this.wavesurfer?.playPause()
        }
      }
  
      if (this.forwardButton) {
        this.forwardButton.onclick = () => {
          this.wavesurfer?.skip(5)
        }
      }
    
      if (this.backButton) {
        this.backButton.onclick = () => {
          this.wavesurfer?.skip(-5)
        }
      }
    });

    this.wavesurfer?.once('decode', () => {
      const slider = document.querySelector('input[type="range"]');
    
      slider?.addEventListener('input', (event: any) => {
        const minPxPerSec = event.target?.valueAsNumber
        this.wavesurfer?.zoom(minPxPerSec)
      });
    });
  }

  cleanupAudio() {
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  setupAudio() {
    this.audioContext = new AudioContext();
    console.log("Filters:: ",this.audioContext)
    this.filters = this.eqBands.map((band) => {
      const filter = this.audioContext!.createBiquadFilter()
      filter.type = band <= 32 ? 'lowshelf' : band >= 16000 ? 'highshelf' : 'peaking'
      filter.gain.value = Math.random() * 40 - 20
      filter.Q.value = 1 
      filter.frequency.value = band 
      return filter
    });
  }

  handleAudio() {
    const htmlElement = document.createElement('div');
    htmlElement.innerText = this.props.fileName;
    this.audio.controls = true;
    this.audio.className = "wavesurfer";
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
    // document.body.appendChild(this.audio);
    const body = document.querySelector('#zoom');
    body?.prepend(htmlElement);
  }

  createSlider() {
    const container = document.createElement('p');
    if (this.filters) {
      this.filters.forEach((filter) => {
        const slider = document.createElement('input')
        slider.type = 'range'
        slider.style.appearance = 'slider-vertical'
        slider.style.width = '8%'
        slider.min = "-40"
        slider.max = "40"
        slider.value = filter.gain.value.toString()
        slider.step = "0.1"
        slider.onchange = (e: any) => (filter.gain.value = e.target.value)
        const body = document.querySelector('#zoom');
        body?.appendChild(container);
        container.appendChild(slider)
      });
    }
  }

  setupWave() {
    const el = document.createElement("body");
    el.id = "waveform";
    const body = document.querySelector('#zoom');
    body?.prepend(el);
    this.wavesurfer = WaveSurfer.create({
      container: el,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      media: this.audio
    });
  
  }

  componentDidMount() {
    this.setupAudio();
    this.handleAudio();
    this.setupWave();
    this.createSlider();
    this.zoomFunctionality();
  }

  componentWillUnmount() {
    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }
    this.cleanupAudio();
  }

  render() {
    const { zoomLevel, playing } = this.state;
    return (
      <div style={{ color: 'white' }} id="zoom">
        <label >
          Zoom: <input type="range" min="10" max="1000"  name="zoomLevel" value={zoomLevel} onChange={this.handleChange} />
        </label>
        <div style={{margin: "1em 0 2em"}}>
          <PlayButton style={{ margin: '1rem' }} id="play">{!playing ? "Play" : "Pause"}</PlayButton>
          <button style={{ margin: '1rem' }} id="backward">Backward 5s</button>
          <button style={{ margin: '1rem' }} id="forward">Forward 5s</button>
        </div>
      </div>
    );
  }
}

export default DisplayWave;