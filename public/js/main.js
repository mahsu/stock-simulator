$(document).ready(function() {
  $('#main .sidebar-btn').on('click', function() {
    $('#content-wrap').addClass('sidebar-in');
  });

  $('#sidebar .sidebar-btn').on('click', function() {
    $('#content-wrap').removeClass('sidebar-in');
  });
});

var symbolSelect = angular.module('symbolSelect', ['siyfion.sfTypeahead']);

symbolSelect.controller('symbolController', function($scope) {
  var allTickers = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: 'api/stocks/symbols' 
  });

  allTickers.initialize();

  $scope.tickerOptions = {
    minLength: 1,
    highlight: true
  }

  $scope.tickerData = {
    source: allTickers.ttAdapter()
  }

  $scope.tracks = [];
  $scope.init = function() {

    $scope.tracks = [
    {
      title: "Default",
      tickers: ["AAPL", "GOOG"]
    },
    {
      title: "Default",
      tickers: ["A", "AA"]
    }
    ];
  };

  $scope.delTicker = function(ticker, track) {
    ticker = ticker.toUpperCase();
    track.tickers.splice(track.tickers.indexOf(ticker), 1);
  }

  $scope.delTrack = function(track) {
    $scope.tracks.splice($scope.tracks.indexOf(track), 1);
  }

  $scope.addTicker = function(ticker, track) {
    ticker = ticker.toUpperCase();
    if (ticker != "" && !_.contains(track.tickers, ticker)) {
      track.tickers.push(ticker);
    }
    $scope.ticker = '';
  }

  $scope.addTrack = function() {
    if (this.track != '') {
      $scope.tracks.push({
        title: this.track,
        tickers: []
      });
    }
    $scope.track = '';
  }

  $scope.keyPress = function(ev, track) {
    var tgt = $(ev.target);
    if (ev.keyCode == 13) {
      
      if (allTickers.get(tgt.val()).length != 0) {
      console.log(tgt.val());
      $scope.addTicker(tgt.val(), track);
      tgt.val('');
      tgt.typeahead('close');

      }
      
          }
  }

});
