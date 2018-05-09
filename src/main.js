waiting();

window.onload = function() {
	var camera, 
		scene,
		renderer, 
		cameraLookAt, 
		cameraUp, 
		cameraRight, 
		camMove, 
		camStrafe, 
		oldmousepos,
		numfound,
		speed,
		rand,
		stats;


	(function() {
		//place stats
		(function() {
			stats = new Stats();
			stats.showPanel( 0 );
			document.body.appendChild( stats.dom );
		})();
		
		//make alert
		(function() {
			alert(msg());
		})();

		//initialize three.js scene
		var container = document.createElement( 'div' );
    		document.body.appendChild( container );
    		var width = window.innerWidth-30;
    		var height = window.innerHeight-40;
    		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
    		camera.position.set( -600, 550, 1300 );
    		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
    		renderer.setSize( width, height );
		renderer.setClearColor(0x000000);
		container.appendChild( renderer.domElement );
    		scene = new THREE.Scene();
		numfound = 0, speed = 6;
		rand = function() { return Math.random() * 8000 - 1000; };

		//initialize camera vectors
		cameraLookAt = new THREE.Vector3(0, 0,-1);
		cameraRight = new THREE.Vector3(1, 0, 0);
		cameraUp = new THREE.Vector3().crossVectors(cameraRight, cameraLookAt);
		camMove = new THREE.Vector3(0, 0, 0);
		camStrafe = new THREE.Vector3(0, 0, 0);
		oldmousepos = new THREE.Vector2();

	})();


	//draw planets
	var NUMPLANETS = 500 , planets = [];
	(function() {
		for(var i = 0; i < NUMPLANETS; i++) {
			var geometry = new THREE.SphereGeometry( 10*Math.random(), 200, 5 );
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff / Math.random() } );
			planets[i] = new THREE.Mesh( geometry, material );
			planets[i].position.x = (i % 2 == 0) ? rand() : -rand();
			planets[i].position.y = (i % 3 == 0) ? rand() : -rand();
			planets[i].position.z = (i % 4 == 0) ? rand() : -rand();
			scene.add(planets[i]);
		}
	})();
	

	//place stars
	(function () {
		var starQty = 2000;
		var geometry = new THREE.SphereGeometry(100000, 100, 50);

	    	var materialOptions = {
	    		size: 1.0, 
	    		opacity: 0.7
	    	};

	    	var cloudMaterial = new THREE.PointCloudMaterial(materialOptions);
		for (var i = 0; i < starQty; i++) {
			var starVertex = new THREE.Vector3();
			starVertex.x = (i % 2 == 0) ? rand() : -rand();
			starVertex.y = (i % 5 == 0) ? rand() : -rand();
			starVertex.z = (i % 3 == 0) ? rand() : -rand();
			geometry.vertices.push(starVertex);
		}
		stars = new THREE.PointCloud(geometry, cloudMaterial);
		scene.add(stars);
	})();


	//render and place teapot in random location
	var teapot;
	(function() {	
		var teapotGeometry = new THREE.TeapotBufferGeometry( 30, 15, true, true, true, true, true, true); 
		var teapotMaterial = new THREE.MeshLambertMaterial({color: 0xffffff / Math.random()});
    		teapot = new THREE.Mesh(teapotGeometry, teapotMaterial);
		teapot.position.x = rand();
		teapot.position.y = rand();
		teapot.position.z = rand();
    		scene.add( teapot );

		var tlight1 = new THREE.PointLight({color: 0xffffff}, .5);
		tlight1.position.set(teapot.position.x, teapot.position.y+52, teapot.position.z);
		scene.add(tlight1);

		var tlight2 = new THREE.PointLight({color: 0xffffff}, .5);
		tlight2.position.set(teapot.position.x-52, teapot.position.y, teapot.position.z);
		scene.add(tlight2);


		var tlight3 = new THREE.PointLight({color: 0xffffff}, .5);
		tlight3.position.set(teapot.position.x+52, teapot.position.y, teapot.position.z);
		scene.add(tlight3);

		var tlight4 = new THREE.PointLight({color: 0xffffff}, .5);
		tlight4.position.set(teapot.position.x, teapot.position.y, teapot.position.z+52);
		scene.add(tlight4);

		var tlight5 = new THREE.PointLight({color: 0xffffff}, .5);
		tlight5.position.set(teapot.position.x, teapot.position.y-52, teapot.position.z);
		scene.add(tlight5);
	})();


	//load textured objects
	var moon, io, earth, planetx, planety;
	(function() {
		var moonGeometry = new THREE.SphereGeometry(20, 32, 32)
		var moonTexture = new THREE.TextureLoader().load('/textures/moon.jpg');
		var moonMaterial = new THREE.MeshLambertMaterial({map: moonTexture});
		moon = new THREE.Mesh(moonGeometry, moonMaterial);
		moon.position.x = rand();
		moon.position.y = rand();
		moon.position.z = rand();
		scene.add(moon);

		var earthGeometry = new THREE.SphereGeometry(50, 32, 32)
		var earthTexture = new THREE.TextureLoader().load('/textures/earth.jpg');
		var earthMaterial = new THREE.MeshLambertMaterial({map: earthTexture});
		earth = new THREE.Mesh(earthGeometry, earthMaterial);
		earth.position.x = rand();
		earth.position.y = rand();
		earth.position.z = rand();
		scene.add(earth);

		var ioGeometry = new THREE.SphereGeometry(13, 32, 32)
		var ioTexture = new THREE.TextureLoader().load('/textures/io.jpg');
		var ioMaterial = new THREE.MeshLambertMaterial({map: ioTexture});
		io = new THREE.Mesh(ioGeometry, ioMaterial);
		io.position.x = rand();
		io.position.y = rand();
		io.position.z = rand();
		scene.add(io);

		var planetyGeometry = new THREE.SphereGeometry(37, 32, 32)
		var planetyTexture = new THREE.TextureLoader().load('/textures/planety.png');
		var planetyMaterial = new THREE.MeshLambertMaterial({map: planetyTexture});
		planety = new THREE.Mesh(planetyGeometry, planetyMaterial);
		planety.position.x = rand();
		planety.position.y = rand();
		planety.position.z = rand();
		scene.add(planety);

		var planetxGeometry = new THREE.SphereGeometry(60, 32, 32)
		var planetxTexture = new THREE.TextureLoader().load('/textures/planetx.png');
		var planetxMaterial = new THREE.MeshLambertMaterial({map: planetxTexture});
		planetx = new THREE.Mesh(planetxGeometry, planetxMaterial);
		planetx.position.x = rand();
		planetx.position.y = rand();
		planetx.position.z = rand();
		scene.add(planetx);
	})();

	//handle key press
	document.addEventListener('keydown', function(event) {
		switch(event.keyCode) {
			case 81:
				speed += 2;
				break;
			case 69:
				speed = (speed-2 == 0) ? speed : speed - 2;
				break;
			case 82:
				speed = 6;
				break;
			case 87:
			case 38:
				camMove.x = cameraLookAt.x*speed;
				camMove.y = cameraLookAt.y*speed;
				camMove.z = cameraLookAt.z*speed;
				break;
			case 65:
			case 37:
				camStrafe.x = -cameraRight.x*speed;
				camStrafe.y = -cameraRight.y*speed;
				camStrafe.z = -cameraRight.z*speed;
				break;
			case 83:
			case 40:
				camMove.x = -cameraLookAt.x*speed;
				camMove.y = -cameraLookAt.y*speed;
				camMove.z = -cameraLookAt.z*speed;
				break;
			case 68:
			case 39:
				camStrafe.x = cameraRight.x*speed;
				camStrafe.y = cameraRight.y*speed;
				camStrafe.z = cameraRight.z*speed;
		}

	}, false);

	//handle key release
	document.addEventListener('keyup', function(event) {
		switch(event.keyCode) {
			case 87:
			case 38:
				camMove.x = 0;
				camMove.y = 0;
				camMove.z = 0;
				break;
			case 65:
			case 37:
				camStrafe.x = 0;
				camStrafe.y = 0;
				camStrafe.z = 0;
				break;
			case 83:
			case 40:
				camMove.x = 0;
				camMove.y = 0;
				camMove.z = 0;
				break;
			case 68:
			case 39:
				camStrafe.x = 0;
				camStrafe.y = 0;
				camStrafe.z = 0;
		}
	}, false);
	
	//handle mouse movements
	var firstmove = true;
	document.addEventListener('mousemove', function() {
		if(firstmove) {
			oldmousepos.x = event.clientX;
			oldmousepos.y = event.clientY;
			firstmove = false;
			return;
		}

		var deltayaw =  (oldmousepos.x - event.clientX) / 500.0;
		var deltapitch =  (oldmousepos.y - event.clientY) / 500.0;

		cameraLookAt.applyAxisAngle(new THREE.Vector3(0,1,0), deltayaw);
		cameraRight.applyAxisAngle(new THREE.Vector3(0,1,0), deltayaw);
		cameraLookAt.applyAxisAngle(cameraRight, deltapitch);

		oldmousepos.x = event.clientX;
		oldmousepos.y = event.clientY;
		

	}, false);

	//decides if user has found teapot
	function hasTeapot() {
		var xdiff = Math.abs(camera.position.x - teapot.position.x);
		var ydiff = Math.abs(camera.position.y - teapot.position.y);
		var zdiff = Math.abs(camera.position.z - teapot.position.z);
		if((xdiff > 300) || (ydiff > 300) || (zdiff > 300)) {
			return false;
		}
		numfound++;
		return true;
	}
	
	camera.lookAt(planets[499]);
	var render, newlookat; 
	(render = function() {
		stats.begin();

		//check game logic
		if(hasTeapot()) {
			document.getElementById("msg").innerHTML = "teapots found: " + numfound;
			teapot.position.x = rand();
			teapot.position.y = rand();
			teapot.position.y = rand();
		}

		//update camera information
		camera.position.add(camMove);
		camera.position.add(camStrafe);
		newlookat = new THREE.Vector3().addVectors(camera.position, cameraLookAt);
		camera.up = cameraUp;
		camera.lookAt(newlookat);

		//apply rotations
		teapot.rotation.x += 0.03;
		teapot.rotation.y += 0.03;
		teapot.rotation.z += 0.03;
		earth.rotation.y += 0.005;
		moon.rotation.y += 0.01;
		io.rotation.y -= 0.01;
		planetx.rotation.y -= 0.005;
		planety.rotation.y -= 0.008;

		//render scene
    		renderer.render( scene, camera );
		stats.end();
		requestAnimationFrame(render);
	})();
}

function waiting() {
	if(!(document.readyState === "complete")) {
		var msg = "<br><br><br>losing Russell's teapot..";
		document.getElementById("msg").innerHTML = msg;
	}
}

function msg() {
	document.getElementById("msg").innerHTML = "teapots found: 0";
	var msg = "Russell misplaced his teapot in deep space.\n";
	msg += "Objective: Locate all teapots.\n";
	msg += "Controls: WASD , Arrow Keys, Mouse\n";
	msg += "Speed: increase - Q, decrease - E, reset - R\n";
	return msg;
}
