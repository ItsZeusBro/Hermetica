import {PharoahMap} from "./PharoahMap.js"
import {Utils, Rand} from "../../Utils/Utils.js"
import assert from "node:assert"
export class PharoahMapTest{
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
        console.log('pharoahMap()')
        var input=""
        var output=""
        var min = 10
        var max = 20
        var input=new Rand().Str(100)
        var output=new Rand().Str(100)
		var map = new PharoahMap(input, output).map
        this._translatationMap(map)
        this.io(input, output, map)
        this._translate(input, output, map)
        this.reverse(map)
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
        var map = new PharoahMap().variableMap(input, output, new PharoahMap().latinMap())
        this.io(input, output, map)
	}  
    io(input, output, map){
        var io = input.concat(output)
        var set = new Set(io)
        for(var i=0; i<Object.keys(map['variables']).length;i++){
            var key = Object.keys(map['variables'])[i]
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
        var translationMap = new PharoahMap().translationMap(variableMap)
        this._translatationMap(translationMap)
	}
    _translatationMap(map){
        for(var i=0; i<Object.keys(map['variables']).length;i++){
            var key = Object.keys(map['variables'])[i]
            var hex = map['variables'][key]['hex']
            var bin = map['variables'][key]['bin']
            var decimal = map['variables'][key]['decimal']
            var code = map['variables'][key]['code']
            assert(new Utils().string2Hex(key) == hex, true)
            assert(new Utils().hex2bin(hex) == bin, true)
            assert(new Utils().bin2Decimal(bin) == decimal, true)
            assert(new PharoahMap()._translate(key, map) == code, true)
        }
    }
    reverse(map){
        var keys = Object.keys(map['reverse'])
        for(var i = 0; i<keys.length; i++){
            assert.equal(map['variables'][map['reverse'][keys[i]]]['code'], keys[i])
        }
    }
  

	translate(){
        var input=new Rand().Str(10)
        var output=new Rand().Str(10)
        var io = input.concat(output)
        var set = new Set(io)
        var map = new PharoahMap(input, output).map

	}

	_translate(input, output, map){
        assert.equal(map['input'], input)
        assert.equal(map['output'], output)
        var io = new Set(input.concat(output))
        io = Array.from(io).sort()
        var symbolList = new PharoahMap().cairoList()
        var symbolMap = {}
        for(var i = 0; i<io.length; i++){
            symbolMap[io[i]]=symbolList[i]
            assert.equal(symbolMap[io[i]], new PharoahMap()._translate(io[i], map))
        }
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

}



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