init();
render();

var camera, scene, renderer, controls;
var base, link1, joint1, link2, joint2, link3, joint3, end_effector;
var data_from_user;
var workingMode, parameter_1, parameter_2, parameter_3;
var theta1, theta2, d3;
var px, py, pz;
var box, cylinder, sphere, base_material, link_material, joint_material, end_effector_material;
var parent_joint1, parent_joint2;
var joint3_pos;
var increasing = true;

var AXIS = new THREE.Vector3( 0,0,1).normalize();

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

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    //scene.add(new THREE.AxisHelper(25));

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(10, 10, 10);

    controls = new THREE.OrbitControls(camera);

    var light_up = new THREE.PointLight(0xffffff, 3.0, 100);
    light_up.position.set(0, 10, 0);
    scene.add(light_up);

    var light_down_1 = new THREE.PointLight(0xffffff, 1.0, 100);
    light_down_1.position.set(10, 0, 10);
    scene.add(light_down_1);

    var light_down_2 = new THREE.PointLight(0xffffff, 1.0, 100);
    light_down_2.position.set(-10, 0, -10);
    scene.add(light_down_2);

    box = new THREE.BoxGeometry(1, 1, 1);
    cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 64);
    link_cylinder = new THREE.CylinderGeometry(0.20, 0.20, 3, 64);
    joint2_cylinder = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
    link3_cylinder = new THREE.CylinderGeometry(0.2, 0.2, 3, 16);
    sphere = new THREE.SphereGeometry(1, 32, 32);

    base_material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.53,
        metalness: 0.09,
        emissive: 0x757575,
        emissiveIntensity: 0.1,
        wireframe: false
    });
    link_material = new THREE.MeshStandardMaterial({
        color: 0x434341,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5,
        wireframe: false
    });
    joint_material = new THREE.MeshStandardMaterial({
        color: 0x1CB0CC,
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5,
        wireframe: false
    });
    end_effector_material = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        roughness: 0.53,
        metalness: 0.79,
        emissive: 0x757575,
        emissiveIntensity: 0.5,
        wireframe: false
    });

    base = new THREE.Mesh(box, base_material);
    link1 = new THREE.Mesh(cylinder, link_material);
    joint1 = new THREE.Mesh(cylinder, joint_material);
    link2 = new THREE.Mesh(link_cylinder, link_material);
    joint2 = new THREE.Mesh(joint2_cylinder, joint_material);
    link3 = new THREE.Mesh(link3_cylinder, link_material);
    joint3 = new THREE.Mesh(box, joint_material);
    end_effector = new THREE.Mesh(sphere, end_effector_material);

    parent_joint1 = new THREE.Object3D();
    parent_joint2 = new THREE.Object3D();

    placeObjects();
}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
    controls.update();
    animate();
}



function placeObjects(){
    scene.add(parent_joint1);

    joint1.position.set(0,0,0);

    parent_joint1.add(joint1);

    joint1.add(link2);
    link2.position.x=1.9;
    link2.rotation.set(0, 0, -90 * Math.PI / 180);

    link2.add(joint2);
    
    joint2.position.y = 1.5;
    joint2.position.z = -0.5;
    joint2.rotation.set(-90 * Math.PI / 180, 0, 0);

    joint2.add(parent_joint2);
    parent_joint2.add(link3);
    link3.rotation.set(-90 * Math.PI / 180, 0, 0)
    link3.position.y = 0.5;
    link3.position.z = -0.7;
    

    link3.add(joint3);
    joint3.position.y = -1.5;
    joint3.position.z = -0.5;

    joint3.scale.set(0.5,0.5,1.5);

    joint3.add(end_effector);

    end_effector.scale.set(0.5,0.5,0.15);

    end_effector.position.y = -0.75;
    end_effector.position.z = -0.35;

    parent_joint1.add(link1);
    link1.position.y = -2.2;
    link1.scale.set(0.5,3.5,0.5);

    parent_joint1.add(base);
    base.position.y = -4;
    base.scale.set(10,0.2,10);

}

function animate(){
    //joint1.rotation.y = 70*Math.PI/180;
    //parent_joint2.rotation.y = 70*Math.PI/180;
    //joint1.rotation.y += 0.01;
    //parent_joint2.rotation.y += 0.01;

    if(workingMode=="Forward"){
        joint1.rotation.y = theta1*Math.PI/180;
        parent_joint2.rotation.y = -theta2*Math.PI/180;
        link3.position.z = d3-0.7;
    }
}