//This is responsible for encoding strings to symbols accepted by automata, computer, and rules
//these strings are categorized by a minimal superset of codes that fully encode the string
//It doesnt even have to be the entire encoding superset, it just has to embrace enough of the superset
//to fully encode the input and output for optimal efficiency. In otherwords, we want to strip away
//extraneous symbols that encode nothing of the underlying string and its expected output.
class EncodingSets{
	constructor(input, output){

	}
	arithmetic(input, output){
		//reduce the string to a minimal encoding map that is a subset of arithmetic symbols that embrace both input and output symbols


	}
	
	calculus(input, output){
		//reduce the string to a minimal encoding map that is a subset of calculus symbols that embrace both input and output symbols

	}
	physics(input, output){
		//reduce the string to a minimal encoding map that is a subset of physics symbols that embrace both input and output symbols

	}
	regex(input, output){
		//reduce the string to a minimal encoding map that is a subset of regex symbols that embrace both input and output symbols

	}
	english(input, output){
		//reduce the string to a minimal encoding map that is a subset of english symbols that embrace both input and output symbols

	}

}