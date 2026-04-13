/*
What is the Bridge Pattern
    The Bridge Design Pattern lets you split a class into two separate hierarchies: 
    one for the abstraction and another for the implementation, so that they can evolve independently. 

=> You are building a graphics system where:
    You have multiple shapes (Circle, Square, Triangle)
    You support multiple rendering engines (SVG, Canvas)
    Constraints:
        New shapes can be added anytime
        New renderers can be added anytime
        Avoid class explosion
*/


/* Without Bridge Pattern: class explosion
    CircleSVG, CircleCanvas
    SquareSVG, SquareCanvas
    TriangleSVG, TriangleCanvas
    
    If:
    - 3 shapes × 2 renderers = 6 classes
    - Add 1 renderer → rewrite everything
*/


// Step 1: Implementation interface (one side of the bridge)
// Renderer defines low-level drawing operations
interface Renderer {
  renderCircle(radius: number): void;
  renderSquare(side: number): void;
  renderTriangle(base: number, height: number): void;
}


// Step 2 — Concrete implementations
// Each renderer provides its own way of drawing

class SVGRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`SVG: <circle r="${radius}" />`); // SVG-specific logic
  }

  renderSquare(side: number): void {
    console.log(`SVG: <rect width="${side}" height="${side}" />`);
  }

  renderTriangle(base: number, height: number): void {
    console.log(`SVG: <polygon base="${base}" height="${height}" />`);
  }
}

class CanvasRenderer implements Renderer {
  renderCircle(radius: number): void {
    console.log(`Canvas: draw circle ${radius}`); // Canvas-specific logic
  }

  renderSquare(side: number): void {
    console.log(`Canvas: draw square ${side}`);
  }

  renderTriangle(base: number, height: number): void {
    console.log(`Canvas: draw triangle ${base}, ${height}`);
  }
}

// Step 3 — Abstraction (WHAT to draw)
// Shape does NOT know how drawing happens
// It only holds a reference to Renderer → this is the BRIDGE

abstract class Shape {
  constructor(protected renderer: Renderer) {} // injected dependency

  abstract draw(): void; // each shape defines WHAT to draw
}


// Step 4 — Concrete Shapes

class Circle extends Shape {
  constructor(private radius: number, renderer: Renderer) {
    super(renderer); // pass renderer to parent
  }

  draw(): void {
    // delegate actual drawing to renderer
    this.renderer.renderCircle(this.radius);
  }
}
class Square extends Shape {
  constructor(private side: number, renderer: Renderer) {
    super(renderer);
  }

  draw(): void {
    // renderer decides HOW to draw square
    this.renderer.renderSquare(this.side);
  }
}
class Triangle extends Shape {
  constructor(
    private base: number,
    private height: number,
    renderer: Renderer
  ) {
    super(renderer);
  }

  draw(): void {
    // again delegation → abstraction separated from implementation
    this.renderer.renderTriangle(this.base, this.height);
  }
}

// Step 5 — Usage

const svg = new SVGRenderer();       // one implementation
const canvas = new CanvasRenderer(); // another implementation

// mix and match freely (this is the power of Bridge)

const shapes = [
  new Circle(10, svg),      // Circle drawn using SVG
  new Square(5, canvas),    // Square drawn using Canvas
  new Triangle(8, 6, svg),  // Triangle drawn using SVG
];

// uniform usage → all shapes treated same
shapes.forEach(s => s.draw());