class Rules{
    constructor(map){
        this.map=map
        this.map['rules']={}

        for(var i = 0; i<dimensions.length; i++){
            this.map['rules'][dimensions[i]]={}
            if(input.length>output.length){
                //square shape
                this.map['rules'][dimensions[i]]['shape']=
                    Math.ceil(Math.pow(input.length, 1/dimensions[i]))
            }else{
                this.map['rules'][dimensions[i]]['shape']=
                    Math.ceil(Math.pow(output.length, 1/dimensions[i]))
            }
            this.map['rules'][dimensions[i]]['neighborhood']=
                new Neighborhood()._read(
                    this.map['rules'][dimensions[i]]['shape'], 
                    this.map['rules'][dimensions[i]]['shape'], 
                    dimensions[i]
                )
    
        }
        this.rules(this.map)
    }

    rules(map){
		var symbols=this._symbols
		var rules = map['rules']
		var keys = Object.keys(rules)
		for(var i = 0; i<keys.length; i++){
			var cells = Object.keys(rules[keys[i]]['neighborhood'])
			for(var j=0; j<cells.length; j++){
				var neighborKeys = Object.keys(rules[keys[i]]['neighborhood'][cells[j]])
				for(var k=0; k<neighborKeys.length; k++){
					rules[keys[i]]['neighborhood'][cells[j]][neighborKeys[k]]=
                        map['codes'][Math.floor(Math.random() * map['codes'].length)]
				}
			}
		}
	}
}
