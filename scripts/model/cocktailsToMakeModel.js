var cocktailsToMake = {
  paramString: '',
  cocktailObjects: [],

  createParamString: function (){
    $('#addedIngredients li').each(function() {
      var ID = $(this).data('id');
      cocktailsToMake.paramString += (ID + '-');
    });
    cocktailsToMake.paramString = cocktailsToMake['paramString'].slice(0, -1);
  },

  getCocktailList: function () {
    $.ajax({
      type: 'GET',
      url: 'http://www.cocktailbuilder.com/json/topByIngredients?callback=cocktailList',
      dataType: 'jsonp',
      contentType: 'application/json',
      cache: true,
      jsonpCallback: 'cocktailList',
      data: {'max': 25, 'param': cocktailsToMake.paramString},
      success: function (data){
        cocktailsToMake.cocktailObjects = data;
        cocktailsView.listHTML();
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  lookupPossibleCocktails: function () {
    cocktailsToMake.createParamString();
    cocktailsToMake.getCocktailList();
  }
};
