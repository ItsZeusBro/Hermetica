const { defaultMaxListeners } = require('events')
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
	constructor(n, m, d){
		this.m=m
		this.n=n
		this.d=d
		this.verify()
		this.previous=null
		//this.coords = this.coordinates(n, m, d)


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

	shape(){

	}

	count(){
		return this.n*Math.pow(this.m, this.d-1)
	}
	

	
	max(){
		var max = []
		max.push(this.n-1)
		for(var i=0; i<this.d-1;i++){
			max.push(this.m-1)
		}
		return max
	}
	origin(){
		var origin=[]
		for(var i=0; i<this.d; i++){
			origin.push(0)
		}
		return origin
	}
	min(){
		return this.origin()
	}
	previous(){
		return this.previous
	}
	next(previous=this.previous){
		//we wish to increment the coordinate by one step, sometimes that requires incrementing different dimensions
		//if we call increment_val on a particular dimension and it returns 0, we need to increment_val on the next dimension
		if(previous==null){
			this.previous=this.origin()
			return this.previous
		}

		var current=previous
		for(var i = 0; i<previous.length; i++){
			if(this.inc_val(previous, i)){
				current[i]=this.inc_val(previous, i)
				break
			}else{
				//in this case it returns zero, and we need to set the ith index to 0, and increment the next (iterate)	
				current[i]=0;		
			}
		}
		this.previous=current
		return current
		
		
	}
	log_coordinates(){
		for(var i = 0; i<this.count(); i++){
			console.log(this.next())
		}
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

	log(){
		console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
	}

}

const matrix = new Matrix(3, 5, 4)
matrix.log_coordinates()
// matrix.pos([0, 0, 0, 0], 0, 0, 0, 0)
// matrix.pos([2, 4, 4, 4], 2, 4, 4, 4)
// matrix.pos([1, 4, 4, 4], 1, 4, 4, 4)
//console.log(matrix.get_coordinates(matrix.max()))
//matrix.load()

// console.log(matrix.count())
// console.log(matrix.shape())
// matrix.log()
// console.log(matrix.count())

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


//
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

