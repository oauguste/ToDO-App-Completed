import "./style.css";

class Note {
  constructor(content) {
    this.content = content;
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
  constructor(folders) {
    this.folders = folders;
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
// module.exports = { Note, Folder, FolderSystem };
const folderForm = document.querySelector("#folderForm");
const folderInput = document.querySelector("#folderInput");

const folderBtn = document.querySelector(
  "#createFolderBtn"
);
const noteForm = document.querySelector("#notesForm");
const noteInput = document.querySelector("#notesInput");

const noteButton = document.querySelector("#noteButton");
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
      "rounded"
    );
    noteEl.textContent = note.getNoteContent();

    parent.appendChild(noteEl);
    parent.appendChild(doneBtn).textContent = "done";
    parent.appendChild(editBtn).textContent = "edit";
    parent.appendChild(deleteBtn).textContent = "delete";
  });
}

function createBtn(name, parent, folder) {
  const button = document.createElement("button");
  button.classList.add(
    "p-2",
    "mt-2",
    "ml-auto",
    "mr-auto",
    "text-sm",
    "text-black",
    "bg-blue-200",
    "rounded"
  );
  button.textContent = name;
  parent.appendChild(button);

  //render notes
  button.addEventListener("click", () => {
    console.log(
      "Button clicked. Folder name:",
      folder.notes
    );
    renderNotes(folder.getNotes(), noteContainer);
  });
}

function createFolder() {
  const inputValue = folderInput.value.trim();
  if (inputValue !== "") {
    const folder = new Folder(inputValue, []);
    console.log("New folder created:", folder);
    folderInput.value = "";
    createBtn(folder.getFolderName(), folderForm, folder);
  }
}

folderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createFolder();
});

{
  /* <div id="note" class="flex flex-wrap gap-2 p-1 m-2">
  <p class="p-2 text-white bg-black rounded">
    Hello Im a note Lorem, ipsum. Lorem ipsum dolor sit.
    Lorem ipsum dolor sit amet
  </p>
  <button id="done" class="p-2 bg-orange-200 rounded">
    done
  </button>
  <button id="edit" class="p-2 bg-blue-200 rounded">
    edit
  </button>
  <button id="delete" class="p-2 bg-red-200 rounded">
    delete
  </button>
</div>; */
}
