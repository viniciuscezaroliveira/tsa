document.getElementById("name").focus();


const showError = (element) => {
    element.classList.remove("form__input")
    element.classList.add("form__input__error")
    document.getElementById(`errorinput${element.name}`).classList.remove("form__input__error_none__display")
    document.getElementById(`errorinput${element.name}`).classList.add("form__input__error__display")
    element.focus()
}

const hideError = (element) => {
    element.classList.remove("form__input__error");
    element.classList.add("form__input");
    document.getElementById(`errorinput${element.name}`).classList.remove("form__input__error__display")
    document.getElementById(`errorinput${element.name}`).classList.add("form__input__error_none__display")
}


const cpfValid = (strCpf) => {

    var soma;
    var resto;
    soma = 0;
    if (strCpf == "00000000000") {
        return false;
    }

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}



const validInputWord = (val) => {
    let regExp = new RegExp(/^[a-zA-Záéíóúâêôãõ ]+$/)

    if (!regExp.test(val.value)) {
        showError(val)
    }
    else {
        hideError(val)
    }
}

const validInputNumber = (val, cpf = false) => {
    let regExp = new RegExp(/^[0-9]+$/)



    if (!regExp.test(val.value)) {

        showError(val)
        document.getElementById(`errorinput${val.name}`).innerHTML = "Apenas números são permitidos"

    }
    else {
        hideError(val)
        if (cpf == true && (val.value).length != 11) {

            showError(val)
            let cpfLength = (11 - (val.value).length)
            document.getElementById(`errorinput${val.name}`).innerHTML = `O CPF deve ter 11 digitos : ${(val.value).length <= 11 ? `Falta ${cpfLength}` : `Sobra ${cpfLength * -1}`}  caracters`


        }

    }

    if (cpf == true && (val.value).length == 11 && !cpfValid(val.value)) {
        showError(val)
        document.getElementById(`errorinput${val.name}`).innerHTML = "CPF é invalido, verifique!"
    }

}


const loadUf = () => {
    //A VAR DATA VEM DO ARQUIVO BRUF.JSON, IMPORTADA NO INDEX.HTML
    let selectObj = document.getElementById('uf')
    //REMOVE ALL OPTIONS
    selectObj.options.length = 1

    for (var i = 0; i < data.length; i++) {
        let opt = document.createElement("option");
        opt.value = data[i].sigla
        opt.text = data[i].nome
        selectObj.add(opt, null)

        // more statements
    }



}

const loadCity = (uf) => {
    //A VAR DATA VEM DO ARQUIVO BRUF.JSON, IMPORTADA NO INDEX.HTML

    let selectObj = document.getElementById('city')
    //REMOVE ALL OPTIONS
    selectObj.options.length = 1
    for (var i = 0; i < data.length; i++) {
        if (data[i].sigla == uf.value) {
            for (var j = 0; j < data[i].cidades.length; j++) {
                let opt = document.createElement("option");
                opt.value = data[i].cidades[j]
                opt.text = data[i].cidades[j]
                selectObj.add(opt, null)
            }
        }

        // more statements
    }
}


const frmValid = (frm) => {

    if (frm.name.value !== "") {
        alert("Nome Ok")

    }
    else return false


    return false
}


//Carrega todas as UF do bruf.json
loadUf()