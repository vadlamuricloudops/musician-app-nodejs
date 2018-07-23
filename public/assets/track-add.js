$(document).ready(function(){ 
      $('form').on('submit',function(){         
      var Track={trackName: $("input[name=trackName]").val(),artistName: $("input[name=artistName]").val(), albumName:$("input[name=albumName]").val(),albumYear:$("input[name=albumYear]").val(),albumGenre:$("input[name=albumGenre]").val(),trackPrice:$("input[name=trackPrice]").val()};
      $.ajax({
               type: 'POST',
               url:  '/track-add?username=<%=username%>',
               data:  Track,
               success: function(data){                   
                  location.reload();             
               }
       });
       return false;
    });     
    $("input[name=deleteTrack]").on('click',function(){
        alert('called delete');
       var trackId=$(this).attr('id');       
        $.ajax({
            type: 'DELETE',
            url:  '/track/' + trackId+'?username=<%=username%>',
            success: function(data){                
            }   
        });        
    });
});