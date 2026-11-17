$(function () {
    $("#consume").click(function () {
        $("#results").html("<ul></ul>");
        var source = "remote";
        // HTTPS avoids mixed content; the snapshot is used only if the service fails.
        var request = $.get({
            url: "https://www.randyconnolly.com/funwebdev/services/travel/cities.php",
            dataType: "json",
            timeout: 5000
        }).then(null, function () {
            source = "local-snapshot";
            console.warn("City service unavailable. Loading the saved service response from 17/11/2026.");
            return $.get({
                url: "../data/cities.json",
                dataType: "json",
                timeout: 5000
            });
        });

        request
            .done(function (data) {
                $("#results").attr("data-source", source);
                $.each(data, function (index, value) {
                    var li = $("<li/>").text(value.name);
                    li.appendTo("div#results ul");
                });
            })
            .fail(function (xhr, status, error) {
                alert("failed loading data - status=" + status +
                    " error=" + error);
            });
    });
});
