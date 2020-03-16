<?php

switch ($_POST["schedule"]) {
    case "sched1":
        $dates = ['03/30/2020', '04/04/2020', '04/08/2020', '04/25/2020', '04/29/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;

    case "sched2":
        $dates = ['04/16/2020', '04/23/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
    case "sched3":
        $dates = ['04/6/2020', '04/13/2020', '04/27/2020', '05/11/2020', '05/18/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
    case "sched4":
        $dates = ['04/09/2020', '04/25/2020', '05/05/2020', '05/19/2020'];
        echo json_encode($dates, JSON_UNESCAPED_UNICODE);
        break;
}
