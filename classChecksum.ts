export class Checksum {

    checksumValue : number = 1;

    public calculateChecksum(digitSerie : string) : void
    {
        let calculatedChecksum = 0;

        for(let positionFromEnd = digitSerie.length - 1 , positionFromBeginning = 1; positionFromEnd >= 0; positionFromEnd--, positionFromBeginning++)
        {
            calculatedChecksum += (positionFromBeginning*Number(digitSerie[positionFromEnd]));
        }

        this.setChecksum(calculatedChecksum);
    }

    public verifyIfChecksumIsValid(checkSum : number)
    {
        if(checkSum % 11 === 0)
        {
            return true;
        }
        
        return false;
    }

    public getChecksum() : number {
        return this.checksumValue;
    }

    public setChecksum(checksumValue : number) : void {
        this.checksumValue = checksumValue;
    }
}