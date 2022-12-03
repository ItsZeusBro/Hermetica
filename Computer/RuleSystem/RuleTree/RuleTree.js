import {CoordinateClock} from "../../Matrix/Coordinates.js"

export class RuleTree{
    constructor(map, dimension){
		map['ruleTree']={}
		//1-2 neighbors for 1 dimension; 
		//2-4 for 2 dimensions; 
		//3-6 for 3 dimensions; 
		//4-8 for 4 dimensions 
		map['codes']=map['codes'].sort()
		for(var neighbor_count = dimension; neighbor_count<=2*dimension; neighbor_count++){
			map['ruleTree'][neighbor_count]={}
			this.ruleTree(map['ruleTree'][neighbor_count], neighbor_count,  map['codes'].slice())
		}
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
		
	}

	_ruleTree(symbols, coordinates, tree){
		
	}
}