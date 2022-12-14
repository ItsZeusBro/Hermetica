import {Encoding, Utils, Rand} from "./Utils.js"
import assert from "node:assert"
export class UtilsTest{

    constructor(){
        // this.hex2bin()
        // this.bin2hex()

        // this.string2Hex()
        // this.hex2String()
        // this._buffer2String()
        // this.string2Buffer()
        // this.buffer2String()
        
        // this.buffer2Hex()
        // this.hex2Buffer()

        // this.bin2Decimal()
        // this.decimal2Bin()

        // this.hex2Decimal()
        // this.decimal2Hex()
        this.range()
        this.str()
        this.decimal2BinBE()
        //this._decimal2BinLE()

    }
    str(){
        for(var i = 0; i<10; i++){
            var inclusive=false
            var j = 100;
            while(inclusive==false){
                j++
                var str = new Rand().str(i, j)
                assert.equal(str.length<=j, true)
                assert.equal(str.length>=i, true)
                if(str.length==j||str.length==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }
    range(){
        for(var i = 0; i<10; i++){
            var inclusive=false
            var j = 100;
            while(inclusive==false){
                j++
                var number = new Rand().range(i, j)
                assert.equal(number<=j, true)
                assert.equal(number>=i, true)
                if(number==j||number==i){
                    inclusive=true
                    break
                }
            }
            assert.equal(inclusive, true)
        }
    }

    decimal2BinBE(){
        for(var i = 0; i<=1114111; i++){
            //javascript assumes parseInt is little endian
            assert.equal(parseInt(new Encoding().decimal2BinBE(i).split('').reverse().join(''), 2)==i, true)
        }
    }
    // _buffer2String(){
    //     var buff = new Encoding().string2Buffer('hello world!')
    //     var string = new Encoding()._buffer2String(buff)
    //     console.log(string)
    // }
    // hex2bin(){
    //     console.log('hex2bin()')
    //     for(var i = 1; i<200; i++){
    //         var hex = new Encoding().hex(i)
    //         var bin = new Encoding().hex2bin(hex)
    //         assert.equal(hex, new Encoding().bin2hex(bin))
    //     }
    // }
    // bin2hex(){
    //     console.log('bin2hex()')
    //     for(var i = 0; i<200; i++){
    //         var bytes = new Encoding().bytes(i)
    //         var hex = new Encoding().bin2hex(bytes)
    //         assert.equal(bytes, new Encoding().hex2bin(hex))
    //     }
    // }

    // string2Hex(){
    //     console.log('string2hex()')
    //     for(var i = 10; i<200; i++){
    //         var str = new Rand().str(i)
    //         var hex = new Encoding().string2Hex(str)
    //         console.log('a;lgkas;dglk', str, hex)
    //         assert.equal(str, new Encoding().hex2String(new Encoding().strip(hex)))
    //     }
    // }

    // hex2String(){
    //     console.log('hex2String()')
    //     for(var i = 1; i<100; i++){
    //         if(i%2==0){
    //             var hex = new Encoding().hex(i)
    //             var str = new Encoding().hex2String(hex)  
    //             console.log(hex, str)  
    //             assert.equal(hex, new Encoding().string2Hex(str))
    //         }
            
    //     }
    // }

    // string2Buffer(){
    //     console.log('string2Buffer()')
    //     for(var i = 0; i<200; i++){
    //         var str = new Rand().str(i)
    //         var buffer = new Encoding().string2Buffer(str)
    //         assert.equal(str, new Encoding().buffer2String(buffer))
    //     }
    // }
    // buffer2String(){
    //     console.log('buffer2String()')
    //     for(var i = 1; i<200; i++){
    //         if(i%2==0){
    //             var buffer = new Rand().buffer(i)
    //             var str = new Utils().buffer2String(buffer)
    //             for(var j = 0; j<buffer.length; j++){
    //                 assert.equal(buffer[j], new Utils().string2Buffer(str)[j])
    //             }
    //         }
    //     }
    // }

    // buffer2Hex(){
    //     console.log('buffer2Hex()')
    //     for(var i = 0; i<200; i++){
    //         var hex = new Rand().hex(i)
    //         var buffer = new Utils().hex2Buffer(hex)
    //         assert.equal(hex, new Utils().buffer2Hex(buffer))
    //     }
    // }

    // hex2Buffer(){
    //     console.log('hex2Buffer()')
    //     for(var i = 0; i<200; i++){
    //         var buffer = new Rand().buffer(i)
    //         var hex = new Utils().buffer2Hex(buffer)
    //         for(var j=0; j<buffer.length; j++){
    //             assert.equal(buffer[j], new Utils().hex2Buffer(hex)[j])
    //         }
    //     }
    // }

    // bin2Decimal(){
    //     console.log('bin2Decimal()')
    //     for(var i = 1; i<200; i++){
    //         var bytes = new Rand().bytes(5)
    //         assert.equal(parseInt(bytes, 2), new Utils().bin2Decimal(bytes))
    //     }
    // }

    // decimal2Bin(){
    //     console.log('decimal2Bin()')
    //     for(var i = 0; i<10000; i++){
    //         var decimal = new Rand().int(i)
    //         var bin = new Utils().decimal2Bin(decimal)
    //         assert.equal(decimal, new Utils().bin2Decimal(bin))
    //     }
    // }  

    // hex2Decimal(){
    //     console.log('hex2Decimal()')
    //     for(var i = 5; i<20; i++){

    //         var hex = new Rand().hex(i)
    //         var decimal = new Utils().hex2Decimal(hex)
    //         // console.log(hex, decimal)
    //         assert.equal(new Utils().hex2bin(hex), new Utils().decimal2Bin(decimal))
    //     }
    // }

    // decimal2Hex(){
    //     console.log('decimal2Hex()')
    //     for(var i = 0; i<10000; i++){
    //         var hex = new Rand().hex(i)
    //         var decimal = new Utils().hex2Decimal(hex)
    //         // console.log(hex, decimal)
    //         assert.equal(hex, new Utils().decimal2Hex(decimal))
    //     }
    // }

    // objectComparator(){

    // }



    // int(){

    // }

    // arr(){

    // }

    // thing(){

    // }

    // intArr(){

    // }

    // strArr(){

    // }

    // obj(){

    // }

    // objArr(){

    // }

    // selection(){

    // }

    // range(){

    // }

    // mod10(){

    // }

    // latin(){

    // }

    // arabic(){

    // }

    // cjk(){

    // }
} 

new UtilsTest()