var possibleBarIngredients = {};

possibleBarIngredients.name = [];
possibleBarIngredients.id = [];

possibleBarIngredients.fillInTypeahead = function (){
  var url = 'http://www.cocktailbuilder.com/json/ingredientList?callback=ingredientList';
  $.ajax({
    type: 'GET',
    url: url,
    async: false,
    jsonpCallback: 'ingredientList',
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(data) {
      possibleBarIngredients = data;
      possibleBarIngredients.name = possibleBarIngredients.map(function(object){
        return object.Name;
      });
      $('input.typeahead').typeahead({
        source: possibleBarIngredients.name
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  });
};


var ingredient = '';
possibleBarIngredients.displayChosenIngredient = function (){
  $('#ingredientTypeahead').on('keyup', function(event) {
    if(event.which == 13) {
      console.log('infunction');
      var ingredient = $('#ingredientTypeahead').val();
      console.log(ingredient);
    }
  });
  $('#ingredientTypeahead').on('click', function(event){
    event.preventDefault();
    console.log('infunction');
    var ingredient = $('#ingredientTypeahead').val();
    console.log(ingredient);
  });
};
