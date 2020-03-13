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
    // cache
    var availableDates;
    $calendar = $('#availability-calendar');


    // bind EVENTS
    $(document).on('click', '.ac_btn:not(.active)', function () {
        var schedule = $(this).data('sched');

        loadDates(schedule);

        $('.ac_btn.active').removeClass('active');
        $(this).addClass('active');
    })

    $(document).on('change', '#ac_menu-select', function () {
        var schedule = $(this).val();
        loadDates(schedule);

    })

    // render
    function loadDates(schedule) {
        $calendar.addClass('loading');
        $calendar.multiDatesPicker('destroy');

        $.ajax({
            type: "POST",
            url: './dates.php',
            dataType: 'JSON',
            data: {
                type: "getDates",
                schedule: schedule
            },
            success: function (response) {
                availableDates = response;

                $calendar.removeClass('loading');

                pluginInit(schedule);
            }
        })
    }

    function getDates() {
        return $calendar.multiDatesPicker('getDates');
    }

    function setAvailableDates(availableDates) {
        console.log(availableDates);

        $.each(availableDates, function (i) {
            if ($('td[data-real-fulldate]').length) {
                console.log('meron');
            }
            $('[data-real-fulldate="' + availableDates[i] + '"]').addClass('checkin-date');
        })
    }

    function pluginInit(schedule) {
        var months;
        var range;

        // set number of months per slide
        if (_windowSize().width > 991) {
            months = 3;
        } else if (_windowSize().width > 576) {
            months = 2;
        } else {
            months = 1;
        }

        // set range
        switch (schedule) {
            case "sched1":
                range = 8;
                break;
            case "sched2":
                range = 3;
                break;
            case "sched3":
                range = 5;
                break;
            case "sched4":
                range = 15;
                break;
        }

        // jqueryUI datepicker
        $calendar.datepicker({
            numberOfMonths: months,
        });

        // extend jqueryUI datepicker 
        // http://dubrox.github.io/Multiple-Dates-Picker-for-jQuery-UI/
        $calendar.multiDatesPicker({
            mode: 'daysRange',
            autoselectRange: [0, range],
            onSelect: function () {
                $(document).on('DOMSubtreeModified', $calendar, function () {
                    setAvailableDates(availableDates);
                });
            }
        });

        $calendar.multiDatesPicker('resetDates');

        setAvailableDates(availableDates);
    }

    function init() {
        // select schedule 1 as default
        $('.ac_btn[data-sched="sched1"]').click();
    }


    return {
        init: init,
        getDates: getDates
    }
})();

$(document).ready(function () {
    _availabilityCalendar.init();
})