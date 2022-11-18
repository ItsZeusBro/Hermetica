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
		
	}


}

//in the abstract what we are trying to do:
//create a matrix using 1 dimensional arrays that 
//contain cells that are configured with positions 
//relative in position to the rest of the cells
//This matrix is on a plane of d dimensions


//Take this example:
// for a 2 dimensional figure, say we have 2x5 cells. Where m = 2 and n = 5. This means we have 10 cells
// if we wanted this in 3 dimensions, we have two options: we can carry the 2 or we can carry the 5 to the third dimension.
// the difference is huge, if we did 2x5x5 we have 50 cells, if we do 2x2x5 we have 20 cells, this difference compounds over d number of dimensions
// So we need to be careful when we define the dims of a matrix, in which dimension we wish to carry forward into d dimensions. For now m will be that variable. 