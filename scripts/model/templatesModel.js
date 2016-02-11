var siteTemplates = {
  ingredientListTemplate: '',
  localBarTemplate: '',
  cocktailsToMakeTemplate: '',

  getIngredientListTemplate: function () {
    $.get('templates/ingredientsInMyBar_hbs.html')
      .done( function(templateReturn){
        siteTemplates.ingredientListTemplate = Handlebars.compile(templateReturn);
      });
  },

  getLocalBarTemplate: function (ifMyBarExists) {
    $.get('templates/localBar_hbs.html')
      .done( function(templateReturn){
        siteTemplates.localBarTemplate = Handlebars.compile(templateReturn);
        ifMyBarExists();
      });
  },

  getCocktailsToMakeTemplate: function (listHTML){
    $.get('templates/cocktailsToMake_hbs.html')
      .done(function (templateReturn){
        siteTemplates.cocktailsToMakeTemplate = Handlebars.compile(templateReturn);
        //listHTML();
      });
  },
};
