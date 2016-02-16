var myBarView = {

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
    //myBarView.showMyBarView(myBarModel['ingredientObjects']);
    $('#addedIngredients').empty().append(siteTemplatesModel.editMyBarTemplate(myBarModel));

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

$('#editButton').on('click', function (event){
  event.preventDefault();
  if($('#editButton').text() === 'Edit Ingredient List'){
    $('#editButton').text('Done');
    $('#addedIngredients').empty().append(siteTemplatesModel.editMyBarTemplate(myBarModel));
  }
  else {
    $('#editButton').text('Edit Ingredient List');
    $('#addedIngredients').empty().append(myBarView.showMyBarView(myBarModel['ingredientObjects']));
  }
});

$('#deleteIngredient').on('click', function (event){
  event.preventDefault();
  $('input:checked').each(function (){
    var ID = $(this).data('id');
    myBarView.listHTMLRemoveIngred(ID);
  });
  cocktailsToMakeController.show();
});
