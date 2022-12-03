//Rules must create a rule system that accepts a subset of automata codes
//that fulfills the dimensional restraints for a computation
//then they must lend themselves to the context() function which looks at a neighborhood of symbols
//If symbol sets are sufficiently large, we can be position agnostic in the rule system
//in their construction to reduce complexity and search times (which should not impact the complexity requirements)

//rules takes a set of encoding charachter codes and uses vectorizer to match a rule system
//that is created using computational charachter codes. Rules should contain the input and output used by Computer and Automata
import util from 'node:util'

import { CodeMap } from "./CodeMap/CodeMap.js"
import {CoordinateClock} from "../Matrix/Coordinates.js"
import {Neighborhood} from "./Neighborhood.js"
export class RuleSystem{
	constructor(input, output, context, dimensions){
		//we want to produce the possible dimensions of a simulation
		//that are computationally acceptable before simulation
		//we can vectorize and encode before adopting a simulation and rule strategy
		this.dimensions=dimensions
		this.map = new CodeMap(input, output, context).map
		this.simMap(this.map)
		this.translations(this.map)

		this.map['input']=input
		this.map['output']=output
		this.map['context']=context
		this.map['rules']={}

		for(var i = 0; i<dimensions.length; i++){
			this.map['rules'][dimensions[i]]={}

			
			if(input.length>output.length){
				//square shape
				this.map['rules'][dimensions[i]]['shape']=Math.ceil(Math.pow(input.length, 1/dimensions[i]))
			}else{
				this.map['rules'][dimensions[i]]['shape']=Math.ceil(Math.pow(output.length, 1/dimensions[i]))
			}
			this.map['rules'][dimensions[i]]['neighborhood'] = new Neighborhood()._read(this.map['rules'][dimensions[i]]['shape'], this.map['rules'][dimensions[i]]['shape'], dimensions[i])

		}
		this.rules(this.map)
	}

	simMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		var simList=this.simList();
		for(var  i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			map['symbols'][key]['translation']=simList[i]
		}

	}
//
	rules(map){
		var symbols=this._symbols
		var rules = map['rules']
		var keys = Object.keys(rules)
		for(var i = 0; i<keys.length; i++){
			var cells = Object.keys(rules[keys[i]]['neighborhood'])
			for(var j=0; j<cells.length; j++){
				var neighbors = rules[keys[i]]['neighborhood'][cells[j]]['neighbors']
				var neighborAssociation=[]
				for(var k=0; k<neighbors.length; k++){
					neighborAssociation.push({[neighbors[k]]:map['translations'][Math.floor(Math.random() * map['translations'].length)]})
				}
				rules[keys[i]]['neighborhood'][cells[j]]['neighbors']=neighborAssociation
			}
		}
		
	}
	translations(map){
		var translations=[]
		for(var i = 0; i<Object.keys(map['symbols']).length; i++){
			var key = Object.keys(map['symbols'])[i]
			
			translations.push(map['symbols'][key]['translation'])
			
		}
		map['translations']=translations
	}


	rule(symbols){
		//based on the number of symbols, return the proper rule
		var neighbor_count = symbols.length;
		var rule_set = this.map['neighborhoods'][neighbor_count]
		for(var i = 0; i<symbols.length; i++){
			rule_set = rule_set[symbols[i]]
		}
		return rule_set
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

	log(){
		//console.log(this.map)
		console.log(util.inspect(this.map, {showHidden: false, depth: null, colors: true}))
	}
	
}

//4 neighbors works for up to 2 dimensions; 
//6 neighbors works for up to 3 dimensions; 
//8 neighbors works for up to 4 dimensions (4 dimension rule sets gives a core dump)
// var symbols = [' ', String.fromCharCode('77825'), String.fromCharCode('77826')]

var rs = new RuleSystem('1+1=', '2', 'algebra', [1, 2, 3, 4])
rs.log()
// console.log(rs.rule(symbols))





// for(var i = 0; i<Object.keys(profile).length; i++){
// 	//we want to hash the neighbor profile so we can do a quick check
// 	//we want this hash to match rule hash
// 	var neighborhoodSig = profile[Object.keys(profile)[i]]['neighbors'].sort()
// 	neighborhoodSig = createHash('sha256').update(JSON.stringify(neighborhoodSig)).digest('hex');
// 	profile[Object.keys(profile)[i]]['signature']=neighborhoodSig
// }