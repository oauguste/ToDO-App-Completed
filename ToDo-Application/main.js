import "./style.css";

class Note {
  constructor(content) {
    this.content = content;
    this.isCompleted = false;
  }
  getNoteContent() {
    return this.content;
  }
  setNoteContent(newContent) {
    if (newContent === "") {
      return;
    }
    this.content = newContent;
  }
}
class Folder {
  constructor(folderName, notes) {
    this.folderName = folderName;
    this.notes = notes;
  }
  getFolderName() {
    return this.folderName;
  }
  //Notes Array
  getNotes() {
    return this.notes;
  }

  setFolderName(newFolderName) {
    if (newFolderName === "") {
      return;
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
  constructor() {
    this.folders = [];
  }
  //folder array
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
const fileSystem = new FolderSystem();
// module.exports = { Note, Folder, FolderSystem };
const folderForm = document.querySelector("#folderForm");
const folderInput = document.querySelector("#folderInput");

const noteForm = document.querySelector("#notesForm");
const noteInput = document.querySelector("#notesInput");

const noteContainer = document.querySelector(
  "#noteContainer"
);

function renderNotes(array, parent) {
  parent.innerHTML = "";
  array.forEach((note) => {
    const noteEl = document.createElement("p");
    const doneBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const notesContainerDiv = document.createElement("div");
    notesContainerDiv.classList.add("flex", "gap-2");
    doneBtn.classList.add(
      "p-2",
      "bg-orange-200",
      "rounded"
    );
    editBtn.classList.add("p-2", "bg-blue-200", "rounded");
    deleteBtn.classList.add("p-2", "bg-red-200", "rounded");
    noteEl.classList.add(
      "p-2",
      "text-white",
      "bg-black",
      "rounded",
      "truncate"
    );
    noteEl.textContent = note.getNoteContent();

    if (note.isCompleted) {
      noteEl.classList.add("bg-green-200");
    }

    parent.appendChild(notesContainerDiv);
    notesContainerDiv.appendChild(noteEl);
    notesContainerDiv.appendChild(doneBtn).textContent =
      "done";

    doneBtn.addEventListener("click", () => {
      note.isCompleted = !note.isCompleted;
      noteEl.classList.toggle("bg-green-200");
    });

    notesContainerDiv.appendChild(editBtn).textContent =
      "edit";

    editBtn.addEventListener("click", () => {
      const newContent = prompt(
        "Enter new content for the note:",
        note.getNoteContent()
      );
      if (newContent !== null && newContent.trim() !== "") {
        note.setNoteContent(newContent.trim());
        renderNotes(array, parent);
      }
    });

    notesContainerDiv.appendChild(deleteBtn).textContent =
      "delete";

    deleteBtn.addEventListener("click", () => {
      const currentFolder = getCurrentFolder();
      currentFolder.deleteNote(note);
      renderNotes(currentFolder.getNotes(), parent);
    });
  });
}

function getCurrentFolder() {
  // Find the current folder based on the active folder button
  const activeFolderBtn = document.querySelector(
    ".active-folder"
  );
  const folderName = activeFolderBtn.textContent;
  return fileSystem
    .getFolders()
    .find(
      (folder) => folder.getFolderName() === folderName
    );
}
function createNote() {
  const inputValue = noteInput.value.trim();
  if (inputValue !== "") {
    const note = new Note(inputValue);
    console.log("New note created", note);
    const currentFolder = getCurrentFolder();
    currentFolder.addNotesToFolder(note);
    noteInput.value = "";
    renderNotes(currentFolder.getNotes(), noteContainer);
  }
}

function createBtn(name, parent, folder) {
  const folderDiv = document.createElement("div");
  folderDiv.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "gap-2"
  );
  folderDiv.classList.add("folder-div");

  const button = document.createElement("button");
  button.classList.add(
    "p-2",
    "mt-2",
    "text-sm",
    "text-black",
    "bg-blue-200",
    "rounded",
    "folder-button"
  );
  button.textContent = `${name} folder`;
  folderDiv.appendChild(button);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = `delete folder`;
  deleteButton.classList.add(
    "p-2",
    "mt-2",

    "text-sm",
    "text-black",
    "bg-red-200",
    "rounded",
    "folder-delete-button"
  );
  folderDiv.appendChild(deleteButton);

  parent.appendChild(folderDiv);

  if (!document.querySelector(".active-folder")) {
    button.classList.add("active-folder");
  }

  //render notes
  button.addEventListener("click", () => {
    const folderButtons = document.querySelectorAll(
      ".folder-button"
    );
    folderButtons.forEach((btn) =>
      btn.classList.remove("active-folder")
    );
    button.classList.add("active-folder");
    renderNotes(folder.getNotes(), noteContainer);
  });

  //delete folder
  deleteButton.addEventListener("click", () => {
    fileSystem.deleteFolder(folder);
    parent.removeChild(folderDiv);
  });
}

function createFolder() {
  const inputValue = folderInput.value.trim();
  if (inputValue !== "") {
    const folder = new Folder(inputValue, []);
    console.log("New folder created:", folder);
    folderInput.value = "";
    createBtn(folder.getFolderName(), folderForm, folder);
    fileSystem.addFolderToFoldersSystem(folder);
    console.log(fileSystem.getFolders());
    return fileSystem;
  }
}

folderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createFolder();
});

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createNote();
});
