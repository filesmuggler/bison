init();
render();

/**
 * Variables to hold information about the viewer
 */
var camera, scene, renderer, controls;

var parent, pivot;

/**
 * deprecated solution
 */
//var arm_group, joint1_group, joint2_group, joint3_group, end_effector_group;

/**
 * Variables to hold objects for the arm
 */
var base, link1, joint1, link2, joint2, link3, joint3, end_effector, end_effector_conn;

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

var AXIS_jg1 = new THREE.Vector3( 0,1,0 ).normalize();


/**
 * init() is for set up of environment
 */
function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

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

    parent = new THREE.Object3D();
    scene.add(parent);

    pivot = new THREE.Object3D();
    parent.add(pivot);

    base = new THREE.Mesh(box, base_material);
    base.position.set(0, 0, 0);
    base.scale.set(3, 0.1, 3);
    parent.add(base);

    link1 = new THREE.Mesh(cylinder, link_material);
    link1.position.set(0, 1.5, 0);
    link1.scale.set(0.5, 3, 0.5);
    parent.add(link1);

    joint1 = new THREE.Mesh(cylinder, joint_material);
    joint1.position.set(0, 3, 0);
    joint1.scale.set(1, 1, 1);
    parent.add(joint1);

    link2 = new THREE.Mesh(cylinder, link_material);
    link2.position.set(1.5, 3, 0);
    link2.rotation.set(0, 0, 90 * Math.PI / 180);
    link2.scale.set(0.5, 3, 0.5);
    
    parent.add(link2);

    joint2 = new THREE.Mesh(cylinder, joint_material);
    joint2.position.set(3.25,3,-0.3);
    joint2.scale.set(1, 2, 1);
    joint2.rotation.set(0, 90 * Math.PI / 180, 90 * Math.PI / 180);
    joint2.add( new THREE.AxisHelper( 2.5 ) );

    parent.add(joint2);

    /*
    link3 = new THREE.Mesh(cylinder, link_material);
    //link3.position.set(4.5, 3, -1);
    link3.rotation.set(0, 0, 90 * Math.PI / 180);
    link3.scale.set(0.5, 3, 0.5);
    link3.add( new THREE.AxisHelper( 2.5 ) );

    joint2.add(link3);

    /*
    joint3 = new THREE.Mesh(box, joint_material);
    joint3.position.set(6, 3, -1);
    joint3.rotation.set(0, 0, 0);
    //joint3.scale.set(0.7, 0.7, 0.7);

    end_effector = new THREE.Mesh(sphere, end_effector_material);
    end_effector.position.set(6.5, 3, -1);
    //end_effector.scale.set(0.25, 0.25, 0.25);

    end_effector_conn = new THREE.Mesh(cylinder, link_material);
    end_effector_conn.position.set(6.5, 3, -1);
    end_effector_conn.rotation.set(0, 0, 90 * Math.PI / 180);
    end_effector_conn.translateY(1.70);
    //end_effector_conn.scale.set(0.25,3,0.25);
    
    /*
    //adding the groups and objects to the scene
    arm_group = new THREE.Object3D();
    joint1_group = new THREE.Object3D();
    joint2_group = new THREE.Object3D();
    joint3_group = new THREE.Object3D();
    end_effector_group = new THREE.Object3D();


    end_effector_group.add(end_effector);
    end_effector_group.add(end_effector_conn);

    joint3_group.add(end_effector_group);
    
    /*
    joint2_group.add(joint3_group);

    joint2_group.add(joint3);
    joint2_group.add(link3);
    
    
    link3.add(joint3);
    link3.add(joint3_group);

    joint2.add(link3);

    //joint2.add(joint3);
    //joint2.add(joint3_group);

    joint1_group.add(link2);
    joint1_group.add(joint2);
    //joint1_group.add(joint2_group);

    arm_group.add(link1);
    arm_group.add(joint1);
    arm_group.add(base);
    arm_group.add(joint1_group);
    
    scene.add(arm_group);*/
    //scene.add(end_effector);
    }

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
        //joint1_group.rotation.set(0,theta1*Math.PI/180,0);
        //joint1.rotateOnAxis(AXIS_jg1,theta1*Math.PI/180);
        joint1.rotation.set(0,theta1*Math.PI/180,0);
        //joint2.rotation.set(theta2*Math.PI/180,0,0);
        //end_effector_group.position.set(d3,0,0);
        
        //link3.rotation.set(0,theta2*Math.PI/180,0);
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
