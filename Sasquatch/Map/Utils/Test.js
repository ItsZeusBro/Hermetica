import {Combinatorics} from "./Combinatorics.js"
import assert from "node:assert"
class Test{
    constructor(){
        this.tests()
    }
    tests(){
        this.PwithR()
        this.PwithoutR()
        this.CwithR()

    }
    PwithR(){
        var result = new Combinatorics().PwithR([1, 2, 3, 4, 5], 4)
        console.log(result)
        this.uniquePwithR([1, 2, 3, 4, 5].length, 4, result)

    }
    PwithoutR(){
        var result = new Combinatorics().PwithoutR([1, 2, 3, 4, 5], 4)
        this.uniquePwithoutR([1, 2, 3, 4, 5].length, 4, result)

        console.log(result)
    }
    CwithR(){
        var result = new Combinatorics().CwithR([1, 2, 3, 4, 5], 4)
        console.log(result)
        this.uniqueCwithR([1, 2, 3, 4, 5].length, 4, result)

    }
    CwithoutR(){
        //still need to write function
    }
    uniquePwithR(n, r, result){
        var set = new Set()
        for(var i =0; i<result.length; i++){
            var str = result[i].join("")
            set.add(str)
        }
    
        assert.equal(set.size==new Combinatorics()._PwithR(n, r), true)

    }

    uniquePwithoutR(n, r, result){
        var set = new Set()
        for(var i =0; i<result.length; i++){
            var str = result[i].join("")
            set.add(str)
        }
        assert.equal(set.size==new Combinatorics()._PwithoutR(n, r), true)

    }

    uniqueCwithR(n, r, result){
        var set = new Set()
        for(var i =0; i<result.length; i++){
            var str = result[i].join("")
            set.add(str)
        }
        assert.equal(set.size==new Combinatorics()._CwithR(n, r), true)
    }
}

new Test()