import * as fs from "fs";

    
function readFileData(filePath: string): string {
    let file: string = "";
    file = fs.readFileSync(filePath).toString();
    return file;
}

function displayInput(input : string) : void {
    console.log(input);
    for (let i = 0; i < input.length ; i++)
    {
        console.log(`${i} : ${input[i]}`);
    }
}

function parseNumber(number : string): number {
    let parsed = [ 2021980254, -1511113376, 302713119, 302801439, 91790205, 1966627615, 1966539203, 360985215, 1963798431, 1963886843];
    let x = -number.split('')
                   .reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    return parsed.indexOf(x);
}


function parseLine(line: string): string {
    let number = "";
    let lines = line.split('\n');
    if (lines[0].length > 27) {
        throw new Error();
    }
    for (let i = 0; i < lines[0].length / 3; i++) {
        number += parseNumber(lines[0].substring(3*i,3*(i+1)) + lines[1].substring(3*i,3*(i+1)) + lines[2].substring(3*i,3*(i+1)));
    }
    return number;
}

function parseFile(file: string): string[] {
    return file.split("  \n").map(line=>parseLine(line));
}

console.log(parseFile(readFileData("ocr-input.txt")));