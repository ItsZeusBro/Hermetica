//Rules must create a rule system that accepts a subset of automata codes
//that fulfills the dimensional restraints for a computation
//then they must lend themselves to the context() function which looks at a neighborhood of symbols
//If symbol sets are sufficiently large, we can be position agnostic in the rule system
//in their construction to reduce complexity and search times (which should not impact the complexity requirements)

//rules takes a set of encoding charachter codes and uses vectorizer to match a rule system
//that is created using computational charachter codes. Rules should contain the input and output used by Computer and Automata

class RuleSystem{
	constructor(){
		//we want to produce the possible dimensions of a simulation
		//that are computationally acceptable before simulation
		//we can vectorize and encode before adopting a simulation and rule strategy
		
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