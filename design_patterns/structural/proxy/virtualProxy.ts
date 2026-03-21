// Bad Implementation
// Suppose we have a Video streaming service
/*  Depending on the use case, the Proxy may take different forms:
        • Virtual Proxy (Lazy Loading): Defers creation of the real object until it’s actually needed (lazy loading).
        • Protection Proxy: Performs permission checks before allowing access to certain operations.
        • Caching Proxy: Caches expensive results and avoids repeated calls to the real subject.
        • Logging Proxy: Adds logging, reference counting, or monitoring before/after method calls.
 */

class HeavyImage {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk(); // ❌ expensive operation
  }

  private loadFromDisk() {
    console.log(`Loading all images from disk: ${this.filename}`);
  }

  display() {
    console.log(`Displaying ${this.filename}`);
  }
}
const imagez = new HeavyImage("photo.png"); // ⚠️ loads immediately
imagez.display();

/*
Issues

❌ No access control
❌ No caching
❌ No logging
❌ No lazy loading

Everything is exposed directly

*/


//With Virtual Proxy (Lazy Loading)

// Step 1: Common Interface

interface Image {
  display(): void;
}


// Step 2: Real Object
class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    console.log(`Loading image from disk: ${this.filename}`);
  }

  display(): void {
    console.log(`Displaying ${this.filename}`);
  }
}


// Step 3: Virtual Proxy
class ImageProxy implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display(): void {
    // 🔥 Lazy initialization
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }

    this.realImage.display();
  }
}


const image: Image = new ImageProxy("photo.png");

console.log("App started...");

// ❌ No loading yet

image.display(); // ✅ loads now (first time)
image.display(); // ✅ no reload