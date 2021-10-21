"use strict";
exports.__esModule = true;
var fs = require("fs");
function readFileData(filePath) {
    var file = "";
    file = fs.readFileSync(filePath).toString();
    return file;
}
function displayInput(input) {
    console.log(input);
    for (var i = 0; i < input.length; i++) {
        console.log(i + " : " + input[i]);
    }
}
function parseNumber(number) {
    var parsed = [2021980254, -1511113376, 302713119, 302801439, 91790205, 1966627615, 1966539203, 360985215, 1963798431, 1963886843];
    var x = -number.split('')
        .reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    return parsed.indexOf(x);
}
function parseLine(line) {
    var number = "";
    var lines = line.split('\n');
    if (lines[0].length > 27) {
        throw new Error();
    }
    for (var i = 0; i < lines[0].length / 3; i++) {
        number += parseNumber(lines[0].substring(3 * i, 3 * (i + 1)) + lines[1].substring(3 * i, 3 * (i + 1)) + lines[2].substring(3 * i, 3 * (i + 1)));
    }
    return number;
}
function parseFile(file) {
    return file.split("  \n").map(function (line) { return parseLine(line); });
}
function calculateChecksum(digitSerie) {
    var checksum = 0;
    for (var i = digitSerie.length - 1, j = 1; i >= 0; i--, j++) {
        checksum += (j * Number(digitSerie[i]));
    }
    return checksum;
}
function verifyIfChecksumIsValid(checkSum) {
    if (checkSum % 11 === 0) {
        return true;
    }
    else {
        return false;
    }
}
function displaySerie(arrayContainingSerie) {
    for (var i = 0; i < arrayContainingSerie.length; i++) {
        var serie = arrayContainingSerie[i];
        var checksum_1 = calculateChecksum(serie);
        if (!verifyIfChecksumIsValid(checksum_1)) {
            console.log("\n " + serie + " \t ERR");
        }
        else {
            console.log("" + serie);
        }
    }
}
var arrayContainingNumbers = parseFile(readFileData("ocr-input.txt"));
var checksum = calculateChecksum(arrayContainingNumbers[0]);
displaySerie(arrayContainingNumbers);
