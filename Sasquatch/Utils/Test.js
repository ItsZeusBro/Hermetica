import {Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        this.hex2bin()
        this.bin2hex()
        this.string2Hex()
        this.hex2String()
        this.string2Buffer()
        this.buffer2Hex()
        this.buffer2String()
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
        console.log('string2hex()')
        for(var i = 0; i<100; i++){
            var str = new Rand().str(i)
            var hex = new Utils().string2Hex(str)
            assert.equal(str, new Utils().hex2String(hex))
        }
    }

    hex2String(){
        console.log('hex2String()')
        for(var i = 0; i<100; i++){
            if(i%2==0){
                var hex = new Rand().hex(i)
                var str = new Utils().hex2String(hex)    
                assert.equal(hex, new Utils().string2Hex(str))
            }
            
        }
    }

    string2Buffer(){
        console.log('string2Buffer()')
        for(var i = 0; i<100; i++){
            var str = new Rand().str(i)
            var buffer = new Utils().string2Buffer(str)
            assert.equal(str, new Utils().buffer2String(buffer))
        }
    }
    buffer2String(){
        console.log('buffer2String()')
        for(var i = 1; i<100; i++){
            if(i%2==0){
                var buffer = new Rand().buffer(i)
                var str = new Utils().buffer2String(buffer)
                for(var i = 0; i<buffer.length; i++){
                    assert.equal(buffer[i], new Utils().string2Buffer(str)[i])
                }
            }
        }
    }

    buffer2Hex(){
        console.log('buffer2Hex()')
        for(var i = 0; i<100; i++){
            var hex = new Rand().hex(i)
            var buffer = new Utils().hex2Buffer(hex)
            assert.equal(hex, new Utils().buffer2Hex(buffer))
        }
    }



    hex2Buffer(){

    }

    bin2Decimal(){

    }

    decimal2Bin(){

    }

    objectComparator(){

    }

    str(){

    }

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

    latin(){

    }

    arabic(){

    }

    cjk(){

    }
} 

new UtilsTest()