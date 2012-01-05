'use strict';

(function(window) {
  // using our own namespace
  var app = window.tunes = {controller: {}, factory: {}};

  app.init = function($locationProvider) {
    // configure your app
  };

  app.controller.TunesCtrl = function($http, player) {
    var scope = this;

    scope.player = player;

    $http.get('albums.json').success(function(body) {
      scope.albums = body;
    });
  }
  app.controller.TunesCtrl.$inject = ['$http', 'player'];


  // player SERVICE
  app.factory.player = function(audio) {
    var player,
        playlist = [],
        paused = false,
        current = {
          album: 0,
          track: 0
        },
        scope = this;

    player = {
      playlist: playlist,

      current: current,

      playing: false,

      play: function(track, album) {
        if (!playlist.length) return;

        if (angular.isDefined(track)) current.track = track;
        if (angular.isDefined(album)) current.album = album;

        if (!paused) audio.src = playlist[current.album].tracks[current.track].url;
        audio.play();
        player.playing = true;
        paused = false;
      },

      pause: function() {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          paused = true;
        }
      },

      reset: function() {
        player.pause();
        current.album = 0;
        current.track = 0;
      },

      next: function() {
        if (!playlist.length) return;
        paused = false;
        if (playlist[current.album].tracks.length > (current.track + 1)) {
          current.track++;
        } else {
          current.track = 0;
          current.album = (current.album + 1) % playlist.length;
        }
        if (player.playing) player.play();
      },

      previous: function() {
        if (!playlist.length) return;
        paused = false;
        if (current.track > 0) {
          current.track--;
        } else {
          current.album = (current.album - 1 + playlist.length) % playlist.length;
          current.track = playlist[current.album].tracks.length - 1;
        }
        if (player.playing) player.play();
      }
    };

    playlist.add = function(album) {
      if (playlist.indexOf(album) !== -1) return;
      playlist.push(album);
    };

    playlist.remove = function(album) {
      var index = playlist.indexOf(album);
      if (index === current.album) player.reset();
      playlist.splice(index, 1);
    };

    audio.addEventListener('ended', function() {
      scope.$apply(player.next);
    }, false);

    return player;
  };


  // extract the audio for making the player easier to test
  app.factory.audio = function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  };
})(window);
