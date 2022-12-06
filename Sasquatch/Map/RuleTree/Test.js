import {RuleTree} from "./RuleTree.js"
import {Map} from "../Map.js"
import {CodeMap} from "../CodeMap/CodeMap.js"
import assert from "node:assert"
import {Utils} from "../Utils/Utils.js"

class Test{

    constructor(){
        this.tests()
    }

    tests(){
        this.ruleTree()
        this.neighborhoods()
        this.nNeighborhoods()
        this.treeInsert()
        this.refresh()
        this.randomRule()
        // this.rule()
        // this.exists()
        // this.exprt()
        // this.import()
    }

    ruleTree(){
        var maps=[]
        var dims=1

        for(var i = 1; i<=dims; i++){
            var map = new Map('abcd', 'abcd', 'english', i)
            new RuleTree().ruleTree(map.map)
            maps.push(map)
            maps[0].log()
        }

        var maps2=[]
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcd', 'abcd', 'english', i)
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
        //WE NEED TO REWRITE THE NEIGHBORHOODS ALGORITHM MORE EFFICIENTLY (SEE COMBINATIONS WITH REPETITIONS)
        
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
                assert.equal(map.map['nNeighborhoods']==new Utils().nNeighborhoods(s.length+1, d), true, 'nNeighborhoods Test Error')    
            }   
        }
    }


    treeInsert(){
        //everytime we insert a rule using a neighborhood into a tree
        //we need to check the rule using the neighborhood
        var maps=[]
        var dims=3

        for(var i = 1; i<=dims; i++){
            var map = new Map('abcd', 'abcd', 'english', i)
            var rt = new RuleTree()
            rt.ruleTree(map.map)
            while(true){
                var neighborhood = rt.nextNeighborhood()            
                if(neighborhood){
                    var rule= rt.randomRule(map.map['codes'])
                    rt.treeInsert(map.map, neighborhood,rule)
                    assert.equal(rule == rt.rule(map.map, neighborhood), true, 'treeInsert Error')
                }else{
                    break
                }
            }
        }
    }

    refresh(){
        var dims=5
        var total=0;
        var total_rules=0;
        for(var i = 1; i<=dims; i++){
            //THIS IS NOT COLLISION SAFE, IT MIGHT THROW ERRORS
            var map = new Map('abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'english', i)
            var rt = new RuleTree()
            rt.ruleTree(map.map)
            var rules = map.map['rules']
            rt.refresh(map.map)
            var rules2= map.map['rules']
            total_rules+=rules2.length
            for(var i = 0; i<rules2.length; i++){
                if(rules[i]==rules2[i]){
                    total+=1
                }
            }   

        }
        console.log('total rules=', total_rules, 'total refresh collisions=', total)
        if(total_rules==total){
            throw Error('WARNING, THIS FUNCTION IS NOT COLLISION SAFE, PERFORM TEST AGAIN TO ENSURE REFRESH() WORKS')
        }
    }

    randomRule(){
        var map = new Map('abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'english', i)
        var rt = new RuleTree()
        rt.ruleTree(map.map)
        var rules1= []
        var rules2= []

        for(var i = 0; i<10000; i++){
            rules1.push(rt.randomRule(map.map['codes']))
            rules2.push(rt.randomRule(map.map['codes']))
        }
        var total=0;
        for(var i = 0; i<10000; i++){
            if(rules1[i]==rules2[i]){
                total+=1
            }
        }
        console.log('total rules=', rules1.length, 'total random rule collisions=', total)
        if(rules1.length==total){
            throw Error('WARNING, THIS FUNCTION IS NOT COLLISION SAFE, PERFORM TEST AGAIN TO ENSURE REFRESH() WORKS')
        }
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