import {CoordinateClock} from "./Coordinates.js"
import fs from "node:fs"
import zlib from "node:zlib"
class Neighborhood{
	constructor(m, d){
		//we want to generate a neighborhood file
		//if it does not exist, then we want to use it 
		//with this class
		// if(!this.exists(m, d)){this.gen(m, d)}
		
		// this.n = this.get(m, d)

	}

	gen(m, d){
		//this creates a coordinate clock, and finds the neighbors for each coordinate
		//then creates a neighborhood object, then stores it to a file in some compressed form
		var c1=[]
		var c2=[]
		for(var i = 0; i<d; i++){
			c1.push(0)
			c2.push(m)
		}
		var coordinates = new CoordinateClock(c1, c2).coordinates()

		this._write(m, m, d, this.neighborProfile(coordinates))
	}

	neighborProfile(coordinates){
	//each point should be a key in an object
		var profile = {}
		for(var i = 0; i<coordinates.length; i++){
			var point = ""
			for(var j=0; j<coordinates[i].length; j++){
				point+=coordinates[i][j]
			}
			profile[point]={}
		}

		for(var i = 0; i<Object.keys(profile).length; i++){
			var coordinate = Object.keys(profile)[i].split("")
			var neighbors=[]
			for(var j = 0; j<Object.keys(profile).length; j++){
				//we want to check how many neighbors the coordinate has
				if(i!=j){
					var coordinate2 = Object.keys(profile)[j].split("")
					var count1=0
					for(var n=0; n<coordinate.length; n++){
						if((Math.abs(coordinate[n]-coordinate2[n])==1)){
							count1+=1
							var count2=0
							for(var k=0; k<coordinate.length; k++){
								if(n!=k&&(coordinate[k]-coordinate2[k]!=0)){
									count2+=1
								}
							}
						}
					}
					if(count1==1&&!count2){
						neighbors.push(coordinate2.join(''))
					}

				}

			}
			profile[Object.keys(profile)[i]]['neighbors']=neighbors
		}

		return profile
	}

	_write(n, m, d, neighborhood){
		var file = n+'*'+m+'_'+d+'.neighborhood'
		fs.writeFileSync(file, zlib.gzip(Buffer.from(neighborhood)))
	}


	_read(n, m, d){
		//this fetches a file, validates it then returns the neighborhood object
		var file = n+'*'+m+'_'+d+'.neighborhood'
		return JSON.parse(Buffer.toString(zlib.unzip(fs.readFileSync(file))))

	}

	validate(neighborhood){
		//takes the hash of the neighborhood file and compares it to the header in the neighborhood 
		//object
	}
}

var n = new Neighborhood(2, 3)
n.gen(2, 3)
console.log(n._read(2, 3))