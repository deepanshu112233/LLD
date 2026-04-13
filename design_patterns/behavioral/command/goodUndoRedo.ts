// Correct Command Pattern
// Step 1: Command interface (All commands must implement execute() and undo().


interface Command{
    undo():void
    execute():void
}

// Step 2: Receiver (the thing that actually does the work)
// They have no knowledge of commands or the invoker.

class TextEditor{
    private content: string = ""


    insertText(text: string): void{
        this.content+=text
    }

    // remove last N characters and return them
    removeText(len: number): string{
        const removed = this.content.slice(-len)
        this.content=this.content.slice(0,-len)
        return removed
    }

    // Initialize content with new text
    setContent(content: string){
        this.content=content
    }

    getContent(): string{
        return this.content;
    }

    display(): void {
        console.log(`Content: ${this.content}`);
    }
}

// Step 3: Concrete Command (Each command wraps a specific receiver action)
// stores the text so undo knows exactly what to remove
class TypeCommand implements Command{
    private editor: TextEditor
    private text: string

    constructor(editor: TextEditor, text: string){
        this.editor=editor
        this.text=text
    }

    undo(): void {
        this.editor.removeText(this.text.length) // remove exact same length       
    }
    
    execute(): void {
        this.editor.insertText(this.text)    // add the text
    }
}

// stores deleted word so undo can restore it
class DeleteCommand implements Command{
    private editor: TextEditor
    private deletedWord: string = ""     // snapshot before deletion
    private length: number

    constructor(editor: TextEditor, l:number){
        this.editor=editor
        this.length=l
    }
    
    undo(): void {
        this.editor.insertText(this.deletedWord)       // add the text
    }
    
    execute(): void {
        this.deletedWord = this.editor.removeText(this.length)
    }
}

// Step 4: Invoker (History Manager)
// Invoker manages command history
// it knows WHEN to execute commands
// it doesn't know WHAT the commands do

class EditorInvoker {
  private history: Command[] = []; // undo stack
  private redoStack: Command[] = []; // redo stack

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command); // store for undo

    this.redoStack = []; 
    // clear redo when new action happens
    // (standard behavior like Ctrl+Z/Ctrl+Y)
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();      
      this.redoStack.push(command); // move to redo stack
    }
  }
  redo(): void {
    const command = this.redoStack.pop();

    if (command) {
      command.execute(); // re-execute
      this.history.push(command); // back to undo stack
    }
  }
}

const editor  = new TextEditor()
const invoker = new EditorInvoker()

// ── Execute Commands ─────────────────────────────
console.log("▶ Type 'Hello '")
invoker.executeCommand(new TypeCommand(editor, "Hello "))
editor.display()
// Content: Hello

console.log("\n▶ Type 'World'")
invoker.executeCommand(new TypeCommand(editor, "World"))
editor.display()
// Content: Hello World

console.log("\n▶ Delete last 3 chars ('rld')")
invoker.executeCommand(new DeleteCommand(editor, 3))
editor.display()
// Content: Hello Wo

// ── Undo ─────────────────────────────────────────
console.log("\n↩️  Undo delete (restores 'rld')")
invoker.undo()
editor.display()
// Content: Hello World

console.log("\n↩️  Undo 'World'")
invoker.undo()
editor.display()
// Content: Hello

console.log("\n↩️  Undo 'Hello '")
invoker.undo()
editor.display()
// Content: (empty)

// ── Redo ─────────────────────────────────────────
console.log("\n↪️  Redo 'Hello '")
invoker.redo()
editor.display()
// Content: Hello

console.log("\n↪️  Redo 'World'")
invoker.redo()
editor.display()
// Content: Hello World

console.log("\n↪️  Redo delete")
invoker.redo()
editor.display()
// Content: Hello Wo

// ── New action clears redo stack ──────────────────
console.log("\n↩️  Undo delete first")
invoker.undo()
editor.display()
// Content: Hello World

console.log("\n▶ Type something new — clears redo stack")
invoker.executeCommand(new TypeCommand(editor, "!"))
editor.display()
// Content: Hello World!

console.log("\n↪️  Redo — nothing happens (redo stack was cleared)")
invoker.redo()
editor.display()
// Content: Hello World!  ← unchanged

