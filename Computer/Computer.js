import util from 'node:util'
import {createHash} from 'node:crypto'
import {Automata} from "./Automata.js"

//when we find a simulation solution for a specific input, we need to check that solution against other inputs
class Computer{
	constructor(input, output, rules){
		//we want a new automata instance for each successive generation 
		this.input=input
		//check to make sure input does not already equal output
		this.solution(input, output)
		this.output=output
		this.hashes={}
		this.rules=rules
		this.m=this.input.m
		this.d=this.input.d
		this.simulate(input, rules, output)
	}

	nextGen(prevGen, rules, output){
		//console.log('here', prevGen.m, prevGen.d)
		//console.log(prevGen)
		var nextGen = new Automata(prevGen.vector, prevGen.output_size, prevGen.d)
		prevGen.copy(nextGen, prevGen)
		nextGen.neighborhoods(nextGen)

		for(var i = 0; i<prevGen.matrix.matrix.length; i++){
			var neighborhood = nextGen.matrix.matrix[i]['data']['neighborhood']
			nextGen.matrix.matrix[i]['data']['mode']=rules.context(neighborhood)
		}

		if(this.solution(nextGen, output)){
			console.log('solution found!')
			this.print(nextGen, 2)
			return true
		}
		var hash = this.hash(JSON.stringify(nextGen.matrix.matrix))
		if(!this.hashes[hash]){
			this.hashes[hash]=hash

			return nextGen
			
		}else{
			//this.print(nextGen, 2)
			return undefined
		}
	}
	solution(output1, output2){
		var hash1 = this.hash(output1.stringifyMode(output1))
		var hash2 = this.hash(output2.stringifyMode(output2))

		if(hash1==hash2){
			//this is where we want to store some data
			return true
		}
		return false
	}
	hash(string) {
		return createHash('sha256').update(string).digest('hex');
	}

	print(gen, d){
		if(gen.d==1||d==1){
			for(var i=0; i<(this.m); i++){
				process.stdout.write(this.asciiArt(gen.matrix.matrix[i]['data']['mode'])+ " ")
				if((i%(gen.m))==gen.m-1){process.stdout.write('\n')}
			}
		}else{
			console.log()
			for(var i=0; i<(gen.m*gen.m); i++){
				process.stdout.write(this.asciiArt(gen.matrix.matrix[i]['data']['mode'])+ " ")
				if((i%(gen.m))==gen.m-1){process.stdout.write('\n')}
			}
		}
	}



	simulate(input, rules, output){
		if(this.solution(input, output)){
			console.log('output')
			this.print(output, 2)
			console.log('generations')
			this.print(input, 2)
			throw Error('input already equals output')
		}
		var generation=0;
		console.log('input')
		this.print(input, 2)

		console.log('output')
		this.print(output, 2)

		var automata=input
		while(true){
			automata=this.nextGen(automata, rules, output)
			if(automata==true){
				this.record(input, output, rules, generation)
				rules = new Rules(this.m, this.d)
				automata=input
				generation=0
				this.hashes={}
				throw Error('solution found!')
			}else if(!automata){
				//console.log('termination without solution')
				rules = new Rules(this.m, this.d)
				automata=input
				generation=0
				this.hashes={}
			}else{
				generation+=1
				//this.print(automata, 2)
				//this.printInPlace(automata, 2)
			}
		}
	}

	record(input, output, rules, generation){
		//console.log(input, output, rules, generation)
	}
}




// var vectorizer = new Vectorizer()
// //ultimately our simulation engine's solution should match the solution 
// //for other inputs similarly defined for the purpose intended for a function
// //That means the same simulation should be checked against other inputs and 
// //the generation should be the only thing that matters for the result, so long as it is correct
// //vecrorizer.asciiStringToVector('world')
// //console.log(vectorizer.vectorToAsciiString())
// var input = new Automata(vectorizer.asciiStringToVector('1+1'), '2'.length*8, 1)
// var output = new Automata(vectorizer.asciiStringToVector('2'), '1+1'.length*8, 1)
// var rules = new Rules(input.m, input.d)
// //console.log(rules)
// new Computer(input, output, rules)