import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
import {Utils} from "../Utils/Utils.js"

export class RuleTree{
    constructor(){
    }
	
	createRuleTree(map){
		//creating a rule tree from scratch with map['rules'] if they exist
		//or randomly if they dont
		//1-2 neighbors for 1 dimension; 
		//2-4 for 2 dimensions; 
		//3-6 for 3 dimensions; 
		//4-8 for 4 dimensions;
		map['codes']=map['codes'].sort()
		map['ruleTree']={}
		map['ruleTree']['neighborhoods']={}
		if(!map['rules']){ map['rules']=[] }
		for(var neighbor_count=map['dimension']; neighbor_count<=2*map['dimension']; neighbor_count++){
			map['ruleTree'][neighbor_count]={}
			this.ruleTree(
				map, 
				map['codes'].slice(), 
				neighbor_count, 
				map['rules'], 
				map['ruleTree']['neighborhoods']
			)
		}
	}

	//these neighborhoods stay forever, so efficiency is not a huge deal
	ruleTree(map, codes, n, rules=[], neighborhoods={}){
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
						this.treeInsert(map, prev, rules[0])
						rules.shift()
					}else{
						var rule=this.randomRule(codes)
						rules.push(rule)
						this.treeInsert(map, prev, rule)
					}
					neighborhoods[n].push(prev.slice())
				}
			}while(prev)
			//when prev returns null, we start with the next code
		}
		return
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

	treeInsert(map, neighborhood, rule){
		var tree = map['ruleTree'][''+neighborhood.length]
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
		var keys=Object.keys(map['ruleTree']['neighborhoods'])
		if(rules.length){
			//use the rules provided
			for(var i = 0; i<keys.length; i++){
				for(var j = 0; j<map['ruleTree']['neighborhoods'][keys[i]].length; j++){
					this.treeInsert(map['ruleTree'][keys[i]], map['ruleTree']['neighborhoods'][keys[i]][j], rules[0])
					rules.shift()
				}
			}
		}else{
			//use random rules
			for(var i = 0; i<keys.length; i++){
				for(var j = 0; j<map['ruleTree']['neighborhoods'][keys[i]].length; j++){
					this.treeInsert(map['ruleTree'][keys[i]], map['ruleTree']['neighborhoods'][keys[i]][j], this.randomRule(map['codes']))
				}
			}
		}		
	}

	randomRule(symbols){
		return symbols[Math.floor(Math.random() * symbols.length)]
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
		if((rules==true)&&(this.exists(map, rules)==false)){
			//we dont have to export
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/RuleMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'_'+this.hash(map['rules'])+'.RuleTree'
			fs.writeFileSync(path, JSON.stringify({'tree':map['ruleTree'], 'rules':map['rules']}))
		}else if((rules==true)&&(this.exists(map, rules)==true)){

			return
		}else if((rules==false)&&(this.exists(map, rules)==false)){
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
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
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'_'+this.hash(map['rules'])+'.RuleTree'
			var obj = JSON.parse(fs.readFileSync(path))
			map['ruleTree']=obj['tree']
			map['rules']=obj['rules']
			return true
		}else if((rules==true)&&(this.exists(map, rules)==false)){
			return false

		}else if((rules==false)&&(this.exists(map, rules)==true)){
			var path = new Utils().resolve('Map/RuleTree/RuleTrees/TreeMaps/')
			path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
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