import {Combinatorics} from '../../Combinatorics/Combinatorics.js'
export class Coordinates{
	constructor(coordinate1, coordinate2){
		this.coordinate1=coordinate1
		this.coordinate2=coordinate2
		this.comparator = new Comparator(coordinate1.length)
		this._coordinates=null
		this.previous=null
	}

	min(){ return this.coordinate1.slice() }

	max(){ return this.coordinate2.slice() }

	coordinates(){
		var symbols = new Set(this.coordinate1.slice().concat(this.coordinate2.slice()))
		symbols = Array.from(symbols)
		var min = Math.min(...symbols)
		var max = Math.max(...symbols)
		symbols=[]
		for(var i = min; i<=max; i++){ symbols.push(i) }
		this._coordinates = new Combinatorics().PwithR(symbols, this.coordinate1.length)
		return this._coordinates
	}

	//sorting coordinates comes down to the comparator function
	//[]

	sort(coordinates){
		coordinates.sort(function(a, b){
			if(new Comparator().isGreater(a, b)){
				return 1
			}else if(new Comparator().isLess(a, b)){
				return -1
			}else{
				return 0
			}
		});
		return coordinates
	}
	
	range(){ return this.comparator.range(this.coordinate1, this.coordinate2) }

	next(){		
		if(this.previous==null){
			this.previous=this.min()
			return this.previous
		}
		var current=this.previous
		for(var i = 0; i<this.previous.length; i++){
			if(this.incVal(current, i)==undefined){
				current[i]=this.min()[i];
			}else{
				current[i]=	this.incVal(current, i)
				break	
			}
		}
		this.previous=current
		return current
	}
	prev(){		
		return previous
	}

	incVal(coordinate, i){
		if((coordinate[i]+1)>this.max()[i]){
			return
		}else{
			return coordinate[i]+1
		}
	}
	shape(coordinate1, coordinate2){
		var shape=[]
		for(var i =0; i<coordinate1.length; i++){
			shape.push(Math.abs(coordinate1[i]-coordinate2[i]))
		}
		return shape
	}

	in(coordinate, coordinate1, coordinate2){
		if(
			new Comparator().isGreaterEqual(coordinate, coordinate1) 
			&& 
			new Comparator().isLessEqual(coordinate, coordinate2)
		){
			return true
		}else{
			return false
		}
	}

	window(coordinate1, coordinate2){
		//we want to slice the list from coordinate1 to coordinate2
		//so we need to access the list position of coordinate1, which could be a problem if we dont
		//use an equation 
	}
}

export class Comparator{
	constructor(d){
		this.d=d
	}

	range(coordinate1, coordinate2){
		var min = Math.min(...coordinate1)
		var max = Math.max(...coordinate2)
		return max-min+1
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
		if(this.isEqual(coordinate1, coordinate2)||this.isGreater(coordinate1, coordinate2)){
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
		if(this.isEqual(coordinate1, coordinate2)||this.isLess(coordinate1, coordinate2)){
			return true
		}else{
			return false
		}
	}
}
