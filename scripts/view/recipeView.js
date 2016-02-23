var recipeView = {

  listHTML: function (ID) {
    $('button[data-id="' + ID + '"]').append(siteTemplatesModel.recipeTemplate(recipeModel.recipeObject));
  }
};

$(document.body).on('click', '.cocktailName' ,function(event){
  event.preventDefault();
  recipeModel.currentCocktailID = event.currentTarget.dataset.id;
  if(($('button[data-id="' + recipeModel.currentCocktailID + '"]').children().length === 0)){
    recipeModel.getRecipe(recipeModel.currentCocktailID);
  }
  else{
    ($('button[data-id="' + recipeModel.currentCocktailID + '"]').children()).remove();
  }
});
