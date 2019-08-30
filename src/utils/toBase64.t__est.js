import toBase64 from './toBase64'

describe('File conversion to base64', () => {
    it('Should convert file to base64', ()=> {
        const file = new File();
        expect(toBase64(file).result).not.toBe(null);
    })
});