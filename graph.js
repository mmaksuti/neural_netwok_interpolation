function graph(x, y, toX, toY) {

	// koordinatat e origjines ne dritare
	this.centerX = x
	this.centerY = y

	// numri i abshisave dhe ordinatave
	this.toX = toX
	this.toY = toY

	// gjatesia e gjysmes se cdo boshti
	this.length = (window.innerWidth > window.innerHeight) ? window.innerHeight/2 * 0.65 : window.innerWidth * 0.65
	
	// ruaj pikat
	this.points = []

	this.drawn = false

	this.draw = function() {
		
		// bej gati vizatimin
		ctx.beginPath()
		// ngjyre e zeze
		ctx.fillStyle = "black"

	    // vizato gjysmen e pare te rrjetit
		ctx.fillRect(this.centerX, this.centerY, this.length, 1)
		ctx.fillRect(this.centerX, this.centerY, 1, this.length)

		// gjysma e dyte
		ctx.fillRect(this.centerX, this.centerY, -this.length, 1)
		ctx.fillRect(this.centerX, this.centerY, 1, -this.length)

		// shto ndarjet ne boshte
		// horizontalisht
		var ndarja = this.length/this.toX
		for (var i = 0; i <= this.toX*2; i++) {
			ctx.fillRect(ndarja * i + (this.centerX - this.length), this.centerY - 5, 1, 10)
		}

		// vertikalisht
		ndarja = this.length/this.toY
		for (var i = 0; i <= this.toY*2; i++) {
			ctx.fillRect(this.centerX - 5, ndarja * i + (this.centerY - this.length), 10, 1)
		}

		this.drawn = true

	}

	// kthe nje pike ne koordinatat e saj ne lidhje me dritaren 
	this.xPointToCoordinate = function(point) {
		var ndarjaX = (this.length)/this.toX
		var x = this.centerX - this.length + ndarjaX * (point + this.toX)
		return x
	}

	this.yPointToCoordinate = function(point) {
		var ndarjaY = (this.length)/this.toY
		var y = this.centerY + this.length - ndarjaY * (point + this.toY)
		return y
	}
	// gjej cfare pike i takon nje koordinate ne lidhje me dritaren
	this.xCoordinateToPoint = function(x) {
		var ndarjaX = (this.length)/this.toX
		var point = (x + this.length - this.centerX)/ndarjaX - this.toX
		return point
	}
	this.yCoordinateToPoint = function(y) {
		var ndarjaY = (this.length)/this.toY
		var point = (y - this.length - this.centerY)/-ndarjaY - this.toY
		return point
	}

	// mbush me pika te vendosura ne nje matrice 
	this.fillWith = function(coordinates, color) {
		if (!this.drawn) {
			this.draw()
		}
		// vendos pikat
		for (var i = 0; i < coordinates.length; i++) {
			var coordinate = coordinates[i]
			this.points.push(coordinate)
			var x = coordinate[0]
			var y = coordinate[1]

			ctx.beginPath()
			ctx.fillStyle = color
			ctx.arc(this.xPointToCoordinate(x), this.yPointToCoordinate(y), 3, 0, 2 * Math.PI, true)
			ctx.fill()
			//ctx.fillRect(this.xPointToCoordinate(x), this.yPointToCoordinate(y), 5, 5)
		}
	}

	// vizato grafikun e nje funksioni
	this.drawFunction = function(func, color) {
		if (!this.drawn) {
			this.draw()
		}

		// pikat fillestare -> skajet e boshteve
		var startX = -this.toX
		var startY = func(startX)

		ctx.lineWidth = "2"
		ctx.strokeStyle = color
		ctx.lineJoin = "round"

		ctx.beginPath()

		ctx.moveTo(this.centerX - this.length, this.yPointToCoordinate(func(this.xCoordinateToPoint(this.centerX - this.length))))

		console.log("STROKE start x = " + this.xCoordinateToPoint(this.centerX - this.length) + " y = " + func(this.xCoordinateToPoint(this.centerX - this.length)))
				
		//var oldY = func(this.xC)
		for (var xC = this.centerX - this.length; xC <= this.centerX + this.length; xC++) {
			
			var x = this.xCoordinateToPoint(xC)
			var y = func(x)
			var yC = this.yPointToCoordinate(y)
			
			/*if (y == Infinity || y == -Infinity) {
				var oldxC = xC
				var oldyC = yC
				var oldx = x
				var oldy = y

				while (oldy == Infinity || oldy == -Infinity) {
					oldxC--
					oldx = this.xCoordinateToPoint(oldxC)
					oldy = func(oldx)
					oldyC = this.yPointToCoordinate(oldy)
					console.log("Decreasing; xC = " + xC + " and yC = " + yC)
				}

				while (y == Infinity || y == -Infinity) {
					xC++
					x = this.xCoordinateToPoint(xC)
					y = func(x)
					yC = this.yPointToCoordinate(y)
					console.log("Continuing at xC = " + xC + " and yC = " + yC)
					ctx.lineTo(oldxC, oldyC)
					ctx.stroke()
				}
			}*/


			if (x == 0 || x < 0 && this.xCoordinateToPoint(xC + 1) > 0) {
				//console.log("HERE. y = " +  Math.round(y/10)*10 +" Next y = "+ Math.round(func(this.xCoordinateToPoint(xC + 1))/10)*10)
				console.log("STROKE 1 x = " + this.xCoordinateToPoint(xC) + " y = " + this.yCoordinateToPoint(yC))
				ctx.lineTo(xC, yC)
				ctx.stroke()
				ctx.beginPath()
				ctx.moveTo(xC+1, this.yPointToCoordinate(func(this.xCoordinateToPoint(xC+1))))
				continue
			}
			//else {
			//console.log("rounded x = " + Math.round(x/10)*10 + " rounded y = " + Math.round(y/10)*10)
			console.log("x = " + x + " y = " + y)
			//}
			/*if ((func(this.xCoordinateToPoint(xC + 1)) > 0 && y < 0) || (func(this.xCoordinateToPoint(xC + 1)) < 0 && y > 0)) {
				console.log("HERE. X = " + x + " Y = "+ y)
				console.log("NEXT. X = " + this.xCoordinateToPoint(xC + 1) + " Y = " + func(this.xCoordinateToPoint(xC + 1)))
				ctx.lineTo(xC, yC)
				ctx.stroke()
				ctx.beginPath()
				ctx.moveTo(xC+1, this.yPointToCoordinate(func(this.xCoordinateToPoint(xC+1))))
				continue
			}*/
			/*if (Math.floor(y) == -this.toY || Math.floor(y) == this.toY) {
				console.log("HERE. X = " + x + " Y = "+ y)
				ctx.lineTo(xC, yC)
				ctx.stroke()
				ctx.beginPath()
				ctx.moveTo(xC+1, this.yPointToCoordinate(func(this.xCoordinateToPoint(xC+1))))
				continue
			}*/
			//console.log("HERE. X = " + x + " Y = "+ y)
			//console.log("x = " + x + " y = " + y)
			ctx.lineTo(xC, yC)
			//ctx.stroke
			
		}
		console.log("STROKE x = " + this.xCoordinateToPoint(xC) + " y = " + this.yCoordinateToPoint(yC))
		ctx.stroke()
		
	}
}
