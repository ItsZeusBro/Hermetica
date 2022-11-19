const util = require('util')



class Cell{
	constructor(data=null, ...pos){
		this.data=data
		this.pos=pos
	}
}

		//a 2x4 is still a 3 dimensional object or a 2 dimensional object, but not a 1 dimensional object!
		//what m represents is the length of any given object for every dimension its in
		//what n represents is the width of any given object for every dimension its in
class Matrix {
	constructor(d, m, n){
		this.m=m
		this.n=n
		this.d=d
		this.verify()
		this.matrix=this.matrix_shell()
		this.validate()
		//this.load(0, ...this.max())
	}
	
	verify(){
		if(this.m>this.n && this.n>=1 && this.d>=2){
			return true
		}else if(this.n>this.m && this.m>=1 && this.d>=2){
			var temp = this.n
			var temp2 = this.m
			this.m=temp
			this.n=temp2
			return true
		}else if(this.m==this.n && this.n>1 && this.d>=2){
			return true
		}else if(this.m==1 || this.n==1 && (this.m>1)||(this.n>1)){
			if(this.n>this.m){
				var temp = this.n
				var temp2 = this.m
				this.m=temp
				this.n=temp2
				return true
			}
			return true
		}else{
			throw Error("must have valid dimentions and/or shape")
		}
	}

	validate(){
		//make sure the cell_count is equal to n*m^d
		//console.log(this.n* Math.pow(this.m, this.d-1))
		if(this.count()!=(this.n* Math.pow(this.m, this.d-1))){
			throw Error("Error in validation; there should be ", this.n* Math.pow(this.m, this.d-1), "cells; where m:", this.m, "n:", this.n, "d:", this.d)
		}
	}

	count(){
		return this.flatten(this.matrix).length
	}
	shape(){
		var shape=[]
		for(var i=0; i<this.d-1; i++){
			shape.push(this.m)
		}
		shape.push(this.n)

		return shape
	}

	matrix_shell(){
		var matrix=[]
		for(var m=0; m<this.m; m++){
			matrix.push([])
			for(var c=0; c<this.m; c++){
				var temp1=matrix[matrix.length-1]
				for(var i =1; i<this.d-2; i++){
					temp1.push([])

					temp1=temp1[temp1.length-1]
				}
				for(var k =0; k<this.m; k++){
					var temp2=temp1
					temp2.push([])
					temp2=temp2[temp2.length-1]
					for(var j=0; j<this.n; j++){
						temp2.push(new Cell())
					}
				}
			}
		}
		//this.matrix=matrix[matrix.length-1]
		return matrix
	}
	origin(){
		var origin=[]
		for(var i=0; i<this.d; i++){
			origin.push(0)
		}
		return origin
	}
	max(){
		var max = []
		max.push(this.n-1)
		for(var i=0; i<this.d-1;i++){
			max.push(this.m-1)
		}
		return max
	}
	//we need variable number of parameters, and an iterator for the parameters in the begining


	flatten(matrix, flat=[]){
		for(var i = 0; i<matrix.length; i++){
			if(Array.isArray(matrix[i])){
				flat = this.flatten(matrix[i], flat)
			}else{
				flat.push(matrix[i])
			}
		}
		return	flat
	}
	page(matrix, n){
		var page=null
		for(var i=0; i<=n; i++){
			page=matrix[i]
		}
		return page
	}
	at(data=null, ...dimensions){
		var n = dimensions[0]
		var matrix=this.matrix
		for(var i=dimensions.length-1; i>=1; i--){
			//we need to access the matrix backwards, because the last m is the top level page
			matrix=this.page(matrix, dimensions[i])
		}
		matrix[n].data=data
		//console.log(matrix)

	}
	pos(pos=null, ...dimensions){
		var n = dimensions[0]
		var matrix=this.matrix
		for(var i=dimensions.length-1; i>=1; i--){
			//we need to access the matrix backwards, because the last m is the top level page
			matrix=this.page(matrix, dimensions[i])
		}
		matrix[n].pos=pos
	}
	load(pos=this.origin(), i=0){
		console.log(pos)
		var shape = this.shape()

		this.load(pos, i+1)
		
	}

