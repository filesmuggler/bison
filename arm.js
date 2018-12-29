init();
render();

/**
 * Variables to hold information about the viewer
 */
var camera, scene, renderer, parent, pivot, controls;

/**
 * Variables to hold objects for the arm
 */
var base, link1, joint1, link2, joint2, link3, joint3, end_effector;

//for testing
var group;
var startTime = Date.now();

/**
 * init() is for set up of environment
 */
function init() {
    
    var canvas = document.getElementById('robot-presentation');
    /*
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    */
    renderer = new THREE.WebGLRenderer();
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setSize( canvas.width, canvas.height );
    document.getElementById('robot-presentation').appendChild( renderer.domElement );

    /*
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    */

    // scene
	scene = new THREE.Scene();
	
	// camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 100 );
	camera.position.set( 15, 15, 15 );

	// controls
	controls = new THREE.OrbitControls( camera );
	
	// axes
	scene.add( new THREE.AxisHelper( 2 ) );

    var light = new THREE.DirectionalLight(0xffffff, 0.55);
    light.position.set(0, 0, 1);
    scene.add(light);

    placeObjects();
}

/**
 * placeObjects() is for building the arm structure
 */
function placeObjects() {

    var box = new THREE.BoxGeometry(1, 1, 1);
    var cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 64);
    var base_material = new THREE.MeshBasicMaterial({ color: 0x767674 });
    var link_material = new THREE.MeshBasicMaterial({ color: 0x434341 });
    var joint_material = new THREE.MeshBasicMaterial({ color: 0x1CB0CC });
    var end_effector_material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    base = new THREE.Mesh(box,base_material);
    base.position.set(0,0,0);
    base.scale.set(3,0.1,3);
    scene.add(base);

    link1 = new THREE.Mesh(cylinder, link_material);
    link1.position.set(0,1.5,0);
    link1.scale.set(0.5,3,0.5);
    scene.add(link1);

    joint1 = new THREE.Mesh(cylinder, joint_material);
    joint1.position.set(0,3,0);
    joint1.scale.set(1,1,1);
    scene.add(joint1);

    link2 = new THREE.Mesh(cylinder, link_material);
    link2.position.set(1.5,3,0);
    link2.rotation.set(0,0,90*Math.PI/180);
    link2.scale.set(0.5,3,0.5);
    scene.add(link2);
    
    /*
    var cubeA = new THREE.Mesh(geometry, material1);
    cubeA.position.set(1, 1, 0);

    var cubeB = new THREE.Mesh(geometry, material2);
    cubeB.position.set(-1, -1, 0);
    */
    //create a group and add the two cubes
    //These cubes can now be rotated / scaled etc as a group
    /*group = new THREE.Group();
    group.add(cubeA);
    group.add(cubeB);
    scene.add(group);*/
    
}

/**
 * animate() animates and display the scene
 *
function animate() {
    render();
    requestAnimationFrame(animate);
}*/
/*
window.addEventListener('resize', function(){
    camera.aspect = canvas.clientWidth/canvas.clientHeight;
    camera.updateProjectionMatrix();
});*/

/**
 * render() renders the 3D scene
 */
function render() {
    //group.rotation.x += 0.1;
    //group.rotation.y += 0.1;
    //group.rotation.z += 0.1;
    //base.rotation.x += 0.001;

    requestAnimationFrame(render);
    // actually display the scene in the Dom element
    renderer.render(scene, camera);
}

/**
 * moveArm() sets parameters for the joints in direct kinematics
 */
function moveArm() {
    theta1 = document.getElementById("theta1").value;
    var n_vector = THREE.Vector3();
    console.log(joint1.position);
    console.log(link1.position);
    var rot_vector = new THREE.Vector3();
    rot_vector.x = joint1.position.x - link1.position.x;
    rot_vector.y = joint1.position.y - link1.position.y;
    rot_vector.z = joint1.position.z - link1.position.z;
    console.log(rot_vector);
    link2.rotateAroundWorldAxis(link1.position,theta1*Math.PI/180);
    theta2 = document.getElementById("theta2").value;
    d3 = document.getElementById("d3").value;
}