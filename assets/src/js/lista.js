
/**
 * Carrega os dados do localstorage
 * 
 * let register = JSON.parse(localStorage.getItem('register'))
 */
const loadTable = () => {
    removeCellTable()
    if (JSON.parse(localStorage.getItem('register')) != null || JSON.parse(localStorage.getItem('register')) != undefined) {
        let inputSearch = document.querySelector("#search_client").value
        if (inputSearch == null || inputSearch == "") {
            for (let i = 0; i < JSON.parse(localStorage.getItem('register')).length; i++) {
                const element = JSON.parse(localStorage.getItem('register'))[i];
                insetCellTable(element)

            }
        }
        else {

            for (let i = 0; i < JSON.parse(localStorage.getItem('register')).length; i++) {
                const element = JSON.parse(localStorage.getItem('register'))[i];

                if (
                    (element["name"].toLowerCase()).search(inputSearch.toLowerCase()) != -1 ||
                    (element["email"].toLowerCase()).search(inputSearch.toLowerCase()) != -1 ||
                    (element["cpf"].toLowerCase()).search(inputSearch.toLowerCase()) != -1


                ) {
                    //console.log((element["name"].toLowerCase()).replace(/\s/g, ''))
                    //console.log(element["email"].toLowerCase().search(inputSearch.toLowerCase()))
                    insetCellTable(element)
                }

            }


        }
    }


}


/**
 * 
 * Insere todas as linhas da tabela...
 * ou carregam com todos os registros do localStorage, register
 * ou carrega com o texto inserido no input de pesquisa
 */
const insetCellTable = (element) => {

    let tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    let newRow = tableRef.insertRow(tableRef.rows.length);
    let newCell = newRow.insertCell(0);
    let newCell1 = newRow.insertCell(1);
    let newCell2 = newRow.insertCell(2);
    let newCell3 = newRow.insertCell(3);


    // Append a text node to the cell
    let name = document.createTextNode(element["name"]);
    let email = document.createTextNode(element["email"]);
    let cpf = document.createTextNode(element["cpf"]);
    let create = document.createTextNode(element["create"]);
    newCell.appendChild(name);
    newCell1.appendChild(email);
    newCell2.appendChild(cpf);
    newCell3.appendChild(create);


    newRow.setAttribute('id', element["id"])
    newRow.setAttribute('onclick', `loadDataModal(${element["id"]}) `)
}

/**
 * Remove todas as linhas da tabela
 */
const removeCellTable = () => {
    let tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    let length = tableRef.rows.length

    if (tableRef.rows.length > 0) {
        for (let i = 0; i < length; i++) {
            tableRef.deleteRow(0)
        }
    }

}


const loadDataModal = (objId) => {

    let obj = JSON.parse(localStorage.getItem('register'))

    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id == objId) {
            document.querySelector("#name").innerHTML = obj[i].name
            document.querySelector("#cpf").innerHTML = obj[i].cpf
            document.querySelector("#address").innerHTML = `${obj[i].address}, ${obj[i].city} - ${obj[i].uf}`
            document.querySelector("#payament_form").innerHTML = obj[i].payament_form
            document.querySelector("#name").innerHTML = obj[i].name
            console.log(obj[i]);
        }


    }
    // Get the modal
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




}



/**
 * Metodos chamados no carregamento da pagina
 */
loadTable()
document.getElementById("search_client").focus();

