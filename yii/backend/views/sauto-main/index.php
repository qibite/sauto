<?php

/* @var $this yii\web\View */

$this->title = 'Расписание работы автосервиса | sauto';
?>

<div>
    <script>
        var id_last_car = <?=count($car)?>
    </script>

        <h2 class="col-md-10  col-md-offset-2">Статус</h2>
        <h3 class="col-md-6 col-md-offset-6">СТО-1: Подъемник-1</h3>
        <div class="col-md-2">          
            <h3>Выбор</3>
            <h3>СТО - 1</h3>
            <p><?= $clients[count($clients)-1]->id . ' ' . $car[$clients[count($clients)-1]->avto_id-1]->model?></p>
            <ul class="sto">
                <li class="mesto podyomnik"><img src="<?=$baseUrl?>images/podyomnik.jpg" alt=""><a href="">Подъемник - 1</a></li>
                <li class="mesto podyomnik"><img src="../images/podyomnik.jpg" alt=""><a href="">Подъемник - 2</a></li>
                <li class="mesto podyomnik"><img src="../images/podyomnik.jpg" alt=""><a href="">Подъемник - 3</a></li>
                <li class="mesto yama"><img src="../images/yama.jpg" alt=""><a href="">Смотровая Яма - 1</a></li>
                <li class="mesto yama"><img src="../images/yama.jpg" alt=""><a href="">Смотровая Яма - 2</a></li>
            </ul>
            <h3>СТО - 2</h3>
            <ul class="sto">
                <li class="mesto podyomnik"><img src="../images/podyomnik.jpg" alt=""><a href="">Подъемник - 1</a></li>
                <li class="mesto podyomnik"><img src="../images/podyomnik.jpg" alt=""><a href="">Подъемник - 2</a></li>
                <li class="mesto podyomnik"><img src="../images/podyomnik.jpg" alt=""><a href="">Подъемник - 3</a></li>
                <li class="mesto yama"><img src="../images/yama.jpg" alt=""><a href="">Смотровая Яма - 1</a></li>
                <li class="mesto yama"><img src="../images/yama.jpg" alt=""><a href="">Смотровая Яма - 2</a></li>
            </ul>
        </div>
       <!-- <table class="col-md-10 table table-hover table-bordered table-inverse raspisanie">
            <caption class="month">Октябрь</caption>
            <thead class="thead-inverse">
                <tr>
                    <th id="mmm">Понедельник</th>
                    <th>Вторник</th>
                    <th>Среда</th>
                    <th>Четверг</th>
                    <th>Пятница</th>
                    <th>Суббота</th>
                    <th>Воскресенье</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="day"><span class="data">1</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">2</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">3</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">4</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">5</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">6</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">7</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                </tr>
                <tr>
                    <td class="day"><span class="data">9</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">10</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">11</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">12</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">13</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">14</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">15</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                </tr>
                <tr>
                    <td class="day"><span class="data">16</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">17</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">18</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">19</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">20</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">21</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">22</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                </tr>
                <tr>
                    <td class="day"><span class="data">23</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">24</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">25</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">26</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">27</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">28</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">29</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                </tr>
                <tr>
                    <td class="day"><span class="data">30</span><span class="task">Задача</span><span class="task">Задача</span><span class="task">Задача</span></td>
                    <td class="day"><span class="data">31</span><span class="task">Задача</span></td>
                    <td class="day"></td>
                    <td class="day"></td>
                    <td class="day"></td>
                    <td class="day"></td>
                    <td class="day"></td>
                </tr>
            </tbody>
        </table>-->
        <? 
        if (isset($_GET['date'])) echo "выбрана дата ".$_GET['date'];
        my_calendar(array(date("Y-m-d"))); 
        ?>

       
        <? 
        function my_calendar($fill=array()) { 
          $month_names=array("январь","февраль","март","апрель","май","июнь",
          "июль","август","сентябрь","октябрь","ноябрь","декабрь"); 
          if (isset($_GET['y'])) $y=$_GET['y'];
          if (isset($_GET['m'])) $m=$_GET['m']; 
          if (isset($_GET['date']) AND strstr($_GET['date'],"-")) list($y,$m)=explode("-",$_GET['date']);
          if (!isset($y) OR $y < 1970 OR $y > 2037) $y=date("Y");
          if (!isset($m) OR $m < 1 OR $m > 12) $m=date("m");

          $month_stamp=mktime(0,0,0,$m,1,$y);
          $day_count=date("t",$month_stamp);
          $weekday=date("w",$month_stamp);
          if ($weekday==0) $weekday=7;
          $start=-($weekday-2);
          $last=($day_count+$weekday-1) % 7;
          if ($last==0) $end=$day_count; else $end=$day_count+7-$last;
          $today=date("Y-m-d");
          $prev=date('?\m=m&\y=Y',mktime (0,0,0,$m-1,1,$y));  
          $next=date('?\m=m&\y=Y',mktime (0,0,0,$m+1,1,$y));
          $i=0;
        ?> 
        <table class="col-md-10 table table-hover table-bordered table-inverse raspisanie">
            <caption class="month"><?= $month_names[$m-1] ?></caption>
            <thead class="thead-inverse">
                <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th>Сб</th>
                    <th>Вс</th>
                </tr>
            </thead>
            <tbody>
                <? 
                  for($d=$start;$d<=$end;$d++) { 
                    if (!($i++ % 7)) echo " <tr>\n";
                    echo '  <td class="day"><span class="data">';
                    if ($d < 1 OR $d > $day_count) {
                      echo "&nbsp";
                    } else {
                      $now="$y-$m-".sprintf("%02d",$d);
                      
                      if (is_array($fill) AND in_array($now,$fill)) {
                        echo '<a style="color:red" href="'.$_SERVER['PHP_SELF'].'?date='.$now.'">'.$d.'</a>'; 
                      } else {
                        echo $d;
                      }
                    } 
                    echo "</span></td>\n";
                    if (!($i % 7))  echo " </tr>\n";
                  } 
                ?>
            </tbody>
        </table> 
        <? } ?>


    <select name="clients" id="clients" style="display:none">
        <?php
        foreach ($clients as $man) {
            echo "<option data-idman='$man->id' data-idcar-idman='$man->avto_id' data-idcar-idman-year='$man->year'>$man->family $man->name $man->surname</option>";
        }
        ?>
    </select>

    <select name="cars" id="auto_firm" style="display:none">
        <?php
        foreach ($car as $m) {
            echo "<option value='$m->id'>$m->firm $m->model</option>";
        }
        ?>
    </select>

    <select name="works" id="works" style="display:none">
        <option value="1">Замена масла</option>
        <option value="3">Ремонт редуктора</option>
        <option value="4">Притирка клапана</option>
        <option value="5">Шлифовка ГБЦ</option>
        <option value="6">Замена свечей</option>
        <option value="7">Компьютерная диагностика</option>
        <option value="8">Диагностика подвески</option>
        <option value="4">Замена стойки</option>
        <option value="5">Прокачка стойки</option>
        <option value="6">Прокачка амортизатора</option>
        <option value="7">Замена амортизатора</option>
        <option value="8">Демонтаж/монтаж колеса</option>
        <option value="9">Демонтаж/монтаж рулевого наконечника</option>
        <option value="10">Демонтаж/монтаж рулевой тяги</option>
        <option value="11">Демонтаж/монтаж рулевой рейки</option>
        <option value="12">Ремонт ГУР</option>
        <option value="13">Покраска кузова</option>
        <option value="14">Покрытие антикором</option>
        <option value="15">Замена стекла RR</option>
        <option value="16">Замена стекла FR</option>
        <option value="17">Замена стекла FL</option>
        <option value="18">Pfvtyf cntrkf RL</option>
        <option value="19">Замена втулки стабилизатора</option>
        <option value="20">Перепрессовка подшипника</option>
    </select>

</div>

