angular.module('appModule', [])

.controller('AppController', ['$scope', 'JobService', 
	function getAllJobs($scope, JobService) {
		
		JobService.getAllJobs()
		.success(function(data, status, headers, config) {
			console.log(data, status, headers, config);
			$scope.jobs = data;
		});
	
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