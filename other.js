/**
 * getOption() reads the current mode set by the user
 */
function getOption() {
    var obj = document.getElementById("robot-control-mode-select");
    document.getElementById("robot-current-mode").innerHTML =
        obj.options[obj.selectedIndex].text;
}

/**
 * moveArm() sets parameters for the joints in direct kinematics
 */
function moveArm() {
    theta1 = document.getElementById("theta1").value;
    console.log(theta1);
    theta2 = document.getElementById("theta2").value;
    console.log(theta2);
    d3 = document.getElementById("d3").value;
    console.log(d3);
}