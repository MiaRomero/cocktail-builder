var possibleBarIngredients = {
  ingredientObjects: [],

  determineDataLocation: function(cocktailsToMakeController) {
    webDB.execute(
      'SELECT ID, Name, Popularity, NormalizedIngredientID FROM barIngredients',
      function (results){
        if(results.length > 0){
          possibleBarIngredients.ingredientObjects = results;
          allPossibleIngredientsView.fillInTypeahead(possibleBarIngredients.ingredientObjects);
        }
        else{
          possibleBarIngredients.getPossibleIngredients(cocktailsToMakeController);
        }
      });
  },

  getPossibleIngredients: function (cocktailsToMakeController){
    $.ajax({
      type: 'GET',
      url: 'http://www.cocktailbuilder.com/json/ingredientList?callback=ingredientList',
      async: false,
      jsonpCallback: 'ingredientList',
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(data) {
        possibleBarIngredients.ingredientObjects = data;
        possibleBarIngredients.fillInIngredientDB();
        allPossibleIngredientsView.fillInTypeahead(possibleBarIngredients.ingredientObjects);
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  },

  fillInIngredientDB: function () {
    possibleBarIngredients['ingredientObjects'].forEach(function(object){
      webDB.execute([
        {
          'sql': 'INSERT INTO barIngredients (ID, Name, Popularity, NormalizedIngredientID) VALUES (?, ?, ?, ?);',
          'data': [object.ID, object.Name, object.Popularity, object.NormalizedIngredientID],
        }
      ]);
    });
  },

  getIngredientInfo: function (ingredientObject, IngredientName){
    possibleBarIngredients['ingredientObjects'].forEach(function (object){
      if (object.Name === IngredientName){
        ingredientObject.ID = object.ID;
        ingredientObject.Popularity = object.Popularity;
        ingredientObject.NormalizedIngredientID = object.NormalizedIngredientID;
      }
    });
    return ingredientObject;
  },
};

var myBarModel = {
  ingredientObjects: [],

  ifMyBarExists: function () {
    webDB.execute(
      'SELECT ID, Name, Popularity, NormalizedIngredientID FROM myBar',
      function (results){
        if(results.length > 0){
          myBarModel.ingredientObjects = results;
          myBarView.showMyBarView(myBarModel['ingredientObjects']);
          cocktailsToMakeController.show();
        }
      });
  },

  addToMyBarDB: function (newIngred) {
    webDB.execute([
      {
        'sql': 'INSERT INTO myBar (ID, Name, Popularity, NormalizedIngredientID) VALUES (?,?,?,?);',
        'data': [newIngred.ID, newIngred.Name, newIngred.Popularity, newIngred.NormalizedIngredientID]
      }
    ]);
  },

  removeFromMyBarDB: function (ID)  {
    webDB.execute([
      {
        'sql': 'DELETE FROM myBar WHERE ID = ?',
        'data': [ID]
      }
    ]);
  },

  DuplicateIngredients: function (newIngredName) {
    return myBarModel.ingredientObjects.some(function (ce, index, array){
      return newIngredName === array[index].Name;
    });
  },

  addIngredientToBar: function (newIngred){
    newIngred = possibleBarIngredients.getIngredientInfo(newIngred, newIngred.Name);
    myBarModel.ingredientObjects.push(newIngred);
    myBarModel.addToMyBarDB(newIngred);
  },

  removeIngredientFromBar: function (ID){
    var ingredIndex = '';
    myBarModel['ingredientObjects'].map(function(object, index, array){
      if(object.ID == ID){
        ingredIndex = index;
      }
    });
    myBarModel['ingredientObjects'].splice(ingredIndex, 1);
    myBarModel.removeFromMyBarDB(ID);
  }
};
