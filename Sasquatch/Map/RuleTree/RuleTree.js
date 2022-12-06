import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
import {Utils} from "../Utils/Utils.js"

export class RuleTree{
    constructor(){
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
			map['neighborhoods']=n[0]
			map['rules']=n[1]
		}else{
			map['neighborhoods']  = this.neighborhoods(map, false)[0]
		}
		map['nNeighborhoods']=0
		map['ruleTree']={}
		var rules=map['rules'].slice()
		for(var i = 0; i<map['neighborhoods'].length; i++){
			this.treeInsert(map, map['neighborhoods'][i], rules.shift())
			map['nNeighborhoods']+=1
			
		}
	}

	neighborhoods(map, _rules=false){
		var neighborhoods=[]
		var rules=[]
		var codes = map['codes'].slice().sort()
		codes.reverse()
		for(var neighbor_count=map['dimension']; neighbor_count<=2*map['dimension']; neighbor_count++){
			for(var j = 0; j<codes.length; j++){
				var prev;
				do{
					prev = this.nextNeighborhood(codes, codes[j], prev, neighbor_count)
					if(prev){
						neighborhoods.push(prev.slice())
						if(_rules){
							rules.push(this.randomRule(map['codes']))
						}
					}
				}while(prev)
				//when prev returns null, we start with the next code
			}
		}
		return [neighborhoods, rules]
	}

	nextNeighborhood(codes, code, prev, n){
		if(prev){
			for(var i=prev.length-1; i>=0; i--){
				if(i==0){
					return
				}else{
					if(prev[i]==codes[codes.length-1]){
						for(var j=i; j>0; j--){
							if(prev[j]!=codes[codes.length-1]){
								prev[j]=codes[codes.indexOf(prev[j])+1]
								var c=prev[j]
								for(var k=j+1; k<prev.length; k++){
									prev[k]=c
								}
								return prev
							}
						}
					}else{
						prev[i]=codes[codes.indexOf(prev[i])+1]
						return prev
					}
				}
			}
		}else{
			prev=[]
			for(var i = 0; i<n; i++){
				prev.push(code)
			}
			return prev
		}
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
		var keys=Object.keys(map['ruleTree']['neighborhoods'])
		if(rules.length){
			//use the rules provided
			for(var i = 0; i<keys.length; i++){
				for(var j = 0; j<map['ruleTree']['neighborhoods'][keys[i]].length; j++){
					this.treeInsert(map, map['ruleTree']['neighborhoods'][keys[i]][j], rules[0])
					rules.shift()
				}
			}
		}else{
			//use random rules
			for(var i = 0; i<keys.length; i++){
				for(var j = 0; j<map['ruleTree']['neighborhoods'][keys[i]].length; j++){
					this.treeInsert(map, map['ruleTree']['neighborhoods'][keys[i]][j], this.randomRule(map['codes']))
				}
			}
		}		
	}

	randomRule(symbols){
		return symbols[Math.floor(Math.random() * symbols.length)]
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