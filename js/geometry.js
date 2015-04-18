var particleCount = 500;
var particles = new THREE.Geometry();
var pMaterial = new THREE.PointCloudMaterial({
	color: 0xFFFFFF,
	size: 5,
	map: THREE.ImageUtils.loadTexture(
		"./img/particle_alpha.png"
	),
	blending: THREE.AdditiveBlending,
	transparent: true
});

var zPosRange = 400;
var yVelRange = 0.1;
var yVelBias = 0.02;
var zVelRange = 0.04;
var zVelBias = 0.02;

for (var p = 0; p < particleCount; p++) {

	var z = Math.random() * zPosRange - zPosRange / 2;
	var xRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE)) * 2; // maximum range on the x-axis at this z-value
	var yRange = Math.abs(camera.position.z - z) * Math.tan(toRads(VIEW_ANGLE / ASPECT)) * 2; // maximum range on the y-axis at this z-value
	var pX = Math.random() * xRange - xRange / 2,
		pY = Math.random() * yRange - yRange / 2,
		pZ = Math.random() * zPosRange - zPosRange / 2,
		particle = new THREE.Vector3(pX, pY, pZ);
	  
	  // create a velocity vector
	particle.velocity = new THREE.Vector3(
		0.1,
		Math.random() * yVelRange - yVelRange / 2 - yVelBias,
		Math.random() * zVelRange - zVelRange / 2 - zVelBias
	);

	// add it to the geometry
	particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.PointCloud(
	particles,
	pMaterial);

// also update the particle system to
// sort the particles which enables
// the behaviour we want
particleSystem.sortParticles = true;

particleSystem.geometry.dynamic = true;

// add it to the scene
scene.add(particleSystem);
