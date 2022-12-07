import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
import {Utils} from "../Utils/Utils.js"


//CONSTRUCTION OF RULE TREES DOES NOT AFFECT OUR RUNTIME PERFORMANCE ON ANY GIVEN SIMULATION BECAUSE
//WE ARE SAVING THE RULE TREES. THE RULE SETS ARE ALSO BEING SAVED BECAUSE WE ARE USING THE SAME ORDER OF
//SYMBOLS TO CONSTRUCT THE RULES ACROSS ALL SIMULATIONS
//we dont need to worry about ruleTree construction during runtime, we just have to worry about how we 
//access the tree which is O(nlogn) merge sort complexity. If we create a tree with all of its possiblities 
//no matter the order of the neighbors being searched we can get it down to O(n*d) where n is the number of 
//cells, and d is the dimension of the simulation

export class RuleTree{
    constructor(){
		this._neighborhoods;

    }
	
	ruleTree(map){
		//we want to build the rule tree deterministically using generated neighborhoods and corresponding rules
        //the number of rules should match the number of neighborhoods

		//creating a rule tree from scratch with map['rules'] if they exist
		//or randomly if they dont
		//1-2 neighbors for 1 dimension; 
		//2-4 for 2 dimensions; 
		//3-6 for 3 dimensions; 
		//4-8 for 4 dimensions;
		if(!map['rules']){
			var n = this.neighborhoods(map, true)

			this._neighborhoods = n.slice()
			map['neighborhoods']=n[0]
			map['rules']=n[1]
		}else{
			map['neighborhoods']  = this.neighborhoods(map, false)[0]
		}
		map['nNeighborhoods']=0
		map['ruleTree']={}
		var rules=map['rules'].slice()
		for(var i = 0; i<map['neighborhoods'].length; i++){
			this.neighborhoodCombinations(map['neighborhoods'][i])
        	//insert all combinations into the tree for a particular rule
			this.treeInsert(map, map['neighborhoods'][i], rules.shift())
			map['nNeighborhoods']+=1
		}
	}

	neighborhoodCombinations(){
		//we should take any given neighborhood 
		//(which is one of the CombinationsWithRepetition(codes, neighborcount))
		//take its chars, get the 
		//CombinationsWithoutRepetition(map['neighborhoods], 1, map['neighborhoods'].length) 
		//for that group of chars
		//this will usually return combinations that are less than or equal to the group of
		//chars going in. Use the group of chars going in to fill in the combinations
		//where there is a missing char because of repetition, repeat it.

	}
	neighborhoods(map, _rules=false){
		//we can greatly optimize tree construction if we perform it during
		var neighborhoods=[]
		var rules=[]
		var codes = map['codes'].slice().sort()

		codes.reverse()
		for(var neighbor_count=map['dimension']; neighbor_count<=2*map['dimension']; neighbor_count++){

			neighborhoods.push(...new Utils().combinationWithRepetition(codes, neighbor_count))

			if(_rules){
				//we are grabbing a set of C(r, n) rules where r is the number of symbols
				//and neighbor count is the number of neighbors for a cell of this type
				rules.push(...this.randomRule(map['codes'], neighbor_count))
			}
		}
		return [neighborhoods, rules]
	
	}

	nextNeighborhood(){
		return this._neighborhoods.shift()
	}

	rule(map, neighborhood){
		var neighbor_count = neighborhood.length
		var ruleTree = map['ruleTree'][neighbor_count]
		for(var i = 0; i<neighborhood.length; i++){
			ruleTree = ruleTree[neighborhood[i]]
		}
		//returns just a code
		return ruleTree
	}

	treeInsert(map, neighborhood, rule){
		var tree;
		if(map['ruleTree'][''+neighborhood.length]){
			tree = map['ruleTree'][''+neighborhood.length]

		}else{
			map['ruleTree'][''+neighborhood.length]={}
			tree = map['ruleTree'][''+neighborhood.length]
		}
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

	refresh(map, rules){
		//we need to fetch the neighborhoods from map
		var neighborhoods=map['neighborhoods']
		map['rules']=[]
		if(rules&&rules.length){
			//use the rules provided
			for(var j = 0; j<neighborhoods.length; j++){
				this.treeInsert(map, neighborhoods[j], rules[j])
				map['rules'].push(rules[j])
			}
		}else{
			//use random rules
			for(var j = 0; j<neighborhoods.length; j++){
				var rule = this.randomRule(map['codes'])
				this.treeInsert(map, neighborhoods[j], rule)
				map['rules'].push(rule)
			}
		
		}		
	}

	randomRule(symbols, dimensions){
		var rules=[]
		if(dimensions){
			var number = new Utils()._combinationWithRepetition(symbols.length, dimensions)
			for(var i = 0; i<number; i++){
				rules.push(symbols[Math.floor(Math.random() * symbols.length)])
			}
			return rules
		}else{
			return symbols[Math.floor(Math.random() * symbols.length)]

		}
	}



	exists(map, rules){
		if(rules){
			if(map['rules']){
				var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
				path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'_'+this.hash(map['rules'])+'.RuleTree'
				return fs.existsSync(path)
			}else{
				return false
			}
		}else{
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'.RuleTree'
			return fs.existsSync(path)
		}
	}

	exprt(map, rules){
		if((rules==true)&&(this.exists(map, rules)==false)){
			//we dont have to export
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'_'+this.hash(map['rules'])+'.RuleTree'
			fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))
		}else if((rules==true)&&(this.exists(map, rules)==true)){

			return
		}else if((rules==false)&&(this.exists(map, rules)==false)){
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'.RuleTree'
			fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))
			return
		}else{

			return
		}
	}

	import(map, rules){
		if((rules==true)&&(this.exists(map, rules)==true)){
			//we dont have to export
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'_'+this.hash(map['rules'])+'.RuleTree'
			var obj = JSON.parse(fs.readFileSync(path))
			map['ruleTree']=obj['tree']
			map['rules']=obj['rules']
			return true
		}else if((rules==true)&&(this.exists(map, rules)==false)){
			return false

		}else if((rules==false)&&(this.exists(map, rules)==true)){
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['codes'].length+'.RuleTree'
			var obj = JSON.parse(fs.readFileSync(path))
			map['ruleTree']=obj['tree']
			map['rules']=[]
			return true
		}else{
			return false
		}
	}

	hash(string){
		return new Utils().hash(JSON.stringify(string))
	}
}