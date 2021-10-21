import * as fs from "fs";

    
function readFileData(filePath: string): string {
    let file: string = "";
    file = fs.readFileSync(filePath).toString();
    return file;
}

function parseNumber(number : string) : string {
    let parsed = [ 2021980254, -1511113376, 302713119, 302801439, 91790205, 1966627615, 1966539203, 360985215, 1963798431, 1963886843];
    let hashedNumber = -number.split('')
                   .reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

    if(isNumberReadable(parsed,hashedNumber))
    {
        return parsed.indexOf(hashedNumber).toString();
    }

    return "?";
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

function calculateChecksum(digitSerie : string) : number
{
    let checksum = 0;
    for(let i = digitSerie.length - 1 , j = 1; i >= 0; i--, j++)
    {
        checksum += (j*Number(digitSerie[i]));
    }

    return checksum;
}

function verifyIfChecksumIsValid(checkSum : number)
{
    if(checkSum % 11 === 0)
    {
        return true;
    }
    
    return false;
}

function writeOutputInFile(arrayContainingSerie : Array<string>,fileName : string) : void 
{
    let data = "CODE      STATUS\n\r";

    for(let i = 0; i < arrayContainingSerie.length; i++)
    {
        const serie     = arrayContainingSerie[i];
        const checksum  = calculateChecksum(serie);
        if(serie.includes('?'))
        {
            data += `${serie} ILL\n\r`;
        }
        else
        {
            if(verifyIfChecksumIsValid(checksum))
            {
                data += `${serie}\n\r`;
            }
            else
            {
                data += `${serie} ERR\n\r`;
            }
        }
    }

    fs.writeFileSync(`${fileName}.txt`,data);
}

function isNumberReadable(arrayContainingHashedNumber : Array<number>,hash : number) : boolean
{
    if(arrayContainingHashedNumber.indexOf(hash) === -1)
    {
        return false;
    }

    return true;
}


const arrayContainingNumbers = parseFile(readFileData("ocr-input.txt"));
const checksum               = calculateChecksum(arrayContainingNumbers[0]);

writeOutputInFile(arrayContainingNumbers,'output');


