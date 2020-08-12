document.getElementById("search_client").focus();


for (let i = 0; i < JSON.parse(localStorage.getItem('register')).length; i++) {
    const element = JSON.parse(localStorage.getItem('register'))[i];
    console.log(element['name'])

}
