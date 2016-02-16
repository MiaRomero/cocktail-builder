var recipeView = {

  listHTML: function (ID) {
    $('button[data-id="' + ID + '"]').append(siteTemplatesModel.recipeTemplate(recipeModel.recipeObject));
  }

};
