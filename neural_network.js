// rrjet neural

function network(type) {
	this.type = type

	// pikat fillestare jane te rastesishme
	this.a = Math.random() * 4 - 2
	this.b = Math.random() * 4 - 2
	this.c = Math.random() * 4 - 2

	// funksionet baze
	this.guess = function(x) {
		if (this.type == "linear") {
			// ax + b
			return (this.a * x) + this.b
		}
		else if (this.type == "parabola") {
			// ax^2 + bx + c
			return this.a * x ** 2 + this.b * x + this.c
		}
		else if (this.type == "hyperbole") {
			// a/x + b
			return this.a/x + this.b
		}
	}

	// trajnim
	this.train = function(inputs, rate) {
		if (this.type == "linear") {
			for (var i = 0; i < 50000; i++) {

				// indeks i rastesishem
				var idx = Math.floor(Math.random() * inputs.length)

				var guessedY = this.guess(inputs[idx][0]) // y i parashikuar
				var expectedY = inputs[idx][1] // y i pritur

				var diff = guessedY - expectedY
				var cost = diff ** 2 // gabimi ne llogaritje

				// derivatet
				var cost_diff = 2 * diff
				var diff_guessedY = 1
				var guessedY_a = inputs[idx][0]
				var guessedY_b = 1

				var cost_a = cost_diff * diff_guessedY * guessedY_a
				var cost_b = cost_diff * diff_guessedY * guessedY_b
				
				// rregullo a dhe b ne baze te derivateve
				this.a -= rate * cost_a
				this.b -= rate * cost_b
			}
		}

		else if (this.type == "parabola") {
			for (var i = 0; i < 50000; i++) {
				var idx = Math.floor(Math.random() * inputs.length)

				var guessedY = this.guess(inputs[idx][0])
				var expectedY = inputs[idx][1]

				var diff = guessedY - expectedY
				var cost = diff ** 2

				var cost_diff = 2 * diff
				var diff_guessedY = 1
				var guessedY_a = inputs[idx][0]**2
				var guessedY_b = inputs[idx][0]
				var guessedY_c = 1

				var cost_a = cost_diff * diff_guessedY * guessedY_a
				var cost_b = cost_diff * diff_guessedY * guessedY_b
				var cost_c = cost_diff * diff_guessedY * guessedY_c

				this.a -= rate * cost_a
				this.b -= rate * cost_b
				this.c -= rate * cost_c

				/*console.log("a: " + this.a)
				console.log("b: " + this.b)
				console.log("c: " + this.c)

				if (isNaN(this.a)) break*/
			}
		}
		else if (this.type == "hyperbole") {
			for (var i = 0; i < 50000; i++) {
				var idx = Math.floor(Math.random() * inputs.length)

				var guessedY = this.guess(inputs[idx][0])
				var expectedY = inputs[idx][1]

				var diff = guessedY - expectedY
				var cost = diff ** 2

				var cost_diff = 2 * diff
				var diff_guessedY = 1

				var guessedY_a = 1/inputs[idx][0]
				var guessedY_b = 1

				var cost_a = cost_diff * diff_guessedY * guessedY_a
				var cost_b = cost_diff * diff_guessedY * guessedY_b
				//var cost_c = cost_diff * diff_guessedY * guessedY_c

				this.a -= rate * cost_a
				this.b -= rate * cost_b
				//this.c -= rate * cost_c
			}
		}
	}

	this.averageError = function(inputs) {
		var sum = 0

		for (var i = 0; i < inputs.length; i++) {
			var guessedY = this.guess(inputs[i][0])
			var expectedY = inputs[i][1]

			var diff = guessedY - expectedY
			var cost = diff ** 2

			sum += cost
		}
		return sum/inputs.length
	}
}