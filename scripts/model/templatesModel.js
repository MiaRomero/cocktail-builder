var siteTemplatesModel = {
  localBarTemplate: '',
  cocktailsToMakeTemplate: '',
  recipeTemplate: '',

  getLocalBarTemplate: function (ifMyBarExists) {
    $.get('templates/localBar_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.localBarTemplate = Handlebars.compile(templateReturn);
        ifMyBarExists();
      });
  },

  getCocktailsToMakeTemplate: function (ifMyBarExists){
    $.get('templates/cocktailsToMake_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.cocktailsToMakeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getLocalBarTemplate(ifMyBarExists);
      });
  },

  getRecipeTemplate: function (ifMyBarExists){
    $.get('templates/recipe_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.recipeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getCocktailsToMakeTemplate(ifMyBarExists);
      });
  },
};
