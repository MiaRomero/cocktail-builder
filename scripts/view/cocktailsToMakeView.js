var cocktailsView = {

  

  listHTML: function (){
    $('#cocktailList').empty();
    $('#cocktailList').append(cocktailsToMake.listTemplate(cocktailsToMake));
  },

  showCocktails: function () {
    cocktailsToMake.getPossibleCocktails();
  },
};
