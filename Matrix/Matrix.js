import util from 'node:util'
import { Comparator, CoordinateClock } from './Coordinates.js'
import {Neighborhoods} from './Neighborhood.js'

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
	constructor(m, d){
		this.m=m
		this.d=d
		this.verify()
		this.clock = new CoordinateClock(this._min(), this._max())
		this.comparator = new Comparator(d)
		this.matrix = this._matrix()
		this.validate()
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
	
	neighborhood(coordinate){

	}

	validate(){
		for(var i = 0; i<this.matrix.length-2; i++){
			if(!this.comparator.isGreater(this.matrix[i+1].coordinate, this.matrix[i].coordinate)){
				throw Error('invalid matrix coordinates found', this.matrix[i+1].coordinate, this.matrix[i].coordinate)
			}
		}
	}

	shape(){
		var shape = []
		for(var i=0; i<this.d; i++){
			shape.push(this.m)
		}
	}

	count(){
		return this.m*Math.pow(this.m, this.d-1)
	}

	_matrix(vector){
		var matrix=[]
		for(var i = 0; i<this.count(); i++){
			var coordinate = this.clock.next()
			matrix.push(new Cell({'mode':vector[i], 'neighbors':this.neighborhood(coordinate)}, coordinate))		
		}
		return matrix
	}	
	
	at(coordinate, data, key){
		var j=0;
		for(var i=coordinate.length-1; i>=0; i--){
			j+=coordinate[i]*Math.pow(this.m, i)
		}
		this.matrix[j].data[key]=data
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

	get(coordinate){
		var j=0;
		for(var i=coordinate.length-1; i>=0; i--){
			j+=coordinate[i]*Math.pow(this.m, i)
		}
		return this.matrix[j]
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


// function neighborProfile(coordinates){
// 	//each point should be a key in an object
// 	var profile = {}
// 	for(var i = 0; i<coordinates.length; i++){
// 		var point = ""
// 		for(var j=0; j<coordinates[i].length; j++){
// 			point+=coordinates[i][j]
// 		}
// 		profile[point]={}
// 	}

// 	for(var i = 0; i<Object.keys(profile).length; i++){
// 		var coordinate = Object.keys(profile)[i].split("")
// 		var neighbors=[]
// 		for(var j = 0; j<Object.keys(profile).length; j++){
// 			//we want to check how many neighbors the coordinate has
// 			if(i!=j){
// 				var coordinate2 = Object.keys(profile)[j].split("")
// 				var count1=0
// 				for(var n=0; n<coordinate.length; n++){
// 					if((Math.abs(coordinate[n]-coordinate2[n])==1)){
// 						count1+=1
// 						var count2=0
// 						for(var k=0; k<coordinate.length; k++){
// 							if(n!=k&&(coordinate[k]-coordinate2[k]!=0)){
// 								count2+=1
// 							}
// 						}
// 					}
// 				}
// 				if(count1==1&&!count2){
// 					neighbors.push(coordinate2.join(''))
// 				}

// 			}

// 		}
// 		profile[Object.keys(profile)[i]]['neighbors']=neighbors
// 	}
// 	console.log(util.inspect(profile, {showHidden: true, depth: 4, colors: true}))

// }
// var coordinates = new Clock([0,0,0,0,0], [2, 2,2,2,2]).coordinates()
// neighborProfile(coordinates)