	log(){
		console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
	}
}

const matrix = new Matrix(4, 5, 3)
// matrix.pos([0, 0, 0, 0], 0, 0, 0, 0)
// matrix.pos([2, 4, 4, 4], 2, 4, 4, 4)
// matrix.pos([1, 4, 4, 4], 1, 4, 4, 4)
console.log(matrix.shape())
matrix.load()

// matrix.at(0, 0, 0, 0)

// console.log(matrix.count())
// console.log(matrix.shape())
//matrix.log()

//matrix.log()
//matrix._next_cell()
//example:
//if we have 4, 5, 3
//then we build it like this:
// d = 0
//[
//	
//]

// d=1
//[
//	cell(0), cell(1), cell(2)
//]

// d=2
//[
	// [
	//	cell(0, 0), cell(1, 0), cell(2, 0)	//n or m could represent the 
	// ],
	// [
	//	cell(0, 1), cell(1, 1), cell(2, 1)
	// ],
	// [
	//	cell(0, 2), cell(1, 2), cell(2, 2)
	// ]
	// [
	//	cell(0, 3), cell(1, 3), cell(2, 3)
	// ]
	// [
	//	cell(0, 4), cell(1, 4), cell(2, 4)
	// ]
//]

// d=3
//[
	//[
		// [
		//	cell(0, 0, 0), cell(1, 0, 0), cell(2, 0, 0)
		// ],
		// [
		//	cell(0, 1, 0), cell(1, 1, 0), cell(2, 1, 0)
		// ],
		// [
		//	cell(0, 2, 0), cell(1, 2, 0), cell(2, 2, 0)
		// ]
		// [
		//	cell(0, 3, 0), cell(1, 3, 0), cell(2, 3, 0)
		// ],
		// [
		//	cell(0, 4, 0), cell(1, 4, 0), cell(2, 4, 0)
		// ]
	//],

	//[
		// [
		//	cell(0, 0, 1), cell(1, 0, 1), cell(2, 0, 1)
		// ],
		// [
		//	cell(0, 1, 1), cell(1, 1, 1), cell(2, 1, 1)
		// ],
		// [
		//	cell(0, 2, 1), cell(1, 2, 1), cell(2, 2, 1)
		// ]

		//	cell(0, 3, 1), cell(1, 3, 1), cell(2, 3, 1)
		// ],
		// [
		//	cell(0, 4, 1), cell(1, 4, 1), cell(2, 4, 1)
		// ]
	//],

	//[
		// [
		//	cell(0, 0, 2), cell(1, 0, 2), cell(2, 0, 2)
		// ],
		// [
		//	cell(0, 1, 2), cell(1, 1, 2), cell(2, 1, 2)
		// ],
		// [
		//	cell(0, 2, 2), cell(1, 2, 2), cell(2, 2, 2)
		// ]
		// [
		//	cell(0, 3, 2), cell(1, 3, 2), cell(2, 3, 2)
		// ],
		// [
		//	cell(0, 4, 2), cell(1, 4, 2), cell(2, 4, 2)
		// ]
	//]

	//[
		// [
		//	cell(0, 0, 3), cell(1, 0, 3), cell(2, 0, 3)
		// ],
		// [
		//	cell(0, 1, 3), cell(1, 1, 3), cell(2, 1, 3)
		// ],
		// [
		//	cell(0, 2, 3), cell(1, 2, 3), cell(2, 2, 3)
		// ]
		// [
		//	cell(0, 3, 3), cell(1, 3, 3), cell(2, 3, 3)
		// ],
		// [
		//	cell(0, 4, 3), cell(1, 4, 3), cell(2, 4, 3)
		// ]
	//]
//]


