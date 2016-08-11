const d3 = require('d3')
const forceG = require('./gravity')

const nodes = d3.range(20).map(i => ({
	index: i,
	x: width / 2,
	y: 0,
	r: 5
}))

const canvas = document.querySelector('canvas')
const {width, height} = canvas
const context = canvas.getContext('2d')
const tau = 2 * Math.PI

const render = () => {
	context.clearRect(0, 0, width, height)
	context.save()
	// context.translate(width / 2, height / 2)

	context.beginPath()
	nodes.forEach(function(d) {
		// if (d.y >= height - 5) {
		// 	d.y = height - 5
		// }
		// if (d.x <= 5) {
		// 	d.x = 5
		// }
		// if (d.x >= width) {
		// 	d.x = width
		// }
		context.moveTo(d.x + d.r, d.y)
		context.arc(d.x, d.y, d.r, 0, tau)
	})
	context.fillStyle = '#ddd'
	context.fill()
	context.strokeStyle = '#333'
	context.stroke()

	context.restore()
}

const simulation = d3.forceSimulation()
	.nodes(nodes)
	// .force('gravity', d3.forceCenter(width / 2, height - 20))
	// .force('x1', d3.forceX(width / 2).strength(0.02))
	// .force('y', d3.forceY(height + 100).strength(0.02))
	// .force('y', d3.forceY(0).strength(0.02))
	.force('g', forceG(width / 2, height / 2))
	.force('collide', d3.forceCollide().radius(() => 7).iterations(2))
	// .alpha(0)
	.on('tick', render)

const dragsubject = () => simulation.find(d3.event.x, d3.event.y, 5)

d3.select(canvas)
	.call(d3.drag()
		.container(canvas)
		.subject(dragsubject)
		.on('start', dragstarted)
		.on('drag', dragged)
		.on('end', dragended))

function dragstarted() {
	// if (!d3.event.active) simulation.alphaTarget(0.3).restart()
	d3.event.subject.fx = d3.event.subject.x
	d3.event.subject.fy = d3.event.subject.y
}

function dragged() {
	d3.event.subject.fx = d3.event.x
	d3.event.subject.fy = d3.event.y
}

function dragended() {
	// if (!d3.event.active) simulation.alphaTarget(0)
	d3.event.subject.fx = null
	d3.event.subject.fy = null
}
