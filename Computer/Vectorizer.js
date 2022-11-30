//Vectorizer should take encoding sets and vectorize strings to an acceptable vector form using the encoding sets
//

export class Vectorizer{
	constructor(){

	}
	asciiStringToVector(string){
		//we have 128 ascii charachters represented by 7 bit buffers
		//so whatever the ascii string length is we need to multiply it by 7
		var vector = []
		for(var i=0; i<string.length; i++){
			var bin= this.toBinary(string[i])
			for(var j =0; j<bin.length; j++){
				vector.push(bin[j])
			}
		}
		return vector
	}

	vectorToAsciiString(vector){
		var string = ''
		var char=''
		for(var i=0; i<vector.length; i++){
			if(i%8==7){
				char+=vector[i]
				string+=this.toAscii(char.slice())
				char=""
			}else{
				char+=vector[i]
			}

		}
		return string
	}

	toBinary(input) {
		var result = "";
		for (var i = 0; i < input.length; i++) {
			var bin = input[i].charCodeAt().toString(2);
			result += Array(8 - bin.length + 1).join("0") + bin;
		} 
		return result;
	}

	toAscii(input) {
		//https://gist.github.com/belohlavek/90771ccccb11100e76d1
		var result = "";
		var arr = input.match(/.{1,8}/g);
		for (var i = 0; i < arr.length; i++) {
			result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
		}
		return result;
	}

}
