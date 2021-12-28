export default function getBase64(fileData) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(fileData);
    reader.onload = () => resolve(btoa(reader.result));
    reader.onerror = (error) => reject(error);
  });
}
