'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const puzzlesAndSolutions = require('../controllers/puzzle-strings');
let solver = new SudokuSolver();
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const Rows = ['A','B','C','D','E','F','G','H','I'];
      let {puzzle,coordinate,value} = req.body;
      let conflictArray=[]

      if(!puzzle || !coordinate || !value){
        return res.send({error:'Required field(s) missing'})
      }
      //coordinate is a letter A-I followed by number 1-9
      let row = coordinate[0];
      let column = Number(coordinate[1]);
      value=Number(value);
      console.log(value);
      if(solver.argumentValidator(row,column,value,Rows)!==true){
        return res.send({error: solver.argumentValidator(row,column,value,Rows)})
      }
      //return error about puzzleString
      if(solver.validate(puzzle)!==true){
        return res.send({error:solver.validate(puzzle)});
      }
      
      if (
        solver.checkRowPlacement(puzzle,row,column,value)
        &&
        solver.checkColPlacement(puzzle,row,column,value)
        &&
        solver.checkRegionPlacement(puzzle,row,column,value)
        ){
          return res.send({valid:true});
        }
      
      if(!solver.checkRowPlacement(puzzle,row,column,value)){
        conflictArray.push('row');
      }

      if(!solver.checkColPlacement(puzzle,row,column,value)){
        conflictArray.push('column');
      }

      if(!solver.checkRegionPlacement(puzzle,row,column,value)){
        conflictArray.push('region');
      }
      return res.send({valid:false,conflict:conflictArray})
     
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle){
        return res.send({error:'Required field missing'})
      }
      let puzzleString = req.body.puzzle;
      if(solver.validate(puzzleString)===true){
        if(solver.solve(puzzleString)){
          let solution = solver.solve(puzzleString);
          return res.send({solution:solution});
        }else{
          return res.send({error: 'Puzzle cannot be solved'})
        }
      }
     
      res.send({error:solver.validate(puzzleString)});
      
    });
};
