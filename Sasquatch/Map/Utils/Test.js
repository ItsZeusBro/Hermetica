import {Combinatorics} from "./Combinatorics.js"
import assert from "node:assert"
class Test{
    constructor(n){
        this.tests(n)
    }
    tests(n){
        var symbols=[]
        var n_s=[]
        for(var i = 1; i<=n; i++){
            symbols.push(i)
            n_s.push(i)
        }
        for(var i = 0; i<n_s.length; i++){
            this.PwithR(symbols, n_s[i])
            this.PwithoutR(symbols, n_s[i])
            this.CwithR(symbols, n_s[i])
        }


    }
    PwithR(symbols, n){
        var result = new Combinatorics().PwithR(symbols, n)
        console.log(result)
        this.uniquePwithR(symbols.length, n, result)

    }
    PwithoutR(symbols, n){
        var result = new Combinatorics().PwithoutR(symbols, n)
        console.log(result)
        this.uniquePwithoutR(symbols.length, n, result)

    }
    CwithR(symbols, n){
        var result = new Combinatorics().CwithR(symbols, n)
        console.log(result)
        this.uniqueCwithR(symbols.length, n, result)
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
        for(var i=0; i<result.length; i++){
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

new Test(7)