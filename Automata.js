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
			//console.log(matrix[i])
		}
	}
	neighborhood(coordinate){
		//the difference between the cell and any of its neighbors is that for each coordinate (except for the one being calculated)
		//it must be the case that all of the dimensions for the potential neighbor have a difference with an absolute value of 1
		var neighbors=[]

		for(var i = 0; i<coordinate.length; i++){
			var max = this.add(coordinate, 1, i)
			var min = this.subtract(coordinate, 1, i)
			if(this.valid(max, 0, this.m-1)&& !new Comparator(coordinate.length).isEqual(coordinate, max)){
				neighbors.push(max)
			}
			if(this.valid(min, 0, this.m-1)&& !new Comparator(coordinate.length).isEqual(coordinate, min)){
				neighbors.push(min)
			}
		}
		return neighbors
		//if any of the ticks have a dimension less than 0, remove it
		//if any of the ticks have a dimension greater than m, remove it
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
	_rules(){
		//generates a rule set randomly (randomness requires security protocols if we want to take the results seriously)
	}
}

const automata = new Automata(10,3)
automata.neighborhoods(automata.matrix.matrix)
automata.matrix.log()

//How neighbors are calculated:
//every coordinate in a d dimensional space has maximum 2^d sides, and there fore 2^d possible neighbors.
//in a pure cartesian plane, all cells share the same number of sides, but in a matrix they do not.
//the way we calculate the number of sides and therefore neighbors for any given cell is subject to min and max
//constraints on the dimensional space for the matrix. So if a cell has 6 sides that we either add or subtract a coordinate dimension
//from to get the neighbor, not all sides will fall in the matrix, and therefore are not valid neighbors and are not subject to rules
//in automata