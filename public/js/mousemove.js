$(document).ready(function() {

    var $bl    = $("body"),
        $th    = $("#img-contain"),
        blW    = $bl.outerWidth(),
        blH    = $bl.outerHeight(),
        blSW   = $bl[0].scrollWidth,
        blSH   = $bl[0].scrollHeight,
        wDiff  = (blSW/blW)-1,  // widths difference ratio
        hDiff  = (blSH/blH)-1,
        mPadd  = 5,  // Mousemove Padding
        dampW   = 850 ,
        dampH   = 1000,  // Mousemove response softness
        mX     = 0,
        mY     = 0,   // Real mouse position
        mX2    = 0,
        mY2    = 0,   // Modified mouse position
        posX   = 0,
        posY   = 0,
        mmAA   = blW-(mPadd*2), // The mousemove available area
        mmAAH   = blH-(mPadd*2),
        mmAAr  = (blW/mmAA);    // get available mousemove fidderence ratio
        mmAArH  = (blH/mmAAH);

        let coordHolder = [];



        let initWait = setInterval(function() {
            dampW--;
            dampH--;
            // console.log(dampW--);
            if (dampW < 61) {
                stopInt();
            }
        }, 10);

        let stopInt = () => {
            clearInterval(initWait);
        }

        $bl.mousemove(function(e) {
            // console.log(mmAAr);
            // console.log(mmAArH);

            mX = e.pageX - this.offsetLeft;
            mY = e.pageY - this.offsetTop;
            // mX = e.pageX;
            // mY = e.pageY;
            mX2 = Math.min( Math.max(0, mX-mPadd), '1300' ) * mmAAr;
            mY2 = Math.min( Math.max(0, mY-mPadd), '777' ) * '2';
            // console.log(mX2, + "    " + mY2);

            // console.log(dampW--);

            // $('#div').css({
            //    left:  e.pageX,
            //    top:   e.pageY
            // });


              var leftOffset = $(this).offset().left;
              var topOffset = $(this).offset().top;
              $('#others').css({'left': mX2, 'top': mY2});

              // let inner=document.getElementById('img');
              // console.log(x);

            //   $('#ring').scrollLeft(mX2);
            //   $('#ring-holder').css({'left': mX2});

            //   console.log($(this).outerWidth() + ' - ' + $(this)[0].scrollWidth);
        });

    let tempX;
    setInterval(function(){
        console.log("tempx: " + tempX + "mX: " + mX);
        // console.log(mX);
        if (mX > tempX) {
            posX += (mX2 - posX) / dampW; // zeno's paradox equation "catching delay"
        }
        else if (mX < tempX){
            posX -= (mX2 - posX) / dampW;
        }
        else {
            // posX -= (mX2 - posX) / dampW;
        }
        posY += (mY2 - posY) / dampH;

        $th.css({marginTop: -posY*hDiff  });
        let outer=document.getElementsByTagName("BODY")[0];
        // outer.scrollLeft = (posX + tempx)/2;
        outer.scrollLeft = posX;
        tempX = mX;
        // $th.css({marginLeft: -posX*wDiff, marginTop: -posY*hDiff  });
    }, 1);

    // let intVal = setInterval(intervalMouse, 10);
    let can;
    $('img').mouseenter(function(e) {
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
            can =this.canvas;
        }
    });

    // function intervalMouse () {
        $('img').mousemove(function(e) {
            let inner=document.getElementById('others').getBoundingClientRect();
            // console.log(inner);

            var x = e.pageX;
            var y = e.pageY;
            var coord = "x=" + x + ", y=" + y;

            // let outer=document.getElementsByTagName("BODY")[0];
            // let inner=document.getElementById('img');
            // console.log(x);
            // inner.scrollTop = y;

            // if(!this.canvas) {
            //     this.canvas = $('<canvas />')[0];
            //     this.canvas.width = this.width;
            //     this.canvas.height = this.height;
            //     this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
            // }

            var pixelData = can.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
            var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

            $('#div').css({
               left:  e.pageX,
               top:   e.pageY
            });

            $('#status').html("Coord: " + coord + '<br>Hex: ' + hex);
            $('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3] + "<br>" + hex);

            if (pixelData[0] > 75 && pixelData[1] < 50 && pixelData[2] < 50) {
                console.log('R: ' + pixelData[0] + '  G: ' + pixelData[1] + '  B: ' + pixelData[2]);
                $('#glow').css({
                    'box-shadow': '0px 0px 100px 40px white'
                })
            } else {
                    $('#glow').css({
                        'box-shadow': '0px 0px 0px 0px white'
                    });
            }

            function Coordinates(topLeft, topLeft2, topRight, topRight2, bottomRight, bottomRight2, bottomLeft, bottomLeft2) {
                this.topLeft = [topLeft, topLeft2];
                this.topRight = [topRight, topRight2];
                this.bottomRight = [bottomRight, bottomRight2];
                this.bottomLeft = [bottomLeft, bottomLeft2];
            }

                let bottom = $('#div').offset().top + $('#div').outerHeight();
                let right = $('#div').offset().left + $('#div').outerWidth();

                let one = new Coordinates($('#div').offset().top,
                                          $('#div').offset().left,
                                          $('#div').offset().top,
                                          right,
                                          bottom,
                                          right,
                                          bottom,
                                          $('#div').offset().left);
            coordHolder.push(one);
            // console.log(one);
            // $('img').unbind('mousemove');

        });
    // }

        function rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        }

    const circle1 = new mojs.Shape({
      fill:           'none',
      radius:         25,
      strokeWidth:    { 50 : 0 },
      scale:          { 0: 1 },
      angle:          { 'rand(-35, -70)': 0 },
      duration:       500,
      left: 0,        top: 0,
      easing: 'cubic.out',
      stroke:         'cyan'
  });

    const circle2 = new mojs.Shape({
      fill:           'none',
      radius:         25,
      strokeWidth:    { 50 : 0 },
      scale:          { 0: 1 },
      angle:          { 'rand(-35, -70)': 0 },
      duration:       500,
      left: 0,        top: 0,
      easing: 'cubic.out',
      radius:         { 0 : 15 },
      strokeWidth:    { 30: 0 },
      stroke:         'magenta',
      delay:          'rand(75, 150)'
  });;


    document.addEventListener( 'click', function (e) {

       circle1
        .tune({ x: e.pageX, y: e.pageY  })
        .replay();

      circle2
        .tune({ x: e.pageX, y: e.pageY  })
        .replay();

    });



});




    // console.log(inner);
    // console.log(outer);
    // inner.scrollLeft = 500;
    // window.scrollTo(
    //      (inner.offsetWidth -outer.offsetWidth )/2,
    //      (inner.offsetHeight-outer.offsetHeight)/2
    //  );
    // console.log((document.body.offsetWidth-document.documentElement.offsetWidth)/2);
    //  window.scrollBy(520, 300);
    //   window.scroll(520, 300);
    //  $("#img").removeClass("offset");
    //  console.log('hey');
    // var objDiv = document.getElementById("divExample");
    // inner.scrollTop = inner.scrollHeight;
    // $('#img').scrollTop($('#img')[0].scrollHeight);
    // var objDiv = document.getElementByTagName("body");
    // objDiv.scrollTop = objDiv.scrollHeight;
    // $("#img").scrollTop(function() { return this.scrollHeight; });
    // function scrollToBottom () {



    // let outer=document.getElementsByTagName("BODY")[0];
    // let inner=document.getElementById('img');
    // outer.scrollTop = outer.scrollHeight;


    // function scrollToTop (id) {
    //    document.body.scrollTop = 0;
    // }
    //
    // //Require jQuery
    // function scrollSmoothToBottom (id) {
    //    var div = document.getElementById(id);
    //    $('body').animate({
    //       scrollTop: document.body.scrollHeight
    //    }, 500);
    // }
    //
    // //Require jQuery
    // function scrollSmoothToTop (id) {
    //    $('body').animate({
    //       scrollTop: 0
    //    }, 500);
    // }

    // mX2 = 900;
    // mY2 = 45000;
