$(document).on('click', "#makenew", function(){
  $.ajax({
    type: "POST",
    dataType: "json",
    url: '/submit',
    data: {
      body: $('#commentArea').val(),
      created: Date.now()
    }
  })
  // If that API call succeeds,
  // add the title and a delete button for the note to the page
  .done(function(data){
    // add the title and delete button to the #results section
    $('#results').prepend('<p class="dataentry" data-id=' + data._id + '><span class="dataTitle" data-id=' + data._id+ '>' + data.body + '</span><span class=deleter>X</span></p>');
    // clear the note and title inputs on the page
    $('#commentArea').val("");
  }
  );
});
