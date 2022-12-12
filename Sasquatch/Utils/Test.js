import {Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        this.hex2bin()
        this.bin2hex()

        this.string2Hex()
        this.hex2String()

        this.string2Buffer()
        this.buffer2String()
        
        this.buffer2Hex()
        this.hex2Buffer()

        this.bin2Decimal()
        this.decimal2Bin()

        this.hex2Decimal()
        this.decimal2Hex()

    }

    hex2bin(){
        console.log('hex2bin()')
        for(var i = 0; i<200; i++){
            var hex = new Rand().hex(i)
            var bin = new Utils().hex2bin(hex)
            assert.equal(hex, new Utils().bin2hex(bin))
        }
    }
    bin2hex(){
        console.log('bin2hex()')
        for(var i = 0; i<200; i++){
            var bytes = new Rand().bytes(i)
            //console.log(bytes)
            var hex = new Utils().bin2hex(bytes)
            assert.equal(bytes, new Utils().hex2bin(hex))
        }
    }

    string2Hex(){
        console.log('string2hex()')
        for(var i = 0; i<200; i++){
            var str = new Rand().str(i)
            var hex = new Utils().string2Hex(str)
            assert.equal(str, new Utils().hex2String(hex))
        }
    }

    hex2String(){
        console.log('hex2String()')
        for(var i = 0; i<200; i++){
            if(i%2==0){
                var hex = new Rand().hex(i)
                var str = new Utils().hex2String(hex)    
                assert.equal(hex, new Utils().string2Hex(str))
            }
            
        }
    }

    string2Buffer(){
        console.log('string2Buffer()')
        for(var i = 0; i<200; i++){
            var str = new Rand().str(i)
            var buffer = new Utils().string2Buffer(str)
            assert.equal(str, new Utils().buffer2String(buffer))
        }
    }
    buffer2String(){
        console.log('buffer2String()')
        for(var i = 1; i<200; i++){
            if(i%2==0){
                var buffer = new Rand().buffer(i)
                var str = new Utils().buffer2String(buffer)
                for(var j = 0; j<buffer.length; j++){
                    assert.equal(buffer[j], new Utils().string2Buffer(str)[j])
                }
            }
        }
    }

    buffer2Hex(){
        console.log('buffer2Hex()')
        for(var i = 0; i<200; i++){
            var hex = new Rand().hex(i)
            var buffer = new Utils().hex2Buffer(hex)
            assert.equal(hex, new Utils().buffer2Hex(buffer))
        }
    }



    hex2Buffer(){
        console.log('hex2Buffer()')
        for(var i = 0; i<200; i++){
            var buffer = new Rand().buffer(i)
            var hex = new Utils().buffer2Hex(buffer)
            for(var j=0; j<buffer.length; j++){
                assert.equal(buffer[j], new Utils().hex2Buffer(hex)[j])
            }
        }
    }

    bin2Decimal(){
        console.log('bin2Decimal()')
        for(var i = 1; i<200; i++){
            var bytes = new Rand().bytes(5)
            assert.equal(parseInt(bytes, 2), new Utils().bin2Decimal(bytes))
        }
    }

    decimal2Bin(){
        console.log('decimal2Bin()')
        for(var i = 0; i<10000; i++){
            var decimal = new Rand().int(i)
            var bin = new Utils().decimal2Bin(decimal)
            console.log(decimal, bin)
            assert.equal(decimal, new Utils().bin2Decimal(bin))
        }
    }  

    hex2Decimal(){
        console.log('hex2Decimal()')
        for(var i = 5; i<20; i++){
            var hex = new Rand().hex(i)
            var decimal = new Utils().hex2Decimal(hex)
            console.log(hex, decimal)
            assert.equal(hex, new Utils().bin2hex(new Utils().decimal2Bin(decimal)))
        }
    }

    decimal2Hex(){
        console.log('decimal2Hex()')
        for(var i = 0; i<10000; i++){
            var hex = new Rand().hex(i)
            var decimal = new Utils().hex2Decimal(hex)
            console.log(hex, decimal)
            assert.equal(hex, new Utils().decimal2Hex(decimal))
        }
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