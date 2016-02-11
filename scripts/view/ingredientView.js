var myBarView = {

  showMyBarView: function (myBarModel) {
    $('#addedIngredients').append(siteTemplates.localBarTemplate(myBarModel));
  },

  listHTML: function (){
    var newIngred = {};
    newIngred.Name = $('#autocomplete').val();
    if(!myBarModel.DuplicateIngredients(newIngred.Name)){
      myBarModel.addIngredientToBar(newIngred);
      $('#addedIngredients').empty();
      myBarView.showMyBarView(myBarModel['ingredientObjects']);
    }
  }
};

var allPossibleIngredientsView = {

  name: [],

  fillInTypeahead: function(array) {
    array.forEach(function(object){
      allPossibleIngredientsView.name.push(object.Name);
    });

    $('#autocomplete').autocomplete({
      lookup: allPossibleIngredientsView.name,
      minChars: 2,
      onSelect: function () {
        myBarView.listHTML();
        cocktailsToMakeController.show();
        $('#autocomplete').val('');
      }
    });
  }
};
