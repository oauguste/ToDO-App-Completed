const { Note, Folder, FolderSystem } = require("./main.js");
// const Folder = require("./main");

test("getNoteContent should return the note content", () => {
  const note = new Note("Sample content for testing");
  expect(note.getNoteContent()).toBe(
    "Sample content for testing"
  );
});

test("setNoteContent should update the note content", () => {
  const note = new Note("Initial content");
  note.setNoteContent("Updatedcontent");
  expect(note.getNoteContent()).toBe("Updatedcontent");
});

test("getFolderName should return the folder name", () => {
  const weekday = new Folder("Weekday");
  expect(weekday.getFolderName()).toBe("Weekday");
});

test("setFolderName should update the folder name", () => {
  const folder1 = new Folder("Weekend");
  folder1.setFolderName("The Weekend");
  expect(folder1.getFolderName()).toBe("The Weekend");
});

test("getNotes should return the notes an array containing the notes object", () => {
  const folder2 = new Folder("Wednesday", []);
  const notes = new Note("Sample content for testing");
  folder2.addNotesToFolder(notes);
  expect(folder2.getNotes()).toEqual([notes]);
});

test("should return the notes content", () => {
  const folder = new Folder("Wednesday", []);
  const note = new Note("Sample content for testing");
  folder.addNotesToFolder(note);
  expect(folder.getNotes()[0].getNoteContent()).toBe(
    "Sample content for testing"
  );
});

test("addFolderToFoldersSystem should add (folder) FolderSystem instance ", () => {
  const folder = new Folder("thursday", []);
  const folderSystem = new FolderSystem([]);
  folderSystem.addFolderToFoldersSystem(folder);
  expect(folderSystem.getFolders()).toEqual([folder]);
});

test("deleteFolder to return folders array", () => {
  const folder = new Folder("Saturday", []);
  const folder2 = new Folder("sunday", []);
  const folderSystem = new FolderSystem([]);
  folderSystem.addFolderToFoldersSystem(folder);
  folderSystem.addFolderToFoldersSystem(folder2);
  expect(folderSystem.deleteFolder(folder2)).toEqual([
    folder,
  ]);
});
