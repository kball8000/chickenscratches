var app = angular.module('csServices', [])
.service('csTest', function(){
  this.getTimestamp = function() {
    return Date.now();
  }
})
