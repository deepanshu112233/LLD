//File system: ugly implementation without composite pattern

class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }
}

class Folder {
  name: string;
  files: File[] = [];
  folders: Folder[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addFile(file: File) {
    this.files.push(file);
  }

  addFolder(folder: Folder) {
    this.folders.push(folder);
  }

  getSize(): number {
    let total = 0;

    for (const file of this.files) {
      total += file.getSize();
    }

    for (const folder of this.folders) {
      total += folder.getSize();
    }

    return total;
  }
}


const file1 = new File("a.txt", 10);
const file2 = new File("b.txt", 20);

const folder = new Folder("docs");
folder.addFile(file1);
folder.addFile(file2);

console.log(folder.getSize());

/*
Problems:
1. Code Duplication: 
    Both File and Folder have a getSize method, leading to duplicated logic when calculating sizes.

2. Inflexibility: 
    If we want to add new types of file system objects (e.g., symbolic links, shortcuts), we would need to modify existing classes, violating the Open/Closed Principle.

3. Complex Client Code: 
    Clients need to know whether they are dealing with a File or a Folder to call the appropriate getSize method, leading to more complex and error-prone code.
*/
