import {PharoahMap} from "./PharoahMap.js"
import {Utils, Rand} from "../../Utils/Utils.js"
import assert from "node:assert"
class PharoahMapTest{
    constructor(){
        this.tests()
    }
    
    tests(){
        this.latinList()
        this.cairoList()
        this.regexList()
        this.latinMap()
        this.cairoMap()
        this.variableMap()
        this.translationMap()
        this.pharoahMap()
    }
    
    pharoahMap(){
        var input=""
        var output=""
        var min = 10
        var max = 20
        var input=new Rand().Str(100)
        var output=new Rand().Str(100)
		console.log(new PharoahMap(input, output).map)
	}

    latinList(){
        console.log('latinList()')
		var latinList = new PharoahMap().latinList()
        //console.log(latinList)
        for(var i=0; i<latinList.length-1; i++){
            var latin1 = parseInt(new Utils().hex2bin(new Utils().string2Hex(latinList[i])), 2)
            var latin2 = parseInt(new Utils().hex2bin(new Utils().string2Hex(latinList[i+1])), 2)
            assert.equal(latin2-latin1, 256)
        }
	}
    regexList(){
        console.log('regexList()')
		var regexList = new PharoahMap().regexList()
        //console.log(regexList)
        for(var i=0; i<regexList.length-1; i++){
            var regex1 = parseInt(new Utils().hex2bin(new Utils().string2Hex(regexList[i])), 2)
            var regex2 = parseInt(new Utils().hex2bin(new Utils().string2Hex(regexList[i+1])), 2)
            assert.equal(regex2-regex1, 256)
        }
    }
    cairoList(){
        console.log('cairoList()')
		var cairoList = new PharoahMap().cairoList()
        //console.log(cairoList)
        for(var i=0; i<cairoList.length-1; i++){
            var cairo1 = parseInt(new Utils().hex2bin(new Utils().string2Hex(cairoList[i])), 2)
            var cairo2 = parseInt(new Utils().hex2bin(new Utils().string2Hex(cairoList[i+1])), 2)
            assert.equal(cairo2-cairo1, 256)
        }
	}

    latinMap(){
        console.log('latinMap()')
        var latinList = new PharoahMap().latinList()
		var latinMap = new PharoahMap().latinMap()
        for(var i = 0; i<latinList.length; i++){
            assert.equal(new Utils().string2Hex(latinList[i]), latinMap[latinList[i]]['hex'])
        }
    }

    cairoMap(){
        console.log('cairoMap()')
        var cairoList = new PharoahMap().cairoList()
		var cairoMap = new PharoahMap().cairoMap()
        for(var i = 0; i<cairoList.length; i++){
            assert.equal(new Utils().string2Hex(cairoList[i]), cairoMap[cairoList[i]]['hex'])
        }
	}

    regexMap(){
        console.log('regexMap()')
        var regexList = new PharoahMap().regexList()
		var regexMap = new PharoahMap().regexMap()
        for(var i = 0; i<cairoList.length; i++){
            assert.equal(new Utils().string2Hex(regexList[i]), regexMap[regexList[i]]['hex'])
        }
	}

    variableMap(){
        console.log('variableMap()')
        var input=new Rand().Str(10)
        var output=new Rand().Str(10)
        var io = input.concat(output)
        var set = new Set(io)
        var variableMap = new PharoahMap().variableMap(input, output, new PharoahMap().latinMap())
        for(var i=0; i<Object.keys(variableMap['variables']).length;i++){
            var key = Object.keys(variableMap['variables'])[i]
            assert(set.has(key), true)
        }
	}  

	translationMap(){
        console.log('translationMap()')
        var input=new Rand().Str(10)
        var output=new Rand().Str(10)
        var io = input.concat(output)
        var set = new Set(io)
        var variableMap = new PharoahMap().variableMap(input, output, new PharoahMap().latinMap())
        console.log(variableMap)
        var translationMap = new PharoahMap().translationMap(variableMap)
        for(var i=0; i<Object.keys(translationMap['variables']).length;i++){
            var key = Object.keys(translationMap['variables'])[i]
            var hex = translationMap['variables'][key]['hex']
            var bin = translationMap['variables'][key]['bin']
            var decimal = translationMap['variables'][key]['decimal']
            var code = translationMap['variables'][key]['code']
            assert(set.has(key), true)
            assert(new Utils().string2Hex(key) == hex, true)
            assert(new Utils().hex2bin(hex) == bin, true)
            assert(new Utils().bin2Decimal(bin) == decimal, true)
            assert(new PharoahMap()._translate(key, translationMap) == code, true)
        }
	}

	translate(){

	}

	_translate(){

	}



    // verifyCodeMap(map){
	// 	//convert key to binary and verify they match map encoding
	// 	for(var i = 0; i<Object.keys(map).length; i++){

	// 		var key = Object.keys(map)[i]
	// 		var hex = map[Object.keys(map)[i]]['hex']

	// 		if(this.string2Hex(key)!=hex){
	// 			throw Error('encoding error', key, hex, "should match string2Hex("+hex+") function result", this.string2Hex(key))
	// 		}
			
	// 		if(this.hex2String(hex)!=key){
	// 			throw Error('decoding error', hex, key, "should match hex2String("+hex+") function result", this.hex2String(hex))
	// 		}

	// 	}
	// }
}

new PharoahMapTest()


    // arabicList(){
    //     console.log('arabicList()')
	// 	var arabicList = new PharoahMap().arabicList()
    //     console.log(arabicList)
    //     for(var i=0; i<arabicList.length-1; i++){
    //         var arabic1 = parseInt(new Utils().hex2bin(new Utils().string2Hex(arabicList[i])), 2)
    //         var arabic2 = parseInt(new Utils().hex2bin(new Utils().string2Hex(arabicList[i+1])), 2)
    //         assert.equal(arabic2-arabic1, 256)
    //     }
	// }
    // CJKList(){
    //     console.log('CJKList()')
	// 	var cjkList = new PharoahMap().CJKList()
    //     console.log(cjkList)
    //     for(var i=0; i<cjkList.length-1; i++){
    //         var cjk1 = parseInt(new Utils().hex2bin(new Utils().string2Hex(cjkList[i])), 2)
    //         var cjk2 = parseInt(new Utils().hex2bin(new Utils().string2Hex(cjkList[i+1])), 2)
    //         assert.equal(cjk2-cjk1, 256)
    //     }
    // }