console.log('in index before document ready');

$(function () {
  console.log('now in document ready');
  addIngredientController.show();
  console.log('after controller.show call in index doc ready');
});
