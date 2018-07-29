var Canvas = {
	clickX: new Array(),
	clickY: new Array(),
	newDrawing: new Array(),
	paint: false,
	isNotEmpty: false,

	init: function(canvasId) {
		Canvas.canvas = document.getElementById(canvasId);
		Canvas.context = canvas.getContext("2d"),
		Canvas.canvas.addEventListener("mousedown",Canvas.mouseDown);
	    Canvas.canvas.addEventListener("mousemove", Canvas.mouseMove);
	    Canvas.canvas.addEventListener("mouseup",Canvas.mouseUp);


	     //For mobile
	    Canvas.canvas.addEventListener("touchstart", Canvas.mouseDown, false);
	    Canvas.canvas.addEventListener("touchmove", Canvas.touchMove, true);
	    Canvas.canvas.addEventListener("touchend", Canvas.mouseUp, false);
	    document.body.addEventListener("touchcancel", Canvas.mouseUp, false);

	    var clearButton = document.getElementById("clear");
	    clearButton.addEventListener('click', Canvas.clear);
	},

	addClick: function(mouseX,mouseY,newClick) {
        Canvas.clickX.push(mouseX);
        Canvas.clickY.push(mouseY);
        Canvas.newDrawing.push(newClick);
	},

	mouseDown: function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        Canvas.paint = true;
        
        Canvas.addClick(mouseX, mouseY, false); //sends coordinates
        Canvas.draw();
	},

    draw: function () {
        Canvas.context.strokeStyle = "#000000";  //set the "ink" color
        Canvas.context.lineJoin = "miter";       //line join
        Canvas.context.lineWidth = 2;

        for (var i=0; i < Canvas.clickX.length;i++) {
            Canvas.context.beginPath();
            
            if (Canvas.newDrawing[i]) {
                Canvas.context.moveTo(Canvas.clickX[i-1], Canvas.clickY[i-1]);    
            } else {
                Canvas.context.moveTo(Canvas.clickX[i]-1, Canvas.clickY[i]);
            }
            
            Canvas.context.lineTo(Canvas.clickX[i],Canvas.clickY[i]);
            Canvas.context.stroke();                                  //filled with "ink"
            Canvas.context.closePath();                               //close path
        }

        Canvas.isnotEmpty = true;
    },

    mouseMove: function (e) {
    	e.preventDefault();
        if (Canvas.paint) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            Canvas.addClick(mouseX, mouseY, true);
            Canvas.draw();
        }
	},

    touchMove: function (e) {
        e.preventDefault();
        if (Canvas.paint) {
            var touch = e.touches[0]; // Get the information for finger #1
            var mouseX = touch.pageX - this.offsetLeft;
            var mouseY = touch.pageY - this.offsetTop;

            Canvas.addClick(mouseX, mouseY, true);
            Canvas.draw();
        }
    },

    mouseUp: function (e) {
        Canvas.paint = false;
    },

    clear: function (e) {
        Canvas.context.clearRect(0,0,Canvas.canvas.width,Canvas.canvas.height);
        Canvas.clickX = [];
        Canvas.clickY = [];
        Canvas.newDrawing = [];
        Canvas.isnotEmpty = false;
	},

};

var canvasSignature = Object.create(Canvas);
canvasSignature.init('canvas');



var Booking = {
	init: function() {
		var validateBooking = document.getElementById("validate-booking");
		validateBooking.addEventListener('click', Booking.bookBike);
	},
	bookBike: function (e) {
    	var bookingConfirmed = document.getElementById("bookingConfirmed");
    	
    	if(typeof sessionStorage!='undefined') {
			sessionStorage.timeValidateBooking = Date.now();

			if('timeValidateBooking' in sessionStorage) {
			    var timeLeftBooking = 1200000 - (Date.now() - sessionStorage.timeValidateBooking);
			    document.getElementById("timeLeftBooking").innerHTML = Math.round(timeLeftBooking/1000/60);
				document.getElementById("timeLeftBooking-box").innerHTML = Math.round(timeLeftBooking/1000/60);
			    document.getElementById("box-confirmation-message").classList.add("show-box-confirmation-message");
			    bookingConfirmed.classList.add("show-reservation");
			    canvas.style.display = "none";
			    validateBookingButton.classList.remove("show-validate-booking");
				clearSignature.classList.remove("show-clear");
			}

		} else {
		  alert("sessionStorage n'est pas supporté");
		}

    },
};

var booking = Object.create(Booking);
booking.init();

if(typeof sessionStorage!='undefined') {				
				if('timeValidateBooking' in sessionStorage) {
					var timeLeftBooking = 1200000 - (Date.now() - sessionStorage.timeValidateBooking);
					if(timeLeftBooking > 0) {
				    	document.getElementById("timeLeftBooking").innerHTML = Math.round(timeLeftBooking/1000/60);
				    	bookingConfirmed.classList.add("show-reservation");
				    	document.getElementById("box-confirmation-message").classList.remove("show-box-confirmation-message");

					} else {
						sessionStorage.clear();
					}
				} else {
			  alert("sessionStorage n'est pas supporté");
			}
		}