app.filter('reverse', function() {
  return function(items) {
	  if(items){
		  if (items.length > 0){
			  return items.slice().reverse();
		  }
  	   }
  };
});