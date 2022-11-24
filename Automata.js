import { Matrix } from "./Matrix.js"
class Automata{
	constructor(){
		//automata should have rules based on the number of neighborhoods for each cell

	}
	//1x1, 1x2, and 2x2 are base cases
	//we also want extraneous dimension reduction (in the case of a 1 being passed in, we reduce the dimension)

	//anytime we have a 3 cells in any dimension, we have corners of the matrix for said dimension that have one
	//less neighbor than the other cells
	
	//take this example:
	//1*3 (first perform a dimension reduction to get 3)
	//then we notice the neighborhood pattern [1][2][1]
	
	//next take the example 2*3 				[2][2]
	//											[3][3]
	//											[2][2]
				
												   [3]----[3]
												   /|	  /	|
//and 2*2*3										 [4]|----[4]|		
											   	 / [3]--/| [3]
											   [3]-/--[3]| / 
												|[4]---|[4]
    										    |/     | / 
											   [3]----[3]								  


}

const matrix = new Matrix(4, 4, 4)
// matrix.at([0, 0, 0, 0], '0, 0, 0, 0', 'somekey')
// matrix.at([1, 0, 0, 0], '1, 0, 0, 0', 'somekey')
// matrix.at([2, 0, 0, 0], '2, 0, 0, 0', 'somekey')
// matrix.at([3, 0, 0, 0], '3, 0, 0, 0', 'somekey')

// matrix.at([0, 0, 0, 1], '0, 0, 0, 1', 'somekey')

// matrix.at([3, 2, 1, 0], '3, 2, 1, 0', 'somekey')
// matrix.at([2, 1, 3, 1], '2, 1, 3, 1', 'somekey')
// matrix.at([3, 0, 2, 1], '3, 0, 2, 1', 'somekey')

matrix.log()