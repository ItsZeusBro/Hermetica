import util from 'node:util'
import { CodeMap } from "./CodeMap/CodeMap.js"
import {CoordinateClock} from "../Matrix/Coordinates.js"
import {Neighborhood} from "./Neighborhood.js"
import {createHash} from 'node:crypto'

export class RuleSystem{
	constructor(input, output, context, dimensions){
		this.dimensions=dimensions
		this.map = new CodeMap(input, output, context).map
		this.simMap(this.map)
		this.codes(this.map)
		this.io(input, output, this.map)
		this.map['context']=context
		this.map['rules']={}
		this.map['ruleTree']={}
		//1-2 neighbors for 1 dimension; 2-4 for 2 dimensions; 3-6 for 3 dimensions; 4-8 for 4 dimensions 
		for(var i = 1; i<=8; i++){
			this.map['ruleTree'][i]={}
			this.ruleTree(this.map['ruleTree'][i],i, this.map['codes'].slice())
		}

		for(var i = 1; i<dimensions.length; i++){
			this.map['rules'][dimensions[i]]={}

			if(input.length>output.length){
				//square shape
				this.map['rules'][dimensions[i]]['shape']=Math.ceil(Math.pow(input.length, 1/dimensions[i]))
			}else{
				this.map['rules'][dimensions[i]]['shape']=Math.ceil(Math.pow(output.length, 1/dimensions[i]))
			}
			this.map['rules'][dimensions[i]]['neighborhood']=new Neighborhood()._read(this.map['rules'][dimensions[i]]['shape'], this.map['rules'][dimensions[i]]['shape'], dimensions[i])

		}
		this.rules(this.map)

		this.hash(this.map)
	}

	io(input, output, map){
		this.map['input']=input
		this.map['inputVector']=this.translate(input, map['symbols']).split("")
		this.map['output']=output
		this.map['outputVector']=this.translate(output, map['symbols']).split("")
	}


	translate(string, symbols){
		var translation=""
		for(var i = 0; i<string.length; i++){
			translation+=symbols[string[i]]['code']
		}
		return translation
	}

	simMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		var simList=this.simList();
		for(var  i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			map['symbols'][key]['code']=simList[i]
		}

	}

	rules(map){
		var symbols=this._symbols
		var rules = map['rules']
		var keys = Object.keys(rules)
		for(var i = 0; i<keys.length; i++){
			var cells = Object.keys(rules[keys[i]]['neighborhood'])
			for(var j=0; j<cells.length; j++){
				var neighborKeys = Object.keys(rules[keys[i]]['neighborhood'][cells[j]])
				for(var k=0; k<neighborKeys.length; k++){
					//rules[keys[i]]['neighborhood'][cells[j]][neighborKeys[k]]=map['codes'][Math.floor(Math.random() * map['codes'].length)]
				}
			}
		}
		
	}
	codes(map){
		var codes=[]
		for(var i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			
			codes.push(map['symbols'][key]['code'])
			
		}
		map['codes']=codes
	}



	hash(map){
		var ruleKeys = Object.keys(map['rules'])
		for(var i = 0; i<ruleKeys.length; i++){
			var rule = JSON.stringify(map['rules'][ruleKeys[i]]['neighborhood'])
			map['rules'][ruleKeys[i]]['nhHash']=createHash('sha256').update(rule).digest('hex'); 
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

	export(to, filetype){
		//filetype can be csv
		//or plain txt
		//or zip file
	}
	log(){
		//console.log(this.map)
		console.log(util.inspect(this.map, {showHidden: false, depth: 4, colors: true}))
	}

	ruleTree(tree, neighbor_count, symbols){
		console.log(symbols)
		//the number of neighborhoods is symbols.length^(neighborcount+1)
		//where 1 accounts for an empty space
		symbols.sort()
		var symbolcoord1=[]
		var symbolcoord2=[]
		for(var i = 0; i<neighbor_count; i++){
			symbolcoord1.push(0)
			symbolcoord2.push(symbols.length-1)
		}

		var coordinates = new CoordinateClock(symbolcoord1, symbolcoord2).coordinates()
		for(var i = 0; i<coordinates.length; i++){
			for(var j = 0; j<coordinates[i].length; j++){
				this._ruleTree(symbols, coordinates[i], tree)
			}
		}
	}


	_ruleTree(symbols, coordinates, tree){

		var i = coordinates.shift()
		if(!tree[symbols[i]]&&coordinates.length>=1){
			tree[symbols[i]]={}
			tree = tree[symbols[i]]
			this._ruleTree(symbols, coordinates, tree)
		}else if(tree[symbols[i]]&&coordinates.length>=1){
			tree = tree[symbols[i]]
			this._ruleTree(symbols, coordinates, tree)
		}
		else if(!tree[symbols[i]]&&coordinates.length==0){
			tree[symbols[i]]={}

			tree[symbols[i]]=symbols[Math.floor(Math.random() * symbols.length)]
			return
		}else if(tree[symbols[i]]&& coordinates.length==0){
			tree[symbols[i]]=symbols[Math.floor(Math.random() * symbols.length)] 
			return
		}
	}


	rule(neighborhood){
		//a neighborhood looks like this
	// {
	//	
	// 	'01'://some symbol,
	// 	'10'://some symbol	
	// 	
	// }
		Object.keys(neighborhood)
		//returns just a code
		return rule_set

	}

	
}


var rs = new RuleSystem('1+1=', '2', 'algebra', [1, 2, 3, 4])
rs.log()

//rs.rule(1, "00", "01")

//we can take the coordinate tree, and update it as a reference, and it should affect the matrix
