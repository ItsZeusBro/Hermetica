import { Matrix } from "./Matrix.js"
import {Clock, Comparator} from "./Coordinates.js"
import util from 'node:util'
import {createHash} from 'node:crypto'

class Computer{
	constructor(input, output, rules){
		//we want a new automata instance for each successive generation 
		this.input=input
		this.output=output
		this.hashes={}
		this.rules;
		if(rules){
			this.rules=rules
			this.rules.m=m
			this.rules.d=d
		}else{
			this.rules=new Rules(m, d)
		}
	}

	nextGen(prevGen){
		var nextGen = new Automata(prevGen.m, prevGen.d, this.rules)
		prevGen.repopulate(nextGen.matrix, prevGen.matrix)
		nextGen.neighborhoods(nextGen.matrix)

		for(var i = 0; i<prevGen.matrix.length; i++){
			var neighborhood = nextGen.matrix[i]['data']['neighborhood']
			nextGen.matrix[i]['data']['mode']=this.rules.context(neighborhood)
		}

		var hash = this.hash(JSON.stringify(nextGen.matrix.matrix))
		if(this.OutputValid(nextGen, this.output))
		if(!this.hashes[hash]){
			this.hashes[hash]=hash
			return true
		}else{
			return
		}
	}
	outputValid(output1, output2){
		var hash1 = this.hash(JSON.stringify(output1.matrix.matrix))
		var hash2 = this.hash(JSON.stringify(output2.matrix.matrix))

		if(hash1==hash2){
			//this is where we want to store some data
		}
	}
	hash(string) {
		return createHash('sha256').update(string).digest('hex');
	}

	print(d){
		if(this.d==1||d==1){
			for(var i=0; i<(this.m); i++){
				process.stdout.write(this.asciiArt(this.generations[this.generations.length-1].matrix[i]['data']['mode'])+ " ")
				if((i%(this.m))==this.m-1){process.stdout.write('\n')}
			}
		}else{
			console.log()
			for(var i=0; i<(this.m*this.m); i++){
				process.stdout.write(this.asciiArt(this.generations[this.generations.length-1].matrix[i]['data']['mode'])+ " ")
				if((i%(this.m))==this.m-1){process.stdout.write('\n')}
			}
		}
	}

	asciiArt(val){
		if(val==0){
			return String.fromCharCode('9634')
		}
		if(val==1){
			return String.fromCharCode('9635')
		}
	}

	simulate(){
		while(true){
			if(!automata.nextGen()){return}
			automata.print(2)
		}
	}
}

