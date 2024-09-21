(function ($) {
  "use strict";

  // PRE LOADER
  $(window).load(function() {
    $('.preloader').fadeOut(1000); // Set duration in milliseconds    
  });

  // MENU TOGGLE
  $('.menu-burger').on('click', function() {
    $('.menu-bg, .menu-items, .menu-burger').toggleClass('fs');
    $('.menu-burger').text() === "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
  });

  // ABOUT SLIDER (Vegas Plugin)
  $('body').vegas({
    slides: [
      { src: 'images/slider1.jpeg' },
      { src: 'images/slider2.jpeg' }
    ],
    timer: false,
    transition: [ 'fade', 'zoomOut', 'blur' ],  // Transition effects for the slider
    transitionDuration: 1000,  // 1 second transition speed
    delay: 5000,  // Each slide will be shown for 5 seconds
    animation: ['kenburns']  // Ken Burns effect for smooth zoom
  });

  // COUNTDOWN FUNCTION
  $(".countdown").countdown({
    date: "23 September 2024 10:00:00",  // The date of the event
    format: "on"
  }, function() {
    // When countdown finishes, this callback will trigger
    $('#program-buttons').html('<button>Download Sunday Program</button>');
  });

  // DISPLAY PROGRAM BUTTONS BASED ON TIME
  let currentTime = new Date();

  // Check the current time and display the appropriate buttons
  if (currentTime.getHours() >= 10 && currentTime.getHours() < 12) {
    $('#program-buttons').html('<button id="btn-program1">Download Program 1</button>');
  }

  if (currentTime.getHours() >= 12) {
    $('#program-buttons').html('<button id="btn-program2">Download Program 2</button>');
  }

  // START A COUNTDOWN AT 6:00 PM ON SEPTEMBER 23 FOR SEPTEMBER 24, 10:00 AM
  let countdownStart = new Date('23 September 2024 18:00:00');
  if (currentTime >= countdownStart) {
    $(".countdown").countdown({
      date: "24 September 2024 10:00:00",
      format: "on"
    }, function() {
      // When countdown finishes, show download button for the Sunday General Session
      $('#program-buttons').html('<button id="btn-general-session">Download Sunday General Session</button>');
    });

    // Update the caption text during the countdown
    $(".home-info h1").text("Sunday General Session starts in ");
  }

})(jQuery);

// COUNTDOWN FUNCTION DEFINITION
(function($) {
  $.fn.countdown = function(options, callback) {
    let thisEl = $(this);

    // Default settings
    let settings = {
      'date': null,
      'format': null
    };

    if (options) {
      $.extend(settings, options);
    }

    function countdown_proc() {
      let eventDate = Date.parse(settings['date']) / 1000;
      let currentDate = Math.floor($.now() / 1000);

      if (eventDate <= currentDate) {
        callback.call(this);
        clearInterval(interval);
      }

      let seconds = eventDate - currentDate;
      let days = Math.floor(seconds / (60 * 60 * 24));
      seconds -= days * 60 * 60 * 24;
      let hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * 60 * 60;
      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;

      // Display the correct units for day, hour, minute, and second
      thisEl.find(".days").text(days);
      thisEl.find(".hours").text(hours);
      thisEl.find(".minutes").text(minutes);
      thisEl.find(".seconds").text(seconds);
    }

    // Run the countdown function every second
    countdown_proc();
    let interval = setInterval(countdown_proc, 1000);
  }
})(jQuery);
