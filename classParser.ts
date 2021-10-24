import { ErrorChecker } from "./classErrorChecker"; 

enum NumberResultAfterBeingHashed {
    Zero = 2021980254,
    One  = -1511113376,
    Two  = 302713119,
    Three= 302801439,
    Four = 91790205,
    Five = 1966627615,
    Six  = 1966539203,
    Seven= 360985215,
    Eight= 1963798431,
    Nine = 1963886843
}

export default class Parser {

    errorChecker        = new ErrorChecker();
    hashedNumbersArray  = [
        NumberResultAfterBeingHashed.Zero,
        NumberResultAfterBeingHashed.One,
        NumberResultAfterBeingHashed.Two,
        NumberResultAfterBeingHashed.Three,
        NumberResultAfterBeingHashed.Four,
        NumberResultAfterBeingHashed.Five,
        NumberResultAfterBeingHashed.Six,
        NumberResultAfterBeingHashed.Seven,
        NumberResultAfterBeingHashed.Eight,
        NumberResultAfterBeingHashed.Nine
    ];


    public parseNumber(number : string) : string {
        
        let hashedNumber = -number.split('')
                       .reduce( (a,b)=>{ a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    
        if(this.errorChecker.isNumberReadable(this.hashedNumbersArray,hashedNumber))
        {
            return this.hashedNumbersArray.indexOf(hashedNumber).toString();
        }
    
        return "?";
    }
    
    
    public parseLine(line: string): string {
        let number = "";
        let lines = line.split('\n');

        if (lines[0].length > 27) {
            throw `Number of columns exceeded, maximum is 27 and you have ${lines[0].length}`;
        }

        for (let i = 0; i < lines[0].length / 3; i++) {
            number += this.parseNumber(lines[0].substring(3*i,3*(i+1)) + lines[1].substring(3*i,3*(i+1)) + lines[2].substring(3*i,3*(i+1)));
        }
    
        return number;
    }
    
    public parseFile(file: string): string[] {
        return file.split("  \n").map(line=>this.parseLine(line));
    }
}
