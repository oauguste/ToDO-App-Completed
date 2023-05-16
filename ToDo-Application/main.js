// import "./style.css";

class Note {
  constructor(content) {
    this.content = content;
  }
  getNoteContent() {
    return this.content;
  }
  setNoteContent(newContent) {
    if (newContent === "") {
      console.log("You must enter something");
    }
    this.content = newContent;
  }
}

/**
 * Represents a folder in the todo application.
 * @class
 */
class Folder {
  constructor(folderName, notes) {
    this.folderName = folderName;
    this.notes = notes;
  }
  getFolderName() {
    return this.folderName;
  }
  getNotes() {
    return this.notes;
  }

  setFolderName(newFolderName) {
    if (newFolderName === "") {
      console.log("You must provide a folder name ");
    }
    this.folderName = newFolderName;
  }
  addNotesToFolder(note) {
    this.notes.push(note);
  }
  deleteNote(note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }
}

class FolderSystem {
  constructor(folders) {
    this.folders = folders;
  }
  getFolders() {
    return this.folders;
  }

  addFolderToFoldersSystem(folder) {
    this.folders.push(folder);
  }

  deleteFolder(folder) {
    const index = this.folders.indexOf(folder);
    if (index !== -1) {
      this.folders.splice(index, 1);
    }
    return this.folders;
  }
}

module.exports = { Note, Folder, FolderSystem };
