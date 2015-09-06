$(document).ready(function() {
  $('#main .sidebar-btn').on('click', function() {
    $('#content-wrap').addClass('sidebar-in');
  });

  $('#sidebar .sidebar-btn').on('click', function() {
    $('#content-wrap').removeClass('sidebar-in');
  });
});

var symbolSelect = angular.module('symbolSelect', ['siyfion.sfTypeahead']);

symbolSelect.controller('symbolController', function($scope,$http) {
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
    /*{
      title: "Default",
      tickers: ["AAPL", "GOOG"],
      data: []
    },
    {
      title: "Default",
      tickers: ["A", "AA"],
      data: []
    }*/
    ];
  };

  $scope.delTicker = function(ticker, track) {
    ticker = ticker.toUpperCase();
    var index = track.tickers.indexOf(ticker);
    track.tickers.splice(index, 1);
    track.data.splice(index,1);
  }

  $scope.delTrack = function(track) {
    $scope.tracks.splice($scope.tracks.indexOf(track), 1);
  }

  $scope.addTicker = function(ticker, track) {
    ticker = ticker.toUpperCase();
    if (ticker != "" && !_.contains(track.tickers, ticker)) {
      $http.get("/api/stocks/symbol/"+ticker, {
        params: {
          limit: 60
          //start: "1995-10-1"
        }
      }).success(function(data, status, headers, config) {
        track.tickers.push(ticker);
        track.data.push(data);
        console.log(track);
      }). error(function(data, status, headers, config) {
        console.log(data);
      });
    }
    $scope.ticker = '';
  }

  $scope.addTrack = function() {
    if (this.track != '') {
      $scope.tracks.push({
        title: this.track,
        tickers: [],
        data: []
      });
    }
    $scope.track = '';
  }

  $scope.keyPress = function(ev, track) {
    var tgt = $(ev.target);
    if (ev.keyCode == 13) {
      
      if (allTickers.get(tgt.val()).length != 0) {
        //console.log(tgt.val());
        $scope.addTicker(tgt.val(), track);
        tgt.val('');
        tgt.typeahead('close');
      }    
    }
  }

});
