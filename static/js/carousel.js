(function ($) {
  "use strict"; // Start of use strict

  $('.carousel-item').click(function () {
    $('#adidas_carousel').carousel('prev');
  });

  try {
    var ws = new WebSocket('ws://localhost:8085');
    ws.onmessage = function (event) {
      var event = JSON.parse(event.data);
      if (typeof event === 'string') {
        console.log(event)
        //alert(event)
      } else {
        switch (event.command) {
          case 'occupied':
            if (event.arg) {
              console.log("now occupied")
            }
            else {
              console.log("not occupied")
              debugger
              $('#adidas_carousel').carousel('next');
              setTimeout(function () {
                $('#adidas_carousel').carousel('next');
              }, 16000)
            }
            break
          default:
        }
      }

    };
  } catch (e) {

  }

})(jQuery); // End of use strict