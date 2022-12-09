import path from "node:path"
import {createHash} from 'node:crypto'
import {Combinatorics} from "./Combinatorics.js"

export class Utils{
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    //where the order matters for neighborhood construction
    nOrderedNeighborhoods(uniqueChars, dimension){
        var n = uniqueChars
        var nNeighborhoods=0
        for(var r = dimension; r<=2*dimension; r++){
            nNeighborhoods+= new Combinatorics()._CwithR(n, r)
        }
        return nNeighborhoods
    }


}

// console.log('# of Permutations with Repetition', 4, 3, new Utils()._PwithR(4, 3))
// console.log('# of Permutations without Repetition', 4, 3, new Utils()._PwithoutR(4, 3))
// console.log('# of Combinations with Repetition', 4, 3, new Utils()._CwithR(4, 3))
// console.log('# of Combinations without Repetition', 4, 3, new Utils()._CwithoutR(4, 3))

//console.log(new Utils().CwithR(['A', 'B', 'C', 'D'], 2))
//console.log(new Utils().PwithR(['A', 'B', 'C', 'D'], 3).length)

//console.log(new Utils()._PwithoutR([1, 2, 3, 4, 5], 5))
// var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// console.log(list)
// console.log('swapping indexes 0 with 1 on ', new Utils().swap(0, 1, list))
// console.log('swapping indexes 1 with 2 on ', new Utils().swap(1, 2, list))
// console.log('swapping indexes 0 with 3 on ', new Utils().swap(0, 3, list))
// console.log('swapping indexes 1 with 5 on ', new Utils().swap(1, 5, list))
// console.log('swapping indexes 0 with 9 on ', new Utils().swap(0, 9, list))
// console.log('swapping indexes 8 with 9 on ', new Utils().swap(8, 9, list))
// console.log('swapping indexes 7 with 9 on ', new Utils().swap(7, 9, list))





