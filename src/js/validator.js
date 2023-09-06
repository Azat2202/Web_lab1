function validateY() {
    try {
        y = document.querySelector("input[type=text]").value.replace(',', '.');
        if (y === undefined) {
            alert("Y не введён");
            return false;
        } else if (!isNumeric(y)) {
            alert("Y не число");
            return false;
        } else if (!((y > -5) && (y < 5))) {
            alert("Y не входит в область допустимых значений");
            return false;
        }
        return true;
    } catch (err) {
        alert("Значение X не выбрано");
        return false;
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}