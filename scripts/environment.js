var environment = {

  isProd: function () {
    if(window.location.href.indexOf('localhost') > -1){
      return false;
    }
    else{
      return true;
    }
  }
  
};
