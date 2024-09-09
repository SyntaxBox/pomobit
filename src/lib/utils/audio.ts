export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    if (file.type !== "audio/mp3" && file.type !== "audio/mpeg") {
      return reject(new Error("File type must be MP3 or MPEG"));
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // Return the Base64 string
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file); // Read file as Base64
  });
};
