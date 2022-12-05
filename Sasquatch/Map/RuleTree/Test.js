import {RuleTree} from "./RuleTree.js"
import {Map} from "../Map.js"
import {CodeMap} from "../CodeMap/CodeMap.js"

class Test{

    constructor(){
        this.tests()
    }

    tests(){
        this.ruleTree()
        this.nextNeighborhood()
        this.treeInsert()
        this.refresh()
        this.randomRule()
        this.rule()
        this.exists()
        this.exprt()
        this.import()
    }

    ruleTree(){
        var maps=[]
        var dims=1
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            map.log()
            new RuleTree().ruleTree(map.map)
            map.log()
            maps.push(map.map)
        }

        var maps2=[]
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().ruleTree(map.map)
            map.log()
            maps2.push(map.map)
        }

        for(var i=0; i<=dims-1; i++){
            //neighborhoods should be the samec
            for(var neighbor_count=maps[i]['dimension']; neighbor_count<=2*maps2[i]['dimension']; neighbor_count++){
                for(var j=0; j<maps[i]['ruleTree']['neighborhoods'][neighbor_count].length; j++){
                    for(var k=0; k<maps[i]['ruleTree']['neighborhoods'][neighbor_count][j].length; k++){
                        if(
                            maps[i]['ruleTree']['neighborhoods'][neighbor_count][j][k]
                            !=
                            maps2[i]['ruleTree']['neighborhoods'][neighbor_count][j][k]
                        ){
                            throw Error('neighborhoods for both sub-maps should have the same chars')
                        }
                    }
                }
            }
        }

        for(var m=0; m<=dims-1; m++){
            var rule_count=maps[m]['rules'].length
            for(var r = 0; r<rule_count; r++){
                for(var i=0; i<maps[m]['ruleTree']['neighborhoods'][neighbor_count].length; i++){
                    for(var j=0; j<maps[m]['ruleTree']['neighborhoods'][neighbor_count][i].length; j++){
                    
                    }
                }
            }

        }

        //we want a test where we match the next rule with the next neighborhood, and assert that it is found
        //in the rule tree using a rule() search


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