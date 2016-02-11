var myBarView = {

  showMyBarView: function (myBarModel) {
    $('#cocktailsToMake p').text('Cocktails to Make:');
    $('#addedIngredients').append(siteTemplatesModel.localBarTemplate(myBarModel));
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
