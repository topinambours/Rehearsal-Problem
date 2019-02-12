/*********************************************
 * OPL 12.8.0.0 Model
 * Author: brandon
 * Creation Date: 12 févr. 2019 at 13:52:45
 *********************************************/
range demandes = 1..10;
range liens = 1..2;

int lienCap[liens]=...;
float capacity[demandes]=...;
int cost[demandes]=...;
float lienCost[liens]=...;

dvar boolean lienChoisi[demandes][liens];

dexpr float cout = sum(i in demandes,j in liens) lienChoisi[i][j] * cost[i] * lienCost[j];

minimize(cout);

subject to{
	forall(i in demandes){
		sum(j in liens) lienChoisi[i][j] == 1;	
	}
	
	forall(i in demandes,j in liens){
		sum(i in demandes) (capacity[i] * lienChoisi[i][j]) <= lienCap[j];
	}
	
}