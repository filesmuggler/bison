
/* TO DO: Po co ta funkcja? */
/*
function onResize(element, callback) {
    var height = element.clientHeight;
    var width = element.clientWidth;

    return setInterval(function () {
        if (element.clientHeight != height || element.clientWidth != width) {
            height = element.clientHeight;
            width = element.clientWidth;
            callback();
        }
    }, 500);
}*/

/* TO DO: po co ta funkcja? */
/*
onResize(canvas, function () {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
});*/



/* The first part working */
var canvas = document.getElementById('canvas');
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(0, 0, 100);

// mouse control
var controls = new THREE.OrbitControls(camera);

// light
var directionalLight = new THREE.DirectionalLight("#aaaaff", 0.5);
directionalLight.position.set(0, 10, 10);
scene.add(directionalLight);
//camera.position.y = 2;
/*
//BoxGeometry is for dimension
var geometry = new THREE.BoxGeometry(1, 2, 1);
var material = new THREE.MeshPhongMaterial({ color: 0x1C4A8C });
var cube1 = new THREE.Mesh(geometry, material);
scene.add(cube1);
var light = new THREE.DirectionalLight(0xffffff, 0.55);
light.position.set(0, 0, 1);
scene.add(light);*/
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({    
    color: 0xffffff,
    roughness: 0.53,
    metalness: 0.79,
    emissive: 0x757575,
    emissiveIntensity: 0.3,
    name: "metal"
});
var cubeA = new THREE.Mesh(geometry, material);
cubeA.position.set(0, 0, 0);

var cubeB = new THREE.Mesh(geometry, material);
cubeB.position.set(-1, -1, 0);

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
var group = new THREE.Group();
group.add(cubeA);
group.add(cubeB);

scene.add(group);

var rot = 0.0;

var theta1 = 0;
var theta2 = 0;
var d3 = 0;
function moveArm() {
    theta1 = document.getElementById("theta1").value;
    theta2 = document.getElementById("theta2").value;
    d3 = document.getElementById("d3").value;
}

var render = function () {
    requestAnimationFrame(render);
    if (theta1 > 0) {
        for (theta1; theta1 >= 0; theta1--) {
            //rotate right
            //cube1.rotation.y += 0.01;
            group.rotation.y += 0.01;
        }
    }
    else if (theta1 < 0) {
        for (theta1; theta1 <= 0; theta1++) {
            //rotate left
            //cube1.rotation.y += -0.01;
            group.rotation.y += -0.01;
        }
    }
    if (theta2 > 0) {
        for (theta2; theta2 >= 0; theta2--) {
            //rotate right
            //cube1.rotation.x += 0.01;
            group.rotation.x += 0.01;
        }
    }
    else if (theta2 < 0) {
        for (theta2; theta2 <= 0; theta2++) {
            //rotate left
            //cube1.rotation.x += -0.01;
            group.rotation.x += -0.01;
        }
    }


    renderer.render(scene, camera);
};

render();