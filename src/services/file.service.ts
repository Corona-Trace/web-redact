function loadFile(fileEvent) {
  const inputFile = fileEvent.target.files[0];

  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    fileReader.onload = () => {
      resolve(JSON.parse(fileReader.result as string));
    };
    fileReader.readAsText(inputFile);
  });
}

export default { loadFile };
