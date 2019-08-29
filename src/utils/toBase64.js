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

export default function filesToBase64(files) {
    return new Promise((resolve) => {
        var filesInBase64 = [];
        files.forEach(file => {
            toBase64(file)
            .then((res) => {
                var fileObj = {
                    name: file.name,
                    content: res,
                    encoding: "base64"
                }
                filesInBase64.push(fileObj);
            })
        })
        console.log(filesInBase64);
        resolve(filesInBase64);
    })
} 