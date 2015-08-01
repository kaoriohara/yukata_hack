$(function(){
 // LoadMessage();
  $('#message_sendButton').click(function(){SendMessage();});
});

function SendMessage(){
  requestData = {
    body : $('#message_textBox').val(),
    position_x : "bbbb",
    position_y :"cccc"
  };
  alert(requestData.body);
  $.ajax({
    type : 'POST',
    url : 'http://localhost:3000/save_post',
    data : JSON.stringify(requestData),
    contentType: 'application/JSON',
    dataType : 'JSON',
    scriptCharset: 'utf-8',
    success : function(data) {
      // Success
      alert("success");
    },
    error : function(data) {
      // Error
      alert("error");
    }
  });
}

function LoadMessage(x, y){
  postion = {x:"bbbb", y:"cccc"};
  $.ajax({
    type : 'POST',
    url : 'http://localhost:3000/get_post?position_x=' & postion.x & '&position_y=' & postion.y,
    success : function(data) {
      // Success
      alert("success");
      $.each(data,function(){$('#message_area').prepend(this.body & '<br />');});
    },
    error : function(data) {
      // Error
      alert("error");
    }
  });
  setTimeout('LoadMessage()',10000);
}
