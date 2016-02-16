var siteTemplatesModel = {
  ingredientListTemplate: '',
  localBarTemplate: '',
  cocktailsToMakeTemplate: '',
  editMyBarTemplate: '',
  recipeTemplate: '',

  getIngredientListTemplate: function () {
    $.get('templates/ingredientsInMyBar_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.ingredientListTemplate = Handlebars.compile(templateReturn);
      });
  },

  getLocalBarTemplate: function (ifMyBarExists) {
    $.get('templates/localBar_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.localBarTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getIngredientListTemplate();
        ifMyBarExists();
      });
  },

  getEditMyBarTemplate: function (ifMyBarExists){
    $.get('templates/editMyBar_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.editMyBarTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getLocalBarTemplate(ifMyBarExists);
      });
  },

  getCocktailsToMakeTemplate: function (ifMyBarExists){
    $.get('templates/cocktailsToMake_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.cocktailsToMakeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getEditMyBarTemplate(ifMyBarExists);
      });
  },

  getRecipeTemplate: function (ifMyBarExists){
    $.get('templates/recipe_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.recipeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getCocktailsToMakeTemplate(ifMyBarExists);
      });
  },

  // getTemplatesInOrder: function (ifMyBarExists){
  //   $.get('templates/recipe_hbs.html') //get recipe Template
  //     .done(function (templateReturn){
  //       siteTemplatesModel.recipeTemplate = Handlebars.compile(templateReturn);//
  //     });
  // }
};
