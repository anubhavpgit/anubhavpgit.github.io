let tag = "";

function handleTag() {
  var currentPath = window.location.pathname + window.location.hash;
  //extract the tag from the url after the last /#
  if (currentPath) {
    tag = currentPath.split("/#")[1];
    if (tag) {
      let tagElement = document.querySelector(`span[data-tag="#${tag}"]`);
      if (tagElement) {
        tagElement.click();
      } else {
        let tagElement = document.querySelector(`span[data-tag="all"]`);
        if (tagElement) {
          tagElement.click();
        }
      }
    } else {
      let tagElement = document.querySelector(`span[data-tag="all"]`);
      if (tagElement) {
        tagElement.click();
      }
    }
  }
}

// Call handleTag on page load
window.onload = function () {
  handleTag();
};

// Listen for hash changes
window.addEventListener("hashchange", function () {
  handleTag();
});
