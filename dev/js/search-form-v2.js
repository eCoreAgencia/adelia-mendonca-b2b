$(document).ready(function () {
    $('.fulltext-search-box').on('keydown', function(event){
        var input = $('.fulltext-search-box');
        var select = $('.busca select');
        if(event.key == 'Enter'){
            event.preventDefault();
            var search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '');
            var department = select.val() ? '/' + select.val() : '';
            window.location = department + '/' + encodeURI(search) + '?sc=2';
        }
    });

    $('.btn-buscar').on('click', function(event){
        event.preventDefault();
        var input = $('.fulltext-search-box');
        var select = $('.busca select');
        var search = input.val().replace(/\./g, '').replace(/(^[\s]+|[\s]+$)/g, '');
        var department = select.val() ? '/' + select.val() : '';
        window.location = department + '/' + encodeURI(search) + '?sc=2';
    });

    var gotoHref = function (href) {
        console.log(href);
        document.location.href = href + '?sc=2';
    };

    var mapReturnedItems = function (item) {
        return {
            label: (item.thumb != "" ? item.thumb + " " : "") + item.name,
            value: item.name,
            href: item.href,
            criteria: item.criteria
        };
    };

    var autoCompleteSource = function (request, response) {
        $.ajax({
            url: "/buscaautocomplete/",
            dataType: "json",
            data: {
                maxRows: 12,
                productNameContains: request.term,
                suggestionsStack: suggestionsStack
            },
            success:  function (data) {
                if (data) {
                    response($.map(data.itemsReturned, mapReturnedItems));
                }
            }
        });
    };

    if ($.fn.autocomplete) {
        $(".fulltext-search-box").autocomplete({
            source: autoCompleteSource,
            minLength: 3,
            delay: 500,
            select: function (event, ui) {
                gotoHref(ui.item.href);
            },
            open: function () {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            },
            focus: function (event, ui) {
                suggestionsStack = ui.item.criteria;
            }
        });
    }
});