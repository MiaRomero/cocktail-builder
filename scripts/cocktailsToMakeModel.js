var cocktailsToMake = {
  ingredientString: '',

  createIngredientString: function (){
    $('#addedIngredients li').each(function(index){
      cocktailsToMake.ingredientString += ('"' + $(this).text() + '"' + ', ');
    });
    var lastIndex = cocktailsToMake.ingredientString.lastIndexOf(',');
    return cocktailsToMake.ingredientString.substr(0, lastIndex);
  },

  getIngredientsByID: function () {
    console.log('SELECT ID FROM barIngredients WHERE Name IN (' + cocktailsToMake.createIngredientString() + ')');

    // webDB.execute (
    //   function (rows) {
    //
    //   });
  },

};
