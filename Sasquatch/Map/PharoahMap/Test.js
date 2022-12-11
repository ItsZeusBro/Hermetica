class CodeMapTest{
    constructor(){
        this.tests()
    }
    tests(){
        this.codeMap()
    }
    codeMap(){
        
    }

    verifyCodeMap(map){
		//convert key to binary and verify they match map encoding
		for(var i = 0; i<Object.keys(map).length; i++){

			var key = Object.keys(map)[i]
			var hex = map[Object.keys(map)[i]]['hex']

			if(this.string2Hex(key)!=hex){
				throw Error('encoding error', key, hex, "should match string2Hex("+hex+") function result", this.string2Hex(key))
			}
			
			if(this.hex2String(hex)!=key){
				throw Error('decoding error', hex, key, "should match hex2String("+hex+") function result", this.hex2String(hex))
			}

		}
	}

    create(){
		
	}

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

	createMap(){

	}
}