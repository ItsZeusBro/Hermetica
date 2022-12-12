import {Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        this.hex2bin()
    }

    hex2bin(){
        console.log('hex2bin()')
        for(var i = 0; i<10000; i++){
            var hex = new Rand().hex(i)
            var bin = new Utils().hex2bin(hex)
            assert.equal(hex, new Utils().bin2hex(bin))
        }

    }
    bin2hex(){

    }

    string2Hex(){
    }

    hex2String(){
    }

    stringToBuffer(){
    }

    buffer2Hex(){
    }

    bufferToString() {
    }

    hex2Buffer(){
    }

    bin2Decimal(){
    }

    decimal2Bin(){
    }

    objectComparator(){
    }

    str(){}

    int(){

    }

    arr(){

    }

    thing(){

    }

    intArr(){

    }

    strArr(){

    }

    obj(){

    }

    objArr(){

    }

    selection(){

    }

    range(){

    }

    mod10(){

    }

    latin(){}

    arabic(){

    }

    cjk(){

    }
} 

new UtilsTest()