/*
Design Text Formatter Class
    Build a text formatting system where different strategies format text in different ways. 
    The TextEditor context should allow swapping formatters at runtime, so the same editor can produce uppercase, 
    lowercase, or title case output depending on the active strategy.

Requirements:
    Strategy interface: TextFormatter with a method format(text) that returns a formatted string
    Concrete strategies: UpperCaseFormatter, LowerCaseFormatter, TitleCaseFormatter
    Context: TextEditor with setFormatter() to swap strategies and publishText() to format and print text
*/


interface TextFormatter{
    format(text: string): string
}

class UpperCaseFormatter implements TextFormatter{

    format(text: string): string {
        return text.toUpperCase()
    }
}

class LowerCaseFormatter implements TextFormatter{

    format(text: string): string {
        return text.toLowerCase()
    }

}

class TitleCaseFormatter implements TextFormatter{

    format(text: string): string {
        return text.toLowerCase().split(" ").map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")
    }

}

class TextEditor{
    private formatter: TextFormatter

    constructor(formatter: TextFormatter){
        this.formatter=formatter
    }

    setFormatter(formatter: TextFormatter){
        this.formatter = formatter;
    }

    publishText(text: string): void {
        console.log(this.formatter.format(text));
    }

}


const editor = new TextEditor(new UpperCaseFormatter())
editor.publishText("this is uppercase")

editor.setFormatter(new LowerCaseFormatter());
editor.publishText("THIS IS LOWERCASE");

editor.setFormatter(new TitleCaseFormatter());
editor.publishText("this is titlecase");