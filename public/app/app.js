angular.module('appModule', [])

.controller('AppController', ['$scope', 'JobService', 
	function getAllJobs($scope, JobService) {
		
		// JobService.getAllJobs()
		// .success(function(data, status, headers, config) {
		// 	console.log(data, status, headers, config);
		// 	$scope.jobs = data;
		// });
	
}])

.controller('FormController', ['$scope', function ($scope) {
	console.log('FormController');
	$scope.submitForm = function() {
		console.log('submitForm');
		console.log($scope.theForm.theName);
	}
}])

.factory('ServiceBook', [function () {
	return {
		JobService_Jobs: '/api/jobs'
	};
}])

.service('JobService', ['$http', 'ServiceBook', 
	function ($http, ServiceBook) {
		this.getAllJobs = function() {
			var promise = $http.get(ServiceBook.JobService_Jobs);
			return promise;
		}
}])

.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  }
})

.directive('blurImg', ['$http', function ($http) {
	return {
		restrict: 'A',
		scope: {
			bluramount: '@'
		},
		link: function (scope, element, attrs) {
			element.css({'max-width': '100%'});
			
			var blurAmount = scope.bluramount || 5;
			var src = encodeURIComponent(element[0].src);
			console.log(src, element);
			$http({
			    url: 'api/blur2', 
			    method: "GET",
			    params: {src: src, blurAmount: blurAmount}
			 }).success(function(data) {
			 	console.log(data);
			 	element.attr('src', data.src);

			 });
			// $http.get('api/blur2?src=' + src + '&blurAmount=' + blurAmount).then(function(response) {
			// 	console.log(response.data);
			// })
		}
	};
}])