import { Component, createRef } from "react";
import WaveSurfer from 'wavesurfer.js'
import { PlayButton } from "../styles/waveform/waveform.styles";

interface IState {
  playing: boolean;

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
    this.wavesurfer = WaveSurfer.create({
      container: this.waveformRef.current!,
      waveColor: "white",
      progressColor: 'purple',
    });

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

export default Index;