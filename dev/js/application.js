'use strict';

(function() {
    $(document).on('ready', function() {
        console.log("Put me in coach!");
    });
    window.requestAnimFrame = function(){
      return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback){
          window.setTimeout(callback, 1000 / 60);
        }
      );
    }();

    window.cancelAnimFrame = function(){
      return (
        window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        window.msCancelAnimationFrame     ||
        function(id){
          window.clearTimeout(id);
        }
      );
    }();

    $(document).ready(function() {
      //variable for the 'stroke-dashoffset' unit
      var $dashOffset = $(".path").css("stroke-dashoffset");
      //on a scroll event - execute function
      $(window).scroll(function() {
        //calculate how far down the page the user is
        var $percentageComplete = (($(window).scrollTop() / ($("html").height() - $(window).height())) * 100);
        //convert dashoffset pixel value to interger
        var $newUnit = parseInt($dashOffset, 10);
        //get the value to be subtracted from the 'stroke-dashoffset'
        var $offsetUnit = $percentageComplete * ($newUnit / 100);
        //set the new value of the dashoffset to create the drawing effect
        $(".path").css("stroke-dashoffset", $newUnit - $offsetUnit);
      });

      var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) ),
        hidden = Array.prototype.slice.call( document.querySelectorAll( '.hide' ) ),
        current_frame = 0,
        total_frames = 300,
        path = new Array(),
        length = new Array(),
        handle = 0;

      function init() {
        [].slice.call( document.querySelectorAll( 'path' ) ).forEach( function( el, i ) {
          path[i] = el;
          var l = path[i].getTotalLength();
          length[i] = l;
          path[i].style.strokeDasharray = l + ' ' + l;
          path[i].style.strokeDashoffset = l;
        } );

      }

      function draw() {
        var progress = current_frame/total_frames;
        if (progress > 1) {
          window.cancelAnimFrame(handle);
          showPage();
        } else {
          current_frame++;
          for(var j=0; j<path.length;j++){
            path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
          }
          handle = window.requestAnimFrame(draw);
        }
      }

      function showPage() {
        svgs.forEach( function( el, i ) {
          el.setAttribute( 'class', el.getAttribute('class') + ' hide' );
        } );
        hidden.forEach( function( el, i ) {
          $(el).removeClass( 'hide' );
          $(el).addClass( 'show' );
        } );
      }

      init();
      draw();
    });
})();
