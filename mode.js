function mode() {
  let root = document.documentElement,
      value = document.getElementById("mode").checked;

  if (value) {
    root.style.setProperty("--text-clr", "#fff");
    root.style.setProperty("--main-clr", "#666");
    root.style.setProperty("--box-color", "#a6a6a6");
    document.getElementById("labelmode").innerHTML = "Mode: &#127769;";
  } else {
    root.style.setProperty("--text-clr", "#000");
    root.style.setProperty("--main-clr", "#cfc");
    root.style.setProperty("--box-color", "#9f9");
    document.getElementById("labelmode").innerHTML = "Mode: &#9728;&#65039;";
  }
}
