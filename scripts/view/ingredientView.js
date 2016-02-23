var myBarView = {
  selectedIngredientID: '',

  showMyBarView: function (myBarModel) {
    $('#addedIngredients').append(siteTemplatesModel.localBarTemplate(myBarModel));
    if($('#addedIngredients li').length > 0 || $('#addedIngredients div').length > 0){
      $('#cocktailsToMake p').text('Cocktails to Make:');
    }
    else{
      $('#cocktailsToMake p').text('');
    }
  },

  listHTMLAddIngred: function (){
    var newIngred = {};
    newIngred.Name = $('#autocomplete').val();
    if(!myBarModel.DuplicateIngredients(newIngred.Name)){
      myBarModel.addIngredientToBar(newIngred);
      $('#addedIngredients').empty();
      myBarView.showMyBarView(myBarModel['ingredientObjects']);
    }
  },

  listHTMLRemoveIngred: function (ID){
    myBarModel.removeIngredientFromBar(ID);
    $('#addedIngredients').empty();
    myBarView.showMyBarView(myBarModel['ingredientObjects']);
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
        myBarView.listHTMLAddIngred();
        cocktailsToMakeController.show();
        $('#autocomplete').val('');
      }
    });
  }
};

$(document.body).on('click', '.deleteIngredient', function (event){
  event.preventDefault();
  myBarView.selectedIngredientID = event.currentTarget.parentElement.dataset.id;
  myBarView.listHTMLRemoveIngred(myBarView.selectedIngredientID);
  cocktailsToMakeController.show();
});
