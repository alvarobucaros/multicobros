$(document).ready(function () {            
    $("td.contribution").each(function () {
        $(this).text($(this).text().toLocaleString('en-US'));
    })
});