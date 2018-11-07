$(document).ready(function () {
    $("#logar").click(function () {
        $(".wait").slideDown(300);
        $(".error").slideUp (300);

        var pdata = {};
        pdata["login"] = $("#login").val();
        pdata["senha"] = $("#senha").val();

        $.ajax({
            url: $(this).attr("data-url"),
            data: pdata,
            type: 'POST',
            success: function (result) {
                $(".wait").slideUp(300);
                
                if (result.indexOf("Erro") > -1) {
                    $(".error").slideDown(300);
                    return;
                }
                window.location.href = result;
            }
        });
    });

    var i = 1;
    setInterval(function () {
        i++;
        $("body").attr("style", "background-image:url('/Images/vivo" + i + ".jpg');background-size:cover;");

        if (i == 3) {
            i = 0;
        }
    }, 4200);
});