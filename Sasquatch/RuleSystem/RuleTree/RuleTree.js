import {CoordinateClock} from "../../Matrix/Coordinates.js"
import fs from "node:fs"
import path from "node:path"
export class RuleTree{
    constructor(map){
		this.map = map
    }

	create(map){
		//theta represents the code length which is mathematically related to a minimal set of codes
		//corresponding to the input and output
		//we only want to create the file if its not already created
		if(exists()){
			
		}

		this.map['ruleTree']={}
		//1-2 neighbors for 1 dimension; 
		//2-4 for 2 dimensions; 
		//3-6 for 3 dimensions; 
		//4-8 for 4 dimensions 
		this.map['codes']=this.map['codes'].sort()
		for(var neighbor_count=dimension; neighbor_count<=2*dimension; neighbor_count++){
			this.map['ruleTree']={}
			this.map['ruleTree'][neighbor_count]={}
			this.ruleTree(this.map['ruleTree'][neighbor_count], neighbor_count,  this.map['codes'].slice())
			this.export(this.map)
		}
	}


	exists(map){
		var path = new Utils().resolve('RuleSystem/RuleTree/RuleTrees/')
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		return fs.existsSync(path)
	}

	export(map){
		var path = new Utils().resolve('RuleSystem/RuleTree/RuleTrees/')
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		fs.writeFileSync(path, JSON.stringify(tree))
	}

	import(map, dimension){
		var path = new Utils().resolve('RuleSystem/RuleTree/RuleTrees/')
		map['dimension']=dimension
		path+=JSON.stringify(map['dimension'])+"_"+map['omega']+'.RuleTree'
		var obj = JSON.parse(fs.readFileSync(path))
		map['ruleTree']=obj
	}

	//if we have a list of symbols, which we know are alphabetically sorted, 
	//and we have a neighbor_count, then we can deterministically create trees
	//and store them for future use. We can pre-load the most commonly used ones
	//into ram and use them at random access speeds (in the future when we have more RAM)

	//if we have 3 neighbors for our tree and 5 symbols, we can optimize, because we are searching
	//the neighborhood in alphabetical order
	//1:{1:{1:r, 2:r, 3:r, 4:r, 5:r} 2:{2:r, 3:r, 4:r, 5:r}, 3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//2:{2:{2:r, 3:r, 4:r, 5:r}, 3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//3:3:{3:r, 4:r, 5:r}, 4:{4:r, 5:r}, 5{5:r}}
	//4:{4:{4:r, 5:r}, 5{5:r}}
	//5:{5{5:r}}

	ruleTree(tree, neighbor_count, symbols){
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
				this._ruleTree(symbols, coordinates[i].sort(), tree)
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
}
console.log(path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/RuleSystem/RuleTree/RuleTrees/')
