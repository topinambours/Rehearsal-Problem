

var fileSelector = document.getElementById('customFile');
var drawer = document.getElementById("drawing");
var drawer_before_permut = document.getElementById("drawing_2");
var OPL_input = "";


fileSelector.onchange = function(){
    file = fileSelector.files[0];
    fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function(e) {
        OPL_input =  fr.result;
        update_vis(OPL_input);

        svgPanZoom('#svg-container', {
            zoomEnabled: true,
            //controlIconsEnabled: true,
            fit: true,
            center: true,
            //minZoom: 0.1

            panEnabled: true,
            controlIconsEnabled: false,
            dblClickZoomEnabled: true,
            mouseWheelZoomEnabled: true,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.2,
            minZoom: 0.5,
            maxZoom: 3,
            contain: false,
            refreshRate: 'auto',
            //beforeZoom: function(){},
            //onZoom: function(){},
            //beforePan: function(){},
            //onPan: function(){},
            onPan: function(evt){
                test(evt);
                //console.log(myGroup.node.transform.baseVal[0].matrix.e);
                //console.log(' ----------------- ');
            },
            //customEventsHandler: {},
            eventsListenerElement: null
        });

        svgPanZoom('#svg-container_2', {
            zoomEnabled: true,
            //controlIconsEnabled: true,
            fit: true,
            center: true,
            //minZoom: 0.1

            panEnabled: true,
            controlIconsEnabled: false,
            dblClickZoomEnabled: true,
            mouseWheelZoomEnabled: true,
            preventMouseEventsDefault: true,
            zoomScaleSensitivity: 0.2,
            minZoom: 0.5,
            maxZoom: 3,
            contain: false,
            refreshRate: 'auto',
            //beforeZoom: function(){},
            //onZoom: function(){},
            //beforePan: function(){},
            //onPan: function(){},
            onPan: function(evt){
                test(evt);
                //console.log(myGroup.node.transform.baseVal[0].matrix.e);
                //console.log(' ----------------- ');
            },
            //customEventsHandler: {},
            eventsListenerElement: null
        });


        function test(evt) {
            console.log(evt);
        }
    };

};

function play_after(index, array){
    for (var i in array){
        if (i > index && array[i] == 1){
            return true;
        }
    }
    return false;
}

function apply_permut(permut, array){
    var output = [];

    for (let j = 0; j < array.length; j++) {
        var alt = [];
        for (let i = 0; i < array[0].length; i++) {
            alt.push(array[j][permut[i]-1]);
        }
        output.push(alt);
    }
    return output;
}


function update_vis(OPL_input) {
    var regex = /rehearsal\s*=\s*.*]/g;
    var found = OPL_input.match(regex);

    var rehearsal_data_input = JSON.parse(
        found[0].replace(
            "rehearsal = ", ""));

    for (e in rehearsal_data_input){
        rehearsal_data_input[e] = rehearsal_data_input[e].map(Number);
    }

    var regex_permut = /permutations\s*=\s*.*]/g;
    var found_permut = OPL_input.match(regex_permut);

    var permut = JSON.parse(found_permut[0].replace('permutations = ', ""));

    var rehearsal_data_cpy = rehearsal_data_input.slice(0);

    var rehearsal_data = apply_permut(permut, rehearsal_data_input);

    drawer.innerHTML = "";
    drawer_before_permut.innerHTML = "";
    var draw = SVG('drawing').size(rehearsal_data.length*20, rehearsal_data[0].length*20).attr('id','svg-container_2').addClass('svg-container_2');
    var draw_before_permut = SVG('drawing_2').size(rehearsal_data.length*20, rehearsal_data[0].length*20).attr('id','svg-container').addClass('svg-container');


    var pattern = draw.pattern(5, 5, function(add) {
        add.rect(20,20).fill('#63677F');
        add.line(0,0,50,50).fill('#000').stroke({ width: 0.5 });
    });

    var offset_y = 20;
    for (var players in rehearsal_data){

        var offset_x = 30;

        if (players == 0){
            for (var pieces in rehearsal_data[players]){
                var cur_piece = permut[pieces];
                draw.text(cur_piece.toString()).dx(offset_x );
                offset_x += 20
            }
            offset_x = 30;
            offset_y += 5;
        }

        var had_play = false;

        for (var pieces in rehearsal_data[players]){

            if (pieces == 0){
                var cur_player = Number(players) + 1;
                draw.text(cur_player.toString()).dx(offset_x - 25).dy(offset_y - 5);
            }


            var cur_value =  rehearsal_data[players][pieces];
            if (had_play && Number(cur_value) == 0 && play_after(Number(pieces), rehearsal_data[players])){
                draw.rect(20, 20).attr({x:offset_x, y:offset_y, fill : pattern});
            }
            else if (Number(cur_value) == 0){
                draw.rect(20, 20).fill('#D4D4D4').attr({x:offset_x, y:offset_y});
            }

            if (Number(cur_value) == 1){
                draw.rect(20, 20).fill('#000').attr({x:offset_x, y:offset_y});
                had_play = true;
            }

            offset_x += 20;
        }
        offset_y += 20;

    }

    offset_y = 20;

    for (var players in rehearsal_data){

        var offset_x = 30;

        if (players == 0){
            for (var pieces in rehearsal_data_cpy[players]){
                var cur_piece = Number(pieces) + 1;
                draw_before_permut.text(cur_piece.toString()).dx(offset_x );
                offset_x += 20
            }
            offset_x = 30;
            offset_y += 5;
        }

        var had_play = false;

        for (var pieces in rehearsal_data_cpy[players]){

            if (pieces == 0){
                var cur_player = Number(players) + 1;
                draw_before_permut.text(cur_player.toString()).dx(offset_x - 25).dy(offset_y - 5);
            }


            var cur_value =  rehearsal_data_cpy[players][pieces];
            if (had_play && Number(cur_value) == 0 && play_after(Number(pieces), rehearsal_data_cpy[players])){
                draw_before_permut.rect(20, 20).attr({x:offset_x, y:offset_y, fill : pattern});
            }
            else if (Number(cur_value) == 0){
                draw_before_permut.rect(20, 20).fill('#D4D4D4').attr({x:offset_x, y:offset_y});
            }

            if (Number(cur_value) == 1){
                draw_before_permut.rect(20, 20).fill('#000').attr({x:offset_x, y:offset_y});
                had_play = true;
            }

            offset_x += 20;
        }
        offset_y += 20;

    }

}