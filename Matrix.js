import util from 'node:util'



class Cell{
	constructor(data=null, coordinate){
		this.data=data
		this.coordinate=coordinate
	}
}

export class Matrix {
	constructor(coordinate1, coordinate2){
		this.coordinate1;
		this.coordinate2;
		this.normalize(coordinate1, coordinate2)	
		if(coordinate2.length>1){
			this.m=coordinate2[coordinate2.length-1]
		}

		this.n=coordinate1[0]
		
		this.d=coordinate1.length

		this.verify()


	}
	normalize(coordinate1, coordinate2){
		//this will create a normalized matrix from the two coordinates which will create a shape that we can work with generally
		//the general shape is n x m_1 ... x m_d

	}
	verify(){

	}


}



// 		//a 2x4 is still a 3 dimensional object or a 2 dimensional object, but not a 1 dimensional object!
// 		//what m represents is the length of any given object for every dimension its in
// 		//what n represents is the width of any given object for every dimension its in
// export class Matrix {
// 	constructor(n, m, d){
// 		this.m=m
// 		this.n=n
// 		this.d=d
// 		this.verify()
// 		this.previous=null
// 		this.matrix = this._matrix()
// 		this.validate()
// 	}
	
// 	verify(){
// 		if(this.m>this.n && this.n>=1 && this.d>=2){
// 			return true
// 		}else if(this.n>this.m && this.m>=1 && this.d>=2){
// 			var temp = this.n
// 			var temp2 = this.m
// 			this.m=temp
// 			this.n=temp2
// 			return true
// 		}else if(this.m==this.n && this.n>1 && this.d>=2){
// 			return true
// 		}else if(this.m==1 || this.n==1 && (this.m>1)||(this.n>1)){
// 			if(this.n>this.m){
// 				var temp = this.n
// 				var temp2 = this.m
// 				this.m=temp
// 				this.n=temp2
// 				return true
// 			}
// 			return true
// 		}else{
// 			throw Error("must have valid dimentions and/or shape")
// 		}
// 	}
	

// 	validate(){
// 		console.log('validating')
// 		for(var i = 0; i<this.matrix.length-2; i++){
// 			if(!this.isGreater(this.matrix[i+1].coordinate, this.matrix[i].coordinate)){
// 				throw Error('invalid matrix coordinates found', this.matrix[i+1].coordinate, this.matrix[i].coordinate)
// 			}
// 		}
// 		console.log('validation complete')
// 	}

// 	shape(coordinate1, coordinate2){
// 		if(coordinate1 && coordinate2){
// 			//we want to calculate the shape between two coordinates
// 		}else{
// 			return [this.n, this.m]
// 		}
// 	}

// 	count(){
// 		return this.n*Math.pow(this.m, this.d-1)
// 	}

// 	_matrix(){
// 		var matrix=[]
// 		for(var i = 0; i<this.count(); i++){
// 			var coordinate = this.next()
// 			matrix.push(new Cell({}, coordinate))		
// 		}
// 		return matrix
// 	}	

// 	subMtx(coordinate1, coordinate2){
// 		//returns a sub Matrix  class object of the current matrix
// 		//first we need to initialize a new Matrix with a window
// 	}	

// 	at(coordinate, data, key){
// 		var j=0;
// 		for(var i=coordinate.length-1; i>=0; i--){
// 			j+=coordinate[i]*Math.pow(this.m, i)
// 		}
// 		this.matrix[j].data[key]=data
// 	}

// 	get(coordinate){
// 		var j=0;
// 		for(var i=coordinate.length-1; i>=0; i--){
// 			j+=coordinate[i]*Math.pow(this.m, i)
// 		}
// 		return {[j]:this.matrix[j]}
// 	}
// 	corners(){
// 		//gets the corner coordinates for any matrix
// 	}
	
// 	faces(){
// 		//gets the face planes for any matrix minus the corners
// 	}
	
// 	body(){
// 		//gets the body sub matrix for any matrix
// 	}


