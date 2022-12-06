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
            maps.push(map)
        }

        var maps2=[]
        for(var i = 1; i<=dims; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().ruleTree(map.map)
            map.log()
            maps2.push(map)
        }

        for(var m=0; m<=dims-1; m++){
            for(var neighbor_count=maps[m].map['dimension']; neighbor_count<=2*maps2[m].map['dimension']; neighbor_count++){
                for(var i=0; i<maps[m].map['ruleTree']['neighborhoods'][neighbor_count].length; i++){
                    for(var j=0; j<maps[m].map['ruleTree']['neighborhoods'][neighbor_count][i].length; j++){
                        if(
                            maps[m].map['ruleTree']['neighborhoods'][neighbor_count][i][j]
                            !=
                            maps2[m].map['ruleTree']['neighborhoods'][neighbor_count][i][j]
                        ){
                            throw Error('neighborhoods for both sub-maps should have the same chars')
                        }
                    }
                }
            }
        }

        for(var m=0; m<=dims-1; m++){
            for(var neighbor_count=maps[m].map['dimension']; neighbor_count<=2*maps2[m].map['dimension']; neighbor_count++){
                var rules = maps[m].map['rules']
                for(var i=0; i<maps[m].map['ruleTree']['neighborhoods'][neighbor_count].length; i++){
                    for(var j=0; j<maps[m].map['ruleTree']['neighborhoods'][neighbor_count][i].length; j++){
                        var rule = rules.shift()
                        var neighborhood = maps[m].map['ruleTree']['neighborhoods'][neighbor_count][i][j]
                        console.log(rule, neighborhood, maps[m].rule(maps[m].map, neighborhood))
                        if(maps[m].rule(maps[m].map, neighborhood)!=rule){
                            throw Error('neighborhood rule combination should be present in the tree through rule(neighborhood)')
                        }
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