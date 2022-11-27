export class Clock{
	constructor(coordinate1, coordinate2, min, max){
		//when it comes to neighbors, we create a +1 and -1 across all dimensions
		this.coordinate1=coordinate1
		this.coordinate2=coordinate2
		this.min=min
		this.max=max
		this.previous=null
	}
	origin(){
		return this.coordinate1
	}
	_max(){
		return this.coordinate2
	}
	ticks(){
		var ticks=[]
		while(true){
			var next = this.next()
			if(this.valid(next)){
				if(new Comparator(this.coordinate1.length).isEqual(this.coordinate2, next)){
					ticks.push(next)
					return ticks
				}else{
					ticks.push(next)
				}
			}
		}
	}
	valid(coordinate){
		//check to see if any of the coordinates dimensions exceed the limits set by min and max
		for(var i = 0; i<coordinate.length-1; i++){
			//console.log(coordinate[i], this.min, this.max)
			if(coordinate[i]<this.min||coordinate[i]>this.max){
				return false
			}
		}
		return true
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
		if(coordinate[i]>=this._max()[i]){
			return 0
		}else{
			return coordinate[i]+1
		}
	}
}

export class Comparator{
	constructor(d){
		this.d=d
	}
	isEqual(coordinate1, coordinate2){
		for(var i = 0; i<this.d-1; i++){
			if(coordinate1[i] != coordinate2[i]){
				return false
			}
		}
		return true
	}

	isGreater(coordinate1, coordinate2){
		for(var i = this.d-1; i>=0; i--){
			if(coordinate1[i]>coordinate2[i]){
				return true
			}
		}
		return false
	}

	isGreaterEqual(coordinate1, coordinate2){
		if(this.isEqual(coordinate1, coordinate2)&& this.isGreater(coordinate1, coordinate2)){
			return true
		}else{
			return false
		}

	}

	isLess(coordinate1, coordinate2){
		for(var i = this.d-1; i>0; i--){
			if(coordinate1[i]<coordinate2[i]){
				return true
			}
		}
		return false
	}

	isLessEqual(coordinate1, coordinate2){
		if(this.isEqual(coordinate1, coordinate2)&& this.isLess(coordinate1, coordinate2)){
			return true
		}else{
			return false
		}
	}



}

console.log(new Clock([-1,-1,-1], [2, 2, 2], 0, 2).ticks())