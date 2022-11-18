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

	matrix(dims, matrix=this.matrix, ){

	}

	fill(dims, matrix=this.m){
		var length = matrix.length;
		if(length){

		}else{
			//if length is n, and n is less than dims, 
			//then we check submatrix n, and call fill() on submatrix
			//
			//when we reach a base case, we want to keep track of the current dimensions
			//so dims is a structure, that holds a temp value for ease of use and permanent values for the
			//actual dimensions of the entire matrix.
		}
		//get the length of the matrix
		//if length is 0, its an empty matrix
		//we want to create the first 1d array
		

	}

	_1dMatrix(dims, ){

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