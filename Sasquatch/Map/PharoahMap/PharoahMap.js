//This is responsible for encoding strings to symbols accepted by automata, computer, and rules
//these strings are categorized by a minimal superset of codes that fully encode the string
//It doesnt even have to be the entire encoding superset, it just has to embrace enough of the superset
//to fully encode the input and output for optimal efficiency. In otherwords, we want to strip away
//extraneous symbols that encode nothing of the underlying string and its expected output.
import {Utils} from "../../Utils/Utils.js"
export class PharoahMap{

	constructor(input, output){
		this.map;
		if(input&&output){ 
			this.map = this.pharoahMap(input, output) 
		}
	}

	pharoahMap(input, output){
        var variableMap = this.variableMap(input, output, this.latinMap())
        var translationMap = this.translationMap(variableMap)
		this.map=translationMap
		this.map=this.translate(input, output, this.map)
		this.map = this.codes(this.map)
		return this.map
	}

	variableMap(input, output, map){
		//reduce the string to a minimal encoding map that is a subset of arithmetic symbols that embrace both input and output symbols
		var variables=[]
		var subset = new Set()
		var variableMap={}
		variableMap['variables']={}
		variables = input.split('');
		variables = variables.concat(output.split(''))
		for(var i = 0; i<variables.length; i++){
			subset.add(variables[i])
		}
		subset.forEach(element => {
			variableMap['variables'][element]=map[element]
		});
		return variableMap
	}

	translationMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		var cairoGlyphs=this.cairoList();
		// console.log(map)
		for(var  i = 0; i<Object.keys(map['variables']).length; i++){
			var key = Object.keys(map['variables'])[i]
			// console.log(key)
			map['variables'][key]['code']=cairoGlyphs[i]
		}
		return map
	}

	translate(input, output, map){
		map['input']=input
		map['inputVector']=this._translate(input, map).split("")
		map['output']=output
		map['outputVector']=this._translate(output, map).split("")
		return map
	}

	_translate(string, symbolMap){
		var translation=""
		for(var i = 0; i<string.length; i++){
			translation+=this._charCode(string[i], symbolMap)
		}
		return translation
	}
	_charMap(char, symbolMap){
		return symbolMap['variables'][char]
	}
	_charCode(char, symbolMap){
		return this._charMap(char, symbolMap)['code']
	}
	

	codes(map){
		var codes=[]
		for(var i = 0; i<Object.keys(map['variables']).length; i++){
			var key = Object.keys(map['variables'])[i]
			codes.push(map['variables'][key]['code'])
		}
		codes.push(' ')
		map['codes']=codes
		return map
	}



	regexList(){
		return this.latinList()		
	}

	latinMap(){
		return this.createMap(this.latinList())
	}

	cairoMap(){
		return this.createMap(this.cairoList())
	}
	regexMap(){
		return this.createMap(this.regexList())
	}

	cairoList(n){
		var cairoList =[] 
		var limit = 78025
		if(n){
			limit = 77825+n
		}
		for(var i = 77825; i<=limit; i++){
			cairoList.push(String.fromCharCode(i+''))
		}
		return cairoList
	}

	latinList(){
		var latinList =[] 
		for(var i = 32; i<=126; i++){
			latinList.push(String.fromCharCode(i+''))
		}
		return latinList
	}

	createMap(list){
		var map = {}
		for(var i = 0; i<list.length; i++){
			map[list[i]]={
				'hex':new Utils().string2Hex(list[i]), 
				'bin':new Utils().hex2bin(new Utils().string2Hex(list[i])),
				'decimal':parseInt(new Utils().hex2bin(new Utils().string2Hex(list[i])), 2)
			}
		}
		return map
	}
}
// var es = new EncodingMap("(1+1)*5=", '10', 'algebra')
// console.log(es.map)


	// arabicList(){
	// 	var arabicList =[] 
	// 	for(var i = 1536; i<=1791; i++){
	// 		arabicList.push(String.fromCharCode(i+''))
	// 	}
	// 	return arabicList
	// }

	// CJKList(){
	// 	var CJKList =[] 
	// 	for(var i = 19968; i<=20168; i++){
	// 		'\u{1F603}'
	// 		CJKList.push(String.fromCharCode(i+''))
	// 	}
	// 	return CJKList
	// }
		// algebraMap(){
	// 	//symbols:

	// 	var algebraMap=this.createMap(algebraList)
	// 	return algebraMap
	// }
	// arabicMap(){
	// 	return this.createMap(this.arabicList)
	// }