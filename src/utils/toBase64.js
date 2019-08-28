export default async function toBase64(file) {
    var fileReader = new FileReader();
    await fileReader.readAsDataURL(file);
    return fileReader.result;
//            return fileReader.result;
}