// d = 4
//[

	//[
		//[

			// [
			//	cell(0, 0, 0, 0), cell(1, 0, 0, 0), cell(2, 0, 0, 0)
			// ],
			// [
			//	cell(0, 1, 0, 0), cell(1, 1, 0, 0), cell(2, 1, 0, 0)
			// ],
			// [
			//	cell(0, 2, 0, 0), cell(1, 2, 0, 0), cell(2, 2, 0, 0)
			// ]
			// [
			//	cell(0, 3, 0, 0), cell(1, 3, 0, 0), cell(2, 3, 0, 0)
			// ],
			// [
			//	cell(0, 4, 0, 0), cell(1, 4, 0, 0), cell(2, 4, 0, 0)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 1, 0), cell(1, 0, 1, 0), cell(2, 0, 1, 0)
			// ],
			// [
			//	cell(0, 1, 1, 0), cell(1, 1, 1, 0), cell(2, 1, 1, 0)
			// ],
			// [
			//	cell(0, 2, 1, 0), cell(1, 2, 1, 0), cell(2, 2, 1, 0)
			// ]

			//	cell(0, 3, 1, 0), cell(1, 3, 1, 0), cell(2, 3, 1, 0)
			// ],
			// [
			//	cell(0, 4, 1, 0), cell(1, 4, 1, 0), cell(2, 4, 1, 0)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 2, 0), cell(1, 0, 2, 0), cell(2, 0, 2, 0)
			// ],
			// [
			//	cell(0, 1, 2, 0), cell(1, 1, 2, 0), cell(2, 1, 2, 0)
			// ],
			// [
			//	cell(0, 2, 2, 0), cell(1, 2, 2, 0), cell(2, 2, 2, 0)
			// ]
			// [
			//	cell(0, 3, 2, 0), cell(1, 3, 2, 0), cell(2, 3, 2, 0)
			// ],
			// [
			//	cell(0, 4, 2, 0), cell(1, 4, 2, 0), cell(2, 4, 2, 0)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 3, 0), cell(1, 0, 3, 0), cell(2, 0, 3, 0)
			// ],
			// [
			//	cell(0, 1, 3, 0), cell(1, 1, 3, 0), cell(2, 1, 3, 0)
			// ],
			// [
			//	cell(0, 2, 3, 0), cell(1, 2, 3, 0), cell(2, 2, 3, 0)
			// ]
			// [
			//	cell(0, 3, 3, 0), cell(1, 3, 3, 0), cell(2, 3, 3, 0)
			// ],
			// [
			//	cell(0, 4, 3, 0), cell(1, 4, 3, 0), cell(2, 4, 3, 0)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 4, 0), cell(1, 0, 4, 0), cell(2, 0, 4, 0)
			// ],
			// [
			//	cell(0, 1, 4, 0), cell(1, 1, 4, 0), cell(2, 1, 4, 0)
			// ],
			// [
			//	cell(0, 2, 4, 0), cell(1, 2, 4, 0), cell(2, 2, 4, 0)
			// ]
			// [
			//	cell(0, 3, 4, 0), cell(1, 3, 4, 0), cell(2, 3, 4, 0)
			// ],
			// [
			//	cell(0, 4, 4, 0), cell(1, 4, 4, 0), cell(2, 4, 4, 0)
			// ]
		//]

	//],

	//[
		//[

			// [
			//	cell(0, 0, 0, 1), cell(1, 0, 0, 1), cell(2, 0, 0, 1)
			// ],
			// [
			//	cell(0, 1, 0, 1), cell(1, 1, 0, 1), cell(2, 1, 0, 1)
			// ],
			// [
			//	cell(0, 2, 0, 1), cell(1, 2, 0, 1), cell(2, 2, 0, 1)
			// ]
			// [
			//	cell(0, 3, 0, 1), cell(1, 3, 0, 1), cell(2, 3, 0, 1)
			// ],
			// [
			//	cell(0, 4, 0, 1), cell(1, 4, 0, 1), cell(2, 4, 0, 1)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 1, 1), cell(1, 0, 1, 1), cell(2, 0, 1, 1)
			// ],
			// [
			//	cell(0, 1, 1, 1), cell(1, 1, 1, 1), cell(2, 1, 1, 1)
			// ],
			// [
			//	cell(0, 2, 1, 1), cell(1, 2, 1, 1), cell(2, 2, 1, 1)
			// ]

			//	cell(0, 3, 1, 1), cell(1, 3, 1, 1), cell(2, 3, 1, 1)
			// ],
			// [
			//	cell(0, 4, 1, 1), cell(1, 4, 1, 1), cell(2, 4, 1, 1)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 2, 1), cell(1, 0, 2, 1), cell(2, 0, 2, 1)
			// ],
			// [
			//	cell(0, 1, 2, 1), cell(1, 1, 2, 1), cell(2, 1, 2, 1)
			// ],
			// [
			//	cell(0, 2, 2, 1), cell(1, 2, 2, 1), cell(2, 2, 2, 1)
			// ]
			// [
			//	cell(0, 3, 2, 1), cell(1, 3, 2, 1), cell(2, 3, 2, 1)
			// ],
			// [
			//	cell(0, 4, 2, 1), cell(1, 4, 2, 1), cell(2, 4, 2, 1)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 3, 1), cell(1, 0, 3, 1), cell(2, 0, 3, 1)
			// ],
			// [
			//	cell(0, 1, 3, 1), cell(1, 1, 3, 1), cell(2, 1, 3, 1)
			// ],
			// [
			//	cell(0, 2, 3, 1), cell(1, 2, 3, 1), cell(2, 2, 3, 1)
			// ]
			// [
			//	cell(0, 3, 3, 1), cell(1, 3, 3, 1), cell(2, 3, 3, 1)
			// ],
			// [
			//	cell(0, 4, 3, 1), cell(1, 4, 3, 1), cell(2, 4, 3, 1)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 4, 1), cell(1, 0, 4, 1), cell(2, 0, 4, 1)
			// ],
			// [
			//	cell(0, 1, 4, 1), cell(1, 1, 4, 1), cell(2, 1, 4, 1)
			// ],
			// [
			//	cell(0, 2, 4, 1), cell(1, 2, 4, 1), cell(2, 2, 4, 1)
			// ]
			// [
			//	cell(0, 3, 4, 1), cell(1, 3, 4, 1), cell(2, 3, 4, 1)
			// ],
			// [
			//	cell(0, 4, 4, 1), cell(1, 4, 4, 1), cell(2, 4, 4, 1)
			// ]
		//]

	//],
	//[
		//[

			// [
			//	cell(0, 0, 0, 2), cell(1, 0, 0, 2), cell(2, 0, 0, 2)
			// ],
			// [
			//	cell(0, 1, 0, 2), cell(1, 1, 0, 2), cell(2, 1, 0, 2)
			// ],
			// [
			//	cell(0, 2, 0, 2), cell(1, 2, 0, 2), cell(2, 2, 0, 2)
			// ]
			// [
			//	cell(0, 3, 0, 2), cell(1, 3, 0, 2), cell(2, 3, 0, 2)
			// ],
			// [
			//	cell(0, 4, 0, 2), cell(1, 4, 0, 2), cell(2, 4, 0, 2)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 1, 2), cell(1, 0, 1, 2), cell(2, 0, 1, 2)
			// ],
			// [
			//	cell(0, 1, 1, 2), cell(1, 1, 1, 2), cell(2, 1, 1, 2)
			// ],
			// [
			//	cell(0, 2, 1, 2), cell(1, 2, 1, 2), cell(2, 2, 1, 2)
			// ]

			//	cell(0, 3, 1, 2), cell(1, 3, 1, 2), cell(2, 3, 1, 2)
			// ],
			// [
			//	cell(0, 4, 1, 2), cell(1, 4, 1, 2), cell(2, 4, 1, 2)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 2, 2), cell(1, 0, 2, 2), cell(2, 0, 2, 2)
			// ],
			// [
			//	cell(0, 1, 2, 2), cell(1, 1, 2, 2), cell(2, 1, 2, 2)
			// ],
			// [
			//	cell(0, 2, 2, 2), cell(1, 2, 2, 2), cell(2, 2, 2, 2)
			// ]
			// [
			//	cell(0, 3, 2, 2), cell(1, 3, 2, 2), cell(2, 3, 2, 2)
			// ],
			// [
			//	cell(0, 4, 2, 2), cell(1, 4, 2, 2), cell(2, 4, 2, 2)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 3, 2), cell(1, 0, 3, 2), cell(2, 0, 3, 2)
			// ],
			// [
			//	cell(0, 1, 3, 2), cell(1, 1, 3, 2), cell(2, 1, 3, 2)
			// ],
			// [
			//	cell(0, 2, 3, 2), cell(1, 2, 3, 2), cell(2, 2, 3, 2)
			// ]
			// [
			//	cell(0, 3, 3, 2), cell(1, 3, 3, 2), cell(2, 3, 3, 2)
			// ],
			// [
			//	cell(0, 4, 3, 2), cell(1, 4, 3, 2), cell(2, 4, 3, 2)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 4, 2), cell(1, 0, 4, 2), cell(2, 0, 4, 2)
			// ],
			// [
			//	cell(0, 1, 4, 2), cell(1, 1, 4, 2), cell(2, 1, 4, 2)
			// ],
			// [
			//	cell(0, 2, 4, 2), cell(1, 2, 4, 2), cell(2, 2, 4, 2)
			// ]
			// [
			//	cell(0, 3, 4, 2), cell(1, 3, 4, 2), cell(2, 3, 4, 2)
			// ],
			// [
			//	cell(0, 4, 4, 2), cell(1, 4, 4, 2), cell(2, 4, 4, 2)
			// ]
		//]

	//],
	//[
		//[

			// [
			//	cell(0, 0, 0, 3), cell(1, 0, 0, 3), cell(2, 0, 0, 3)
			// ],
			// [
			//	cell(0, 1, 0, 3), cell(1, 1, 0, 3), cell(2, 1, 0, 3)
			// ],
			// [
			//	cell(0, 2, 0, 3), cell(1, 2, 0, 3), cell(2, 2, 0, 3)
			// ]
			// [
			//	cell(0, 3, 0, 3), cell(1, 3, 0, 3), cell(2, 3, 0, 3)
			// ],
			// [
			//	cell(0, 4, 0, 3), cell(1, 4, 0, 3), cell(2, 4, 0, 3)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 1, 3), cell(1, 0, 1, 3), cell(2, 0, 1, 3)
			// ],
			// [
			//	cell(0, 1, 1, 3), cell(1, 1, 1, 3), cell(2, 1, 1, 3)
			// ],
			// [
			//	cell(0, 2, 1, 3), cell(1, 2, 1, 3), cell(2, 2, 1, 3)
			// ]

			//	cell(0, 3, 1, 3), cell(1, 3, 1, 3), cell(2, 3, 1, 3)
			// ],
			// [
			//	cell(0, 4, 1, 3), cell(1, 4, 1, 3), cell(2, 4, 1, 3)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 2, 3), cell(1, 0, 2, 3), cell(2, 0, 2, 3)
			// ],
			// [
			//	cell(0, 1, 2, 3), cell(1, 1, 2, 3), cell(2, 1, 2, 3)
			// ],
			// [
			//	cell(0, 2, 2, 3), cell(1, 2, 2, 3), cell(2, 2, 2, 3)
			// ]
			// [
			//	cell(0, 3, 2, 3), cell(1, 3, 2, 3), cell(2, 3, 2, 3)
			// ],
			// [
			//	cell(0, 4, 2, 3), cell(1, 4, 2, 3), cell(2, 4, 2, 3)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 3, 3), cell(1, 0, 3, 3), cell(2, 0, 3, 3)
			// ],
			// [
			//	cell(0, 1, 3, 3), cell(1, 1, 3, 3), cell(2, 1, 3, 3)
			// ],
			// [
			//	cell(0, 2, 3, 3), cell(1, 2, 3, 3), cell(2, 2, 3, 3)
			// ]
			// [
			//	cell(0, 3, 3, 3), cell(1, 3, 3, 3), cell(2, 3, 3, 3)
			// ],
			// [
			//	cell(0, 4, 3, 3), cell(1, 4, 3, 3), cell(2, 4, 3, 3)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 4, 3), cell(1, 0, 4, 3), cell(2, 0, 4, 3)
			// ],
			// [
			//	cell(0, 1, 4, 3), cell(1, 1, 4, 3), cell(2, 1, 4, 3)
			// ],
			// [
			//	cell(0, 2, 4, 3), cell(1, 2, 4, 3), cell(2, 2, 4, 3)
			// ]
			// [
			//	cell(0, 3, 4, 3), cell(1, 3, 4, 3), cell(2, 3, 4, 3)
			// ],
			// [
			//	cell(0, 4, 4, 3), cell(1, 4, 4, 3), cell(2, 4, 4, 3)
			// ]
		//]
	//],
	//[
		//[

			// [
			//	cell(0, 0, 0, 4), cell(1, 0, 0, 4), cell(2, 0, 0, 4)
			// ],
			// [
			//	cell(0, 1, 0, 4), cell(1, 1, 0, 4), cell(2, 1, 0, 4)
			// ],
			// [
			//	cell(0, 2, 0, 4), cell(1, 2, 0, 4), cell(2, 2, 0, 4)
			// ]
			// [
			//	cell(0, 3, 0, 4), cell(1, 3, 0, 4), cell(2, 3, 0, 4)
			// ],
			// [
			//	cell(0, 4, 0, 4), cell(1, 4, 0, 4), cell(2, 4, 0, 4)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 1, 4), cell(1, 0, 1, 4), cell(2, 0, 1, 4)
			// ],
			// [
			//	cell(0, 1, 1, 4), cell(1, 1, 1, 4), cell(2, 1, 1, 4)
			// ],
			// [
			//	cell(0, 2, 1, 4), cell(1, 2, 1, 4), cell(2, 2, 1, 4)
			// ]

			//	cell(0, 3, 1, 4), cell(1, 3, 1, 4), cell(2, 3, 1, 4)
			// ],
			// [
			//	cell(0, 4, 1, 4), cell(1, 4, 1, 4), cell(2, 4, 1, 4)
			// ]
		//],

		//[
			// [
			//	cell(0, 0, 2, 4), cell(1, 0, 2, 4), cell(2, 0, 2, 4)
			// ],
			// [
			//	cell(0, 1, 2, 4), cell(1, 1, 2, 4), cell(2, 1, 2, 4)
			// ],
			// [
			//	cell(0, 2, 2, 4), cell(1, 2, 2, 4), cell(2, 2, 2, 4)
			// ]
			// [
			//	cell(0, 3, 2, 4), cell(1, 3, 2, 4), cell(2, 3, 2, 4)
			// ],
			// [
			//	cell(0, 4, 2, 4), cell(1, 4, 2, 4), cell(2, 4, 2, 4)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 3, 4), cell(1, 0, 3, 4), cell(2, 0, 3, 4)
			// ],
			// [
			//	cell(0, 1, 3, 4), cell(1, 1, 3, 4), cell(2, 1, 3, 4)
			// ],
			// [
			//	cell(0, 2, 3, 4), cell(1, 2, 3, 4), cell(2, 2, 3, 4)
			// ]
			// [
			//	cell(0, 3, 3, 4), cell(1, 3, 3, 4), cell(2, 3, 3, 4)
			// ],
			// [
			//	cell(0, 4, 3, 4), cell(1, 4, 3, 4), cell(2, 4, 3, 4)
			// ]
		//]

		//[
			// [
			//	cell(0, 0, 4, 4), cell(1, 0, 4, 4), cell(2, 0, 4, 4)
			// ],
			// [
			//	cell(0, 1, 4, 4), cell(1, 1, 4, 4), cell(2, 1, 4, 4)
			// ],
			// [
			//	cell(0, 2, 4, 4), cell(1, 2, 4, 4), cell(2, 2, 4, 4)
			// ]
			// [
			//	cell(0, 3, 4, 4), cell(1, 3, 4, 4), cell(2, 3, 4, 4)
			// ],
			// [
			//	cell(0, 4, 4, 4), cell(1, 4, 4, 4), cell(2, 4, 4, 4)
			// ]
		//]
	//],
//]

