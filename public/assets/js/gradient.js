$(document).mousemove(function (event) {
  windowWidth = $(window).width();
  windowHeight = $(window).height();

  mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
  mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

  $('body').css(
    'background',
    'radial-gradient(at ' +
      mouseXpercentage +
      '% ' +
      mouseYpercentage +
      '%, #FFB5A7, #FCD5CE, #F8EDEB, #F9DCC4, #FEC89A)'
  );
});
