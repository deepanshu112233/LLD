// Music Player

interface State {
  play(): void;
  pause(): void;
}


class MusicPlayer {
  private state: State;

  constructor() {
    this.state = new StoppedState(this); // initial state
  }

  setState(state: State) {
    this.state = state;
  }

  play() {
    this.state.play(); // delegate to state
  }

  pause() {
    this.state.pause();
  }
}

class PlayingState implements State {
  constructor(private player: MusicPlayer) {}

  play(): void {
    console.log("Already playing");
  }

  pause(): void {
    console.log("Pausing music");
    this.player.setState(new PausedState(this.player)); // change state
  }
  
}

class PausedState implements State {
  constructor(private player: MusicPlayer) {}

  play(): void {
    console.log("Resuming music");
    this.player.setState(new PlayingState(this.player));
  }

  pause(): void {
    console.log("Already paused");
  }
}

class StoppedState implements State {
  constructor(private player: MusicPlayer) {}

  play(): void {
    console.log("Starting music");
    this.player.setState(new PlayingState(this.player));
  }

  pause(): void {
    console.log("Cannot pause, already stopped");
  }
}
const player = new MusicPlayer();

player.play();  // Start
player.play();  // Start
player.pause(); // Pause
player.play();  // Resume
player.pause(); // Pause again