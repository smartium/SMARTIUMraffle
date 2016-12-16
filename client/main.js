
var counter = 0;
var number = new ReactiveVar();
var arrRaffles = [];
var raffles = new ReactiveVar([]);
var isPlaying = new ReactiveVar(true);
var isRunning = new ReactiveVar();

Template.body.onRendered(function() {

  $('#fullpage').fullpage();

  let settings = 'particles.json';
  this.autorun(() => {
    if (particlesJS) {
      console.log(`loading particles.js config from "${settings}"...`)
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles-js', settings, function () {
        console.log('callback - particles.js config loaded');
      });
    }
  });
});

Template.body.helpers({
  number() {
    return number.get()
  },

  raffles() {
    return raffles.get();
  },

  isPlaying() {
    return isPlaying.get()
  },

  isRunning() {
    return isRunning.get()
  }
})

Template.body.events({
  'click #go'() {
    if (arrRaffles.length >= 4) {
      isPlaying.set(false);
    }

    isRunning.set('none');
    counter = 0;
    var myInterval = Meteor.setInterval(function(){
      counter ++
      drawn = Math.round((Math.random() * 1000) + 1)
      number.set(drawn)
      if (counter == 300) {
        Meteor.clearInterval(myInterval);
        console.log(number.get());
        arrRaffles.push(number.get());
        raffles.set(arrRaffles);
        isRunning.set('');
      }
    }, 10);
  },

  'click #new'() {
    arrRaffles = [];
    number.set();
    raffles.set(arrRaffles);
    isPlaying.set(true);
  }
});
