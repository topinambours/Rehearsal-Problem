/*********************************************
 * OPL 12.8.0.0 Model
 * Author root
 * Creation Date 10 févr. 2019 at 20
 *********************************************/

using CP;

include "rehearsal_common.mod";

 
 execute{
         }
         
 range Actors = 1..nplayers;
 range Scenes = 1..npieces;
 
 dvar int scene[Scenes] in Scenes;
 dvar int permutations[Scenes] in Scenes;
 
 
 // First and last permutationss where each actor plays
 dexpr int firstpermutations[a in Actors] = min(s in Scenes:rehearsal[a][s] == 1) permutations[s];
 dexpr int lastpermutations[a in Actors] = max(s in Scenes:rehearsal[a][s] == 1) permutations[s];
 
 // Expression for the waiting time for each actor
 dexpr int actorWait[a in Actors] = sum(s in Scenes: rehearsal[a][s] == 0)  
    (durations[s] * (firstpermutations[a] <= permutations[s] && permutations[s] <= lastpermutations[a]));
 
 // Expression representing the global cost
 dexpr int idleCost = sum(a in Actors) actorWait[a];
 
 minimize idleCost;
 subject to {
    // use the permutations-based secondary model
    inverse(scene, permutations);
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