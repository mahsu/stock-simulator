$(document).ready(function() {
  $('#main .sidebar-btn').on('click', function() {
    $('#content-wrap').addClass('sidebar-in');
  });

  $('#sidebar .sidebar-btn').on('click', function() {
    $('#content-wrap').removeClass('sidebar-in');
  });
});

var symbolSelect = angular.module('symbolSelect', []);

symbolSelect.controller('symbolController', function($scope) {
  $scope.allTickers = [];
  $scope.tracks = [];
  $scope.init = function() {
    // fetch list of tickers
    $scope.allTickers = ['ABCD', 'DEFG', 'HIJK'];

    $scope.tracks = [
    {
      title: "Default",
      tickers: ["ABC", "DEF"]
    },
    {
      title: "Default",
      tickers: ["ABC", "DEF"]
    }
    ];
  };
});