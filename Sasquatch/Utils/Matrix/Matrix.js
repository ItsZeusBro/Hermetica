import util from 'node:util'
import { Comparator, Coordinates } from './Coordinates.js'

class Cell{
	constructor(data=null, coordinate){
		this.data=data
		this.coordinate=coordinate
	}
}

export class Matrix {
	constructor(coordinate1, coordinate2){
		this.coordinates = new Coordinates(coordinate1, coordinate2)
		this.m=this.coordinates.range()
		this.d=coordinate1.length
		this.comparator = new Comparator(this.d)
		this.mtx=this._mtx()
	}

	//this can refresh a matrix with new data
	_mtx(data){
		var coordinates = this.coordinates.coordinates()
		var mtx=[]
		for(var i = 0; i<coordinates.length; i++){
			if(data){
				mtx.push(new Cell(data[i], coordinates[i]))
			}else{
				mtx.push(new Cell('', coordinates[i]))
			}
		}
		return mtx
	}
	
	shape(){
		var shape = []
		for(var i=0; i<this.d; i++){
			shape.push(this.m)
		}
	}

	count(){ return this.m*Math.pow(this.m, this.d-1) }

	at(coordinate, data, key){
		this.matrix[this.skip(coordinate)]['data'][key]=data
	}

	skip(coordinate){
		var j=0;
		coordinate = coordinate.split(',')
		for(var i=coordinate.length-1; i>=0; i--){
			if(coordinate[i]=='0'){
				j+=0
			}else{
				j=j+(parseInt(coordinate[i])*Math.pow(this.m, i))
			}
		}
		return j
	}

	get(coordinate){ return this.matrix[this.skip(coordinate)] }

	copy(){ return {...this.matrix} }

	print(){
		//stringify the matrix
		for(var i = 0; i<this.matrix.length; i++){
			process.stdout.write(this.matrix[i]['data']['mode'])
		}
		process.stdout.write('\n')
	}

	log(matrix){
		if(matrix){
			console.log(util.inspect(matrix, {showHidden: false, depth: null, colors: true}))
		}else{
			console.log(util.inspect(this.matrix, {showHidden: false, depth: null, colors: true}))
		}
	}
}