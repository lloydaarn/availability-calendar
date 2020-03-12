<?php

switch ($_POST["schedule"]) {
    case "1":
        $dates = ['04/03/2020', '04/04/2020', '04/08/2020', '04/25/2020', '04/29/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;

    case "2":
        $dates = ['03/28/2020', '03/29/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
    case "3":

        $dates = ['04/4/2020', '04/5/2020', '04/9/2020', '04/15/2020', '04/17/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
    case "4":

        $dates = ['05/4/2020', '05/5/2020', '05/9/2020', '05/15/2020', '05/17/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
}
