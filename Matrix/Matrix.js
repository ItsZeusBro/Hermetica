import util from 'node:util'
import { Comparator, CoordinateClock } from './Coordinates.js'
//import {Neighborhoods} from './Neighborhood.js'

class Cell{
	constructor(data=null, coordinate){
		this.data=data
		this.coordinate=coordinate
	}
}

//a 2x4 is still a 3 dimensional object or a 2 dimensional object, but not a 1 dimensional object!
//what m represents is the length of any given object for every dimension its in
//what n represents is the width of any given object for every dimension its in
export class Matrix {
	constructor(d, rs, update, old_matrix){
		this.m=rs.shape(d)
		this.d=d
		this.rs=rs
		this.verify()
		this.comparator = new Comparator(d)
		this.matrix;

		if(update){
			this.matrix = this.update(rs, old_matrix)
		}else{
			this.matrix = this._matrix(rs)
		}
		//this.validate()
	}
	
	verify(){
		if(this.m>=1 && this.d>=1){
			return true
		}else if(this.d==1&&this.m>=1){
			return true
		}else{
			console.log(this.m, this.d)
			throw Error("must have valid dimentions and/or shape")
		}
	}
	


	// validate(){
	// 	for(var i = 0; i<this.matrix.length-2; i++){
	// 		if(!this.comparator.isGreater(this.matrix[i+1].coordinate, this.matrix[i].coordinate)){
	// 			throw Error('invalid matrix coordinates found', this.matrix[i+1].coordinate, this.matrix[i].coordinate)
	// 		}
	// 	}
	// }

	shape(){
		var shape = []
		for(var i=0; i<this.d; i++){
			shape.push(this.m)
		}
	}

	count(){
		return this.m*Math.pow(this.m, this.d-1)
	}

	update(rs, old_matrix){
		var matrix=[]
		var coordinates = rs.coordinates(this.d)

		for(var i=0; i<old_matrix.matrix.length; i++){
			var coordinate = old_matrix.matrix[i]['coordinate']
			var neighborhood=old_matrix.neighborhood(coordinate)
			var mode = rs.rule(neighborhood)
			matrix.push(this.cell(mode, old_matrix.matrix[i]['data']['neighbors'], coordinate))
		}
		return matrix
	}
	_matrix(rs){
		var matrix=[]
		var coordinates = rs.coordinates(this.d)
		for(var i = 0; i<coordinates.length; i++){
			if(rs.inputVector()[i]){
				matrix.push(this.cell(rs.inputVector()[i], rs.neighbors(this.d, coordinates[i]), coordinates[i]))		
			}else{
				matrix.push(this.cell(' ', rs.neighbors(this.d, coordinates[i]), coordinates[i]))		

			}
		}
		return matrix
	}	
	
	cell(mode, neighbors, coordinate){
		return new Cell({'mode':mode, 'neighbors':neighbors}, coordinate)
	}
	mode(coordinate, mode){
		//this changes the mode or gets it for a specific coordinate

		if(mode){
			this.matrix[this.skip(coordinate)]['data']['mode']=mode
		}else{
			return this.matrix[this.skip(coordinate)]['data']['mode']
		}
	}

	coordinates(){
		return this.rs.coordinates(this.d)
	}

	neighbors(coordinate){
		return this.matrix[this.skip(coordinate)]['data']['neighbors']
	}

	neighborhood(coordinate){

		var neighbors = this.rs.neighbors(this.d, coordinate)
		var neighborhood={}
		for(var i = 0; i<neighbors.length; i++){
			neighborhood[neighbors[i]]=this.mode(coordinate)
		}
		return neighborhood
	}

	at(coordinate, data, key){
		this.matrix[this.skip(coordinate)]['data'][key]=data
	}
	skip(coordinate){
		var j=0;
		coordinate = coordinate.split(',')
		for(var i=coordinate.length-1; i>=0; i--){
			if(coordinate[i]=='0'){
				j+=0
			}else{
				j=j+(parseInt(coordinate[i])*Math.pow(this.m, i))
			}
		}
		return j
	}
	get(coordinate){
		return this.matrix[this.skip(coordinate)]
	}

	in(coordinate, coordinate1, coordinate2){
		//this checks if a given point exists within a dimensional sub-matrix.
		//the sub-matrix is evaluated along dimensional lines specified by d which should create
		//some d-dimensional shape which could be different than the one specified by n and m
		if(this.comparator.isGreaterEqual(coordinate, coordinate1) && this.comparator.isLessEqual(coordinate, coordinate2)){
			return true
		}else{
			return false
		}
	
	}
	vectorize(){
		var vector=[]
		for(var i = 0; i<this.matrix.length; i++){
			vector.push(this.matrix[i]['data']['mode'])
		}
		return vector
	}
	print(){
		//stringify the matrix
		for(var i = 0; i<this.matrix.length; i++){
			process.stdout.write(this.matrix[i]['data']['mode'])
		}
		process.stdout.write('\n')
	}

	copy(){
		return {...this.matrix};
	}

	window(coordinate1, coordinate2){
		//we want to slice the list from coordinate1 to coordinate2
		//so we need to access the list position of coordinate1, which could be a problem if we dont
		//use an equation 
		var i=Object.keys(this.get(coordinate1))[0]
		var j = Object.keys(this.get(coordinate2))[0]
		return this.matrix.slice(i, j+1)
	}

	_max(){
		var max = []
		max.push(this.m-1)
		for(var i=0; i<this.d-1;i++){
			max.push(this.m-1)
		}
		return max
	}

	_min(){
		var origin=[]
		for(var i=0; i<this.d; i++){
			origin.push(0)
		}
		return origin
	}

	log(matrix){
		if(matrix){
			console.log(util.inspect(matrix, {showHidden: false, depth: null, colors: true}))
		}else{
			console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
		}
	}
}




// var symbols=[' ',String.fromCharCode('77826'), String.fromCharCode('77827'), String.fromCharCode('77828'), String.fromCharCode('77829')]
// symbols = symbols.sort()
// var coordinate1=[]
// var coordinate2=[]
// for(var i = 0; i<3; i++){
// 	coordinate1.push(0)
// 	coordinate2.push(symbols.length-1)
// }


// var tree = {}
// var coordinates = new Clock(coordinate1, coordinate2).coordinates()
// //console.log(coordinates, symbols)

// for(var i = 0; i<coordinates.length; i++){
// 	for(var j = 0; j<coordinates[i].length; j++){
// 		_ruleTree(symbols, coordinates[i], tree)
// 	}
// }
// 

//LEAVE THIS: IT HELPS UNDERSTAND MATRIX NEIGHBORHOODS AND DIMENSIONS



