export class Clock{
	constructor(coordinate1, coordinate2){
		//when it comes to neighbors, we create a +1 and -1 across all dimensions
		this.coordinate1=coordinate1
		this.coordinate2=coordinate2
		this.previous=null
	}
	origin(){
		return this.coordinate1
	}
	max(){
		return this.coordinate2
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
}

export class Comparator{
	constructor(d){
		this.d=d
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

	isGreaterEqual(coordinate1, coordinate2){
		if(this.isEqual(coordinate1, coordinate2)&& this.isGreater(coordinate1, coordinate2)){
			return true
		}else{
			return false
		}

	}

	isLess(coordinate1, coordinate2){
		for(var i = this.d; i>0; i--){
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