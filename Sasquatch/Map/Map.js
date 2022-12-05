// import util from 'node:util'
import {Utils} from "./Utils/Utils.js"
import { CodeMap } from "./CodeMap/CodeMap.js"
import {CoordinateClock} from "./Matrix/Coordinates.js"
import {Neighborhood} from "./Neighborhood/Neighborhood.js"
import {createHash} from 'node:crypto'
import {RuleTree} from "./RuleTree/RuleTree.js"
import fs from "node:fs"
import util from 'node:util'


//REMEMBER when REFRESHING a RuleSystem, we dont have to recreate all of the components
//This optimizes load times between simulations which can be significant
export class Map{
	constructor(input, output, context, dimension){
		this.map = new CodeMap(input, output, context).map
		this.map['dimension']=dimension
		this.map['omega']=this.map['codes'].length
		//new RuleTree(this.map, true)
		//1-2 neighbors for 1 dimension; 2-4 for 2 dimensions; 3-6 for 3 dimensions;  4-8 for 4 dimensions 
	}



	//public api

	shape(){
		
	}

	neighborhood(dimension){
		
	}

	neighbors(dimension, coordinate){

	}

	coordinates(dimension){

	}

	input(){
		return this.map['inputVector']
	}

	output(){
		return this.map['outputVector']
	}
	log(element){
		//console.log(this.map)
		if(element){
			console.log(util.inspect(element, {showHidden: false, depth: 4, colors: true}))

		}else{
			console.log(util.inspect(this.map, {showHidden: false, depth: 4, colors: true}))
		}
	}
	//setup functions


	hash(map){
		//if we hash the relevant details of a simulation and store the hash alongside it
		//we can do a quick lookup to see if the problem was already solved ensuring we dont
		//waste compute time. A hash is particular to a specific input, output, and context
		//it is not particular to a group of test cases, just one of them
		var ruleKeys = Object.keys(map['rules'])
		for(var i = 0; i<ruleKeys.length; i++){
			var rule = JSON.stringify(map['rules'][ruleKeys[i]]['neighborhood'])
			map['rules'][ruleKeys[i]]['nhHash']=createHash('sha256').update(rule).digest('hex'); 
		}
		
	}
}
