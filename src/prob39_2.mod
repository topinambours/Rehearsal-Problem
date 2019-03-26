/*********************************************
 * OPL 12.8.0.0 Model
 * Author: root
 * Creation Date: 10 févr. 2019 at 15:43:20
 *********************************************/
using CP;
include "rehearsal_common.mod";

dvar int pieces[Pieces] in Pieces;
dvar int permutations[Pieces] in Pieces;

dexpr int wait_matrix_final[i in Players][j in Pieces] = 
((sum (k in j..npieces) rehearsal[i][permutations[k]]) 
* sum (k in 1..j)rehearsal[i][permutations[k]] * (-1 + rehearsal[i][permutations[j]])) != 0 ? 1 : 0;

dexpr int waiting_time[i in Players] = sum (j in Pieces) wait_matrix_final[i][j] * durations[j];

minimize sum(i in Players) waiting_time[i];

subject to {

    inverse(pieces, permutations);
    //allDifferent(all (i in Pieces) permutations[i] );

}


execute {

  var ofile = new IloOplOutputFile("out.dat");

  ofile.write("rehearsal = [");
  for (var i in thisOplModel.Players){
      ofile.write("[");
      for (var j in Pieces){
          if (j == npieces){
              ofile.write(rehearsal[i][j] + "]");
          }
          else{
                ofile.write(rehearsal[i][j] + ",");
          }
      }

    if (i == thisOplModel.nplayers){
    ofile.write("];\n");
    }
    else{
    ofile.write( ", ");
    }
  }

  ofile.write("permutations = [");
  for (i in Pieces){
      if (i == npieces){
                ofile.write(permutations[i] + "];");
      }
      else{
      ofile.write(permutations[i] + ",");
 }
  }

  ofile.close();
}