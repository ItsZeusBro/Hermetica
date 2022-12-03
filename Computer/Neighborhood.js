import {CoordinateClock} from "../Matrix/Coordinates.js"
import fs from "node:fs"
import zlib from "node:zlib"
import {createHash} from 'node:crypto'
import process from 'node:process';


  
export class Neighborhood{
	constructor(n, m, d){
		this.file=null;
		
		//we want to generate a neighborhood file
		//if it does not exist, then we want to use it 
		//with this class
		if(n&&n&&d){
			this.init(n, m, d)
		}
	}
	init(n, m, d){
		for(var i=0; i<n.length; i++){
			for(var j=0; j<m.length; j++){
				for(var k=0; k<d.length; k++){
						if(n[i]==m[j]){								//we are only doing square matricies right now!!!!!!

						if(this._exists(n[i], m[j], d[k])==false){

							//console.log(n[i], m[j], d[k])

							this.gen(n[i], m[j], d[k])
						}
					}
				}
			}
		}
	}
	clean(n){
		if(n.file){
			n=n.file[0]
			m=n.file[1]
			d=n.file[2]
			var file = './Neighborhoods/'+n+'*'+m+'_'+d+'.neighborhood'
			fs.unlink(file)
		}
	}

	gen(n, m, d){
		//this creates a coordinate clock, and finds the neighbors for each coordinate
		//then creates a neighborhood object, then stores it to a file in some compressed form
		var c1=[]
		var c2=[]
		for(var i = 0; i<d; i++){
			c1.push(0)
			c2.push(m-1)
		}
		var coordinates = new CoordinateClock(c1, c2).coordinates()
		var profile = this.neighborProfile(coordinates)
		
		this.file = [m, m, d]
		if(this._write(m, m, d, profile)==true){this.file=null}
	}

	neighborProfile(coordinates){
	//each point should be a key in an object
		var profile = {}

		for(var i = 0; i<coordinates.length; i++){
			var point = coordinates[i].join("")
			profile[point]={}
			var coordinate = coordinates[i]
			var neighbors=[]
			for(var j = 0; j<coordinates.length; j++){
				//we want to check how many neighbors the coordinate has
				if(i!=j){
					var coordinate2 = coordinates[j]
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
			profile[point]=neighbors.sort()
		}

		return profile
	}

	
	_write(n, m, d, neighborhood){
		var file = './Neighborhoods/'+n+'*'+m+'_'+d+'.neighborhood'
		fs.writeFileSync(file, JSON.stringify(neighborhood))
		return true
	}

	_exists(n, m, d){
		var file = './Neighborhoods/'+n+'*'+m+'_'+d+'.neighborhood'
		return fs.existsSync(file)
	}
	_read(n, m, d){

		//this fetches a file, validates it then returns the neighborhood object
		var file = './Neighborhoods/'+n+'*'+m+'_'+d+'.neighborhood'
		return JSON.parse(fs.readFileSync(file))

	}


	validate(neighborhood){
		//takes the hash of the neighborhood file and compares it to the header in the neighborhood 
		//object
	}
}

var n=[]
var m=[]
//NEIGHBORHOOD PROFILE ONLY WORKS UP TO 9, THEN IT GETS BUGGY. WE NEED TO FIND OUT WHY
for(var i=2; i<=20; i++){n.push(i); m.push(i)}
var n = new Neighborhood(n, m, [2])

process.on('SIGINT', (n) => {
	n.clean()
	console.log('Received SIGINT. Press Control-D to exit.');
  });

// var coordinate1=[0, 0, 0]
// var coordinate2=[2, 2, 2]
// var coordinates = new CoordinateClock(coordinate1, coordinate2).coordinates()
// console.log(n.neighborProfile(coordinates))
// //console.log(n._read(2, 2, 3))