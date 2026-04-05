// The Problem: Traversing a Playlist
// Imagine you are building a music streaming application. Users can create playlists, 
// add songs, and play them in various ways. 
// A playlist might contain hundreds of songs, and the player needs to iterate through them one by one.


// The most naive way
class Playlist {
   private songs: string[] = [];

   addSong(song: string): void {
       this.songs.push(song);
   }

   getSongs(): string[] {
       return this.songs;
   }
}

class MusicPlayer {
   playAll(playlist: Playlist): void {
       for (const song of playlist.getSongs()) {
           console.log("Playing: " + song);
       }
   }
}

const playlist = new Playlist();
playlist.addSong("Faded")
playlist.addSong("Blinding Lights")
const player = new MusicPlayer();
player.playAll(playlist);

/*
This looks clean enough. The player gets the list of songs and iterates through them. What could go wrong?

Why This Becomes a Problem
As the application grows, several issues emerge:

1. Breaks Encapsulation- we are exposing the internal array of songs to the player. If we change how 
songs are stored (e.g., using a linked list, a database, or a remote API), 
we would have to modify the player code.

2. Tightly Couples Client to Implementation
3. Limited Traversal Options
4. Testing becomes difficult


What We Really Need
    We need a way for clients to traverse the playlist that:
        -   Does not expose the internal data structure
        -   Provides a consistent interface regardless of how songs are stored
        -   Allows the playlist to control how iteration happens
        -   Supports different traversal strategies without modifying client code
*/