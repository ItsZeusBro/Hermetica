import path from "node:path"
import {createHash} from 'node:crypto'

export class Utils{
    
    resolve(pathFromProjectHome){
        return path.resolve('./').split('Sasquatch/Sasquatch')[0]+'Sasquatch/Sasquatch/'+pathFromProjectHome
    }
    hash(anything){
		return createHash('sha256').update(anything).digest('hex');
	}

    nNeighborhoods(uniqueChars, dimension){
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
    _combinationWithRepetition(r, n){
        if((this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1))%1<=.49999999){
            return Math.floor((this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1)))
        }else{
            return Math.ceil((this.factorial((n+r-1)))/(this.factorial(n)*this.factorial(r-1)))
        }
    }


    permutationWithRepetition(symbols, n, out=[]){
        while(true){
            if(out.length==0){
                var next=[]
                for(var k = 0; k<n; k++){next.push(symbols[symbols.length-1])}
                out.unshift(next)
            }
            if(out[0][0]==symbols[0]){return out}
            var next=out[0].slice()
            for(var j =n-1; j>=0; j--){
                if(next[j]!=symbols[0]){
                    next[j]=symbols[symbols.indexOf(next[j])-1]
                    next = this._reset(symbols, symbols[symbols.indexOf(next[j])], next, j)
                    out.unshift(next)
                    break
                }
            }
        }
    }

    permutationWithoutRepetition(symbols, n){

    }

    _reset(symbols, val, arr, i){
        //reseting from the significant index for arr to val
        for(var j = i; j<arr.length; j++){
            arr[j]=val
        }
        return arr
    }
}


// var chars = []
// for(var i = 1; i<=10; i++){
//     chars.push(i)
// }
// var out = new Utils().combinationWithRepetition(chars, 2, [])
// console.log(out.length)
// console.log(new Utils()._combinationWithRepetition(10, 2))



//Permutation without repetition
//symbols =[1,2,3,4] n=4 output=24  (with repetition we have 256 combinations)
//we need to find an iterative pattern

//most significant digits should be ordered iteratively

//we want the runtime to match the output complexity
//the output complexity

//we want for every even and odd position
//some pattern that does not repeat

//[1,2,3,4],
      x
//[1,3,2,4]
        x
//[1,3,4,2]  
      x
//[1,4,3,2]
        x
//[1,4,2,3]
    x
//[1,2,3,4] //this repeats, so we need to remove this and shift (only check repetitions at the begining and end)



