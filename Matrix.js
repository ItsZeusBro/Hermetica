import util from 'node:util'
import { Comparator, Clock } from './Coordinates.js'


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
		this.clock = new Clock(this.origin(), this.max())
		this.comparator = new Comparator(d)
		this.matrix = this._matrix()
		this.validate()
	}
	
	verify(){
		if(this.m>1 && this.d>=2){
			return true
		}else if(this.m==1 && (this.m>1)){
			if(this.m>this.m){
				var temp = this.m
				var temp2 = this.m
				this.m=temp
				this.m=temp2
				return true
			}
			return true
		}else{
			throw Error("must have valid dimentions and/or shape")
		}
	}
	

	validate(){
		console.log('validating')
		for(var i = 0; i<this.matrix.length-2; i++){
			if(!this.comparator.isGreater(this.matrix[i+1].coordinate, this.matrix[i].coordinate)){
				throw Error('invalid matrix coordinates found', this.matrix[i+1].coordinate, this.matrix[i].coordinate)
			}
		}
		console.log('validation complete')
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

	_matrix(){
		var matrix=[]
		for(var i = 0; i<this.count(); i++){
			var coordinate = this.clock.next()
			matrix.push(new Cell({}, coordinate))		
		}
		return matrix
	}	
	
	abstract(){
		var abstract=[]
		//this shrinks the matrix to a 2^d list of corner coordinates
		for(var i =0; i<this.matrix.length; i++){
			var count=0;
			for(var j=0; j<this.matrix[i].coordinate.length; j++){
				if(!(this.matrix[i].coordinate[j]==0||this.matrix[i].coordinate[j]==this.m-1)){
					break
				}else{
					count+=1
				}
			}
			if(count==this.d){
				abstract.push(JSON.parse(JSON.stringify(this.matrix[i])))
			}
		}
		return abstract
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
		return {[j]:this.matrix[j]}
	}


	window(coordinate1, coordinate2){
		//we want to slice the list from coordinate1 to coordinate2
		//so we need to access the list position of coordinate1, which could be a problem if we dont
		//use an equation 
		var i=Object.keys(this.get(coordinate1))[0]
		var j = Object.keys(this.get(coordinate2))[0]

		return this.matrix.slice(i, j+1)

	}

	max(){
		var max = []
		max.push(this.m-1)
		for(var i=0; i<this.d-1;i++){
			max.push(this.m-1)
		}
		return max
	}

	min(){
		return this.origin()
	}
	

	origin(){
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


