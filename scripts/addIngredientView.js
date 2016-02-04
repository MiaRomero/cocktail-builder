var myBar = {
  ingredients: [],
  listTemplate: '',
  localTemplate: '',

  getTemplates: function () {
    $.get('templates/ingredientsInMyBar_hbs.html')
      .done( function(templateReturn){
        myBar.listTemplate = Handlebars.compile(templateReturn);
      });
    $.get('templates/localBar_hbs.html')
      .done( function(templateReturn){
        myBar.localTemplate = Handlebars.compile(templateReturn);
        myBar.ifLocalBarExists();
      });
  },

  ifLocalBarExists: function () {
    var storedBar = JSON.parse(localStorage.getItem('localBar'));
    if(storedBar !== null && storedBar.length > 0){
      myBar.ingredients = storedBar;
      $('#addedIngredients').append(myBar.localTemplate(myBar));
    }
  },

  setLocalBar: function () {
    var myBarLS = JSON.stringify(myBar.ingredients);
    localStorage.setItem('localBar', myBarLS);
  },

  DuplicateIngredients: function (newIngred) {
    return myBar.ingredients.some(function (ce, index, array){
      return newIngred === array[index];
    });
  },

  listHTML: function (){
    var newIngred = $('#autocomplete').val();
    if(!myBar.DuplicateIngredients(newIngred)){
      myBar.ingredients.push(newIngred);
      myBar.setLocalBar();
      $('#addedIngredients').append(myBar.listTemplate(myBar));
    }
  }
};

var possibleBarIngredients = {
  ingredientObjects: [],
  name: [],
  id: [],

  getPossibleIngredients: function (cocktailsToMakeController){
    $.ajax({
      type: 'GET',
      url: 'http://www.cocktailbuilder.com/json/ingredientList?callback=ingredientList',
      async: false,
      jsonpCallback: 'ingredientList',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(data) {
        possibleBarIngredients.ingredientObjects = data;
        possibleBarIngredients.fillInIngredientDB();
        possibleBarIngredients.fillInTypeahead(possibleBarIngredients.ingredientObjects);
        cocktailsToMakeController();
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  determineDataLocation: function(cocktailsToMakeController) {
    webDB.execute(
      'SELECT name FROM barIngredients',
      function (results){
        if(results.length > 0){
          possibleBarIngredients.fillInTypeahead(results);
          cocktailsToMakeController();
        }
        else{
          possibleBarIngredients.getPossibleIngredients(cocktailsToMakeController);
        }
      });
  },

  fillInIngredientDB: function () {
    possibleBarIngredients['ingredientObjects'].forEach(function(object){
      webDB.execute([
        {
          'sql': 'INSERT INTO barIngredients (ID, Name, Popularity, NormalizedIngredientID) VALUES (?, ?, ?, ?);',
          'data': [object.ID, object.Name, object.Popularity, object.NormalizedIngredientID],
        }
      ]);
    });
  },

  fillInTypeahead: function(array) {
    array.forEach(function(object){
      possibleBarIngredients.name.push(object.Name);
    });

    $('#autocomplete').autocomplete({
      lookup: possibleBarIngredients.name,
      minChars: 2,
      onSelect: function () {
        myBar.listHTML();
        cocktailsToMakeController.show();
        $('#autocomplete').val('');
      }
    });
  }
};
