/**
 * getOption() reads the current mode set by the user
 */
function getOption() {
    var obj = document.getElementById("robot-control-mode-select");
    document.getElementById("robot-current-mode").innerHTML =
        obj.options[obj.selectedIndex].text;
}