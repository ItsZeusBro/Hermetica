import {Combinatorics} from '../Utils/Combinatorics.js'
export class Coordinates{
	constructor(coordinate1, coordinate2){
		//when it comes to neighbors, we create a +1 and -1 across all dimensions
		this.coordinate1=coordinate1
		this.coordinate2=coordinate2
		this._coordinates=null
		this.previous=null
	}
	_min(){
		return this.coordinate1.slice()
	}
	_max(){
		return this.coordinate2.slice()
	}
	coordinates(){
		var symbols = new Set(this.coordinate1.slice().concat(this.coordinate2.slice()))
		symbols = Array.from(symbols)
		var min = Math.min(...symbols)
		var max = Math.max(...symbols)
		symbols=[]
		for(var i = min; i<=max; i++){
			symbols.push(i)
		}
		this._coordinates = new Combinatorics().PwithR(symbols, this.coordinate1.length)
		return this._coordinates
	}

	next(){
		//if the coordinate index is greater than max after incrementing
		//we want to reduce it to min, 
		//else increment the next index (break)
		//keep this on a loop
		
		if(this.previous==null){
			this.previous=this._min()
			return this.previous
		}
		var current=this.previous
		for(var i = 0; i<this.previous.length; i++){
			if(this.inc_val(current, i)==undefined){
				current[i]=this._min()[i];

			}else{
				current[i]=	this.inc_val(current, i)
				break	
			}
		}
		this.previous=current
		return current
	}


	inc_val(coordinate, i){
		//console.log(coordinate[i], this.max()[i])
		//this should return the incremented value of the ith point on the coordinate
		if((coordinate[i]+1)>this._max()[i]){
			return
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
		for(var i = 0; i<coordinate1.length; i++){
			if(coordinate1[i] != coordinate2[i]){
				return false
			}
		}
		return true
	}

	isGreater(coordinate1, coordinate2){
		for(var i = coordinate1.length-1; i>=0; i--){
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
		for(var i = coordinate1.length-1; i>=0; i--){
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


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
