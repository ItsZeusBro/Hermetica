import { Matrix } from "./Matrix.js"
class Automata{
	constructor(){
		//automata should have rules based on the number of neighborhoods for each cell

	}
	
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
//				
// 												   [3]_________[3]
// 												  / .	       / |
// //and 2*2*3									 [4].________[4] |		
// 											    / .[3]. . . ./.|[3]
// 											 [3]__./_______[3] |/ 
// 											   | [4]. . . .|.[4]
// 											   | /         |  / 
// 											 [3]/__________[3]

//if we added another cell to the second dimension for 2*2*3, so that it became 2*3*3
//we would see the same phenomenon as we saw in the 1*3 pattern, we would increase the neighborhood
//of middle cell by one relative to corner cells

//to understand the number of neighbors for a non-corner cell, we need to understand the corners which we call "bases"
//the number of neighbors they are related to an equation following this pattern:
//1. there exists exactly 2 corners for any 1d matrix
//2. there exists exactly 4 corners for any 2d matrix
//3. there exists exactly 8 corners for any 3d matrix
//etc...

//so the number of dimensions (with dimension reductions in the case of 1's) squared represents the number of corner cells in n number of dimensions

//c=d^2 where c represents the number of corner cells (the next)
//the number of neighbors for a base corner cell with d dimensions is also d; so, n=d, where n is the number of neighbors for any corner base cell c in a matrix of d dimensions
