
const forceGravity = (x = 0, y = 0) => {
	let nodes,
		acceleration,
		strength = 10000,
		minRadius = 40

	const distanceTo = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

	const computeAcceleration = (nx, ny, distance) => {
		const distanceCube = Math.pow(distance, 3)
		return {
			x: ((x - nx) * strength) / distanceCube,
			y: ((y - ny) * strength) / distanceCube
		}
	}
	const initialize = (_) => {
		nodes = _
		acceleration = nodes.map(node => {
			const distance = distanceTo(x, y, node.x, node.y)
			return computeAcceleration(node.x, node.y, distance)
		})
	}

	const force = () => {
		nodes.forEach((node, i) => {
			const distance = distanceTo(x, y, node.x, node.y)
			if (distance < minRadius) {
				return
			}
			node.vx += acceleration[i].x
			node.vy += acceleration[i].y
			node.x += node.vx
			node.y += node.vy
			const newAcceleration = computeAcceleration(node.x, node.y, distance)
			acceleration[i].x = newAcceleration.x
			acceleration[i].y = newAcceleration.y
		})
		return force
	}

	force.strength = _strength => {
		strength = _strength
		return force
	}

	force.minRadius = _minRadius => {
		minRadius = _minRadius
		return force
	}

	force.initialize = initialize
	return force
}

module.exports = forceGravity
