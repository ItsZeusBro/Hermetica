//This is responsible for encoding strings to symbols accepted by automata, computer, and rules
//these strings are categorized by a minimal superset of codes that fully encode the string
//It doesnt even have to be the entire encoding superset, it just has to embrace enough of the superset
//to fully encode the input and output for optimal efficiency. In otherwords, we want to strip away
//extraneous symbols that encode nothing of the underlying string and its expected output.
export class CodeMap{
	constructor(input, output, context){
		this.map;
		if(context=='english'){
			this.map=this.mapVariables(input, output, this.englishMap())
		}else if(context=='algebra'){
			this.map=this.mapVariables(input, output, this.algebraMap())
		}
	}

	mapVariables(input, output, map){
		//reduce the string to a minimal encoding map that is a subset of arithmetic symbols that embrace both input and output symbols
		var io=[]
		var subset = new Set()
		var submap={}
		io = input.split('');
		io = io.concat(output.split(''))
		for(var i = 0; i<io.length; i++){
			subset.add(io[i])
		}
		subset.forEach(element => {
			submap[element]=map[element]
		  });
		return submap
	}
	algebraMap(){
		//symbols:
		var algebraList = [
			'(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'<', '=', '>', '[', ']', '^', '{', '}', '√', '∛', '∜'
		]
		var algebraMap=this.createMap(algebraList)
		
		return algebraMap
	}

	englishMap(){
		var englishArray = ['(', ')', '"', "'", ",", "-", ".", "!", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"&", "@", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
		"q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", 
		"I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
		"[", "]"]
		var englishMap = this.createMap(englishArray)
		return englishMap
	}

	createMap(list){
		var map = {}
		for(var i = 0; i<list.length; i++){
			map[list[i]]={
				'hex':this.string2Hex(list[i]), 
				'bin':this.hex2bin(this.string2Hex(list[i])),
				'decimal':parseInt(this.hex2bin(this.string2Hex(list[i])), 2)
			}
		}
		return map
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

	hex2bin(hex){
		https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
		hex = hex.replace("0x", "").toLowerCase();
		var out = "";
		for(var c of hex) {
			switch(c) {
				case '0': out += "0000"; break;
				case '1': out += "0001"; break;
				case '2': out += "0010"; break;
				case '3': out += "0011"; break;
				case '4': out += "0100"; break;
				case '5': out += "0101"; break;
				case '6': out += "0110"; break;
				case '7': out += "0111"; break;
				case '8': out += "1000"; break;
				case '9': out += "1001"; break;
				case 'a': out += "1010"; break;
				case 'b': out += "1011"; break;
				case 'c': out += "1100"; break;
				case 'd': out += "1101"; break;
				case 'e': out += "1110"; break;
				case 'f': out += "1111"; break;
				default: return "";
			}
		}
	
		return out;
	}

	string2Hex(string){
		return this.buffer2Hex(this.stringToBuffer(string))
	}
	hex2String(hex){
		return this.bufferToString(this.hex2Buffer(hex))
	}
	stringToBuffer(string){
		return Buffer.from(string, 'utf16le')
	}

	buffer2Hex(buffer){
		return  buffer.toString('hex');
	}
	bufferToString(buffer) {
		return Buffer.from(buffer).toString('utf16le')
	}
	
	hex2Buffer(hex){
		return Buffer.from(hex.trim(), 'hex')
	}
	
	calculus(input, output){
		//reduce the string to a minimal encoding map that is a subset of calculus symbols that embrace both input and output symbols

		//important observation
		//if we have a known equation in mathematics, we can produce test cases in large quantities and find the 
		//equation in a single simulation step that meets all test cases, then we can compbine simulations
		//in a larger system that can one day find its own simulation called "mathematics"
	}
	physics(input, output){
		//reduce the string to a minimal encoding map that is a subset of physics symbols that embrace both input and output symbols

	}
	regex(input, output){
		//reduce the string to a minimal encoding map that is a subset of regex symbols that embrace both input and output symbols

	}


}
// var es = new EncodingMap("(1+1)*5=", '10', 'algebra')
// console.log(es.map)
