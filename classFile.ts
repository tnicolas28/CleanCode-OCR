import * as fs from "fs";
import { Checksum } from "./classChecksum";

export class File {
    private filePathToParse   : string;
    private fileNameToWriteIn : string;
    checksum = new Checksum();

    constructor (filePathToParse : string, fileNameToWriteIn : string){
        this.fileNameToWriteIn = fileNameToWriteIn;
        this.filePathToParse   = filePathToParse;
    }

    public getFilePathToParse()
    {
        return this.filePathToParse;
    }

    public getFileNameToWrinteIn()
    {
        return this.fileNameToWriteIn;
    }

    public setFilePathToParse(filePath : string)
    {
        this.filePathToParse = filePath;
    }

    public setFileNameToWriteIn(fileNameToWriteIn : string)
    {
        this.fileNameToWriteIn = fileNameToWriteIn;
    }

        
    public readFileData(): string {
        let file: string = "";
        try
        {
            file = fs.readFileSync(this.filePathToParse).toString();
            return file;
        }
        catch(e)
        {
            throw `A problem occurred : ${e}`;
        }
            
        
    }

    public addOutputLinesSuffixes(serie: string, data: string, checksum: number) {
        if (serie.includes('?')) {
            data += `${serie} ILL\n\r`;
        }

        else {
            if (this.checksum.verifyIfChecksumIsValid(checksum)) {
                data += `${serie}\n\r`;
            }

            else {
                data += `${serie} ERR\n\r`;
            }
        }

        return data;
    }

    public writeOutputInFile(arrayContainingSerie : Array<string>) : void 
    {
        let data = "CODE      STATUS\n\r";

        for(let i = 0; i < arrayContainingSerie.length; i++)
        {
            const serie     = arrayContainingSerie[i];

            this.checksum.calculateChecksum(serie);
            const checksum = this.checksum.getChecksum();
            data = this.addOutputLinesSuffixes(serie, data, checksum);
        }

        fs.writeFileSync(`outputDirectory/${this.fileNameToWriteIn}.txt`,data);
    }


}