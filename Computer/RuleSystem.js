//Rules must create a rule system that accepts a subset of automata codes
//that fulfills the dimensional restraints for a computation
//then they must lend themselves to the context() function which looks at a neighborhood of symbols
//If symbol sets are sufficiently large, we can be position agnostic in the rule system
//in their construction to reduce complexity and search times (which should not impact the complexity requirements)

//rules takes a set of encoding charachter codes and uses vectorizer to match a rule system
//that is created using computational charachter codes. Rules should contain the input and output used by Computer and Automata
import util from 'node:util'

import { CodeMap } from "./CodeMap/CodeMap.js"
import {Clock} from "../Matrix/Coordinates.js"
class RuleSystem{
	constructor(input, output, context){
		//we want to produce the possible dimensions of a simulation
		//that are computationally acceptable before simulation
		//we can vectorize and encode before adopting a simulation and rule strategy
		this.map = new CodeMap(input, output, context).map
		this.simMap(this.map)
		if(input.length>=output.length){
			this.map['dims']=this.dims(input)
		}else{
			this.map['dims']=this.dims(output)
		}

		this.rules(this.map)
	}

	simMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		var simList=this.simList();
		for(var  i = 0; i<Object.keys(map).length; i++){
			var key = Object.keys(map)[i]
			map[key]['symbol']=simList[i]
		}
	}

	rules(map){
		//we need rules for each of the dimensions and symbols in use
		//these are based on neighborhoods which have the following properties
		//every matrix has 2^d corners
		//every corner has (n+1)^d rule configurations where n is the number of symbols that they can take
		//and 1 is the empty cell possibility 
		var symbols = this.symbols(map)
		for(var i = 0; i<Object.keys(map['dims']).length; i++){
			var dim = Object.keys(map['dims'])[i]
			map['dims'][dim]['corners']={}
			map['dims'][dim]['corners']['amount']=Math.pow(2, dim)
			map['dims'][dim]['corners']['configs']=Math.pow(Object.keys(map).length, dim)
			map['dims'][dim]['corners']['neighbors']=dim
			map['dims'][dim]['corners']['rules']=this.ruleTree(symbols, map['dims'][dim]['corners']) //this is a rule tree
		}
	}
	symbols(map){
		var symbols=[]
		for(var i = 0; i<Object.keys(map).length; i++){
			var key = Object.keys(map)[i]
			if(key!='dims'){
				//console.log(map[key]['symbol'])
				symbols.push(map[key]['symbol'])
			}
		}
		return symbols
	}
	ruleTree(symbols, cellType){
		symbols = symbols.sort()
		var coordinate1=[]
		var coordinate2=[]
		for(var i = 0; i<cellType['neighbors']; i++){
			coordinate1.push(0)
			coordinate2.push(symbols.length-1)
		}

		//console.log(symbols, cellType)
		//console.log(ticks)
		var tree = {}
		var ticks = new Clock(coordinate1, coordinate2).ticks()
		//console.log(ticks, symbols)

		for(var i = 0; i<ticks.length; i++){
			for(var j = 0; j<ticks[i].length; j++){
				this._ruleTree(symbols, ticks[i], tree)
			}
		}
		return tree
	}
	_ruleTree(symbols, ticks, tree, rule){
		//console.log(ticks)
		var i = ticks.shift()
		if(!tree[symbols[i]]&&ticks>=1){
			tree[symbols[i]]={}
			tree = tree[symbols[i]]
			this._ruleTree(symbols, ticks, tree)
		}else if(tree[symbols[i]]&&ticks>=1){
			tree = tree[symbols[i]]
			this._ruleTree(symbols, ticks, tree)
		}
		else if(!tree[symbols[i]]&&ticks==0){
			tree[symbols[i]]={}
			console.log(Object.keys(tree))

			tree[symbols[i]]['rule']=rule
			return
		}else if(tree[symbols[i]]&&ticks==0){
			tree[symbols[i]]['rule']=rule
			return
		}

	}

	neighborhood(symbols, neighbors){
		//neighbors is the number of neighbors, and symbols is the list we use to construct all the neighborhood configurations

		//we have a neighbors*symbols clock that we need to fill in
		var neighborhoods={}
		
		//we need to construct a tree based on the ticks
	}
	rule(neighborhoods, symbols){
		//the list of symbols in the neighborhood should map to a neighborhood with a rule
		//if only we could use a set as a key for an object!
		//this just works!
		symbols = symbols.sort()
		for(var i = 0; i<symbols.length; i++){
			neighborhoods = neighborhoods[symbols[i]]
		}
		return neighborhoods

	}
	dims(string){
		var l = string.length;
		var dims={}
		for(var i = 1; i<=3; i++){
			dims[i]={}
			dims[i]['m']=Math.ceil(Math.pow(l, 1/i));

		}
		return dims;
	}
	simList(){
		return [
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
		console.log(util.inspect(this.map, {showHidden: false, depth: null, colors: true}))
	}
	
}

