import util from 'node:util'
import { Comparator, Coordinates } from '../Coordinates/Coordinates.js'

class Cell{
	constructor(data=null, coordinate){
		this.data=data
		this.coordinate=coordinate
	}
}

export class Matrix {
	constructor(coordinate1, coordinate2, data){
		this.coordinates = new Coordinates(coordinate1, coordinate2)
		this.comparator = this.coordinates.comparator
		this.virtual=this._virtual(coordinate1, coordinate2)
		this.m=this.coordinates.range()
		this.d=coordinate1.length
		this.coordinate1=coordinate1
		this.coordinate2=coordinate2
		this.mtx;
		this._mtx(data)
	}
	_virtual(coordinate1, coordinate2){
		var min=Math.min(...coordinate1)
		if(min<0){
			return Math.abs(min)
		}else{
			return false
		}
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
		this.mtx[this.skip(coordinate)]['data'][key]=data
	}

	skip(coordinate){
		var index=0;
		if(this.virtual){

			for(var i=0; i<coordinate.length; i++){
				if(i<coordinate.length-1){
					index+=(coordinate[i]+this.virtual)*Math.pow(this.m, coordinate.length-1-i)
				}else if(i==coordinate.length-1){
					//this means we are at the 0 index position for the coordinate
					index+=(coordinate[i]+this.virtual)
				}
			}
		}else{
			for(var i=0; i<coordinate.length; i++){
				if(i<coordinate.length-1){
					index+=coordinate[i]*Math.pow(this.m, coordinate.length-1-i)
				}else if(i==coordinate.length-1){
					//this means we are at the 0 index position for the coordinate
					index+=coordinate[i]
				}
			}
		}
		
		return index
	}

	get(coordinate){ return this.mtx[this.skip(coordinate)] }

	copy(){ return {...this.mtx} }

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

// var mtx = new Matrix([-2,-2,-2], [-1 -1, -1])