// 	isEqual(coordinate1, coordinate2){
// 		for(var i = 0; i<this.d; i++){
// 			if(coordinate1[i] != coordinate2[i]){
// 				return false
// 			}
// 		}
// 		return true
// 	}

// 	isGreater(coordinate1, coordinate2){
// 		for(var i = this.d; i>=0; i--){
// 			if(coordinate1[i]>coordinate2[i]){
// 				return true
// 			}
// 		}
// 		return false
// 	}
// 	isGreaterEqual(coordinate1, coordinate2){
// 		if(this.isEqual(coordinate1, coordinate2)&& this.isGreater(coordinate1, coordinate2)){
// 			return true
// 		}else{
// 			return false
// 		}

// 	}

// 	isLess(coordinate1, coordinate2){
// 		for(var i = this.d; i>0; i--){
// 			if(coordinate1[i]<coordinate2[i]){
// 				return true
// 			}
// 		}
// 		return false
// 	}

// 	isLessEqual(coordinate1, coordinate2){
// 		if(this.isEqual(coordinate1, coordinate2)&& this.isLess(coordinate1, coordinate2)){
// 			return true
// 		}else{
// 			return false
// 		}
// 	}


// 	window(coordinate1, coordinate2){
// 		//we want to slice the list from coordinate1 to coordinate2
// 		//so we need to access the list position of coordinate1, which could be a problem if we dont
// 		//use an equation 
// 		var i=Object.keys(this.get(coordinate1))[0]
// 		var j = Object.keys(this.get(coordinate2))[0]

// 		return this.matrix.slice(i, j+1)

// 	}

// 	in(coordinate, coordinate1, coordinate2){
// 		//this checks if a given point exists within a dimensional sub-matrix.
// 		//the sub-matrix is evaluated along dimensional lines specified by d which should create
// 		//some d-dimensional shape which could be different than the one specified by n and m
// 		if(this.isGreaterEqual(coordinate, coordinate1) && this.isLessEqual(coordinate, coordinate2)){
// 			return true
// 		}else{
// 			return false
// 		}
	
// 	}

// 	relative_position(coordinate, coordinate1, coordinate2){
// 		if(this.in(coordinate, coordinate1, coordinate2)){
// 			//once we know a coordinate is in a sub-matrix, we can create a matrix with the matrix equation, with the sum of the coordinate points



// 		}


// 	}

// 	max(){
// 		var max = []
// 		max.push(this.n-1)
// 		for(var i=0; i<this.d-1;i++){
// 			max.push(this.m-1)
// 		}
// 		return max
// 	}

// 	min(){
// 		return this.origin()
// 	}
	

// 	origin(){
// 		var origin=[]
// 		for(var i=0; i<this.d; i++){
// 			origin.push(0)
// 		}
// 		return origin
// 	}




// 	next(){
// 		//we wish to increment the coordinate by one step, sometimes that requires incrementing different dimensions
// 		//if we call increment_val on a particular dimension and it returns 0, we need to increment_val on the next dimension
// 		if(this.previous==null){
// 			this.previous=this.origin()
// 			return this.previous
// 		}
// 		var current=JSON.parse(JSON.stringify(this.previous))
// 		for(var i = 0; i<this.previous.length; i++){
// 			if(this.inc_val(current, i)){
// 				current[i]=this.inc_val(current, i)
// 				break
// 			}else{
// 				//in this case it returns zero, and we need to set the ith index to 0, and increment the next (iterate)	
// 				current[i]=0;		
// 			}
// 		}
// 		this.previous=current
// 		return current
// 	}


// 	inc_val(coordinate, i){
// 		//console.log(coordinate[i], this.max()[i])
// 		//this should return the incremented value of the ith point on the coordinate
// 		if(coordinate[i]>=this.max()[i]){
// 			return 0
// 		}else{
// 			return coordinate[i]+1
// 		}
// 	}

// 	log(matrix){
// 		if(matrix){
// 			console.log(util.inspect(matrix, {showHidden: false, depth: null, colors: true}))
// 		}else{
// 			console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
// 		}
// 	}
// }

