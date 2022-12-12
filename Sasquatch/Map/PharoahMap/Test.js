import {PharoahMap} from "./PharoahMap.js"

class PharoahMapTest{
    constructor(){
        this.tests()
    }
    
    tests(){
        this.createMap()
    }
    getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
      }
    latinMap(){

		var latinMap = new PharoahMap().latinMap()
        var mapList=[]
        for(var i=0; i<Object.keys(latinMap).length; i++){
            var key=Object.keys(latinMap)[i]
            mapList.push({'key':key, 'value':latinMap[key]})
        }


        for(var i=0; i<Object.keys(latinMap).length; i++){
            var key=Object.keys(latinMap)[i]
            mapList.push({'key':key, 'value':latinMap[key]})
        }

	}
    // create(){
    //     var input=""
    //     var output=""
    //     var min = 6000
    //     var max = 7000
    //     for(var i =0; i<100; i++){
    //         input+=String.fromCharCode(''+this.getRandomRange(min, max))
    //         output+=String.fromCharCode(''+this.getRandomRange(min, max))
    //     }
	// 	console.log(new PharoahMap(input, output, 'english'))
	// }

	pharoahMap(){
		
	}

	cairoGlyphs(){

	}

	translate(){

	}

	_translate(){

	}

	codes(){

	}

	variableMap(){

	}

	regex(){
		
	}

	algebraMap(){

	}

	englishMap(){

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