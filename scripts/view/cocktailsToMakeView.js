var cocktailsView = {

  listHTML: function (){
    $('#cocktailList').empty();
    if($('#addedIngredients li').length > 0){
      $('#cocktailList').append(siteTemplatesModel.cocktailsToMakeTemplate(cocktailsToMake));
    }
  },

  showCocktails: function () {
    cocktailsToMake.lookupPossibleCocktails();
  },
};
