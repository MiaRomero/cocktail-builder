var cocktailsView = {

  getTemplate: function (listHTML){
    $.get('templates/cocktailsToMake_hbs.html')
      .done(function (templateReturn){
        cocktailsToMake.listTemplate = Handlebars.compile(templateReturn);
        listHTML();
      });
  },

  listHTML: function (){
    $('#cocktailList').empty();
    $('#cocktailList').append(cocktailsToMake.listTemplate(cocktailsToMake));
  },

  showCocktails: function () {
    cocktailsToMake.getPossibleCocktails();
  },
};
