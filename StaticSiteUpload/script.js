const form = document.querySelector("form");
const urlInput = form.querySelector("#url");
const progressBar = form.querySelector(".progress-bar");
const notification = document.querySelector(".notification");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", urlInput.value);
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      progressBar.style.width = percentComplete + "%";
    }
  };
  xhr.onload = function() {
    if (xhr.status === 200) {
      notification.classList.add("success");
      notification.innerHTML = "File uploaded successfully!";
      notification.style.display = "block";
      setTimeout(function() {
        notification.style.display = "none";
        form.reset();
        progressBar.style.width = "0%";
      }, 3000);
    } else if (xhr.status !== 200) {
        notification.classList.add("error");
        notification.innerHTML = "An error occurred while uploading the file. Please try again.";
        notification.style.display = "block";
        setTimeout(function() {
          notification.style.display = "none";
          progressBar.style.width = "0%";
          form.reset();
        }, 3000);
    }
  };
  xhr.onerror = function() {
    notification.classList.add("error");
    notification.innerHTML = "An error occurred while uploading the file. Please try again.";
    notification.style.display = "block";
    setTimeout(function() {
      notification.style.display = "none";
      progressBar.style.width = "0%";
      form.reset();  
    }, 3000);
  };
  xhr.send(new FormData(form));
});