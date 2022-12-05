import {RuleTree} from "./RuleTree.js"
import {Map} from "../Map.js"
class Test{
    constructor(){
        this.tests()
    }

    tests(){
        this.createRuleTree()
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
    createRuleTree(){
        var maps=[]
        for(var i = 1; i<=10; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().createRuleTree(map.map)
            map.log()
            maps.push(map.map)
        }
        var maps2=[]
        for(var i = 1; i<=10; i++){
            var map = new Map('abcdef', 'abcdef', 'english', i)
            new RuleTree().createRuleTree(map.map)
            map.log()
            maps2.push(map.map)
        }

        for(var i=0; i<=9; i++){
            //neighborhoods should be the samec
            for(var neighbor_count=maps[i]['dimension']; neighbor_count<=2*maps2[i]['dimension']; neighbor_count++){
                if(
                    maps[i]['ruleTree']['neighborhoods'][neighbor_count].length
                    !=
                    maps2[i]['ruleTree']['neighborhoods'][neighbor_count].length
                ){
                    throw Error('neighborhoods for both maps should have the same length')
                }
                for(var j=0; j<maps[i]['ruleTree']['neighborhoods'][neighbor_count].length; j++){
                    if(
                        maps[i]['ruleTree']['neighborhoods'][neighbor_count][j].length
                        !=
                        maps2[i]['ruleTree']['neighborhoods'][neighbor_count][j].length
                    ){
                        throw Error('neighborhoods for both sub-maps should have the same length')
                    }
                }

                for(var j=0; j<maps[i]['ruleTree']['neighborhoods'][neighbor_count].length; j++){
                    for(var k=0; k<maps[i]['ruleTree']['neighborhoods'][neighbor_count][j].length; k++){
                        //console.log(maps[i]['ruleTree']['neighborhoods'][neighbor_count][j][k], maps2[i]['ruleTree']['neighborhoods'][neighbor_count][j][k])
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

    }
    ruleTree(){

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