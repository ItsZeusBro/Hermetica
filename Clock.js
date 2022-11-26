class CoordinateClock{
	constructor(coordinate1, coordinate2){
		//when it comes to neighbors, we create a +1 and -1 across all dimensions
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