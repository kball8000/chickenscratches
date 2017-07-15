var fapp = angular.module("csFilters", [])
.filter('linebreaks', function() {
  return function(input) {
    input = input || '';
    return input.replace('\n', '<br>');
  };
})
.filter('test', function() {
  return function(input) {
    input = input || '';
    return input.replace('ab', 'newAB');
  };
});
