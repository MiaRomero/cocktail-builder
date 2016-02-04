var addIngredientController = {

  show: function(cocktailsToMakeController){
    myBar.getTemplates();
    possibleBarIngredients.determineDataLocation(cocktailsToMakeController);
  }

};