var symbols=[]
symbols = symbols.sort()
var coordinate1=[]
var coordinate2=[]
for(var i = 0; i<cellType['neighbors']; i++){
	coordinate1.push(0)
	coordinate2.push(symbols.length-1)
}


var tree = {}
var ticks = new Clock(coordinate1, coordinate2).ticks()
//console.log(ticks, symbols)

for(var i = 0; i<ticks.length; i++){
	for(var j = 0; j<ticks[i].length; j++){
		this._ruleTree(symbols, ticks[i], tree)
	}
}

_ruleTree(symbols, ticks, tree, rule){
	//console.log(ticks)
	var i = ticks.shift()
	if(!tree[symbols[i]]&&ticks>=1){
		tree[symbols[i]]={}
		tree = tree[symbols[i]]
		this._ruleTree(symbols, ticks, tree)
	}else if(tree[symbols[i]]&&ticks>=1){
		tree = tree[symbols[i]]
		this._ruleTree(symbols, ticks, tree)
	}
	else if(!tree[symbols[i]]&&ticks==0){
		tree[symbols[i]]={}
		console.log(Object.keys(tree))

		tree[symbols[i]]['rule']=rule
		return
	}else if(tree[symbols[i]]&&ticks==0){
		tree[symbols[i]]['rule']=rule
		return
	}

}



new RuleSystem('(1+1)*(3*3)=', '36-18', 'algebra').log()
// class Rules{
// 	constructor(m, d){
// 		this.m=m
// 		this.d=d
// 		this.rule_map=this._rule_map()
// 		this.context_map=this._context_map(this.rule_map)
// 	}
// 	export(){
// 		return this.context_map
// 	}
// 	_rule_map(){
// 		//we know we have (3^(2^d)) rule possibilities because a neighbor is either 1, 0, or null
// 		//we need to map the possible contexts to these rules
// 		var map={}
// 		for(var i =0; i<Math.pow(3, 2*this.d); i++){
// 			map[i]=Math.floor(Math.random() * 2)
// 		}
// 		//the map should have a rule number along side the rule for the number
// 		return map
// 	}
// 	_context_map(rule_map){
// 		//context should interpret the rule number and call upon map to return the rule
// 		//there should be 2^d cells in any neighborhood (some neighbors are null)
// 		//we know that there are 3^(2^d) rules derived from 2^d cells
// 		var context_map={}
// 		//we want to derive a number from 0 to 3^(2^d) from the context and create a context map connected to the rule map
// 		//so if there are four neighbors max, we want to translate these combinatoric contexts into strings (we can substitute -1 for null)
// 		//we need the max number of neighbors which is 2*d (which is the number of dimensions in a coordinate plane)
// 		var coordinate1=[]
// 		var coordinate2=[]
// 		for(var i = 0; i<(2*this.d); i++){
// 			coordinate1.push(0)
// 			coordinate2.push(2)
// 		}
// 		var ticks = new Clock(coordinate1, coordinate2).ticks()
// 		for(var i = 0; i<ticks.length; i++){
// 			var string=''
// 			for(var j =0; j<ticks[i].length; j++){
				
// 				string+=ticks[i][j]
// 			}
// 			context_map[string]=this.rule_map[i]
// 		}
// 		//console.log(context_map)
// 		return context_map
// 		//(-1, -1, -1, -1) ... (1, 1, 1, 1)
// 	}
// 	context(neighborhood){
// 		//should translate neighborhood to context and return the rule using context_map connected to rule_map
// 		//console.log(neighborhood)
// 		var string=''
// 		for(var i = 0; i<neighborhood.length; i++){
			
// 			if(neighborhood[i]==null){
// 				string+=0
// 			}else if(neighborhood[i]==0){

// 				string+=1
// 			}else if(neighborhood[i]==1){

// 				string+=2
// 			}
// 		}
		
// 		return this.context_map[string]
// 	}
// }