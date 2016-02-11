var siteTemplatesView = {

  callTemplatesModelFunctions: function (ifMyBarExists) {
    siteTemplates.getIngredientListTemplate();
    siteTemplates.getLocalBarTemplate(ifMyBarExists);
    siteTemplates.getCocktailsToMakeTemplate();
  },

  getAllTemplates: function () {
    siteTemplatesView.callTemplatesModelFunctions(myBarModel.ifMyBarExists);
  }


};
