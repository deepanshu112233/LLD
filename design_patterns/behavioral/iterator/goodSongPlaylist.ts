// Step 1: Define the Iterator Interface
// This interface declares the standard operations for traversing any collection:

interface Iterator<T>{
    hasNext(): boolean
    next(): T | undefined
}

// The interface is generic (where the language supports it), allowing it to work with any element type.


//Step 2: Define the IterableCollection Interface because we want to create different types of collections (array-based, map-based, etc.) that can be iterated over.
interface IterableCollection<T> {
   createIterator(): Iterator<T>;
}
//Any class implementing this interface promises to provide an iterator for traversing its elements.

// Step 3: Implement the Concrete Collection and their iterators
// ── Collection 1: Array-based Playlist ──
class SongPlaylist implements IterableCollection<string> {
    private songs: string[] = []

    addSong(song: string): void {
        this.songs.push(song)
    }
    getSongAt(index: number): string | undefined {
       return this.songs[index];
   }

    getSize(): number {
        return this.songs.length;
    }

    createIterator(): Iterator<string> {
        return new PlaylistIterator(this.songs)
        //this line is NOT executed when class is defined
        //it only runs when createIterator() is CALLED
        //by that time PlaylistIterator exists
    }

    createReverseIterator(): Iterator<string> {       // ← new
        return new ReversePlayListIterator(this.songs)
    }
}

class PlaylistIterator implements Iterator<string> {
    private songs: string[]
    private index: number = 0

    constructor(songs: string[]) {
        this.songs = songs
    }

    hasNext(): boolean { return this.index < this.songs.length }

    next(): string | undefined {
        if (!this.hasNext()) throw new Error("No more songs")
        return this.songs[this.index++]
    }

    reset(): void { this.index = 0 }
}


// ── Collection 2: Map-based Radio Stations ───────────────

class RadioStations implements IterableCollection<string> {
    private stations: Map<number, string> = new Map()

    addStation(frequency: number, name: string): void {
        this.stations.set(frequency, name)
    }

    createIterator(): Iterator<string> {
        return new RadioIterator(this.stations)
    }
}

class RadioIterator implements Iterator<string> {
    private values: string[]
    private index: number = 0

    constructor(stations: Map<number, string>) {
        this.values = Array.from(stations.values())  // extract once
    }

    hasNext(): boolean { return this.index < this.values.length }

    next(): string | undefined {
        if (!this.hasNext()) return undefined
        return this.values[this.index++]
    }

    reset(): void { this.index = 0 }
}


// printAll has zero knowledge of arrays, maps, or linked lists. It only knows hasNext() and next().
// Swap the entire internal structure of any collection — printAll never changes.
function printAll(iterator: Iterator<string>, label: string): void {
    console.log(`\n▶  ${label}`)
    console.log("-".repeat(35))
    while (iterator.hasNext()) {
        console.log(`   ${iterator.next()}`)
    }
}

const playlist = new SongPlaylist()
playlist.addSong("Blinding Lights — The Weeknd")
playlist.addSong("Levitating — Dua Lipa")
playlist.addSong("Stay — Kid Laroi")

const radio = new RadioStations()
radio.addStation(91.1, "Radio Mirchi")
radio.addStation(98.3, "Red FM")
radio.addStation(104.0, "Big FM")

printAll(playlist.createIterator(), "My Playlist")
printAll(radio.createIterator(),    "Radio Stations")
 
/*
What We Gained
    Encapsulation is preserved
        The internal list is no longer exposed. Clients interact with the playlist only through the iterator interface.

    Single Responsibility Principle
        The Playlist class focuses on managing songs. 
        The PlaylistIterator class focuses on traversal logic. Each class has one reason to change.

Multiple simultaneous traversals
Each call to createIterator() returns a new, independent iterator. Multiple parts of your application can traverse the same playlist simultaneously without interfering with each other.

Foundation for extensions
We can now easily add new types of iterators (reverse, shuffled, filtered) without modifying the Playlist class or existing client code.
*/

//new feature : reverse iterator for playlist
class ReversePlayListIterator implements Iterator<string> {
    private songs: string[]
    private index: number

    constructor(songs: string[]) {
        this.songs = songs
        this.index = songs.length - 1
    }

    hasNext(): boolean {
        return this.index >= 0
    }

    next(): string | undefined {
        if (!this.hasNext()) return undefined
        return this.songs[this.index--]
    }

}

printAll(playlist.createReverseIterator(), "My Playlist (Reverse)")
