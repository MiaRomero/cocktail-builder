var possibleBarIngredients = {};

possibleBarIngredients.name = [];
possibleBarIngredients.id = [];

possibleBarIngredients.fillInTypeahead = function (){
  $.ajax({
    type: 'GET',
    url: 'http://www.cocktailbuilder.com/json/ingredientList?callback=ingredientList',
    async: false,
    jsonpCallback: 'ingredientList',
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(data) {
      possibleBarIngredients = data;
      possibleBarIngredients.name = possibleBarIngredients.map(function(object){
        return object.Name;
      });
      $('#autocomplete').autocomplete({
        lookup: possibleBarIngredients.name,
        minChars: 2,
        onSelect: function () {
          var newIngredient = '<li>' + $('#autocomplete').val() + '</li>';
          $('#addedIngredients').append(newIngredient);
          $('#autocomplete').val('');
        }
      });
    },
    error: function(e) {
      console.log(e.message);
    }
  });
};
