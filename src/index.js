const d3 = require('d3')
const forceG = require('d3-force-gravity')

const canvas = document.querySelector('canvas')
const {width, height} = canvas

const nodes = d3.range(40).map(i => ({
	index: i,
	x: width / 2,
	y: 0,
	r: 5
}))

const context = canvas.getContext('2d')
const tau = 2 * Math.PI

const render = () => {
	context.clearRect(0, 0, width, height)
	context.save()

	context.beginPath()
	nodes.forEach(function(d) {
		context.moveTo(d.x + d.r, d.y)
		context.arc(d.x, d.y, d.r, 0, tau)
	})
	context.fillStyle = '#ddd'
	context.fill()
	context.strokeStyle = '#333'
	context.stroke()

	context.restore()
}

d3.forceSimulation()
	.nodes(nodes)
	.force('g', forceG(width / 2, height / 2)
		.minRadius(50)
		.strength(10000))
	.force('collide', d3.forceCollide().radius(() => 7).iterations(2))
	.alphaTarget(0.4)
	.on('tick', render)
