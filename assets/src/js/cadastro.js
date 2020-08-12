document.querySelector("#name").focus();

//START REGION ERROR FORMS
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
//END REGION




//REGION MASCARAS
const cpfMask = (strCpf) => {


    strCpf.value = strCpf.value.replace(/\D/g, "")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return strCpf.value

}

const cepMask = (strCep) => {
    strCep.value = strCep.value.replace(/\D/g, "")
    strCep.value = strCep.value.replace(/(\d{2})(\d)/, "$1.$2")
    strCep.value = strCep.value.replace(/(\d{3})(\d)/, "$1-$2")
    return strCep.value

}

const cardNumberMask = (strCardNumber) => {
    strCardNumber.value = strCardNumber.value.replace(/\D/g, "")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")

    return strCardNumber.value

}
//END REGION


//REGION VALIDA INPUTS
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

    if (!regExp.test(val.value) || val.value == "") {
        showError(val)
        return false;
    }
    else {
        hideError(val)
        return true;
    }
}

const regExpCpfReplace = (strCpf) => {
    let regExpCpf = new RegExp(/[.,-]/g)
    strCpf = strCpf.replace(regExpCpf, "")
    return strCpf
}

const regExpNumberReplace = (strNumber) => {
    let regExpNumber = new RegExp(/[.,- ]/g)
    strNumber = strNumber.replace(regExpNumber, "")
    return strNumber
}

const validInputNumber = (val, cpf = false) => {
    let regExp = new RegExp(/^[0-9.,-]+$/)


    if (!regExp.test(val.value) && cpf == false) {
        console.log(val.value)
        showError(val)
        document.getElementById(`errorinput${val.name}`).innerHTML = "Apenas números são permitidos"
        return false
    }
    else if (regExp.test(val.value) && cpf == false) {
        hideError(val)
        return true
    }
    else if (cpf == true) {
        hideError(val)
        if (cpf == true && regExpCpfReplace(val.value).length != 11) {
            showError(val)
            let cpfLength = (11 - (regExpCpfReplace(val.value)).length)
            document.getElementById(`errorinput${val.name}`).innerHTML = `O CPF deve ter 11 digitos : ${regExpCpfReplace(val.value).length <= 11 ? `Falta ${cpfLength}` : `Sobra ${cpfLength * -1}`}  caracters`
            return false;
        }

    }
    if (cpf == true && (regExpCpfReplace(val.value)).length == 11 && !cpfValid(regExpCpfReplace(val.value))) {
        showError(val)
        document.getElementById(`errorinput${val.name}`).innerHTML = "CPF é invalido, verifique!"
        return false;
    }
    else if (cpf == true && (regExpCpfReplace(val.value)).length == 11 && cpfValid(regExpCpfReplace(val.value))) {
        hideError(val)
        return true
    }

}

const validInputEmail = (val) => {
    pre = val.value.substring(0, val.value.indexOf("@"))
    pos = val.value.substring(val.value.indexOf("@") + 1, val.value.lenght)

    if ((pre.length >= 1) &&
        (pos.length >= 3) &&
        (pre.search("@") == -1) &&
        (pos.search("@") == -1) &&
        (pre.search(" ") == -1) &&
        (pos.search(" ") == -1) &&
        (pos.search(".") != -1) &&
        (pos.indexOf(".") >= 1) &&
        (pos.lastIndexOf(".") < pos.length - 1) &&
        (pre.lastIndexOf(",") == -1) &&
        (pos.lastIndexOf(",") == -1)
    ) {
        hideError(val)
        return true
    }
    else {
        showError(val)
        return false
    }
}

const enableValuesCreditCard = () => {
    document.querySelector("#payament_form_credit").checked = true
    let dataCardOne = document.querySelector('#dataCardOne')
    let dataCardTwo = document.querySelector('#dataCardTwo')
    dataCardOne.removeAttribute("hidden", "hidden")
    dataCardTwo.removeAttribute("hidden", "hidden")

    document.querySelector('#security_code').setAttribute("required", "required")
    document.querySelector('#card__number').setAttribute("required", "required")
    document.querySelector('#yearDataCard').setAttribute("required", "required")
    document.querySelector('#monthDataCard').setAttribute("required", "required")
    document.querySelector('#card__name').setAttribute("required", "required")








}

