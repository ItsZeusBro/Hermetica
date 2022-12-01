//Rules must create a rule system that accepts a subset of automata codes
//that fulfills the dimensional restraints for a computation
//then they must lend themselves to the context() function which looks at a neighborhood of symbols
//If symbol sets are sufficiently large, we can be position agnostic in the rule system
//in their construction to reduce complexity and search times (which should not impact the complexity requirements)

//rules takes a set of encoding charachter codes and uses vectorizer to match a rule system
//that is created using computational charachter codes. Rules should contain the input and output used by Computer and Automata

import { CodeMap } from "./CodeMap/CodeMap"
class RuleSystem{
	constructor(input, output, context){
		//we want to produce the possible dimensions of a simulation
		//that are computationally acceptable before simulation
		//we can vectorize and encode before adopting a simulation and rule strategy
		this.map = CodeMap(input, output, context)
		this.simMap(this.map)
	}

	simMap(map){
		//this should produce a minimal simulation map of ascii art that is mapped to the charachter encodings of the input and output
		for(var  i = 0; i<Object.keys(map).length; i++){
			var key = Object.keys(map)[i]
			map[key]
		}
	}

	simList(){
		return [
			String.fromCharCode('9632'), String.fromCharCode('9635'),
			String.fromCharCode('9636'), String.fromCharCode('9637'), 
			String.fromCharCode('9638'), String.fromCharCode('9639'),
			String.fromCharCode('9640'), String.fromCharCode('9641'), 
			String.fromCharCode('9642'), String.fromCharCode('9643'),
			String.fromCharCode('9644'), String.fromCharCode('9645'), 
			String.fromCharCode('9646'), String.fromCharCode('9647'),
			String.fromCharCode('9648'), String.fromCharCode('9649'), 
			String.fromCharCode('9650'), String.fromCharCode('9651'),
			String.fromCharCode('9652'), String.fromCharCode('9653'), 
			String.fromCharCode('9654'), String.fromCharCode('9655'),
			String.fromCharCode('9656'), String.fromCharCode('9657'), 
			String.fromCharCode('9658'), String.fromCharCode('9659'),
			String.fromCharCode('9660'), String.fromCharCode('9661'), 
			String.fromCharCode('9662'), String.fromCharCode('9663'),

			String.fromCharCode('9664'), String.fromCharCode('9665'),
			String.fromCharCode('9666'), String.fromCharCode('9667'), 
			String.fromCharCode('9668'), String.fromCharCode('9669'),
			String.fromCharCode('9670'), String.fromCharCode('9671'), 
			String.fromCharCode('9672'), String.fromCharCode('9673'),
			String.fromCharCode('9674'), String.fromCharCode('9675'), 
			String.fromCharCode('9676'), String.fromCharCode('9677'),
			String.fromCharCode('9678'), String.fromCharCode('9679'), 
			String.fromCharCode('9680'), String.fromCharCode('9681'),
			String.fromCharCode('9682'), String.fromCharCode('9683'), 
			String.fromCharCode('9684'), String.fromCharCode('9685'),
			String.fromCharCode('9686'), String.fromCharCode('9687'), 
			String.fromCharCode('9688'), String.fromCharCode('9689'),
			String.fromCharCode('9690'), String.fromCharCode('9691'), 
			String.fromCharCode('9692'), String.fromCharCode('9693'),

			String.fromCharCode('9694'), String.fromCharCode('9695'),
			String.fromCharCode('9696'), String.fromCharCode('9697'), 
			String.fromCharCode('9698'), String.fromCharCode('9699'),
			String.fromCharCode('9700'), String.fromCharCode('9701'), 
			String.fromCharCode('9702'), String.fromCharCode('9703'),
			String.fromCharCode('9704'), String.fromCharCode('9705'), 
			String.fromCharCode('9706'), String.fromCharCode('9707'),
			String.fromCharCode('9708'), String.fromCharCode('9709'), 
			String.fromCharCode('9710'), String.fromCharCode('9711'),
			String.fromCharCode('9712'), String.fromCharCode('9713'), 
			String.fromCharCode('9714'), String.fromCharCode('9715'),
			String.fromCharCode('9716'), String.fromCharCode('9717'), 
			String.fromCharCode('9718'), String.fromCharCode('9719'),
			String.fromCharCode('9720'), String.fromCharCode('9721'), 
			String.fromCharCode('9722'), String.fromCharCode('9723'),
			String.fromCharCode('9724'), String.fromCharCode('9725'),
			String.fromCharCode('9726'), String.fromCharCode('9727')
		]
	}
	
}



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