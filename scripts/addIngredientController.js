console.log('loading controller script');

var addIngredientController = {};

addIngredientController.show = function(){
  console.log('in controller.show function');
  possibleBarIngredients.fillInTypeahead();
};
console.log('at end of controller script');
