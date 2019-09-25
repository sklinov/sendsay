import { processFileName} from './file'

describe('File name processing', ()=> {
    it('Process long file name', () => {
        const filename = "filenamemorethantwentysymbols.jpg";
        //const instance = component.instance();
        expect(processFileName(filename)).toEqual('filenamemoret....jpg');
    });
    it('Leaves short file name', () => {
        const filename = "filename.jpg";
        //const instance = component.instance();
        expect(processFileName(filename)).toEqual(filename);
    });
})