import { Matrix } from "./Matrix.js"
import {Clock, Comparator} from "./Coordinates.js"

class Automata{
	constructor(m, d){
		this.m=m
		this.d=d
		this.matrix = new Matrix(m, d)
		//automata should have rules based on the number of neighborhoods for each cell
		this.rules=this._rules()
	}

	neighborhoods(matrix){
		//create a list of neighbors for each cell
		for(var i =0; i<matrix.length; i++){
			var coordinate=matrix[i].coordinate
			var neighbors = this.neighborhood(coordinate)
			matrix[i].data={'neighborhood':neighbors, 'mode':'off'}
		}
	}
	neighborhood(coordinate){
		//the difference between the cell and any of its neighbors is that for each coordinate (except for the one being calculated)
		//it must be the case that all of the dimensions for the potential neighbor have a difference with an absolute value of 1
		var neighbors=[]
		var max = this.add(coordinate, 1)
		var min = this.subtract(coordinate, 1)

		var clock = new Clock(min, max, 0, this.m-1)
		
		var ticks = clock.ticks()
		return ticks
		//if any of the ticks have a dimension less than 0, remove it
		//if any of the ticks have a dimension greater than m, remove it
	}

	add(coordinate, i){
		var coordinate1=[]
		for(var j = 0; j<coordinate.length; j++){
			coordinate1.push(coordinate[i]+i)
		}
		return coordinate1
	}

	subtract(coordinate, i){
		var coordinate1=[]
		for(var j=0; j<coordinate.length; j++){
			coordinate1.push(coordinate[i]-i)
		}
		return coordinate1
	}
	_rules(){
		//generates a rule set randomly (randomness requires security protocols if we want to take the results seriously)
	}
}

const automata = new Automata(2,3)
automata.neighborhoods(automata.matrix.matrix)
automata.matrix.log()
// matrix.at([0, 0, 0, 0], '0, 0, 0, 0', 'somekey')
// matrix.at([1, 0, 0, 0], '1, 0, 0, 0', 'somekey')
// matrix.at([2, 0, 0, 0], '2, 0, 0, 0', 'somekey')
// matrix.at([3, 0, 0, 0], '3, 0, 0, 0', 'somekey')

// matrix.at([0, 0, 0, 1], '0, 0, 0, 1', 'somekey')

// matrix.at([3, 2, 1, 0], '3, 2, 1, 0', 'somekey')
// matrix.at([2, 1, 3, 1], '2, 1, 3, 1', 'somekey')
// matrix.at([3, 0, 2, 1], '3, 0, 2, 1', 'somekey')


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

//the number of neighbors for a base corner cell with d dimensions is also 
//CALCULATING CORNERS FOR ANY DIMENSION
//c=d^2 
//where c represents the number of corner cells (the next)



//CALCULATING THE POSITION OF CORNERS FOR ANY MATRIX
//take the previous examples:
//for a 1d matrix there exists 2 corners (min()) and (max())
//for a 2d matrix there exists 4 corners (min(), min()), (min(), max()), (max(), min()), and (max(), max())
//for a 3d matrix there exists 8 corners (min(), min(), min()), (min(), min(), max()), (min(), max(), max()) 
//essentially these are combinatorically calculated

//CALCULATING NEIGHBORS FOR ANY CELL
//this is a function of the cell's position relative to a corner
// where the number of corners c=d^2 and C_n=d, where C_n is the number of neighbors for any corner base cell c in a matrix of d dimensions

//a cell's neighborhood can be calculated from the corners, that neighborhood has properties that can identified by its shape and relativity to the corner if comes from
//so if we have a corner (min(), min()) in a 2d matrix, then (min()+1, min()) should have similar properties to (min(), min()+1) 
//We should always evaluate a relative coordinate to a corner to all other corners to make sure its not also a corner


//comparing corners against any coordinate relative to it can impact performance. Corners should only therefore be checked by the dimension they are acted upon.
//That's probabl as good as we can get with this system of principles. 

//so if we have a coordinate for dimension d that is d.min()+i, then we check against d.max(). 
//similarly if we have a coordinate for dimension d that is d.max()-i, then we check against d.min()
//after checking to make sure we do not have another corner, (meaning we should store the property state of the coordinate), we can evaluate its other properties, like
//whether or not it is a (corner's number of neighbors +1) or (a corner's number of neighbors +2) etc...