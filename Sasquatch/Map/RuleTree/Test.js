import {RuleTree} from "./RuleTree.js"
import {Map} from "../Map.js"
import {CodeMap} from "../CodeMap/CodeMap.js"
import assert from "node:assert"

class Test{

    constructor(){
        this.tests()
    }

    tests(){
        this.ruleTree()
        this.neighborhoods()
        this.nNeighborhoods()
        // this.nextNeighborhood()
        // this.treeInsert()
        // this.refresh()
        // this.randomRule()
        // this.rule()
        // this.exists()
        // this.exprt()
        // this.import()
    }

    ruleTree(){

        var maps=[]
        var dims=3
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().ruleTree(map.map)
            maps.push(map)
        }

        var maps2=[]
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().ruleTree(map.map)
            maps2.push(map)
        }

        for(var m=0; m<=dims-1; m++){
            var rules = maps[m].map['rules'].slice()
            for(var i=0; i<maps[m].map['neighborhoods'].length; i++){
                var message='neighborhoods for both sub-maps should have the same chars'
                //CHECKING DETERMINISM OF NEIGHBORHOOD CONSTRUCTION
                this.arrEquals(maps[m].map['neighborhoods'][i], maps2[m].map['neighborhoods'][i], message)

                //CHECKING TO SEE IF rule() FUNCTION RETURNS DETERMINISITCALLY ORDERED RULE FOR
                //DETERMINISTICALLY ORDERED NEIGHBORHOOD NEIGHBORHOOD
                var rule = maps[m].map['rules'][i]
                var neighborhood = maps[m].map['neighborhoods'][i]
                if(maps[m].rule(maps[m].map, neighborhood)!=rule){
                    throw Error('neighborhood rule combination should be present in the tree through rule(neighborhood)')
                }
            }
        }
        //we want a test where we match the next rule with the next neighborhood, and assert that it is found
        //in the rule tree using a rule() search
    }


    neighborhoods(){
        //we want to check that neighborhoods do not repeat across dimensions
        
        var strings=[]
        var string=""

        for(var i = 1; i<=5; i++){

            string+=i
            strings.push(string)
        }

        for(var d = 1; d<=5; d++){
            for(var i = 0; i<5; i++){
                var s = strings[i]
                var map = new Map(s, s, 'english', d)
                new RuleTree().ruleTree(map.map)
                // map.log()
                for(var j=0; j<map.map['neighborhoods'].length; j++){
                    for(var n=j+1; n<map.map['neighborhoods'].length; n++){
                        this.arrNotEquals(map.map['neighborhoods'][j], map.map['neighborhoods'][n])
                    }
                }
            }
            
        }
        

    }
    arrEquals(arr1, arr2, message){
        for(var i = 0; i<arr1.length; i++){
            assert.equal(arr1[i], arr2[i], message)
        }
    }

    arrNotEquals(arr1, arr2){
        var equal=0
        for(var i = 0; i<arr1.length; i++){
            if(arr1[i]==arr2[i]){
                equal+=1
            }
        }
        if(arr1.length!=arr2.length){
            return
        }
        if(equal==arr2.length){
            throw Error(arr1, "and", arr2, "should not be equal")
        }
    }

    nNeighborhoods(){
        var strings=[]
        var string=""

        for(var i = 1; i<=5; i++){

            string+=i
            strings.push(string)
        }

        for(var d = 1; d<=5; d++){
            for(var i = 0; i<5; i++){
                var s = strings[i]
                var map = new Map(s, s, 'english', d)
                new RuleTree().ruleTree(map.map)
                // map.log()
                assert.equal(map.map['nNeighborhoods']==this._nNeighborhoods(s.length+1, d), true, 'nNeighborhoods Test Error')    
            }
            
        }
      

    }
    _nNeighborhoods(uniqueChars, dimension){
        var r = uniqueChars
        var nNeighborhoods=0
        for(var n = dimension; n<=2*dimension; n++){
            nNeighborhoods+=(this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1))
        }
        return nNeighborhoods
    }
    factorial (n) {
        //https://stackoverflow.com/questions/3959211/what-is-the-fastest-factorial-function-in-javascript
        if (n === 0)
        { return 1; }
        else
        { return n * this.factorial( n - 1 ); }
    }
    nextNeighborhood(){

    }

    treeInsert(){

    }

    refresh(){

    }

    randomRule(){

    }

    rule(){

    }

    exists(){

    }

    exprt(){

    }

    import(){

    }

}

new Test()