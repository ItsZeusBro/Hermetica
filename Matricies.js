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
		this.matrix = []
		this.m=m
		this.n=n
		this.d=d
		var pos = []
		for(var i=0; i<d; i++){
			pos.push(0)
		}
		this.sentinel=new Cell(null, ...pos)
		//we need to initialize the matrix with the sentinels initial value
		this.verify()
		console.log(this.sentinel)
		//this.init()
	}
	verify(){
		if(this.m>this.n && this.n>=1 && this.d>=2){
			return true
		}else if(this.n>this.m && this.m>=1 && this.d>=2){
			return true
		}else if(this.m==this.n && this.n>1 && this.d>=2){
			return true
		}else if(this.m==1 || this.n==1 && (this.m>1)||(this.n>1)){
			return true
		}else{
			throw Error("must have valid dimentions and/or shape")
		}
	}

	// init(){
	// 	//we need to initialize an array of arrays for the dimension d, and set the initial position with the position of the sentinel
	// 	if(this.m>n && this.n>=2 && this.d>=3){
	// 		//this means n is at least 1, and m is greater
	// 		//that means we extend m into dimension d from its 2d shape, and n is the number of cells per 1d array
	// 		for(var i=0; i<this.m; i++){
	// 			this.matrix.push([])
	// 			var matrix=this.matrix[this.matrix.length-1]
	// 			for(var j = 0; j<this.d; j++){
	// 				matrix.push([])
	// 				matrix=matrix[matrix.length-1]
	// 			}

	// 			for(var j = 0; j<this.n; j++){
	// 				matrix.push(new Cell())
	// 			}
	// 		}
			
	// 	}else if(this.n>m && this.m>=2 && this.d>=3){
	// 		//this means m is at least 1, and n is greater
	// 		//that means we extend n into dimension d from its 2d shape, and m is the number of cells per 1d array
	// 		for(var i=0; i<this.n; i++){
	// 			this.matrix.push([])
	// 			var matrix=this.matrix[this.matrix.length-1]
	// 			for(var j = 0; j<this.d; j++){
	// 				matrix.push([])
	// 				matrix=matrix[matrix.length-1]
	// 			}
	// 		}
	// 	}else if(this.m==this.n && this.n>=2 && this.d>=2){
	// 		//this means that m and n are a square shape for d dimensions so long as d is greater than or equal to 2
	// 		//we can extend m or n into d dimensions
	// 		for(var i=0; i<this.m; i++){
	// 			this.matrix.push([])
	// 			var matrix=this.matrix[this.matrix.length-1]
	// 			for(var j = 0; j<this.d; j++){
	// 				matrix.push([])
	// 				matrix=matrix[matrix.length-1]
	// 			}
	// 		}
	// 	}else if(this.m==1 || this.n==1 && (this.m>=2)||(this.n>=2)){
	// 		//this means that we have a 1d matrix of length m or n (regardless of dimension d)
	// 		return true
	// 	}else{
	// 		throw Error("must have valid dimentions and/or shape")
	// 	}

	// }

	// matrix(matrix=this.matrix){
	// 	//we carry over dims.m or dims.n d number of times from 1d identity construction (the smaller of the two) for whichever one is larger 
	// 	//because that is consistently general throughout (there are no special cases when we take the larger of the two)
	// 	//so if m=4, and n=3, then a 1 d matrix would be a 1x3 automata. a 2d matrix would be a 1x3x4, a 3d would be 1x3x4x4

	// 	//This means we can project to higher dimensions from lower ones deterministically, so if for example we have 3x4 shape in 2 dimensions, we
	// 	//can find the correlation between dimensions across all dimensions when we correlate 3x4 with 3x4x4, we can extrapolate the projection properties to d dimensions
	// 	//so we can build a statistical projection equation over higher and higher dimensions from a bunch of lower dimension projections
		
	// }

	// nextCell(){
	// 	return new Cell(this.nextPos())
	// }

	// nextPos(){
	// 	for(var i = 0; i<pos.length; i++){
			
	// 	}
	// }
}

const matrix = new Matrix(4, 3, 3)
console.log(matrix)
//example:
//if we have 4, 3, 3
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
		//]
	//],
//]
