var recipeModel = {
  currentCocktailID: '',
  recipeObject: {},

  getRecipe: function (ID){
    $.ajax({
      type: 'GET',
      url: 'http://www.cocktailbuilder.com/json/cocktailDetails?callback=recipe',
      dataType: 'jsonp',
      contentType: 'application/json',
      cache: true,
      jsonpCallback: 'recipe',
      data: {'param': ID},
      success: function (data){
        recipeModel.recipeObject = data;
        recipeView.listHTML(ID);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  }
};
