import {CoordinatesTest} from "./Utils/Matrix/Coordinates/Test.js"
import {MatrixTest} from "./Utils/Matrix/Matrix/Test.js"
import {CombinatoricsTest} from "./Utils/Combinatorics/Test.js"
import {PharoahMapTest} from "./Map/PharoahMap/Test.js"
class Test{
    constructor(){
        this.tests()
    }

    tests(){
        new PharoahMapTest()
        new CombinatoricsTest()
        new CoordinatesTest()
        new MatrixTest()
    }
    
}
new Test()