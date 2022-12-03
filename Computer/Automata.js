import { Matrix } from "../Matrix/Matrix.js"
import {CoordinateClock, Comparator} from "../Matrix/Coordinates.js"
import util from 'node:util'
import {createHash} from 'node:crypto'
import { RuleSystem } from "./RuleSystem.js"


export class Automata{
	constructor(input, output, context, dims){
		//the number of cells for the automata simulation is determined by input or output (whichever is greater)
		//the symbol set and neighborhood types (which are just the number of neighbors and an alphabetical tree lookup) is taken
		//care of by RuleSystem
		//this works for 2d and 1d matricies, increase to 6 for 3d matrix, or 8 for 4d
		this.rs = new RuleSystem(input, output, context, dims)
		this.rs.log()
		this.matricies=[]
		this.dims=dims
		this.i=1
		this.matrix = new Matrix(dims[this.i], this.rs)
		this.matrix.log()
		this.simulate(this.rs, this.matrix)
		
	}

	simulate(rs, matrix){
		//a simulation should print (and export()) then update rules
		while(true){
			//while the matrix vector is not equal to the output vector, keep updating and printing
			matrix.print()
			this.update(matrix)
		}
	}	


	update(old_matrix){
		new Matrix(this.dims[this.i], this.rs, true, old_matrix)
	}

	export(){
		//this should send the data to another process, and that should send to disk to free up this process
		//writing to disk is more costly than IPC, we should only export batches of data
	}

	log(automata){
		for(var i = 0; i<automata.matrix.matrix.length; i++){
			console.log(automata.matrix.matrix[i])
		}
	}

}

new Automata('asldkgjalkjgaoijeroigeorinagoreigjaeroigj', 'alkgjasdlkjfasldk', 'english', [2, 3, 4])
//

// const automata = new Automata(20,2)
// automata.simulate()

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