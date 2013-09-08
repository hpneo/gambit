var Gambit = function(options) {
  var events = {
    'before_move' : [],
    'after_move' : [],
    'before_load_level' : [],
    'after_load_level' : [],
    'before_complete_level' : [],
    'after_complete_level' : [],
    'before_game_over' : [],
    'after_game_over' : []
  };

  var EventManager = {
    on : function (event_name, fn, once) {
      if (once == undefined) {
        once = false;
      }

      if (!(event_name in events)) {
        events[event_name] = [];
      }

      if (once) {
        events[event_name] = [fn];
      }
      else {
        events[event_name].push(fn);
      }
    },
    off : function(event_name, all) {
      if (all == undefined) {
        all = false;
      }

      if (all) {
        events[event_name] = [];
      }
      else {
        events[event_name].pop();
      }
    },
    fire : function(event_name, scope) {
      var callback_arguments = Array.prototype.slice.apply(arguments).slice(2),
          callbacks = events[event_name],
          scope = scope || window,
          i = 0;

      for (i; i < callbacks.length; i++) {
        callbacks = callbacks[i];

        callbacks.apply(scope, callback_arguments);
      }
    },

    clear : function() {
      events = {};
    }
  };

  this.on = EventManager.on;
  this.off = EventManager.off;
  this.fire = EventManager.fire;
  this.clear = EventManager.clear;
  this.total_score = 0;
  this.levels = [];

  for (e in options.events) {
    this.on(e, options.events[e]);
  }

  if (options.el) {
    this.$el = $(options.el);
    this.el = this.$el[0];
  }
};

Gambit.super = Gambit.prototype;