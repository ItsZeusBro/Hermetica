import path from "node:path"
import {createHash} from 'node:crypto'
import {Combinatorics} from "./Combinatorics/Combinatorics.js"

export class Utils{
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    //where the order matters for neighborhood construction
    nOrderedNeighborhoods(uniqueChars, dimension){
        var n = uniqueChars
        var nNeighborhoods=0
        for(var r = dimension; r<=2*dimension; r++){
            nNeighborhoods+= new Combinatorics()._CwithR(n, r)
        }
        return nNeighborhoods
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
	bin2Decimal(bin){
		return parseInt(bin, 2)
	}

	decimal2Bin(decimal){
		return Number(decimal).toString(2)
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
			// names must be equal
			return 0;
		}
	}

	
	
}

export class Rand{
    constructor(){
        this.rand=this
    }
    Str(n){return this.rand._Str(this.rand.Range(0, n))}
    Int(){return this.rand.Range(0,3)}
    Arr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.thing())}; return arr}
    thing(){
        return[
            this.rand.IntArr, this.rand.Str, this.rand.Int, this.rand.Enc, this.rand.EncArr, this.rand.StrArr,
            this.rand.Obj, this.rand.ObjArr
        ].sample()()
    }
    IntArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Int())}; return arr}

    StrArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Str())}; return arr}
    Obj(n=this.rand.Int()){if(n){return {[this.rand.Str()]:this.rand.Obj(n-1)}}else{return {}}};
    ObjArr(n=this.rand.Int()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand.Obj())}; return arr}
    Selection(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    Range(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    _Str(len, chars=this.LatinList().join('')){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    Mod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
	LatinList(){
		var latinList =[] 
		for(var i = 32; i<=126; i++){
			latinList.push(String.fromCharCode(i+''))
		}
		return latinList
	}

}