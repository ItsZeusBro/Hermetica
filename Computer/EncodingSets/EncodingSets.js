//This is responsible for encoding strings to symbols accepted by automata, computer, and rules
//these strings are categorized by a minimal superset of codes that fully encode the string
//It doesnt even have to be the entire encoding superset, it just has to embrace enough of the superset
//to fully encode the input and output for optimal efficiency. In otherwords, we want to strip away
//extraneous symbols that encode nothing of the underlying string and its expected output.
class EncodingSets{
	constructor(input, output){

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
	arithmeticMap(){
		//symbols:
		return {
			'(': {'hex':this.string2Hex('('), 'bin':this.hex2bin(this.string2Hex('('))},
			')': {'hex':this.string2Hex(')'), 'bin':this.hex2bin(this.string2Hex(')'))},
			'*': {'hex':this.string2Hex('*'), 'bin':this.hex2bin(this.string2Hex('*'))},
			'+': {'hex':this.string2Hex('+'), 'bin':this.hex2bin(this.string2Hex('+'))},
			',': {'hex':this.string2Hex(','), 'bin':this.hex2bin(this.string2Hex(','))},
			'-': {'hex':this.string2Hex('-'), 'bin':this.hex2bin(this.string2Hex('-'))},
			'.': {'hex':this.string2Hex('.'), 'bin':this.hex2bin(this.string2Hex('.'))},
			'/': {'hex':this.string2Hex('/'), 'bin':this.hex2bin(this.string2Hex('/'))},
			'0': {'hex':this.string2Hex('0'), 'bin':this.hex2bin(this.string2Hex('0'))},
			'1': {'hex':this.string2Hex('1'), 'bin':this.hex2bin(this.string2Hex('1'))},
			'2': {'hex':this.string2Hex('2'), 'bin':this.hex2bin(this.string2Hex('2'))},
			'3': {'hex':this.string2Hex('3'), 'bin':this.hex2bin(this.string2Hex('3'))},
			'4': {'hex':this.string2Hex('4'), 'bin':this.hex2bin(this.string2Hex('4'))},
			'5': {'hex':this.string2Hex('5'), 'bin':this.hex2bin(this.string2Hex('5'))},
			'6': {'hex':this.string2Hex('6'), 'bin':this.hex2bin(this.string2Hex('6'))},
			'7': {'hex':this.string2Hex('7'), 'bin':this.hex2bin(this.string2Hex('7'))},
			'8': {'hex':this.string2Hex('8'), 'bin':this.hex2bin(this.string2Hex('8'))},
			'9': {'hex':this.string2Hex('9'), 'bin':this.hex2bin(this.string2Hex('9'))},
			'<': {'hex':this.string2Hex('<'), 'bin':this.hex2bin(this.string2Hex('<'))},
			'=': {'hex':this.string2Hex('='), 'bin':this.hex2bin(this.string2Hex('='))},
			'>': {'hex':this.string2Hex('>'), 'bin':this.hex2bin(this.string2Hex('>'))},
			'[': {'hex':this.string2Hex('['), 'bin':this.hex2bin(this.string2Hex('['))},
			']': {'hex':this.string2Hex(']'), 'bin':this.hex2bin(this.string2Hex(']'))},
			'^': {'hex':this.string2Hex('^'), 'bin':this.hex2bin(this.string2Hex('^'))},
			'{': {'hex':this.string2Hex('{'), 'bin':this.hex2bin(this.string2Hex('{'))},
			'}': {'hex':this.string2Hex('}'), 'bin':this.hex2bin(this.string2Hex('}'))},
			'√': {'hex':this.string2Hex('√'), 'bin':this.hex2bin(this.string2Hex('√'))},
			'∛': {'hex':this.string2Hex('∛'), 'bin':this.hex2bin(this.string2Hex('∛'))},
			'∛': {'hex':this.string2Hex('∛'), 'bin':this.hex2bin(this.string2Hex('∛'))},
			'∜': {'hex':this.string2Hex('∜'), 'bin':this.hex2bin(this.string2Hex('∜'))}
			
		}
	}

	englishMap(){
		//symbols:
		return {
			'(': {'hex':this.string2Hex('('), 'bin':this.hex2bin(this.string2Hex('('))},
			')': {'hex':this.string2Hex(')'), 'bin':this.hex2bin(this.string2Hex(')'))},
			"'": {'hex':this.string2Hex("'"), 'bin':this.hex2bin(this.string2Hex("'"))},
			'"': {'hex':this.string2Hex('"'), 'bin':this.hex2bin(this.string2Hex('"'))},
			',': {'hex':this.string2Hex(','), 'bin':this.hex2bin(this.string2Hex(','))},
			'-': {'hex':this.string2Hex('-'), 'bin':this.hex2bin(this.string2Hex('-'))},
			'.': {'hex':this.string2Hex('.'), 'bin':this.hex2bin(this.string2Hex('.'))},
			'!': {'hex':this.string2Hex('!'), 'bin':this.hex2bin(this.string2Hex('!'))},
			'0': {'hex':this.string2Hex('0'), 'bin':this.hex2bin(this.string2Hex('0'))},
			'1': {'hex':this.string2Hex('1'), 'bin':this.hex2bin(this.string2Hex('1'))},
			'2': {'hex':this.string2Hex('2'), 'bin':this.hex2bin(this.string2Hex('2'))},
			'3': {'hex':this.string2Hex('3'), 'bin':this.hex2bin(this.string2Hex('3'))},
			'4': {'hex':this.string2Hex('4'), 'bin':this.hex2bin(this.string2Hex('4'))},
			'5': {'hex':this.string2Hex('5'), 'bin':this.hex2bin(this.string2Hex('5'))},
			'6': {'hex':this.string2Hex('6'), 'bin':this.hex2bin(this.string2Hex('6'))},
			'7': {'hex':this.string2Hex('7'), 'bin':this.hex2bin(this.string2Hex('7'))},
			'8': {'hex':this.string2Hex('8'), 'bin':this.hex2bin(this.string2Hex('8'))},
			'9': {'hex':this.string2Hex('9'), 'bin':this.hex2bin(this.string2Hex('9'))},
			'&': {'hex':this.string2Hex('&'), 'bin':this.hex2bin(this.string2Hex('&'))},
			'@': {'hex':this.string2Hex('@'), 'bin':this.hex2bin(this.string2Hex('@'))},
			'a': {'hex':this.string2Hex('a'), 'bin':this.hex2bin(this.string2Hex('a'))},
			'b': {'hex':this.string2Hex('b'), 'bin':this.hex2bin(this.string2Hex('b'))},
			'c': {'hex':this.string2Hex('c'), 'bin':this.hex2bin(this.string2Hex('c'))},
			'd': {'hex':this.string2Hex('d'), 'bin':this.hex2bin(this.string2Hex('d'))},
			'e': {'hex':this.string2Hex('e'), 'bin':this.hex2bin(this.string2Hex('e'))},
			'f': {'hex':this.string2Hex('f'), 'bin':this.hex2bin(this.string2Hex('f'))},
			'g': {'hex':this.string2Hex('g'), 'bin':this.hex2bin(this.string2Hex('g'))},
			'h': {'hex':this.string2Hex('h'), 'bin':this.hex2bin(this.string2Hex('h'))},
			'i': {'hex':this.string2Hex('i'), 'bin':this.hex2bin(this.string2Hex('i'))},
			'j': {'hex':this.string2Hex('j'), 'bin':this.hex2bin(this.string2Hex('j'))},
			'k': {'hex':this.string2Hex('k'), 'bin':this.hex2bin(this.string2Hex('k'))},
			'l': {'hex':this.string2Hex('l'), 'bin':this.hex2bin(this.string2Hex('l'))},
			'm': {'hex':this.string2Hex('m'), 'bin':this.hex2bin(this.string2Hex('m'))},
			'n': {'hex':this.string2Hex('n'), 'bin':this.hex2bin(this.string2Hex('n'))},
			'o': {'hex':this.string2Hex('o'), 'bin':this.hex2bin(this.string2Hex('o'))},
			'p': {'hex':this.string2Hex('p'), 'bin':this.hex2bin(this.string2Hex('p'))},
			'q': {'hex':this.string2Hex('q'), 'bin':this.hex2bin(this.string2Hex('q'))},
			'r': {'hex':this.string2Hex('r'), 'bin':this.hex2bin(this.string2Hex('r'))},
			's': {'hex':this.string2Hex('s'), 'bin':this.hex2bin(this.string2Hex('s'))},
			't': {'hex':this.string2Hex('t'), 'bin':this.hex2bin(this.string2Hex('t'))},
			'u': {'hex':this.string2Hex('u'), 'bin':this.hex2bin(this.string2Hex('u'))},
			'v': {'hex':this.string2Hex('v'), 'bin':this.hex2bin(this.string2Hex('v'))},
			'w': {'hex':this.string2Hex('w'), 'bin':this.hex2bin(this.string2Hex('w'))},
			'x': {'hex':this.string2Hex('x'), 'bin':this.hex2bin(this.string2Hex('x'))},
			'y': {'hex':this.string2Hex('y'), 'bin':this.hex2bin(this.string2Hex('y'))},
			'z': {'hex':this.string2Hex('z'), 'bin':this.hex2bin(this.string2Hex('z'))},
			'A': {'hex':this.string2Hex('A'), 'bin':this.hex2bin(this.string2Hex('A'))},
			'B': {'hex':this.string2Hex('B'), 'bin':this.hex2bin(this.string2Hex('B'))},
			'C': {'hex':this.string2Hex('C'), 'bin':this.hex2bin(this.string2Hex('C'))},
			'D': {'hex':this.string2Hex('D'), 'bin':this.hex2bin(this.string2Hex('D'))},
			'E': {'hex':this.string2Hex('E'), 'bin':this.hex2bin(this.string2Hex('E'))},
			'F': {'hex':this.string2Hex('F'), 'bin':this.hex2bin(this.string2Hex('F'))},
			'G': {'hex':this.string2Hex('G'), 'bin':this.hex2bin(this.string2Hex('G'))},
			'H': {'hex':this.string2Hex('H'), 'bin':this.hex2bin(this.string2Hex('H'))},
			'I': {'hex':this.string2Hex('I'), 'bin':this.hex2bin(this.string2Hex('I'))},
			'J': {'hex':this.string2Hex('J'), 'bin':this.hex2bin(this.string2Hex('J'))},
			'K': {'hex':this.string2Hex('K'), 'bin':this.hex2bin(this.string2Hex('K'))},
			'L': {'hex':this.string2Hex('L'), 'bin':this.hex2bin(this.string2Hex('L'))},
			'M': {'hex':this.string2Hex('M'), 'bin':this.hex2bin(this.string2Hex('M'))},
			'N': {'hex':this.string2Hex('N'), 'bin':this.hex2bin(this.string2Hex('N'))},
			'O': {'hex':this.string2Hex('O'), 'bin':this.hex2bin(this.string2Hex('O'))},
			'P': {'hex':this.string2Hex('P'), 'bin':this.hex2bin(this.string2Hex('P'))},
			'Q': {'hex':this.string2Hex('Q'), 'bin':this.hex2bin(this.string2Hex('Q'))},
			'R': {'hex':this.string2Hex('R'), 'bin':this.hex2bin(this.string2Hex('R'))},
			'S': {'hex':this.string2Hex('S'), 'bin':this.hex2bin(this.string2Hex('S'))},
			'T': {'hex':this.string2Hex('T'), 'bin':this.hex2bin(this.string2Hex('T'))},
			'U': {'hex':this.string2Hex('U'), 'bin':this.hex2bin(this.string2Hex('U'))},
			'V': {'hex':this.string2Hex('V'), 'bin':this.hex2bin(this.string2Hex('V'))},
			'W': {'hex':this.string2Hex('W'), 'bin':this.hex2bin(this.string2Hex('W'))},
			'X': {'hex':this.string2Hex('X'), 'bin':this.hex2bin(this.string2Hex('X'))},
			'Y': {'hex':this.string2Hex('Y'), 'bin':this.hex2bin(this.string2Hex('Y'))},
			'Z': {'hex':this.string2Hex('Z'), 'bin':this.hex2bin(this.string2Hex('Z'))},
			'[': {'hex':this.string2Hex('['), 'bin':this.hex2bin(this.string2Hex('['))},
			']': {'hex':this.string2Hex(']'), 'bin':this.hex2bin(this.string2Hex(']'))}
		}

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

	english(input, output){
		//reduce the string to a minimal encoding map that is a subset of english symbols that embrace both input and output symbols

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
// var es = new EncodingSets()
// var arithmeticMap = es.mapVariables("(1+1)*5=", '10', es.arithmeticMap())
// console.log(arithmeticMap)

// var englishMap = es.mapVariables("Hello", 'World!', es.englishMap())
// console.log(englishMap)
