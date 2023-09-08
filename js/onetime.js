window.onload = function () {
    $.ajax({
        type: 'GET',
        url: '../php/main.php',
        async: false,
        success: function (serverAnswer){
            document.getElementById("outputContainer").innerHTML = serverAnswer;
            // console.log('data saved' + msg)
        },
        error: function (msg) {
            console.log('error: ' + msg)
        }
    });

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
            // console.log({ "x": x, "y": y, "r": r})
            $.ajax({
                type: 'POST',
                url: '../php/main.php',
                async: false,
                data: { "x": x, "y": y, "r": r},
                success: function (serverAnswer){
                    document.getElementById("outputContainer").innerHTML = serverAnswer;
                    // console.log('data saved' + msg)
                },
                error: function (msg) {
                    console.log('error: ' + msg)
                }
            });
        } else {
            console.log("not validated :(")
        }
    }
};