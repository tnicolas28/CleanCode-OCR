export class ErrorChecker{
    
    public isNumberReadable(arrayContainingHashedNumber : Array<number>,hash : number) : boolean
    {
        if(arrayContainingHashedNumber.indexOf(hash) === -1)
        {
            return false;
        }

        return true;
    }

}