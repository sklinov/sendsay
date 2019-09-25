function toBase64(file) {
    return new Promise((resolve) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function () {
            const regex = /data:\S*;base64,/;
            var fileInBase64 = fileReader.result.replace(regex,'');
            resolve(fileInBase64); 
        };
    })    
}

export default async function filesToBase64(files) {
    var filesInBase64 = [];
    await Promise.all(files.map(async (file) => {
        const contents = await toBase64(file);
        var fileObj = {
            name: file.name,
            content: contents,
            encoding: "base64"
        }
        filesInBase64.push(fileObj);
    }));
    return filesInBase64;
} 



