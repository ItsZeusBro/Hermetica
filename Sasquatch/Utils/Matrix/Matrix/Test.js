import {Matrix} from "./Matrix.js"
import {Coordinates} from "../Coordinates/Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

class Test{
    constructor(){
        this.tests()
    }
    
    tests(){
        this._mtx()
        this.shape()
        this.count()
        this.at()
        this.get()
        this.skip()
        //this.window()
    }

    _mtx(){
        console.log('_mtx() test')
        var mtx = new Matrix([0,0,0], [2, 2, 2])
        //test its coordinate system
        var coordinates = new Coordinates([0,0,0], [2,2,2]).coordinates()
        for(var i=0; i<coordinates.length; i++){
            for(var j=0; j<coordinates[i].length; j++){
                assert.equal(mtx.mtx[i].coordinate[j]==coordinates[i][j], true)
            }
        }

        //test data loading
        var data = []
        for(var i = 0; i<coordinates.length; i++){
            data.push(i)
        }
        mtx._mtx(data)
        for(var i=0; i<coordinates.length; i++){
            assert.equal(mtx.mtx[i].data==data[i], true)
        }
        //test normal refresh
        mtx._mtx()
        for(var i=0; i<coordinates.length; i++){
            assert.equal(typeof mtx.mtx[i].data=='object', true)
        }
    }

    shape(){
        console.log('shape() test')
        var _1= [-1,-1,-1]
        var _2=[2, 2, 2]
        var mtx = new Matrix(_1, _2)
        //mtx.log(mtx.mtx)
        var shape = mtx.shape()

        for(var i = 0; i<_1.length; i++){
            assert.equal(shape[i]==(_2[i]-_1[i]), true)
        }
    }

    window(){
        var mtx = new Matrix([0,0,0], [5, 5, 5])
        var mtx2= mtx.window([1,0,0], [2,3,3])
        //test its coordinate system
        var coordinates = new Coordinates([1,0,0], [2,3,3]).coordinates()
        for(var i=0; i<coordinates.length; i++){
            mtx.at(coordinates[i], 'someData', 'someKey')

            for(var j=0; j<coordinates[i].length; j++){
                console.log(mtx2.get(coordinates[i]), mtx.get(coordinates[i]))
                assert.equal(mtx2.get(coordinates[i]).data==mtx.get(coordinates[i]).data, true)
                assert.equal(mtx2.get(coordinates[i]).data==mtx.get(coordinates[i]).data, true)
            }
        }
    }

    count(){
        console.log('count() test')
        var _1 = [-1,-1,-1]
        var _2 = [2, 2, 2]
        var mtx = new Matrix(_1, _2)
        assert.equal(mtx.count(), mtx.mtx.length)
    }

    at(){
        console.log('at() test')
        var _1 = [-1,-1,-1]
        var _2 = [2, 2, 2]
        var data={'someKey':null}
        var mtx = new Matrix(_1, _2, data)
        var coordinates = mtx.coordinates._coordinates
        for(var i=0; i<coordinates.length; i++){
            mtx.at(coordinates[i], 'someData', 'someKey')
            assert.equal(mtx.get(coordinates[i]).data['someKey'], 'someData')
        }
    }

    skip(){
        console.log('skip() test')
        var _1 = [-10,-10,-10]
        var _2 = [2, 2, 2]
        var mtx = new Matrix(_1, _2)
        var coordinates = mtx.coordinates._coordinates
        // console.log(coordinates.length)
        // console.log(coordinates)
        // console.log(mtx.skip([1,1,1]))
        for(var i = 0; i<coordinates.length; i++){
            mtx.at(coordinates[i], i, 'someKey')
            assert.equal(i==mtx.skip(coordinates[i]), true)
            assert.equal(mtx.mtx[mtx.skip(coordinates[i])].data['someKey']==i, true)
        }
    }

    get(){
        console.log('get() test')
        var _1 = [-1,-1,-1]
        var _2 = [2, 2, 2]
        var data={'someKey':null}
        var mtx = new Matrix(_1, _2, data)
        var coordinates = mtx.coordinates._coordinates
        
        for(var i=0; i<coordinates.length; i++){
            mtx.at(coordinates[i], i, 'someKey')
            assert.equal(mtx.get(coordinates[i]).data['someKey'], i)
        }
    }
}

new Test()


// console.log(new Coordinates([-1,-1,-1], [2, 2, 2]).coordinates())
// var coordinates = new Coordinates([-1,-1,-1], [2, 2, 2])
// for(var i= 0; i<coordinates.coordinates().length; i++){
// 	console.log(coordinates.next())
// }
