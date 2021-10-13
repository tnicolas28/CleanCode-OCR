import * as fs from "fs";
import numbers from "./numbers"
    
function readFileData(filePath: string): string {
    let file: string = "";
    file = fs.readFileSync(filePath).toString();
    return file;
}

function displayInput(input : string) : void {
    for(let i = 0; i < input.length ; i++)
    {
        console.log(`${i} : ${input[i]}`);
    }
}

function parseNumber(stringTable : string): number {
    const data : string = readFileData("ocr-input.txt");
    let parsed = [0,564];
    let x = 0;
    stringTable
        .split('')
        .forEach(e=> x += e.charCodeAt(0));
    return x;
}

console.log(parseNumber(" |  |  | "));
//console.log(readFileData("ocr-input.txt"));
//displayInput(readFileData("ocr-input.txt"));
//parseNumber();
//console.log(numbers.get(2))
