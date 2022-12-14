import path from "node:path"
import {createHash} from 'node:crypto'
import {Combinatorics} from "./Combinatorics/Combinatorics.js"
import {Coordinates} from "./Matrix/Coordinates/Coordinates.js"

export class Utils{
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    nOrderedNeighborhoods(uniqueChars, dimension){
        var n = uniqueChars
        var nNeighborhoods=0
        for(var r = dimension; r<=2*dimension; r++){
            nNeighborhoods+= new Combinatorics()._CwithR(n, r)
        }
        return nNeighborhoods
    }

    

	objectComparator(...keys){
		return (a, b) => {
			var item1 = a
			var item2 = b
			for(var i=0; i<keys.length; i++){
				item1 = item1[keys[i]]
				item2 = item2[keys[i]]
			}
			if (item1 < item2) {
			  return -1;
			}
			if (item1 > item2) {
			  return 1;
			}
			return 0;
		}
	}
}

export class Rand{
    constructor(){
        this.rand=this
    }

	range(min, max){
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

    str(min, max){return this.rand._str(this.rand.range(min, max))}

    _str(len, chars=this.latin().join('')){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }

	latin(){
		var latin =[] 
		for(var i = 32; i<=126; i++){
			latin.push(String.fromCharCode(i+''))
		}
		return latin
	}

	bytesRangeBE(min, max){
		if(min<0||min>max){
			throw Error('byte range error: decimals points must be within nibble range 0-256')
		}
		return new Encoding().decimal2BytesBE(new Rand().range(min, max))
	}

	nibbleRange(min, max){
		if(min<0||max>16||min>max){
			throw Error('nibble range error: decimals points must be within nibble range 0-16')
		}
		return this.nibbleFormatBE(new Encoding().decimal2BytesBE(new Rand().range(min, max))) 
	}

	hexRangeBE(min, max){
		//take in decimal numbers min and max, and return a random hexidecimal number between them
		var decimal = new Rand().range(min, max)
		var bin = new Encoding().decimal2BytesBE(decimal)
		return new Encoding().bytes2HexBE(bin)
	}
	hexRangeLE(min, max){
		//take in decimal numbers min and max, and return a random hexidecimal number between them
		var decimal = new Rand().range(min, max)
		var bin = new Encoding().decimal2BytesLE(decimal)
		return new Encoding().bytes2HexLE(bin)
	}

	codeMapRange(min, max){
		var unicode={}
		for(var i = min; i<=max; i++){
			unicode[String.fromCharCode(i)]={
				'codePoint':i,
				'bin':new Encoding().decimal2BytesBE(i),
				'hex':new Encoding().decimal2HexBE(i)
			}
		}
		return unicode
    }

    codePointMapRange(min, max){
        var unicode={}
		for(var i = min; i<=max; i++){
			unicode[i]={
				'code':String.fromCharCode(i),
				'bin':new Encoding().formatBytesBE(new Encoding().decimal2BytesBE(i)),
				'hex':new Encoding().decimal2HexBE(i)
			}
		}
		return unicode
    }

//     int(n){return this.rand.range(0,n)}
//     arr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.thing())}; return arr}
//     thing(){
//         return[
//             this.rand.intArr, this.rand.str, this.rand.int, this.rand.enc, this.rand.encArr, this.rand.strArr,
//             this.rand.obj, this.rand.objArr
//         ].sample()()
//     }
//     intArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.int())}; return arr}

//     strArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.str())}; return arr}
//     obj(n=this.rand.int()){if(n){return {[this.rand.str()]:this.rand.obj(n-1)}}else{return {}}};
//     objArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.obj())}; return arr}
//     selection(bag){
//         return bag[Math.floor(Math.random() * bag.length)];
//     }


//     mod10(){
//         return Math.floor(Math.random()*(100-0+1)+0)%2
//     }

// 	arabic(){
// 		var arabic =[] 
// 		for(var i = 1536; i<=1791; i++){
// 			arabic.push(String.fromCharCode(i+''))
// 		}
// 		return arabic
	
// 	}

// 	cjk(){
// 		var cjk =[] 
// 		for(var i = 19968; i<=20168; i++){
// 			'\u{1F603}'
// 			cjk.push(String.fromCharCode(i+''))
// 		}
// 		return cjk
// 	}
// 	algebra(){

// 	}
// 	calculus(){

// 	}
// 	physics(){

// 	}
}

export class Encoding{


	buffer2StringBE(buffer){

	}

	buffer2StringLE(buffer){

	}



	nibble2ByteBE(bin){
		//this assumes Big Endianes binary number as input, so no information
		//is lost. It returns a Big Endian nibble
		return bin.slice(-4)
	}

	nibble2ByteLE(bin){
		//this assumes Little Endianes binary number as input, so no information
		//is lost. It returns a Little Endian nibble
		return bin.slice(0, 4)
	}
	



	decimal2HexBE(decimal){
		var bytes = this.decimal2BytesBE(decimal)
		return this.bytes2HexBE(bytes)
	}

	decimal2BytesBE(decimal){
		var bin=''
		if(decimal==0){return '00000000'}
		while(decimal!=0){
			if(this.isInt(decimal/2)){
				bin = '0'.concat(bin)
			}else{
				bin = '1'.concat(bin)
			}
			decimal=Math.floor(decimal/2)
		}
		return this.formatBytesBE(bin)
	}

	decimal2BytesLE(decimal){
		var bin=''
		if(decimal==0){return '00000000'}
		while(decimal!=0){
			if(this.isInt(decimal/2)){
				bin = '0'.concat(bin)
			}else{
				bin = '1'.concat(bin)
			}
			decimal=Math.floor(decimal/2)
		}
		return this.formatBytesLE(bin.split('').reverse().join(''))
	}
	
