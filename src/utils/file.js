export const checkFilesExtAndSize = (state, files) => {
    const sizeLimit = 5242880;
    const totalSizeLimit = 20971520;
    const fileTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'application/zip',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
    ];

    const fileSizes = this.state.files.map(file => file.size);
    var totalSize = fileSizes.reduce( (total, size) => total+size, 0); 
    var checkedfiles = files.filter(file => {
        if(fileTypes.indexOf(file.type) !== -1 &&
           file.size <=sizeLimit && 
           file.size+totalSize <= totalSizeLimit)
        {   
            totalSize +=file.size;
            return file;
        }
        else {
            console.log(file, fileTypes.indexOf(file.type), file.type, file.size);
            alert(`Невозможно загрузить ${file.name}. Проверьте размер (< 5Мб) и тип файла. ${file.type}, ${file.size}`);
            return null;
        }
    })
    return checkedfiles;
}

export const processFileName = (filename) => {
    const max_filename_length = 20;
    if(filename.length > max_filename_length) {
        let end = filename.slice(-4);
        let start = filename.slice(0,13);
        return start + '...' + end;
    }
    else {
        return filename;
    }   
}