import {CoordinateClock} from "./Coordinates.js"
class Neighborhood{
	constructor(m, d){
		//we want to generate a neighborhood file
		//if it does not exist, then we want to use it 
		//with this class
		if(!this.exists(m, d)){this.gen(m, d)}
		
		this.n = this.get(m, d)

	}

	gen(m, d){
		//this creates a coordinate clock, and finds the neighbors for each coordinate
		//then creates a neighborhood object, then stores it to a file in some compressed form
		var c1=[]
		var c2=[]
		for(var i = 0; i<d; i++){
			c1.push(0)
			c1.push(m)
		}
		var coordinates = new CoordinateClock(c1, c2).ticks()
	}
	get(m, d){
		//this fetches a file, validates it then returns the neighborhood object
	}

	validate(neighborhood){
		//takes the hash of the neighborhood file and compares it to the header in the neighborhood 
		//object
	}
}