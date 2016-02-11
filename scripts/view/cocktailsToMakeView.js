var cocktailsView = {

  listHTML: function (){
    $('#cocktailList').empty();
    $('#cocktailList').append(siteTemplates.cocktailsToMakeTemplate(cocktailsToMake));
  },

  showCocktails: function () {
    cocktailsToMake.lookupPossibleCocktails();
  },
};
