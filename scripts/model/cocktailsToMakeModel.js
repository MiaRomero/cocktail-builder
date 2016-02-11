var cocktailsToMake = {
  ingredientString: '',
  paramString: '',
  cocktailObjects: [],
  listTemplate: '',

  createIngredientString: function (){
    $('#addedIngredients li').each(function(index){
      cocktailsToMake.ingredientString += ('"' + $(this).text() + '"' + ', ');
    });
    var lastIndex = cocktailsToMake.ingredientString.lastIndexOf(',');
    return cocktailsToMake.ingredientString.substr(0, lastIndex);
  },

  createParamString: function (rows){
    rows.forEach(function (row){
      cocktailsToMake.paramString += (row.ID + '-');
    });
    var lastIndex = cocktailsToMake.paramString.lastIndexOf('-');
    cocktailsToMake.paramString = cocktailsToMake.paramString.substr(0, lastIndex);
  },

  getCocktailList: function () {
    $.ajax({
      type: 'GET',
      url: 'http://www.cocktailbuilder.com/json/topByIngredients?callback=cocktailList',
      dataType: 'jsonp',
      contentType: 'application/json',
      cache: true,
      jsonpCallback: 'cocktailList',
      data: {'max': 25, 'param': cocktailsToMake.paramString},
      success: function (data){
        cocktailsToMake.cocktailObjects = data;
        cocktailsView.getTemplate(cocktailsView.listHTML);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  lookupPossibleCocktails: function (rows) {
    cocktailsToMake.createParamString(rows);
    cocktailsToMake.getCocktailList();
  },

  getPossibleCocktails: function () {
    webDB.execute ('SELECT ID FROM barIngredients WHERE Name IN (' + cocktailsToMake.createIngredientString() + ');',
     cocktailsToMake.lookupPossibleCocktails
    );
  }


};
