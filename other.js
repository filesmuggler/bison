/**
 * initNames()
 */
function initNames() {
    document.getElementById("p1").innerHTML = "Parameter 1";
    document.getElementById("p2").innerHTML = "Parameter 2";
    document.getElementById("p3").innerHTML = "Parameter 3";
}

/**
 * resetArm()
 */
function resetArm(){
    workingMode = "Forward";
    theta1 = 0;
    //console.log(theta1);
    theta2 = 0;
    //console.log(theta2);
    d3 = 0;
    //console.log(d3);
    var message = workingMode + " " + theta1 + " " + theta2 + " " + d3;
    //console.log(message);
    var iframe = document.getElementById("myIframe");
    iframe.contentWindow.postMessage(message, '*');
}



/**
 * getOption() reads the current mode set by the user
 */
function getOption() {
    var obj = document.getElementById("robot-control-mode-select");
    var mytext = obj.options[obj.selectedIndex].text;
    document.getElementById("robot-current-mode").innerHTML = mytext;

    if (mytext === "Forward") {
        document.getElementById("p1").innerHTML = "Theta1";
        document.getElementById("p2").innerHTML = "Theta2";
        document.getElementById("p3").innerHTML = "d3    ";
    }
    else if (mytext === "Inverse") {
        document.getElementById("p1").innerHTML = "Px";
        document.getElementById("p2").innerHTML = "Py";
        document.getElementById("p3").innerHTML = "Pz";
    }
    else {
        document.getElementById("p1").innerHTML = "Parameter 1";
        document.getElementById("p2").innerHTML = "Parameter 2";
        document.getElementById("p3").innerHTML = "Parameter 3";
    }
}

/**
 * moveArm() sets parameters for the joints in direct kinematics
 */
function getArmParameters() {

    workingMode = document.getElementById("robot-current-mode").innerHTML;
    theta1 = document.getElementById("theta1").value;
    //console.log(theta1);
    theta2 = document.getElementById("theta2").value;
    //console.log(theta2);
    d3 = document.getElementById("d3").value;
    //console.log(d3);
    var message = workingMode + " " + theta1 + " " + theta2 + " " + d3;
    console.log(message);
    var iframe = document.getElementById("myIframe");
    iframe.contentWindow.postMessage(message, '*');
}