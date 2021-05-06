deleteEvent = (id) => {
    // let id = document.getElementById('deleteBTN').getAttribute('data-id')

    let result = confirm('Sure to remove this Event?');
    if (result) {
        axios.delete('/index/deleteEvent/' + id)
            .then(res => {
                alert('The event was deleted !');
                window.location.href = '/index/';
            })
            .catch(err => {
                alert('Something went wrong :-(');
            })
    }
}

// show image
uploadURL = (img) => {
    if (img.files && img.files[0]) {
        let reader = new FileReader();
        reader.onload = (res) => {
            let image = document.getElementById('imageView');
            image.style.display = "block";
            image.src = res.target.result
        }
        reader.readAsDataURL(img.files[0])
    }
}