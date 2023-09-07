window.onload = function () {
    let button = document.querySelector("input[type=text]");
    button.addEventListener("input", validateY);
    button.addEventListener("focus", validateY);

    checkboxes = document.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", () => {
            checkboxes.forEach((c) => {
                if (c !== checkbox) {
                    c.checked = false;
                }
            });
        });
    });

    document.getElementById('checkButton').onclick = function (){
        if (validateX() && validateY()) {
            let x = document.querySelector('input[type="checkbox"]:checked').value;
            let y = document.getElementById("Y-input").value.replace(',', '.');
            let r = document.getElementById('R-input').value
            console.log({ "x": x, "y": y, "r": r})
            $.ajax({
                type: 'POST',
                url: '../php/main.php',
                async: false,
                data: { "x": x, "y": y, "r": r},
                success: function (msg){
                    console.log('data saved' + msg)
                },
                error: function (msg) {
                    console.log('error: ' + msg)
                }
            });
            console.log("validated!")
        } else {
            console.log("not validated :(")
        }
    }
};