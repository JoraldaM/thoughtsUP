
$(document).ready(function(){
    var addButton = $('#addFields'); 
    var container = $('.KeyW'); 
    var field = '<div><input value="" required placeholder="Keyword" type="text" class="keyW"/> <button id="rmvField" >&minus;</button></div>'; //New input field html 
    
    
    $(addButton).click(function(){
        
            $(container).append(field); 
    });
    
    
    $(container).on('click', '#rmvField', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); 
        x--; 
    });
});

