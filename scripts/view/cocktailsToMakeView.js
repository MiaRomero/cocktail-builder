var cocktailsView = {

  listHTML: function (){
    $('#cocktailList').empty();
    $('#cocktailList').append(siteTemplatesModel.cocktailsToMakeTemplate(cocktailsToMake));
  },

  showCocktails: function () {
    cocktailsToMake.lookupPossibleCocktails();
  },
};