	decimal2HexLE(decimal){
		var bytes = this.decimal2BytesLE(decimal)
		return this.bytes2HexLE(bytes)
	}

	hex2BytesBE(hex){
		//https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
		hex = this.formatHexBE(hex)
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
		return out
	}

	hex2DecimalBE(hex){
		var bytes = this.hex2BytesBE(hex)
		return this.bytes2DecimalBE(bytes)
	}

	hex2StringBE(hex){

	}


	hex2BytesLE(hex){
		hex = this.formatHexLE(hex)
		var out = "";
		for(var c of hex) {
			switch(c) {
				case '0': out += "0000"; break;
				case '1': out += "1000"; break;
				case '2': out += "0100"; break;
				case '3': out += "1100"; break;
				case '4': out += "0010"; break;
				case '5': out += "1010"; break;
				case '6': out += "0110"; break;
				case '7': out += "1110"; break;
				case '8': out += "0001"; break;
				case '9': out += "1001"; break;
				case 'a': out += "0101"; break;
				case 'b': out += "1101"; break;
				case 'c': out += "0011"; break;
				case 'd': out += "1011"; break;
				case 'e': out += "0111"; break;
				case 'f': out += "1111"; break;
				default: return "";
			}
		}
		return out
	}



	
	hex2DecimalLE(hex){
		var bytes = this.hex2BytesLE(hex)
		return this.bytes2DecimalLE(bytes)
	}





	bytes2HexBE(bin){
		bin = this.formatBytesBE(bin)
		var out = "";
		var accumulator=''
		for(var c = 1; c<=bin.length; c++) {
			accumulator+=bin[c-1]
			if(c%4==0){
				switch(accumulator) {
					case "0000": out += '0'; break;
					case "0001": out += '1'; break;
					case "0010": out += '2'; break;
					case "0011": out += '3'; break;
					case "0100": out += '4'; break;
					case "0101": out += '5'; break;
					case "0110": out += '6'; break;
					case "0111": out += '7'; break;
					case "1000": out += '8'; break;
					case "1001": out += '9'; break;
					case "1010": out += 'a'; break;
					case "1011": out += 'b'; break;
					case "1100": out += 'c'; break;
					case "1101": out += 'd'; break;
					case "1110": out += 'e'; break;
					case "1111": out += 'f'; break;
					default: return "";
				}
				accumulator=""
			}
		}
		return out
	}
	bytes2HexLE(bin){
		bin = this.formatBytesLE(bin)
		var out = "";
		var accumulator=''
		for(var c = 1; c<=bin.length; c++) {
			accumulator+=bin[c-1]
			if(c%4==0){
				switch(accumulator) {
					case "0000": out += '0'; break;
					case "1000": out += '1'; break;
					case "0100": out += '2'; break;
					case "1100": out += '3'; break;
					case "0010": out += '4'; break;
					case "1010": out += '5'; break;
					case "0110": out += '6'; break;
					case "1110": out += '7'; break;
					case "0001": out += '8'; break;
					case "1001": out += '9'; break;
					case "0101": out += 'a'; break;
					case "1101": out += 'b'; break;
					case "0011": out += 'c'; break;
					case "1011": out += 'd'; break;
					case "0111": out += 'e'; break;
					case "1111": out += 'f'; break;
					default: return "";
				}
				accumulator=""
			}
		}
		return out
	}

	bytes2StringBE(hex){

	}


	bytes2DecimalBE(bin){
		var i = bin.length-1;
		var decimal=0
		var j = 0;
		while(i>=0){
			if(bin[i]=='1'){
				decimal+=Math.pow(2, j)
			}
			i--
			j++
		}
		return decimal
	}

	bytes2DecimalLE(bin){
		var i = 0
		var decimal=0
		while(i<bin.length){
			if(bin[i]=='1'){
				decimal+=Math.pow(2, i)
			}
			i++
		}
		return decimal
	}





	


	formatBytesBE(bin){
		var bytes = Math.ceil(bin.length/8)
		while(true){
			if(bin.length==8*bytes){
				break
			}else{
				bin='0'.concat(bin)
			}
		}
		return bin
	}
	
	formatBytesLE(bin){
		var bytes = Math.ceil(bin.length/8)
		while(true){
			if(bin.length==8*bytes){
				break
			}else{
				bin=bin.concat('0')
			}
		}
		return bin
	}

	formatHexBE(hex){
		if(hex.length%2!=0){
			hex = '0'.concat(hex)
		}
		return hex
	}
	
	formatHexLE(hex){
		if(hex.length%2!=0){
			hex = hex.concat('0')
		}
		return hex
	}

	isInt(n) {
		return n % 1 === 0;
	}




	// 	string2Buffer(string){
// 		string=string.slice()
// 		// console.log(Buffer.from(string))
// 		return Buffer.from(string)
// 	}

// 	buffer2Hex(buffer){
// 		return  this.strip(buffer.toString('hex'))
// 	}
// 	buffer2String(buffer) {
// 		buffer=buffer.subarray()
// 		return this._buffer2String(buffer)
// 	}
// 	hex2Buffer(hex){
// 		hex = hex.slice()
// 		return Buffer.from(this.strip(hex), 'hex')
// 	}
// 	_buffer2String(buffer){
// 		var str=''
// 		for (let pair of buffer.entries()) {
// 			// get the byte of character
// 			const charCode = pair[1];
// 			// use String.fromCharCode() to get the appropriate character
// 			// for the byte
// 			str+=String.fromCharCode(charCode)
// 		  }
// 		return str
// 	}




// 	buffer(n){
// 		return new Utils().hex2Buffer(this.hex(n))
// 	}


}