import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
import {Utils} from "../Utils/Utils.js"

export class RuleTree{
    constructor(map){
		this.map = map
		this.create(map)
    }
	
	create(map){
		if(this.exists(map, true)){
			//this means we have an absolute match on the neighborhood tree and the rules
			this.import(map)
			return
		}// }else if(this.exists(map, false)){
		// 	//we are only checking for the maps existence, we can
		// 	//refresh with map['rules'] if they exist
		// 	//or refresh with random rules if they dont
		// 	this.import(map)
		// 	if(map['rules']){
		// 		this.refresh(map, map['rules'])
		// 	}else{
		// 		this.refresh(map)
		// 	}
		// }
		else{
			//creating a rule tree from scratch with map['rules'] if they exist
			//or randomly if they dont
			//1-2 neighbors for 1 dimension; 
			//2-4 for 2 dimensions; 
			//3-6 for 3 dimensions; 
			//4-8 for 4 dimensions 
			this.map['codes']=this.map['codes'].sort()
			this.map['ruleTree']={}
			this.map['ruleTree']['neighborhoods']={}
			if(!map['rules']){ map['rules']=[] }
			for(var neighbor_count=this.map['dimension']; neighbor_count<=2*this.map['dimension']; neighbor_count++){
				this.map['ruleTree'][neighbor_count]={}
				this.ruleTree(
					this.map['codes'].slice(), 
					neighbor_count, 
					this.map['ruleTree'][neighbor_count], 
					map['rules'], 
					this.map['ruleTree']['neighborhoods']
				)
				console.log(this.map)
			}
			this.exprt(this.map)
		}		
	}
	treeInsert(tree, neighborhood, rule){
		for(var i=0; i<neighborhood.length; i++){
			if(tree[neighborhood[i]]){
				tree = tree[neighborhood[i]]
			}else{
				if(i!=neighborhood.length-1){
					tree[neighborhood[i]]={}
					tree = tree[neighborhood[i]]
				}else{
					tree[neighborhood[i]]=rule
				}

			}
		}
	}
	//these neighborhoods stay forever, so efficiency is not a huge deal
	ruleTree(codes, n, tree={}, rules=[], neighborhoods={}){
		//add neighborhoods of size n for all codes 
		codes.sort()
		codes.reverse()
		neighborhoods[n]=[]

		for(var j = 0; j<codes.length; j++){
			var prev;
			do{
				prev = this.nextNeighborhood(codes, codes[j], prev, n)
				if(prev){
					if(rules.length){
						this.treeInsert(tree, prev, rules[0])
						rules.shift()
					}else{
						var rule=this.randomRule(codes)
						rules.push(rule)
						this.treeInsert(tree, prev, rule)
					}
					console.log(prev)
					neighborhoods[n].push(prev.slice())
				}
			}while(prev)
			//when prev returns null, we start with the next code
		}
		return tree
	}

	randomRule(symbols){
		return symbols[Math.floor(Math.random() * symbols.length)]
	}
	nextNeighborhood(codes, code, prev, n){
		//find the next neighborhood starting with code, using codes, for a neighborhood with n neighbors
		//using the prev neighborhood
		if(prev){
			//prev starts with a code that we cannot change, all the others can be changed in descending order
			//the rule is the following
			//decrement the last code by one (in prev), if its at the base code (the last code in codes)
			//decrement the second to last code by one, if that is at the base code (the last code in codes)
			//decrement the third to last... if we reach the first code, and there is nothing to decrement
			//return null
			for(var i=prev.length-1; i>=0; i--){
				if(i==0){
					//this means we changed nothing in prev
					//we need to return null
					return
				}else{
					if(prev[i]==codes[codes.length-1]){
						//we need to find the most significant code
						//so we need to reverse search for a code in prev that is not equal to codes[codes.length-1]
						//we need to decrement that code by 1, and
						for(var j=i; j>0; j--){
							if(prev[j]!=codes[codes.length-1]){
								prev[j]=codes[codes.indexOf(prev[j])+1]
								var c=prev[j]
								// then have all the antecedent codes match that significant code
								for(var k=j+1; k<prev.length; k++){
									prev[k]=c
								}
								return prev
							}
						}

					}else{
						//this is the best case scenario, we just decrement prev[i]
						//and return
						prev[i]=codes[codes.indexOf(prev[i])+1]
						return prev
					}
				}
			}

		}else{
			//send back the first in the set
			//the rule for this is a list of n length all positions having the same code
			prev=[]
			for(var i = 0; i<n; i++){
				prev.push(code)
			}
			return prev
		}
	}

	rule(neighborhood){
		//a neighborhood looks like this
		//console.log(neighborhood, neighbor_codes, neighbor_count)
		var neighbor_keys = Object.keys(neighborhood)
		var neighbor_count = neighbor_keys.length
		var neighbor_codes = []
		for(var i = 0; i<neighbor_count; i++){
			neighbor_codes.push(neighborhood[neighbor_keys[i]])
		}
		neighbor_codes.sort()
		var rule = this.map['ruleTree'][neighbor_count]
		for(var i = 0; i<neighbor_count; i++){
			rule = rule[neighbor_codes[i]]
		}
		//returns just a code
		return rule
	}


	exists(map, rules){
		if(rules){
			if(map['rules']){
				var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
				path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'_'+this.hash(map['rules'])+'.RuleTree'
				return fs.existsSync(path)
			}else{
				return false
			}

		}else{
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
			return fs.existsSync(path)
		}

	}

	exprt(map, rules){
		if(rules){
			if(map['rules']){
				var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
				path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'_'+this.hash(map['rules'])+'.RuleTree'
				fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))
			}else{
				return false
			}
		}else{
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
			fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))

		}

	}

	import(map, rules){
		if(rules){
			if(map['rules']){

				//we have a hash of the rules
				var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
				path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'_'+this.hash(map['rules'])+'.RuleTree'
				var obj = JSON.parse(fs.readFileSync(path))
				map['ruleTree']=obj['tree']
				map['rules']=obj['rules']
			}else{
				return false
			}
		}else{
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
			var obj = JSON.parse(fs.readFileSync(path))
			map['ruleTree']=obj['tree']
			map['rules']=[]
			return
		}
	}

	hash(string){
		return new Utils().hash(JSON.stringify(string))
	}

	
	// refresh(codes, n, tree={}, rules=[]){
	// 	//add neighborhoods of size n for all codes 
	// 	codes.sort()
	// 	codes.reverse()
	// 	for(var j = 0; j<codes.length; j++){
	// 		var prev;
	// 		do{
	// 			prev = this.nextNeighborhood(codes, codes[j], prev, n)
	// 			if(prev){this.treeInsert(tree, prev, rules[0])}
	// 			rules.shift()
	// 		}while(prev)
	// 		//when prev returns null, we start with the next code
	// 	}
	// 	return tree
	// }

	

}

// var codes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
// var n = 3
// new RuleTree().neighborhoods(codes, n)