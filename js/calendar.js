// window size
var _windowSize = function () {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}

var _availabilityCalendar = (function () {
    // cache DOM
    $calendar = $('#availability-calendar');


    // bind EVENTS
    $(document).on('click', '.ac_btn:not(.active)', function () {
        var schedule = $(this).data('sched');

        getDates(schedule);

        $calendar.addClass('loading');
        $calendar.multiDatesPicker('resetDates');

        $('.ac_btn.active').removeClass('active');
        $(this).addClass('active');
    })

    $(document).on('change', '#ac_menu-select', function () {
        var schedule = $(this).val();
        getDates(schedule);

        $calendar.addClass('loading');
        $calendar.multiDatesPicker('resetDates');
    })

    // render
    function getDates(schedule) {
        $.ajax({
            type: "POST",
            url: './dates.php',
            dataType: 'JSON',
            data: {
                type: "getDates",
                schedule: schedule
            },
            success: function (response) {
                // var schedule = ;

                $calendar.removeClass('loading');
                $calendar.multiDatesPicker('addDates', response);
            }
        })
    }

    function init() {
        var months;

        if (_windowSize().width > 991) {
            months = 3;
        } else if (_windowSize().width > 576) {
            months = 2;
        } else {
            months = 1;
        }


        // jqueryUI datepicker
        $calendar.datepicker({
            numberOfMonths: months,
        });

        // extend jqueryUI datepicker 
        // http://dubrox.github.io/Multiple-Dates-Picker-for-jQuery-UI/
        $calendar.multiDatesPicker({
            create: function () {
                alert();
            },
            onSelect: function (date, datepicker) {

            }
        });

        // select schedule 1 as default
        $('.ac_btn[data-sched="1"]').click();
    }


    return {
        init: init
    }
})();

$(document).ready(function () {
    _availabilityCalendar.init();
})