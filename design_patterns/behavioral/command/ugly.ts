// direct calls — no history, no undo, no queue
class TextEditor {
    private content: string = ""

    type(text: string): void {
        this.content += text
    }

    deleteLastWord(): void {
        const lastSpace = this.content.lastIndexOf(" ")
        this.content = this.content.slice(0, lastSpace)
    }

    bold(): void {
        this.content = `<b>${this.content}</b>`
    }

    getContent(): string { return this.content }
}

const editor = new TextEditor()
editor.type("Hello World")
editor.bold()
editor.deleteLastWord()

// user presses Ctrl+Z — how do you undo?
// you have zero history of what happened
// direct method calls leave no trace 