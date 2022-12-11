import util from 'node:util'
import { Comparator, Coordinates } from '../Coordinates/Coordinates.js'

class Cell{
	constructor(data=null, coordinate){
		this.data=data
		this.coordinate=coordinate
	}
}

export class Matrix {
	constructor(coordinate1, coordinate2, data, mtx, coordinates){
		this.mtx;
		this.coordinate1;
		this.coordinate2;
		this.coordinates;

		if(coordinates){
			this.coordinates = coordinates
			this.coordinate1=this.coordinates.min()
			this.coordinate2=this.coordinates.max()
		}else{ 
			this.coordinates=new Coordinates(coordinate1, coordinate2) 
			this.coordinate1=coordinate1
			this.coordinate2=coordinate2
		}
		this.comparator = this.coordinates.comparator
		this.m=this.coordinates.range()
		this.d=this.coordinate1.length
		if(mtx){ this.mtx=mtx }else{ this._mtx(data) }
	}
	
	max(d){
		var max1 = Math.max(this.coordinate1[d])
		var max2 = Math.max(this.coordinate2[d])
		if(max1<=max2){return max1}
		else{return max2}
	}

	min(d){
		var min1 = Math.min(this.coordinate1[d])
		var min2 = Math.min(this.coordinate2[d])
		if(min1<=min2){return min1}
		else{return min2}
	}

	diff(coordinate1, coordinate2){
		var diff = []
		for(var i = 0; i<coordinate1.length; i++){
			diff.push(Math.abs(coordinate1[i]-coordinate2[i]))
		}
		return diff
	}

	//this can refresh a mtx with new data
	_mtx(data){
		var coordinates = this.coordinates.coordinates()
		var mtx=[]
		for(var i = 0; i<coordinates.length; i++){
			if(Array.isArray(data)){
				mtx.push(new Cell(data[i], coordinates[i]))
			}else if(typeof data === 'object'){
				mtx.push(new Cell(data, coordinates[i]))
			}else{
				mtx.push(new Cell({}, coordinates[i]))
			}
		}
		this.mtx=mtx
		return mtx
	}
	
	shape(){
		return this.coordinates.shape(this.coordinate2, this.coordinate1)
	}

	count(){ return this.mtx.length }

	at(coordinate, data, key){
		//console.log(coordinate, this.mtx[this.skip(coordinate)])
		this.mtx[this.skip(coordinate)].data[key]=data
	}
	get(coordinate){ 
		//console.log(coordinate)
		return this.mtx[this.skip(coordinate)] 
	}

	skip(coordinate){
		//console.log(coordinate)
		var index=0;
		var diff=this.comparator.diff(this.coordinate1, coordinate)

		for(var i=0; i<coordinate.length; i++){
			index+=diff[i]*Math.pow(this.m, coordinate.length-1-i)
		}
		return index
	}

	window(coordinate1, coordinate2){
		//THIS WILL CREATE A NEW MATRIX WITH THE SAME MTX IN MEMORY
		var mtx = this._window(this.skip(coordinate1), this.skip(coordinate2))
		return new Matrix(coordinate1, coordinate2, null, mtx)
	}

	copy(){
		//this optimizes copying a matrix, by reducing combinatoric complexity
		//also reduces load times for data
		return new Matrix(null, null, null, this.mtx.slice(), this.coordinates)
	}

	_window(index1, index2){
		var mtx=[]
		for(var i =index1; i<=index2; i++){
			//console.log(this.mtx)
			//console.log(i, this.mtx[i])
			mtx.push(new Cell(this.mtx[i].data, this.mtx[i].coordinate))
		}
		return mtx
	}


	print(){
		//stringify the mtx
		for(var i = 0; i<this.mtx.length; i++){
			process.stdout.write(this.mtx[i]['data']['mode'])
		}
		process.stdout.write('\n')
	}

	log(mtx){
		if(mtx){
			console.log(util.inspect(mtx, {showHidden: false, depth: null, colors: true}))
		}else{
			console.log(util.inspect(this.mtx, {showHidden: false, depth: null, colors: true}))
		}
	}
}