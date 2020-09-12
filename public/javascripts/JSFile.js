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