var siteTemplatesModel = {
  ingredientListTemplate: '',
  localBarTemplate: '',
  cocktailsToMakeTemplate: '',
  editMyBarTemplate: '',

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
        ifMyBarExists();
      });
  },

  getEditMyBarTemplate: function (){
    $.get('templates/editMyBar_hbs.html')
      .done( function(templateReturn){
        siteTemplatesModel.editMyBarTemplate = Handlebars.compile(templateReturn);
      });
  },

  getTemplatesInOrder: function (ifMyBarExists){
    $.get('templates/cocktailsToMake_hbs.html') //cocktailsToMake Template
      .done(function (templateReturn){
        siteTemplatesModel.cocktailsToMakeTemplate = Handlebars.compile(templateReturn);
        siteTemplatesModel.getEditMyBarTemplate();
        siteTemplatesModel.getIngredientListTemplate();
        siteTemplatesModel.getLocalBarTemplate(ifMyBarExists);
      });
  }


};
