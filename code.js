
// pergatit skenen
var canvas = document.querySelector("canvas")

// permasat
canvas.width = 1000
canvas.height = 1000

var ctx = canvas.getContext("2d")
ctx.scale(2, 2)

// grafiku
var gr
// rrjeti neural
var net

// shto grafik te ri
function addgraph() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// numri i ndarjeve ne boshtin x
	var xN = parseInt(prompt("How many divisions for x axis?"))
	while (xN == NaN) {
		xN = parseInt(prompt("Enter a valid number. How many divisions for x axis?"))
	}
	// numri i ndarjeve ne boshtin y
	var yN = parseInt(prompt("How many divisions for y axis?"))
	while (yN == NaN) {
		yN = parseInt(prompt("Enter a valid number. How many divisions for y axis?"))
	}

	// krijo grafikun
	gr = new graph(250, 250, xN, yN);
	gr.draw()

	// trego koordinatat siper grafikut
	window.addEventListener('mousemove', function(event) { 
		var x = event.x
		var y = event.y - (window.innerHeight - 500)/2
		if (x <= 500 && y <= 500 && y >= 0) document.getElementById('koordinata').innerHTML = 'Coordinate: (' + Math.round(gr.xCoordinateToPoint(x)) + '; ' + Math.round(gr.yCoordinateToPoint(y)) + ')'
		else document.getElementById('koordinata').innerHTML = 'Coordinate:'
	})

	// shto koordinata me klikim
	window.addEventListener('click', function(event) { 
		var x = event.x
		var y = event.y - (window.innerHeight - 500)/2
		if (x <= 500 && y <= 500 && y >= 0) gr.fillWith([[gr.xCoordinateToPoint(x), gr.yCoordinateToPoint(y)]], "red")
		else document.getElementById('koordinata').innerHTML = 'Coordinate:'
	})
}

function guess() {
	if (!gr) {
		alert("Please draw a graph first")
		return
	}
	if (!gr.points.length) {
		alert("Please add some points first")
		return
	}

	var type = document.getElementById("graphType").options[document.getElementById("graphType").selectedIndex].value
	var rate = parseFloat(document.getElementById("lRate").value)

	if (rate == NaN) {
		alert("Rate must be a number")
		return
	}

	if (type == "auto") {
		// provo te treja dhe kontrollo kush ka me pak gabim

		var linear = new network("linear") // krijo rrjetin
		linear.train(gr.points, rate) // trajno

		var parabola = new network("parabola")
		parabola.train(gr.points, rate)

		var hyperbole = new network("hyperbole")
		hyperbole.train(gr.points, rate)

		if (linear.averageError(gr.points) < parabola.averageError(gr.points) && 
			linear.averageError(gr.points) < hyperbole.averageError(gr.points)) {
			console.log("linear wins!")
			net = linear
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + linear.a + "*x + " + linear.b
		}
		else if (parabola.averageError(gr.points) < linear.averageError(gr.points) && 
			parabola.averageError(gr.points) < hyperbole.averageError(gr.points)) {
			console.log("parabola wins!")
			net = parabola
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + parabola.a + "*x**2 + " + parabola.b + "*x + " + parabola.c 
		}
		else {
			console.log("hyperbole wins!" + hyperbole.averageError(gr.points))
			net = hyperbole
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + hyperbole.a + "/(x + " + hyperbole.b + ") + " + hyperbole.c
		}
	}
	else {
		// krijo rrjetin
		net = new network(type)
		// trajno
		net.train(gr.points, rate)

		if (type == "linear") {
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + net.a + "*x + " + net.b
		}
		else if (type == "parabola") {
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + net.a + "*x**2 + " + net.b + "*x + " + net.c 
		}
		else {
			document.getElementById("guessed").innerHTML = "Guessed function: y = " + net.a + "/(x + " + net.b + ") + " + net.c
		}
	}
	
	// vizato
	gr.drawFunction(function(x) { return net.guess(x) }, "blue")
}
