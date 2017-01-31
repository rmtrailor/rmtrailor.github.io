var curr = 'opening';

var scrollLeft = function() {
  var opening, past, present, future;
  
  if (curr === 'opening') {
    opening = '-200%';
    past = '0%';
    present = '200%';
    future = '400%';
    curr = 'past';   
  }
  else if (curr === 'past') {
    opening = '-400%';
    past = '-200%';
    present = '0%';
    future = '200%';
    curr = 'present';
  }
  else if (curr === 'present') {
    opening = '-600%';
    past = '-400%';
    present = '-200%';
    future = '0%';
    curr = 'future';
  }

  $('.opening').animate({
      'left': opening
    }, 2000);

  $('.past').animate({
      'left': past
    }, 2000);

  $('.present').animate({
      'left': present
    }, 2000);

  $('.future').animate({
      'left': future
    }, 2000);
};

var scrollRight = function() {
    var opening, past, present, future;
  
  if (curr === 'past') {
    opening = '0%';
    past = '200%';
    present = '400%';
    future = '600%';
    curr = 'opening';
  }
  else if (curr === 'present') {
    opening = '-200%';
    past = '0%';
    present = '200%';
    future = '400%';
    curr = 'past';
  }
  else if (curr === 'future') {
    opening = '-400%';
    past = '-200%';
    present = '0%';
    future = '200%';
    curr = 'present';
  }

  $('.opening').animate({
      'left': opening
    }, 2000);

  $('.past').animate({
      'left': past
    }, 2000);

  $('.present').animate({
      'left': present
    }, 2000);

  $('.future').animate({
      'left': future
    }, 2000);
}

var main = function() {
  $('.opening').fadeIn(2500, 0);
  $('.icon').fadeIn(2500, 0);

  $('.icon.right').click(function() {
    scrollLeft();
  });

  $('.icon.left').click(function() {
    scrollRight();
  });
}

$(document).ready(function() {    
    main();
});