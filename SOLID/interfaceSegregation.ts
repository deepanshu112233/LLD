/*
In simpler terms: Keep your interfaces focused. Each interface should represent a specific capability or behavior. 
If a class doesn’t need a method, it shouldn’t be forced to implement it.

This is especially important in larger codebases with evolving requirements. The more methods an interface has, 
the more likely it is that a change to one method will ripple out into classes that have nothing to do with the change.
*/


// Applying ISP
// Time to apply ISP and break down our MediaPlayer interface into more logical, focused pieces.

// Step 1: Define Smaller, Cohesive Interfaces
// Audio-only capabilities
interface AudioPlayerControls {
    playAudio(audioFile: string): void;
    stopAudio(): void;
    adjustAudioVolume(volume: number): void;
}

// Video-only capabilities
interface VideoPlayerControls {
    playVideo(videoFile: string): void;
    stopVideo(): void;
    adjustVideoBrightness(brightness: number): void;
    displaySubtitles(subtitleFile: string): void;
}


//Step 2: Classes Implement Only the Interfaces They Need

class ModernAudioPlayer implements AudioPlayerControls {
    playAudio(audioFile: string): void {
        console.log(`ModernAudioPlayer: Playing audio - ${audioFile}`);
    }

    stopAudio(): void {
        console.log("ModernAudioPlayer: Audio stopped.");
    }

    adjustAudioVolume(volume: number): void {
        console.log(`ModernAudioPlayer: Volume set to ${volume}`);
    }
}

class SilentVideoPlayer implements VideoPlayerControls {
    playVideo(videoFile: string): void {
        console.log(`SilentVideoPlayer: Playing video - ${videoFile}`);
    }

    stopVideo(): void {
        console.log("SilentVideoPlayer: Video stopped.");
    }

    adjustVideoBrightness(brightness: number): void {
        console.log(`SilentVideoPlayer: Brightness set to ${brightness}`);
    }

    displaySubtitles(subtitleFile: string): void {
        console.log(`SilentVideoPlayer: Subtitles from ${subtitleFile}`);
    }
}


class ComprehensiveMediaPlayer implements AudioPlayerControls, VideoPlayerControls {
    playAudio(audioFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Playing audio - ${audioFile}`);
    }

    stopAudio(): void {
        console.log("ComprehensiveMediaPlayer: Audio stopped.");
    }

    adjustAudioVolume(volume: number): void {
        console.log(`ComprehensiveMediaPlayer: Audio volume set to ${volume}`);
    }

    playVideo(videoFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Playing video - ${videoFile}`);
    }

    stopVideo(): void {
        console.log("ComprehensiveMediaPlayer: Video stopped.");
    }

    adjustVideoBrightness(brightness: number): void {
        console.log(`ComprehensiveMediaPlayer: Brightness set to ${brightness}`);
    }

    displaySubtitles(subtitleFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Subtitles from ${subtitleFile}`);
    }
}

// Now each class implements only the interfaces it needs. ModernAudioPlayer handles audio, SilentVideoPlayer handles video, 
// and ComprehensiveMediaPlayer opts into both. No empty methods, no exceptions, no wasted code.
