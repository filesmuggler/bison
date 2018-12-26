init();
render();

/**
 * Variables to hold information about the viewer
 */
var camera, scene, renderer;

/**
 * Variables to hold objects for the arm
 */
var base, link1, joint1, link2, joint2, link3, end_effector;

//for testing
var group;
var startTime = Date.now();

/**
 * init() is for set up of environment
 */
function init() {
    var canvas = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;


    var light = new THREE.DirectionalLight(0xffffff, 0.55);
    light.position.set(0, 0, 1);
    scene.add(light);

    placeObjects();
}

/**
 * placeObjects() is for building the arm structure
 */
function placeObjects() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    var material = new THREE.MeshStandardMaterial({
        side: THREE.FrontSide,
        color: 0xffffff,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.3,
        name: "metal"
    });

    var cubeA = new THREE.Mesh(geometry, material);
    cubeA.position.set(1, 1, 0);

    var cubeB = new THREE.Mesh(geometry, material);
    cubeB.position.set(-1, -1, 0);

    //create a group and add the two cubes
    //These cubes can now be rotated / scaled etc as a group
    group = new THREE.Group();
    group.add(cubeA);
    group.add(cubeB);
    scene.add(group);
}

/**
 * animate() animates and display the scene
 *
function animate() {
    render();
    requestAnimationFrame(animate);
}*/

/**
 * render() renders the 3D scene
 */
function render() {
    group.rotation.x += 0.1;
    group.rotation.y += 0.1;
    group.rotation.z += 0.1;
    requestAnimationFrame(render);
    // actually display the scene in the Dom element
    renderer.render(scene, camera);
}

/**
 * moveArm() sets parameters for the joints in direct kinematics
 */
function moveArm() {

}