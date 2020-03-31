function allowDrop(event) {
  //console.log('File(s) in drop zone');
  event.preventDefault();
}

function drop(event) {
  //console.log('File(s) dropped');
  event.preventDefault();
}

window.onload = function() {
  let dropZone = document.getElementById('divToDrop');
  function drop(event) {
    console.log('File(s) dropped');
    event.preventDefault();
  }

    dropZone.addEventListener('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();
      let files = e.dataTransfer.files; // Array of all files
      let filesCount = files.length;

      for (let i=0; i < filesCount; i++) {
        let file = files[i];
          if (file.type.match('image.*')) {
              let reader = new FileReader();

              reader.onload = function(e2) {
                  // finished reading file data.
                  let img = document.createElement('img');
                  img.src= e2.target.result;
                  img.classList.add("thumbnail");
                  document.getElementById("divToDrop").appendChild(img);
              }
              reader.readAsDataURL(file); // start reading the file data.
          }
      }
  });
}
