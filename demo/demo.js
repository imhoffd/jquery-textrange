$(document).ready(function() {
    var orange = false;

    setInterval(function() {
        orange = !orange;
        $('h1').css('border-color', orange ? 'transparent' : '#fa4500');
    }, 500);

    $('#textarea').bind('updateInfo keyup mousedown mousemove mouseup', function() {
        var range = $(this).textrange();

        $('#info .property').each(function() {
            if (typeof range[$(this).attr('id')] !== 'undefined') {
                if ($(this).attr('id') === 'text') {
                    range[$(this).attr('id')] = range[$(this).attr('id')].replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                }

                $(this).children('.value').html(range[$(this).attr('id')]);
            }
        });
    });

    $('#console-log').click(function() {
        var obj = {};

        $('#info .property').each(function() {
            var value = $(this).children('.value').html();
            obj[$(this).attr('id')] = isNaN(value) || value == '' ? value : parseInt(value);
        });

        console.log(obj);

        return false;
    });

    $('#selection-set').click(function() {
        $('#textarea').textrange('set', $('#char-start').val(), $('#char-end').val()).trigger('updateInfo').focus();
    });

    $('#selection-replace').click(function() {
        $('#textarea').textrange('replace', $('#replace-text').val()).trigger('updateInfo').focus();
    });
});
