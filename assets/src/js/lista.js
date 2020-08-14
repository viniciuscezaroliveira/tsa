document.getElementById("search_client").focus();

const loadTable = () => {
    removeCellTable()
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
}

const removeCellTable = () => {
    let tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
    let length = tableRef.rows.length

    if (tableRef.rows.length > 0) {
        for (let i = 0; i < length; i++) {
            tableRef.deleteRow(0)
        }
    }

}




loadTable()