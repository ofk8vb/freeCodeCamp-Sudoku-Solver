const util = require('util');
let solution;
class SudokuSolver {
  //helper function that places a dot at given coordinates
  dotPlacer(puzzleString,row,col){
    let str;
    let {Rows,puzzleStringMappedToRows}=this.puzzleStringProcessor(puzzleString);

    str=puzzleStringMappedToRows[Rows[row]];
   
    str = str.substring(0,col -1)+'.'+str.substring(col-1+1);
   
    puzzleStringMappedToRows[Rows[row]]=str;

    
    
    //puzzleString with dot added is returned!
    return this.puzzleStringReverseProcessor(puzzleStringMappedToRows);
  }

  //helper function that checkes if there is a '.' in the given coordinates!
  checkIfDot(puzzleString,row,col){
    let {Rows,puzzleStringMappedToRows} = this.puzzleStringProcessor(puzzleString);
    if(puzzleStringMappedToRows[Rows[row]][col-1]=='.'){
      return true;
    }
    return false;
  }

  //helper function that checks if the provided arguments are valid
  argumentValidator(row,col,value,Rows){
    if(0>=Number(value) || Number(value)>9){
      return 'Invalid value'
    }
    if(isNaN(value)){
      return 'Invalid value'
    }
    if(!(Rows.includes(row))){
      return 'Invalid coordinate'
    }
    if((col.toString()).length!==1 || 0===col || col>9){
      return 'Invalid coordinate'
    }
    return true;
  }

  //helper function that returns an Rows array,
  //and an object that is Letters mapped to puzzlestring
  puzzleStringProcessor(puzzleString){
    let structeredPuzzleString=[];
    const Rows = ['A','B','C','D','E','F','G','H','I'];
    //following for loop seperates puzzleString every 9 characters, and pushes them
    //to the structuredPuzzleString
    for(let i=0;i<puzzleString.length;i=i+9){
      for(let j =0;j<9;j++){
        structeredPuzzleString.push(puzzleString.slice(i,i+9))
        break;
      }
    }
    
    //For each element in Rows array,
    //we add the each element of Rows as a new key to the object
    //and add first element of structuredPuzzleString as its value.
    let puzzleStringMappedToRows={};
    Rows.forEach((key,i)=>puzzleStringMappedToRows[key]=structeredPuzzleString[i]);
    return {puzzleStringMappedToRows,Rows};
  }

  //helper function that reverses puzzleStringProcessor function, and returns a string
  puzzleStringReverseProcessor(puzzleStringMappedToRows){
    let puzzleString=[];
    const Rows = ['A','B','C','D','E','F','G','H','I'];
    let i;
    let j;
    for(i=0;i<9;i){
      for(j=0;j<9;j){
        puzzleString.push(puzzleStringMappedToRows[Rows[i]][j]);
        j++
      }
      i++
    }
    //a string is returned!
    return puzzleString.join("");
  }

  //helper function that determines the region of the target coordinate
  regionator(row,column){

    //we have 9 regions

    //Rows A-C to Columns 1-3 equals region 1 which means Rows[0,1,2] and Column [1,2,3]
    //Rows A-C to Columns 4-6 equals region 2 which means Rows[0,1,2] and Column [4,5,6]
    //Rows A-C to Columns 7-9 equals region 3 which means Rows[0,1,2] and Column [7,8,9]

    //Rows D-F to Columns 1-3 equals region 4 which means Rows[3,4,5] and Column [1,2,3]
    //Rows D-F to Columns 4-6 equals region 5 which means Rows[3,4,5] and Column [4,5,6]
    //Rows D-F to Columns 7-9 equals region 6 which means Rows[3,4,5] and Column [7,8,9]

    //Rows G-I to Columns 1-3 equals region 7 which means Rows[6,7,8] and Column [1,2,3]
    //Rows G-I to columns 4-6 equals region 8 which means Rows[6,7,8] and Column [4,5,6]
    //Rows G-I to columns 7-9 equals region 9 which means Rows[6,7,8] and Column [7,8,9]

    let region;
    row=row.charCodeAt(0);
      //we use char codes to compare letters.
     if(row<68){
        if(column<4){
           region=1;
        }else if(column<7){
           region=2
        }else{
           region=3
        }
     }else if(row<71){
        if(column<4){
           region=4;
        }else if(column<7){
           region=5;
        }else{
           region=6;
        }
     }else{
        if(column<4){
           region=7;
        }else if(column<7){
           region=8;
        }else{
           region=9;
        }
     }
     return region;
  }

