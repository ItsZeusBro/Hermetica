import {Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        this.hex2bin()
        this.bin2hex()

    }

    hex2bin(){
        console.log('hex2bin()')
        for(var i = 0; i<100; i++){
            var hex = new Rand().hex(i)
            var bin = new Utils().hex2bin(hex)
            assert.equal(hex, new Utils().bin2hex(bin))
        }
    }
    bin2hex(){
        console.log('bin2hex()')
        for(var i = 0; i<100; i++){
            var bytes = new Rand().bytes(i)
            //console.log(bytes)
            var hex = new Utils().bin2hex(bytes)
            assert.equal(bytes, new Utils().hex2bin(hex))
        }
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