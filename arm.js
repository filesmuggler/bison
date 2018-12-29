init();
render();

/**
 * Variables to hold information about the viewer
 */
var camera, scene, renderer, controls;
var arm_group, joint1_group, joint2_group, joint3_group;

/**
 * Variables to hold objects for the arm
 */
var base, link1, joint1, link2, joint2, link3, joint3, end_effector;

/**
 * Data from user
 */
var data_from_user;

/**
 * Parameters for robotic arm movement
 */
var workingMode, parameter_1, parameter_2, parameter_3;
var theta1, theta2, d3;
var px, py, pz;


/**
 * init() is for set up of environment
 */
function init() {

    //var canvas = document.getElementById('robot-presentation');
    /*
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    */

    /*
    renderer = new THREE.WebGLRenderer();
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setSize(canvas.width, canvas.height);
    document.getElementById('robot-presentation').appendChild(renderer.domElement);*/

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    /*
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    */

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(10, 10, 10);
    //scene.add(camera);

    // controls
    controls = new THREE.OrbitControls(camera);
    controls.enableKeys = true;
    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
    }

    // axes
    scene.add(new THREE.AxisHelper(2));

    var light_up = new THREE.PointLight(0xffffff, 3.0, 100);
    light_up.position.set(0, 10, 0);
    scene.add(light_up);

    var light_down_1 = new THREE.PointLight(0xffffff, 1.0, 100);
    light_down_1.position.set(10, 0, 10);
    scene.add(light_down_1);

    var light_down_2 = new THREE.PointLight(0xffffff, 1.0, 100);
    light_down_2.position.set(-10, 0, -10);
    scene.add(light_down_2);

    

    placeObjects();
}

/**
 * placeObjects() is for building the arm structure
 */
function placeObjects() {

    var box = new THREE.BoxGeometry(1, 1, 1);
    var cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 64);
    var sphere = new THREE.SphereGeometry(1, 32, 32);

    var base_material = new THREE.MeshStandardMaterial({
        color: 0x767674,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5
    });
    var link_material = new THREE.MeshStandardMaterial({
        color: 0x434341,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5
    });
    var joint_material = new THREE.MeshStandardMaterial({
        color: 0x1CB0CC,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5
    });
    var end_effector_material = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5
    });



    base = new THREE.Mesh(box, base_material);
    base.position.set(0, 0, 0);
    base.scale.set(3, 0.1, 3);
    //scene.add(base);

    link1 = new THREE.Mesh(cylinder, link_material);
    link1.position.set(0, 1.5, 0);
    link1.scale.set(0.5, 3, 0.5);
    //scene.add(link1);

    joint1 = new THREE.Mesh(cylinder, joint_material);
    joint1.position.set(0, 3, 0);
    joint1.scale.set(1, 1, 1);
    //scene.add(joint1);

    link2 = new THREE.Mesh(cylinder, link_material);
    link2.position.set(1.5, 3, 0);
    link2.rotation.set(0, 0, 90 * Math.PI / 180);
    link2.scale.set(0.5, 3, 0.5);
    //scene.add(link2);

    joint2 = new THREE.Mesh(cylinder, joint_material);
    joint2.position.set(3, 3, -0.5);
    joint2.scale.set(1, 2, 1);
    joint2.rotation.set(0, 90 * Math.PI / 180, 90 * Math.PI / 180);
    //scene.add(joint2);

    link3 = new THREE.Mesh(cylinder, link_material);
    link3.position.set(4.5, 3, -1);
    link3.rotation.set(0, 0, 90 * Math.PI / 180);
    link3.scale.set(0.5, 3, 0.5);
    //scene.add(link3);

    joint3 = new THREE.Mesh(box, joint_material);
    joint3.position.set(6, 3, -1);
    joint3.rotation.set(0, 0, 0);
    joint3.scale.set(0.7, 0.7, 0.7);
    //scene.add(joint3);

    end_effector = new THREE.Mesh(sphere, end_effector_material);
    end_effector.position.set(6.5, 3, -1);
    end_effector.scale.set(0.2, 0.2, 0.2);

    //adding the groups and objects to the scene
    arm_group = new THREE.Object3D();
    joint1_group = new THREE.Object3D();
    joint2_group = new THREE.Object3D();
    joint3_group = new THREE.Object3D();


    joint3_group.add(end_effector);
    joint3_group.add(joint3);

    joint2_group.add(joint2);
    joint2_group.add(link3);
    joint2_group.add(joint3_group);

    joint1_group.add(link2);
    joint1_group.add(joint1)
    joint1_group.add(joint2_group);

    arm_group.add(link1);
    arm_group.add(base);
    arm_group.add(joint1_group);

    scene.add(arm_group);
    //scene.add(end_effector);
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
    controls.update();

    /**
     * movement control
     */
    if(workingMode==="Forward"){

    }
    else if(workingMode==="Inverse"){
        
    }
}
/**
 * gets data from user
 */
window.onmessage = function(e){
    data_from_user = e.data;
    data_from_user = data_from_user.split(" ");

    workingMode = data_from_user[0];
    console.log(workingMode);

    parameter_1 = data_from_user[1];
    console.log(parameter_1);
    parameter_2 = data_from_user[2];
    console.log(parameter_2);
    parameter_3 = data_from_user[3];
    console.log(parameter_3);
    
    if(workingMode==="Forward"){
        theta1 = parameter_1;
        theta2 = parameter_2;
        d3 = parameter_3;
    }
    else if(workingMode==="Inverse"){
        px = parameter_1;
        py = parameter_2;
        pz = parameter_3;
    }
    else{
        alert("wrong mode");
    }
};
