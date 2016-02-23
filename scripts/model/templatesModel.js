var siteTemplatesModel = {
  localBarTemplate: '',
  cocktailsToMakeTemplate: '',
  recipeTemplate: '',

  getLocalBarTemplate: function (ifMyBarExists) {
    $.ajax({
      type: 'GET',
      url: 'templates/localBar_hbs.html',
      cache: environment.isProd(),
      success: function (templateReturn){
        siteTemplatesModel.localBarTemplate = Handlebars.compile(templateReturn);
        ifMyBarExists();
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  getCocktailsToMakeTemplate: function (ifMyBarExists){
    $.ajax({
      type: 'GET',
      url: 'templates/cocktailsToMake_hbs.html',
      cache: environment.isProd(),
      success: function(templateReturn){
        siteTemplatesModel.cocktailsToMakeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getLocalBarTemplate(ifMyBarExists);
      },
      error: function (e){
        console.log(e.message);
      }
    });
  },

  getRecipeTemplate: function (ifMyBarExists){
    $.ajax({
      type: 'GET',
      url: 'templates/recipe_hbs.html',
      cache: environment.isProd(),
      success: function (templateReturn){
        siteTemplatesModel.recipeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getCocktailsToMakeTemplate(ifMyBarExists);
      },
      error: function (e){
        console.log(e.message);
      }
    });
  },
};
