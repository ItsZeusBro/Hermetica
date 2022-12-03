export class RuleTree{
    constructor(map, dimension){
		map['rules']={}
		map['ruleTree']={}
		//1-2 neighbors for 1 dimension; 
		//2-4 for 2 dimensions; 
		//3-6 for 3 dimensions; 
		//4-8 for 4 dimensions 
		
		for(var i = dimension; i<=2*dimension; i++){
			map['ruleTree'][i]={}
			this.ruleTree(map['ruleTree'][i],i, map['codes'].slice())
		}

		map['rules'][dimension]={}
		if(input.length>output.length){
			//square shape
			map['rules'][dimension]['shape']=Math.ceil(
				Math.pow(input.length, 1/dimension)
			)
		}else{
			map['rules'][dimension]['shape']=Math.ceil(
				Math.pow(output.length, 1/dimension)
			)
		}
		map['rules'][dimension]['neighborhood']=new Neighborhood()._read(
			map['rules'][dimension]['shape'], 
			map['rules'][dimension]['shape'], dimension
		)
		
		this.rules(map)
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
					rules[keys[i]]['neighborhood'][cells[j]][neighborKeys[k]]=map['codes'][Math.floor(
						Math.random() * map['codes'].length
					)]
				}
			}
		}
	}

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

}