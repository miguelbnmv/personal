document.addEventListener('mousemove', (event) => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
  mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

  document.querySelector('body').style.background =
    'radial-gradient(at ' +
    mouseXpercentage +
    '% ' +
    mouseYpercentage +
    '%, #FFB5A7, #FCD5CE, #F8EDEB, #F9DCC4, #FEC89A)';
});
