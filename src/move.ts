type File = { id: string; name: string };

type Folder = { id: string; name: string; files: File[] };

type List = Folder[];

let sourceFile: File;
let destinationFolderIndex: number;

export default function move(list: List, source: string, destination: string): List {
  // find file and remove from current folder
  list.forEach((element) => {
    if (element.id === source) {
      throw new Error('You cannot move a folder');
    }
    element.files.forEach((file, index) => {
      if (file.id === source) {
        sourceFile = file;
        element.files.splice(index, 1);
      }
    });
  });

  // transfer and write file
  destinationFolderIndex = list.findIndex((item) => item.id === destination); // check id of item is whether folder or file
  if (destinationFolderIndex < 0) {
    throw new Error('You cannot specify a file as the destination');
  }

  // if it does not exist it will return undefined
  if (
    list[destinationFolderIndex].files.find((item) => item.name === sourceFile.name) !== undefined
  ) {
    throw new Error('A folder cannot have two file with the identical name');
  }

  // add file to the destination folder
  list[destinationFolderIndex].files.push(sourceFile);

  return list;
}
