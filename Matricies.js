class Dims {
	constructor(m, n, d){
		//a 2x4 is still a 3 dimensional object or a 2 dimensional object, but not a 1 dimensional object!
		//what m represents is the length of any given object for every dimension its in
		//what n represents is the width of any given object for every dimension its in
		this.m=m
		this.n=n		
		this.d=d 		//this is the number of planes in the matrix for coordinate information
	}
}

class Cell{
	constructor(){
		this.pos=[]

	}
}

class Matrix {
	constructor(){
		this.matrix = []
	}

	matrix(dims, matrix=this.matrix){
		//we carry over dims.m or dims.n d number of times from 1d identity construction (the smaller of the two) for whichever one is larger 
		//because that is consistently general throughout (there are no special cases when we take the larger of the two)
		//so if m=4, and n=3, then a 1 d matrix would be a 1x3 automata. a 2d matrix would be a 1x3x4, a 3d would be 1x3x4x4

		// This means we can project to higher dimensions from lower ones deterministically, so if for example we have 3x4 shape in 2 dimensions, we
		// can find the correlation between dimensions across all dimensions when we correlate 3x4 with 3x4x4, we can extrapolate the projection properties to d dimensions
		//so we can build a statistical projection equation over higher and higher dimensions from a bunch of lower dimension projections
		
	}


}

