import util from 'node:util'



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
	constructor(n, m, d){
		this.m=m
		this.n=n
		this.d=d
		this.verify()
		this.previous=null
		this.matrix = this._matrix()
		this.validate()
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
		console.log('validating')
		for(var i = 0; i<this.matrix.length-2; i++){
			if(!this.isGreater(this.matrix[i+1].coordinate, this.matrix[i].coordinate)){
				throw Error('invalid matrix coordinates found', this.matrix[i+1].coordinate, this.matrix[i].coordinate)
			}
		}
		console.log('validation complete')
	}

	shape(){
		return [this.n, this.m]
	}

	count(){
		return this.n*Math.pow(this.m, this.d-1)
	}

	_matrix(){
		var matrix=[]
		for(var i = 0; i<this.count(); i++){
			var coordinate = this.next()
			matrix.push(new Cell({}, coordinate))		
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

	get(coordinate){
		var j=0;
		for(var i=coordinate.length-1; i>=0; i--){
			j+=coordinate[i]*Math.pow(this.m, i)
		}
		return this.matrix[j]
	}
	corners(){
		//gets the corner coordinates for any matrix
	}
	
	faces(){
		//gets the face planes for any matrix minus the corners
	}
	
	body(){
		//gets the body sub matrix for any matrix
	}


	isEqual(coordinate1, coordinate2){
		for(var i = 0; i<this.d; i++){
			if(coordinate1[i] != coordinate2[i]){
				return false
			}
		}
		return true
	}

	isGreater(coordinate1, coordinate2){
		for(var i = this.d; i>=0; i--){
			if(coordinate1[i]>coordinate2[i]){
				return true
			}
		}
		return false
	}

	isLess(coordinate1, coordinate2){
		for(var i = this.d; i>0; i--){
			if(coordinate1[i]<coordinate2[i]){
				return true
			}
		}
		return false
	}

	in(coordinate, d){
		//this checks if a given point exists within a dimensional sub-matrix.
		//the sub-matrix is evaluated along dimensional lines specified by d which should create
		//some d-dimensional shape which could be different than the one specified by n and m
	}
	max(d){
		if(d){
			//d is a list of dimensions that are not zero'd, meaning a sub-matrix
			//the other dimensions are zeroed out to help us identify the submatrix
		}else{
			var max = []
			max.push(this.n-1)
			for(var i=0; i<this.d-1;i++){
				max.push(this.m-1)
			}
			return max
		}
		
	}

	min(d){
		if(d){
			//d is a list of dimensions that are not zero'd, meaning a sub-matrix
			//the other dimensions are zeroed out to help us identify the submatrix
		}else{
			return this.origin()
		}
	}

	origin(){
		var origin=[]
		for(var i=0; i<this.d; i++){
			origin.push(0)
		}
		return origin
	}




	next(){
		//we wish to increment the coordinate by one step, sometimes that requires incrementing different dimensions
		//if we call increment_val on a particular dimension and it returns 0, we need to increment_val on the next dimension
		if(this.previous==null){
			this.previous=this.origin()
			return this.previous
		}
		var current=JSON.parse(JSON.stringify(this.previous))
		for(var i = 0; i<this.previous.length; i++){
			if(this.inc_val(current, i)){
				current[i]=this.inc_val(current, i)
				break
			}else{
				//in this case it returns zero, and we need to set the ith index to 0, and increment the next (iterate)	
				current[i]=0;		
			}
		}
		this.previous=current
		return current
	}


	inc_val(coordinate, i){
		//console.log(coordinate[i], this.max()[i])
		//this should return the incremented value of the ith point on the coordinate
		if(coordinate[i]>=this.max()[i]){
			return 0
		}else{
			return coordinate[i]+1
		}
	}

	log(matrix){
		if(matrix){
			console.log(util.inspect(matrix, {showHidden: false, depth: null, colors: true}))
		}else{
			console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
		}
	}
}

