var app = angular.module('csControllers', ['csServices', 'csFilters', 'ngSanitize', 'firebase'])
.controller('mainCtrl', function($firebaseObject, $firebaseArray, csTest, testFilter) {
  this.name = 'not scoped name';
  this.ts = csTest.getTimestamp();
  console.log('ts: ', this.ts);

  this.testFirstBtn = val => {
    console.log('first button clicked: ', val);
  }
});