  //helper function that creates appropriate region string(Array)
  regionStringMaker(puzzleStringMappedToRows,region){
    const Rows = ['A','B','C','D','E','F','G','H','I'];
    let regionStringArray=[];
    //region 1 means Rows[0,1,2] and Column [1,2,3]
    if(region===1){
      for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j]);
        }
      }
    }
    if(region===2){
      for(let i=0;i<3;i++){
        for(let j=3;j<6;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j]);
        }
      }
    }
    if(region===3){
      for(let i=0;i<3;i++){
        for(let j=6;j<9;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j]);
        }
      }
    }
    if(region===4){
      for(let i=3;i<6;i++){
        for(let j=0;j<3;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }
    if(region===5){
      for(let i=3;i<6;i++){
        for(let j=3;j<6;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }
    if(region===6){
      for(let i=3;i<6;i++){
        for(let j=6;j<9;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }
    if(region===7){
      for(let i=6;i<9;i++){
        for(let j=0;j<3;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }
    if(region===8){
      for(let i=6;i<9;i++){
        for(let j=3;j<6;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }
    if(region===9){
      for(let i=6;i<9;i++){
        for(let j=6;j<9;j++){
          regionStringArray.push(puzzleStringMappedToRows[Rows[i]][j])
        }
      }
    }

    return regionStringArray;

  }

  // //helper function that is the core of our solver
  // //this function will not be called when there is a '.' in the coordinate
  // verifyCombinedPlacement(solutionString,row,column,lastSuccesfullValue,backTrackCount,lastValueInsertedRow,lastValueInsertedColumn,columnForward,rowForward,){
  //   if(this.checkIfDot(solutionString,row,column)){
  //     for(let i=1;i<10;i++){
  //     if(
  //       this.checkRowPlacement(solutionString,row,column,i)
  //       &&
  //       this.checkColPlacement(solutionString,row,column,i)
  //       &&
  //       this.checkRegionPlacement(solutionString,row,column,i)
  //       &&
  //       i>lastSuccesfullValue
  //   ){
  //     lastSuccesfullValue=i;
  //     lastValueInsertedRow=row;
  //     lastValueInsertedColumn=column;
  //     console.log(lastValueInsertedRow+ ' lastValueInsertedRow');
  //     console.log(lastValueInsertedColumn + ' lastValueInsertedColumn');
  //     console.log(lastSuccesfullValue + ' lastSuccesfullValue')
  //     backTrackCount=0;
  //     solutionString=solutionString.replace('.',i)
  //     rowForward=true;
  //     return [solutionString,backTrackCount,lastValueInsertedRow,lastValueInsertedColumn,lastSuccesfullValue,rowForward];
  //   }   
  //   }
  //   }
    
    
  //     //if no solution is found after all 9 iterations 
  //     //no possible value was left for the coordinate
  //     //we return a solution string with previously processed coordinate replaced with an .
  //     //this would mean backtracking the solution
  //     backTrackCount++;
  //     rowForward=false;
  //     if(backTrackCount>1){
  //       lastSuccesfullValue=0;
  //       backTrackCount=0;
  //       rowForward=true;
  //       // lastValueInsertedRow=row;
  //       // lastValueInsertedColumn=column;
  //     }
  //     console.log(backTrackCount + ' backTrackCount')
  //     console.log(rowForward + ' rowforward')
  //     console.log(solutionString+ ' solutionString');
  //     console.log(lastValueInsertedRow+ ' lastValueInsertedRow in wrong insertion');
  //     console.log(lastValueInsertedColumn + ' lastValueInsertedColumn in wrong insertion');
  //     console.log(lastSuccesfullValue + ' lastSuccesfullValue in wrong insertion')
  //     solutionString=this.dotPlacer(solutionString,lastValueInsertedRow,lastValueInsertedColumn);
  //     return [solutionString,backTrackCount,lastValueInsertedRow,lastValueInsertedColumn,lastSuccesfullValue,rowForward];
  //   }



  validate(puzzleString) {
    //check if the incoming puzzleString array(row and column) doesn't have the exact length of 81
    // Logic handles a puzzle string that is not 81 characters in length(must check for length of 81)
    if(puzzleString.length!==81){
      return 'Expected puzzle to be 81 characters long';
    }
    let regexSudoku=/[1-9|.]*/g
     
    // Logic handles a puzzle string with invalid characters (not 1-9 or .)(regex for 1-9 or .)
    let validationResult = puzzleString.match(regexSudoku);

    //we access the first member of the result because match function returns array with [0] having the
    //resulto f the regex!
    if(validationResult[0].length!==81){
      return 'Invalid characters in puzzle';
    }
    // Logic handles a valid puzzle string of 81 characters
    return true;
    
  }

  checkRowPlacement(puzzleString, row, column, value) {
    this.validate(puzzleString);

    const {Rows,puzzleStringMappedToRows}=this.puzzleStringProcessor(puzzleString);

    this.argumentValidator(row,column,value,Rows);
   
    //logic for valid rowPlacement is below
    //we are searching for column-1 in the string because strings are 0 indexed
    let targetCoordinate = puzzleStringMappedToRows[row][column-1];

    //if target Coordinate location is not a '.'(empty location) we return false
    if(targetCoordinate!=='.'){
      return false;
    }

    // Logic handles an invalid row placement
    //we look at each element of the string in the specified row,
    //and check if the value we got as an argument has any match
    //if there is a match we return false
   for(let k = 0; k<puzzleStringMappedToRows[row].length;k++){
      if(Number(puzzleStringMappedToRows[row][k])===value){
        return false;
      }
   }
     
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    this.validate(puzzleString);
    const {Rows,puzzleStringMappedToRows}=this.puzzleStringProcessor(puzzleString);

    this.argumentValidator(row,column,value,Rows);
   
    //logic for valid colPlacement is below
    //we are searching for column-1 in the string because strings are 0 indexed
    let targetCoordinate = puzzleStringMappedToRows[row][column-1];

    //if target Coordinate location is not a '.'(empty location) we return false
    if(targetCoordinate!=='.'){
      return false;
    }

    // Logic handles an invalid column placement
    //we look at each element of the string in the specified column,
    //and check if the value we got as an argument has any match
    //if there is a match we return false

   for(let k = 0; k<puzzleStringMappedToRows[row].length;k++){
      if(Number(puzzleStringMappedToRows[Rows[k]][column-1])===value){
        return false;
      }
   }
     
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    this.validate(puzzleString);
    const {Rows,puzzleStringMappedToRows}=this.puzzleStringProcessor(puzzleString);
    this.argumentValidator(row,column,value,Rows);

    let targetCoordinate = puzzleStringMappedToRows[row][column-1];

    if(targetCoordinate!=='.'){
      return false;
    }


    //logic FOR valid region placement is below
    let region = this.regionator(row,column);

    //we will create a string according to the region.

    let regionString=this.regionStringMaker(puzzleStringMappedToRows,region);

    if(regionString.includes(value.toString())){
      return false;
    }

    return true;
  }

  // a recursive helper function that sets the global solution variable to the solution puzzleString and return true
  // if no solution is possible returns false!
  sudokuSolver(puzzleString) {
    let {Rows,puzzleStringMappedToRows} = this.puzzleStringProcessor(puzzleString)
    for (let i = 0; i < 9; i++) {
      for (let j = 1; j < 10; j++) {
        if (this.checkIfDot(puzzleString,i,j)) {
          for (let k = 1; k <= 9; k++) {
            if (
            this.checkRowPlacement(puzzleString,Rows[i],j,k)
            &&
            this.checkColPlacement(puzzleString,Rows[i],j,k)
            &&
            this.checkRegionPlacement(puzzleString,Rows[i],j,k)
            ) {
              // puzzleStringMappedToRows[Rows[i]][j] = 'k';
              puzzleString=puzzleString.replace('.',k)
            
            if (this.sudokuSolver(puzzleString)) {
              return true
            } else {
              // puzzleStringMappedToRows[Rows[i]][j] = '.';
              
              puzzleString=this.dotPlacer(puzzleString,i,j)
            }
           }
         }
         return false;
       }
     }
   }
  
   solution=puzzleString;
   return true
  }

  solve(puzzleString) {
    if(!this.sudokuSolver(puzzleString)){
          return false;
    }
     
    return solution;
  }
}

module.exports = SudokuSolver;

