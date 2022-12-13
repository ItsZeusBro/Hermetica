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

    hex2bin(hex){
		//https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
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
		
		return this.binFormat(out);
	}
	bin2hex(bin){
		bin = this.binFormat(bin)
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
		return this.hexFormat(out);
	}
	bin2Decimal(bin){
		//start from the right
		bin=this.binFormat(bin)
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

	decimal2Bin(decimal){
		var bin=""
		var i = 0
		console.log(decimal)
		while(true){
			if(decimal>Math.pow(2, i)){
				bin = bin.concat('0')
				i++
			}else if(decimal<=Math.pow(2, i)){
				bin = bin.concat('0')
				break
			}
		}

		bin = this.binFormat(bin)
		var count=0
		i=bin.length-1
		for(var j=0; j<bin.length; j++){
			if(count+Math.pow(2, i)<decimal){
				bin = this.setCharAt(bin, j, '1')
				count+=Math.pow(2, i)
			}else if(count+Math.pow(2, i)==decimal){
				bin = this.setCharAt(bin, j, '1')
				break
			}else{
				//count+Math.pow(2, i)>decimal
				
			}
			i--
		}
		
		return this.binFormat(bin)
	}

	setCharAt(str, index, chr) {
		return str.substring(0, index) + chr + str.substring(index+1);
	}

	decimal2Hex(decimal){
		return this.hexFormat(this.bin2hex(this.decimal2Bin(decimal)))
	}
	hex2Decimal(hex){
		return this.bin2Decimal(this.binFormat(this.hex2bin(hex)))
	}

	string2Hex(string){
		return this.hexFormat(this.buffer2Hex(this.string2Buffer(string)))
	}
	hex2String(hex){
		return this.buffer2String(this.hex2Buffer(this.strip(hex)))
	}
	string2Buffer(string){
		return Buffer.from(string, 'utf16le')
	}

	buffer2Hex(buffer){
		return  this.hexFormat(buffer.toString('hex'))
	}
	buffer2String(buffer) {
		return Buffer.from(buffer).toString('utf16le')
	}
	
	hex2Buffer(hex){
		return Buffer.from(this.strip(hex), 'hex')
	}

	binFormat(bin){
		bin = this.strip(bin)
		while(true){
			if(bin.length%8==0){
				break
			}else{
				bin='0'.concat(bin)
			}
		}
		return bin
	}
	strip(str){
		for(var i = 0; i<str.length; i++){
			if(str[i]==0){
				str = str.slice(1)
			}
		}
		return str
	}
	hexFormat(hex){
		hex = this.strip(hex)
		while(true){
			if(hex.length%8==0){
				break
			}else{
				hex='0'.concat(hex)
			}
		}
		return hex
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
    str(n){return this.rand._str(this.rand.range(0, n))}
    int(n){return this.rand.range(0,n)}
    arr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.thing())}; return arr}
    thing(){
        return[
            this.rand.intArr, this.rand.str, this.rand.int, this.rand.enc, this.rand.encArr, this.rand.strArr,
            this.rand.obj, this.rand.objArr
        ].sample()()
    }
    intArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.int())}; return arr}

    strArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.str())}; return arr}
    obj(n=this.rand.int()){if(n){return {[this.rand.str()]:this.rand.obj(n-1)}}else{return {}}};
    objArr(n=this.rand.int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.obj())}; return arr}
    selection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    range(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    _str(len, chars=this.latin().join('')){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    mod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
	latin(){
		var latin =[] 
		for(var i = 32; i<=126; i++){
			latin.push(String.fromCharCode(i+''))
		}
		return latin
	}
	arabic(){
		var arabic =[] 
		for(var i = 1536; i<=1791; i++){
			arabic.push(String.fromCharCode(i+''))
		}
		return arabic
	
	}
	hex(n){
		var hex = new Utils().bin2hex(this.bytes(n))
		return new Utils().hexFormat(hex)
	}
	buffer(n){
		return new Utils().hex2Buffer(this.hex(n))
	}

	nibbles(n){
		var nibbles=''
		for(var i = 0; i<n; i++){
			for(var j = 0; j<4; j++){
				nibbles+=this.mod10()
			}
		}
		return nibbles
	}
	bytes(n){
		var bytes=''
		for(var i = 0; i<n; i++){
			for(var j = 0; j<8; j++){
				bytes+=this.mod10()
			}
		}
		return bytes
	}
	cjk(){
		var cjk =[] 
		for(var i = 19968; i<=20168; i++){
			'\u{1F603}'
			cjk.push(String.fromCharCode(i+''))
		}
		return cjk
	}
	algebra(){

	}
	calculus(){

	}
	physics(){

	}
}