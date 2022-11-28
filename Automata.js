import { Matrix } from "./Matrix.js"
import {Clock, Comparator} from "./Coordinates.js"
import util from 'node:util'
import {createHash} from 'node:crypto'

class Rules{
	constructor(m, d){
		this.m=m
		this.d=d
		this.rule_map=this._rule_map()
		this.context_map=this._context_map(this.rule_map)
	}
	export(){
		return this.context_map
	}
	_rule_map(){
		//we know we have (3^(2^d)) rule possibilities because a neighbor is either 1, 0, or null
		//we need to map the possible contexts to these rules
		var map={}
		for(var i =0; i<Math.pow(3, 2*this.d); i++){
			map[i]=Math.floor(Math.random() * 2)
		}
		//the map should have a rule number along side the rule for the number
		return map
	}
	_context_map(rule_map){
		//context should interpret the rule number and call upon map to return the rule
		//there should be 2^d cells in any neighborhood (some neighbors are null)
		//we know that there are 3^(2^d) rules derived from 2^d cells
		var context_map={}
		//we want to derive a number from 0 to 3^(2^d) from the context and create a context map connected to the rule map
		//so if there are four neighbors max, we want to translate these combinatoric contexts into strings (we can substitute -1 for null)
		//we need the max number of neighbors which is 2*d (which is the number of dimensions in a coordinate plane)
		var coordinate1=[]
		var coordinate2=[]
		for(var i = 0; i<(2*this.d); i++){
			coordinate1.push(0)
			coordinate2.push(2)
		}
		var ticks = new Clock(coordinate1, coordinate2).ticks()
		for(var i = 0; i<ticks.length; i++){
			var string=''
			for(var j =0; j<ticks[i].length; j++){
				
				string+=ticks[i][j]
			}
			context_map[string]=this.rule_map[i]
		}
		//console.log(context_map)
		return context_map
		//(-1, -1, -1, -1) ... (1, 1, 1, 1)
	}
	context(neighborhood){
		//should translate neighborhood to context and return the rule using context_map connected to rule_map
		//console.log(neighborhood)
		var string=''
		for(var i = 0; i<neighborhood.length; i++){
			
			if(neighborhood[i]==null){
				string+=0
			}else if(neighborhood[i]==0){

				string+=1
			}else if(neighborhood[i]==1){

				string+=2
			}
		}
		
		return this.context_map[string]
	}
}automataautomataautomata
//automata should only be responsible for managing the matrix refering to the automata
//for any given generationautomata
//simulation should be responsible for keeping track and exporting data



class Automata{
	constructor(m, d, rules){
		this.m=m
		this.d=d
		this.matrix = new Matrix(m, d)
		this.population = this.populate(this)
		this.neighborhoods(this)
		//console.log(this.matrix.matrix)
	}

	
	populate(automata){
		for(var i = 0; i<automata.length; i++){
			automata[i]['data']['mode']=Math.floor(Math.random() * 2);
		}
		return JSON.parse(JSON.stringify(automata))
	}
	repopulate(matrix1, matrix2){
		for(var i = 0; i<matrix1.length;i++){
			matrix1[i]['data']= JSON.parse(JSON.stringify(matrix2[i]['data']))
		}
	}
	neighborhoods(automata){
		//create a list of neighbors for each cell
		for(var i=0; i<automata.matrix.matrix.length; i++){
			var coordinate=automata.matrix.matrix[i].coordinate
			var neighbors = this.neighborhood(automata, coordinate)
			automata.matrix.matrix[i]['data']['neighborhood']=neighbors
		}
	}

	neighborhood(automata, coordinate){
		//the difference between the cell and any of its neighbors is that for each coordinate (except for the one being calculated)
		//it must be the case that all of the dimensions for the potential neighbor have a difference with an absolute value of 1
		//if any of the ticks have a dimension less than 0, remove it
		//if any of the ticks have a dimension greater than m, remove it
		var neighbors=[]

		for(var i = 0; i<coordinate.length; i++){
			var max = this.automata.add(coordinate, 1, i)
			var min = this.automata.subtract(coordinate, 1, i)
			if(this.valid(max, 0, automata.m-1)&& !new Comparator(coordinate.length).isEqual(coordinate, max)){
				//we want the actual cell coresponding to max
				neighbors.push(automata.matrix.get(max)['data']['mode'])
			}else{
				neighbors.push(null)
			}
			if(this.valid(min, 0, automata.m-1)&& !new Comparator(coordinate.length).isEqual(coordinate, min)){
				neighbors.push(automata.matrix.get(min)['data']['mode'])
			}else{
				neighbors.push(null)
			}
		}
		return neighbors

	}
	add(coordinate, n, i){
		var coordinate1 = JSON.parse(JSON.stringify(coordinate))
		coordinate1[i]=coordinate1[i]+n
		return coordinate1
	}

	subtract(coordinate, n, i){
		var coordinate1 = JSON.parse(JSON.stringify(coordinate))
		coordinate1[i]=coordinate1[i]-n
		return coordinate1
	}

	valid(coordinate, min, max){
		//check to see if any of the coordinates dimensions exceed the limits set by min and max
		for(var i = 0; i<coordinate.length; i++){
			if(coordinate[i]<min||coordinate[i]>max){
				return false
			}
		}
		return true
	}

	log(automata){
		for(var i = 0; i<automata.matrix.matrix.length; i++){
			console.log(automata.matrix.matrix[i])
		}

	}

}

const automata = new Automata(20,2)
automata.simulate()

//we need to treat each cell like an element in an arbitrary length buffer for both input and output
//space should an encoding so that we can pass in strings. The output must match what we want exactly as we want it
//for each input and output pairing, or the problem is not solved, unless we dont care about want extra space stripping.

//empty cells mean nothing
//numbers should be separated by a known number separator encoding.
//we need a translator function that translates a cellular automata for any number of dimensions, and we need to follow the same rules
//for decoding. The encoding and decoding should always be the same no matter what the dimension.

//automata.log()

//console.log(automata.rules)
//How neighbors are calculated:
//every coordinate in a d dimensional space has maximum 2^d sides, and there fore 2^d possible neighbors.
//in a pure cartesian plane, all cells share the same number of sides, but in a matrix they do not.
//the way we calculate the number of sides and therefore neighbors for any given cell is subject to min and max
//constraints on the dimensional space for the matrix. So if a cell has 6 sides that we either add or subtract a coordinate dimension
//from to get the neighbor, not all sides will fall in the matrix, and therefore are not valid neighbors and are not subject to rules
//in automata


//we want a data set with the following features
//context_rule_map, population (for all dimensions), input, function purpose and description, output, generation number, every n generations on the way to the solution
//WE ALSO WANT TO INCLUDE TEST CASES FOR THE FUNCTION IN THE FEATURE SET