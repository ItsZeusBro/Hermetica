import {Matrix} from "./Matrix.js"
import {Coordinates} from "../Coordinates/Coordinates.js"
import assert from "node:assert"
import {Combinatorics} from "../../Combinatorics/Combinatorics.js"

export class MatrixTest{
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
        this.window()
        this.copy()
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
        console.log('window() test')
        var mtx = new Matrix([0,0,0], [5,5,5])
        var mtx2= mtx.window([1, 0, 0].reverse(), [2,3,3].reverse())
        //test its coordinate system

        var coordinates2 = new Coordinates([1, 0, 0].reverse(), [2,3,3].reverse()).coordinates()

        for(var i=0; i<coordinates2.length; i++){
            mtx.at(coordinates2[i], coordinates2[i], 'someKey')
            mtx.log() 
            mtx2.log()
            var count=0
            for(var j=0; j<coordinates2[i].length; j++){
                console.log(mtx2.get(coordinates2[i]))
                console.log(mtx.get(coordinates2[i]))

                if(
                    mtx2.get(coordinates2[i]).data['someKey'][j]
                    ==
                    mtx.get(coordinates2[i]).data['someKey'][j]
                ){
                    count+=1
                }
            }
            assert.equal(count==coordinates2[i].length, true)
        }

    }

    copy(){
        var mtx = new Matrix([0,0,0], [5,5,5])
        var mtx2= mtx.copy()
        //test its coordinate system
        var coordinates1 = new Coordinates([0,0,0], [5,5,5]).coordinates()

        for(var i=0; i<coordinates1.length; i++){
            mtx.at(coordinates1[i], coordinates1[i], 'someKey')
            mtx2.at(coordinates1[i], coordinates1[i]+1, 'someKey')

            var count=0
            for(var j =0; j<coordinates1[i].length; j++){
                console.log(mtx2.get(coordinates1[i]).data['someKey'][j], mtx.get(coordinates1[i]).data['someKey'][j])
                if(mtx2.get(coordinates1[i]).data['someKey'][j]==mtx.get(coordinates1[i]).data['someKey'][j]){
                    count+=1
                }
            }
            assert.equal(count!=coordinates1[i].length, true)
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
        for(var j=-10; j<0; j++){
            for(var n = 0; n<10; n++){
                var mtx = new Matrix([j,j,j], [n, n, n])
                var mtx2= new Matrix([j-1,j-1,j-1], [n+1, n+1, n+1]) //this one is bigger
                var coordinates1 = mtx.coordinates._coordinates
                var coordinates2 = mtx2.coordinates._coordinates
                for(var i = 0; i<coordinates1.length; i++){
                    mtx.at(coordinates1[i], i, 'someKey')
                    mtx2.at(coordinates1[i], i, 'someKey')
                    assert.equal(i==mtx.skip(coordinates1[i]), true)
                    assert.equal(i!=mtx2.skip(coordinates1[i]), true) //this should not be true
                    //because i is the index for coordinates1 which corresponds to mtx and not mtx2
                    assert.equal(mtx.mtx[mtx.skip(coordinates1[i])].data['someKey']==i, true)
                    assert.equal(mtx2.mtx[mtx2.skip(coordinates1[i])].data['someKey']==i, true)

                }
            }   
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