const disableValuesCreditCard = () => {
    let dataCardOne = document.querySelector('#dataCardOne')
    let dataCardTwo = document.querySelector('#dataCardTwo')
    dataCardOne.setAttribute("hidden", "hidden")
    dataCardTwo.setAttribute("hidden", "hidden")

    document.querySelector('#security_code').removeAttribute("required", "required")
    document.querySelector('#card__number').removeAttribute("required", "required")
    document.querySelector('#yearDataCard').removeAttribute("required", "required")
    document.querySelector('#monthDataCard').removeAttribute("required", "required")
    document.querySelector('#card__name').removeAttribute("required", "required")


}
//END REGION

//REGION LOAD

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

const loadMonthDataCard = () => {
    let now = new Date
    let selectObjMonth = document.querySelector("#monthDataCard")
    let selectObjYear = document.querySelector("#yearDataCard")


    for (let i = 1; i <= 12; i++) {
        let opt = document.createElement("option");
        opt.value = i
        opt.text = i
        selectObjMonth.add(opt, null)

    }


}

const loadYearDataCard = (obj) => {
    let now = new Date
    let selectObjYear = document.querySelector("#yearDataCard")
    selectObjYear.options.length = 1
    let year = 0
    //COMPARO O OBJETO COM O NOW.GETMONTH() + 1, POIS O RANGE VAI DE 0 a 11
    if (obj.value <= (now.getMonth() + 1))
        year = now.getFullYear() + 1

    else
        year = now.getFullYear()


    for (let i = year; i <= (year + 10); i++) {
        let opt = document.createElement("option");
        opt.value = i
        opt.text = i
        selectObjYear.add(opt, null)
    }

}

//END REGION


//REGION VALIDA FORM
const frmValid = (frm) => {


    if (
        validInputWord(frm.name) &&
        validInputEmail(frm.email) &&
        validInputNumber(frm.cpf, true) &&
        frm.name.value != "" &&
        frm.email.value != "" &&
        frm.cpf.value != ""

    ) {

        alert("O cadastro foi realizado com sucesso!")
        let frmJson = []
        console.log(frm.name.value)
        console.log(frm.email.value)
        console.log(frm.cpf.value)
        console.log(frm.address.value)
        console.log(frm.uf.value)
        console.log(frm.city.value)
        console.log(frm.cep.value)
        console.log(frm.payament_form.value)

        let payament_form = []
        if (frm.payament_form.value == 'credit') {
            payament_form = {
                'credit': {
                    'card_number': frm.card__name.value,
                    'expiration_date_month': frm.monthDataCard.value,
                    'expiration_date_year': frm.yearDataCard.value,
                    'vard_number': frm.card__number.value,
                    'security_code': frm.security_code.value
                }
            }
        }
        frmJson = {
            "name": frm.name.value,
            "email": frm.email.value,
            "cpf": frm.cpf.value,
            "address": frm.address.value,
            "uf": frm.uf.value,
            "street": frm.city.value,
            "cep": frm.cep.value,
            "payament_form": (frm.payament_form.value == 'credit' ? payament_form : frm.payament_form.value)
        }

        if (localStorage.getItem(`register`) != null && localStorage.getItem(`register`) != undefined) {
            let registers = JSON.parse(localStorage.getItem(`register`))
            registers.push(frmJson)
            localStorage.setItem(`register`, JSON.stringify(registers))
        }
        else {
            let registers = []
            registers.push(frmJson)
            localStorage.setItem(`register`, JSON.stringify(registers))
        }

        return false

    }
    else return false


}
//ENDREGION

// REGION DOCUMENT DEFAULT LOAD
//Carrega todas as UF do bruf.json
loadUf()
//Desabilitar campos do  cartao de credito
enableValuesCreditCard()
//Carrega os meses
loadMonthDataCard()
// ENDREGION