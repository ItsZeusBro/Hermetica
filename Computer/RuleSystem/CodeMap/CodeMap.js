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
		this.simMap(this.map)
		this.codes(this.map)
		this.io(input, output, this.map)
		this.map['context']=context

	}
	simMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		var simList=this.simList();
		for(var  i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			map['symbols'][key]['code']=simList[i]
		}
	}

	simList(){
		return [
			' ',
			String.fromCharCode('77825'), 
			String.fromCharCode('77826'), String.fromCharCode('77827'),
			String.fromCharCode('77828'), String.fromCharCode('77829'), 
			String.fromCharCode('77830'), String.fromCharCode('77831'),
			String.fromCharCode('77832'), String.fromCharCode('77833'), 
			String.fromCharCode('77834'), String.fromCharCode('77835'),
			String.fromCharCode('77836'), String.fromCharCode('77837'), 
			String.fromCharCode('77838'), String.fromCharCode('77839'),
			String.fromCharCode('77840'), String.fromCharCode('77841'), 
			String.fromCharCode('77842'), String.fromCharCode('77843'),
			String.fromCharCode('77844'), String.fromCharCode('77845'), 
			String.fromCharCode('77846'), String.fromCharCode('77847'),
			String.fromCharCode('77848'), String.fromCharCode('77849'), 
			String.fromCharCode('77850'), String.fromCharCode('77851'),
			String.fromCharCode('77852'), String.fromCharCode('77853'), 
			String.fromCharCode('77854'), String.fromCharCode('77855'),
			String.fromCharCode('77856'), String.fromCharCode('77857'),
			String.fromCharCode('77858'), String.fromCharCode('77859'), 
			String.fromCharCode('77860'), String.fromCharCode('77861'),
			String.fromCharCode('77862'), String.fromCharCode('77863'), 
			String.fromCharCode('77864'), String.fromCharCode('77865'),
			String.fromCharCode('77866'), String.fromCharCode('77867'), 
			String.fromCharCode('77868'), String.fromCharCode('77869'),
			String.fromCharCode('77870'), String.fromCharCode('77871'), 
			String.fromCharCode('77872'), String.fromCharCode('77873'),
			String.fromCharCode('77874'), String.fromCharCode('77875'), 
			String.fromCharCode('77876'), String.fromCharCode('77877'),
			String.fromCharCode('77878'), String.fromCharCode('77879'), 
			String.fromCharCode('77880'), String.fromCharCode('77881'),
			String.fromCharCode('77882'), String.fromCharCode('77883'), 
			String.fromCharCode('77884'), String.fromCharCode('77885'),
			String.fromCharCode('77886'), String.fromCharCode('77887'),
			String.fromCharCode('77888'), String.fromCharCode('77889'), 
			String.fromCharCode('77890'), String.fromCharCode('77891'),
			String.fromCharCode('77892'), String.fromCharCode('77893'), 
			String.fromCharCode('77894'), String.fromCharCode('77895'),
			String.fromCharCode('77896'), String.fromCharCode('77897'), 
			String.fromCharCode('77898'), String.fromCharCode('77899'),
			String.fromCharCode('77900'), String.fromCharCode('77901'), 
			String.fromCharCode('77902'), String.fromCharCode('77903'),
			String.fromCharCode('77904'), String.fromCharCode('77905'), 
			String.fromCharCode('77906'), String.fromCharCode('77907'),
			String.fromCharCode('77908'), String.fromCharCode('77909'), 
			String.fromCharCode('77910'), String.fromCharCode('77911'),
			String.fromCharCode('77912'), String.fromCharCode('77913'), 
			String.fromCharCode('77914'), String.fromCharCode('77915'),
			String.fromCharCode('77916'), String.fromCharCode('77917'),
			String.fromCharCode('77918'), String.fromCharCode('77919'), 
			String.fromCharCode('77920'), String.fromCharCode('77921'), 
			String.fromCharCode('77922'), String.fromCharCode('77923'),
			String.fromCharCode('77924'), String.fromCharCode('77925'), 
			String.fromCharCode('77926'), String.fromCharCode('77927'),
			String.fromCharCode('77928'), String.fromCharCode('77929'), 
			String.fromCharCode('77930'), String.fromCharCode('77931'),
			String.fromCharCode('77932'), String.fromCharCode('77933'), 
			String.fromCharCode('77934'), String.fromCharCode('77935'),
			String.fromCharCode('77936'), String.fromCharCode('77937'),
			String.fromCharCode('77938'), String.fromCharCode('77939'), 
			String.fromCharCode('77940'), String.fromCharCode('77941'),
			String.fromCharCode('77942'), String.fromCharCode('77943'), 
			String.fromCharCode('77944'), String.fromCharCode('77945'),
			String.fromCharCode('77946'), String.fromCharCode('77947'),
			String.fromCharCode('77948'), String.fromCharCode('77949'), 
			String.fromCharCode('77950'), String.fromCharCode('77951'),
			String.fromCharCode('77952')

			//there are almost a 1000 more of these we can use if we run out! The last one is String.fromCharCode('78895')
		]
	}

	io(input, output, map){
		map['input']=input
		map['inputVector']=this.translate(input, map['symbols']).split("")
		map['output']=output
		map['outputVector']=this.translate(output, map['symbols']).split("")
	}

	translate(string, symbols){
		var translation=""
		for(var i = 0; i<string.length; i++){
			translation+=symbols[string[i]]['code']
		}
		return translation
	}

	codes(map){
		var codes=[]
		for(var i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			codes.push(map['symbols'][key]['code'])
		}
		map['codes']=codes
	}

	mapVariables(input, output, map){
		//reduce the string to a minimal encoding map that is a subset of arithmetic symbols that embrace both input and output symbols
		var io=[]
		var subset = new Set()
		var submap={}
		submap['symbols']={}
		io = input.split('');
		io = io.concat(output.split(''))
		for(var i = 0; i<io.length; i++){
			subset.add(io[i])
		}
		subset.forEach(element => {
			submap['symbols'][element]=map[element]
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
		var englishArray = [' ','(', ')', '"', "'", ",", "-", ".", "!", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
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
