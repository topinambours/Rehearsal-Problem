/*********************************************
 * OPL 12.8.0.0 Model
 * Author: Arnaud
 * Creation Date: 4 févr. 2019 at 22:23:17
 *********************************************/
// Input Data for the rehearsal problem

// Number of players
int nplayers=...;
// Number of pieces.
int npieces=...;

// Define some ranges for convenience
range Players=1..nplayers;
range Pieces=1..npieces;
 
// The table indicating if the player is required for the corresponding piece 
int rehearsal[Players][Pieces]=...;

// The duration of the piece;
int durations[Pieces]=...;
int totalDuration = sum(j in Pieces) durations[j];

int totalPlayTime = sum(i in Players, j in Pieces : rehearsal[i][j] == 1) durations[j];


// A little bit of preprocessing useful for symmetry breaking
// The index of the longest piece
int j1; 
// The index of the second longest piece
int j2; 

execute FIND_LONGEST_PIECES {
	if(npieces > 1) {
		// Initialize 	
		if(durations[1] > durations[2]) {
			j1 = 1;
			j2 = 2;	
		} else {
			j1 = 2;
			j2 = 1;	
		}
		// Search for greater value	
		for(var j = 3 ; j <= npieces ; j++) {
			if(durations[j] > durations[j2]) {
				if(durations[j] > durations[j1]) {
					j2 = j1;
					j1 = j;					
				} else {
					j2 = j;				
				}			
			}		
		}	
	}
}

execute {

	function first_occur(array){
		for (var i in Pieces){
			if (array[i] == 1){
				return i;			
			}
		}	
	}
}	