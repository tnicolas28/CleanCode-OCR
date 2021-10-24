import  Parser from "./classParser";
import { File } from "./classFile";

const filePathToParse   = process.argv[2] ?? "ocr-input.txt";
const fileNameToWriteIn = process.argv[3] ?? "output";
let parserObject        = new Parser();
let fileObject          = new File(filePathToParse,fileNameToWriteIn);

const arrayContainingSerie = parserObject.parseFile(fileObject.readFileData());
fileObject.writeOutputInFile(arrayContainingSerie);



