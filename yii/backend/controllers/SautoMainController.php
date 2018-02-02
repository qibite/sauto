<?php
namespace backend\controllers;


use Yii;
use yii\web\Controller;
use backend\models\Cars;
use backend\models\NewClient;
use backend\models\NewWork;
use backend\models\Personal;
use backend\models\Parts;
use backend\models\Settings;
use backend\models\Incident;
/**
 * Site controller
 */
class SautoMainController extends Controller
{
	public $layout = 'sauto_main';
    public function actionIndex()
    {
    	$car = Cars::find()->orderBy('firm DESC')->all();
    	$clients = NewClient::find()->all();
        $works = NewWork::find()->orderBy('raiting DESC')->all();
        $parts = Parts::find()->all();
        return $this->render('index', compact('car', 'clients', 'works', 'parts'));
    }

    public function actionClient()
    {
    	$client = new NewClient();
    	$client->family = $_GET['family'];
    	$client->name = $_GET['name'];
    	$client->surname = $_GET['surname'];
    	$client->phone = $_GET['phone'];
    	$client->avto_id = $_GET['avto_id'];
    	$client->mail = $_GET['mail'];
    	$client->gosno = $_GET['gosno'];
    	$client->sor = $_GET['sor'];
    	$client->year = $_GET['year'];
    	$client->save();
    	return 'new client add';

    }

    public function actionCar()
    {
    	$car = new Cars();
    	$car->firm = $_GET['firm'];
    	$car->model = $_GET['model'];
    	$car->save();
        return 'unknown car add';

    }

    public function actionGetCar()
    {
    	$allcars = array();
    	$car = Cars::find()->all();
    	foreach ($car as $m) {
    		array_push(
    			$allcars, 
    			array('id' => $m->id, 'firm' => $m->firm, 'model' => $m->model)
    		);
    	}
    	return json_encode($allcars);
    }

    public function actionSaveWork()
    {
        $Work = new NewWork();
        $Work->name = $_GET['name'];
        $Work->code = $_GET['code'];
        $Work->raiting = $_GET['raiting'];
        $Work->price = $_GET['price'];
        $Work->time = $_GET['time'];
        $Work->save();
        return 'NewWork is save! Work add';
    }

    public function actionSavePart()
    {
        $part = new Parts();
        $part->name = $_GET['name'];
        $part->code = $_GET['code'];
        $part->car = $_GET['carid'];
        $part->price = $_GET['price'];
        $part->save();
        return 'Part is save! New part add';
    }

    public function actionGetPersonal()
    {
        $masters = Personal::find()->where('busy = 0')->all();
        $obj_masters =[];
        foreach ($masters as $master) {            
            array_push( $obj_masters, array( 'id' => $master->id, 'master' => $master->fio ) );
        }
        return json_encode($obj_masters);
    }

    public function actionGetSettings()
    {
        $allsetts = array();
        $setts = Settings::find()->all();
        foreach ($setts as $set) {
            array_push(
                $allsetts, 
                array(
                    'start_day_h' => $set->start_day_h,
                    'start_day_m' => $set->start_day_m,
                    'start_obed_h' => $set->start_obed_h,
                    'start_obed_m' => $set->start_obed_m,
                    'end_obed_h' => $set->end_obed_h,
                    'end_obed_m' => $set->end_obed_m,
                    'end_day_h' => $set->end_day_h,
                    'end_day_m' => $set->end_day_m,
                    'weekends' => $set->weekend
                )
            );
        }
        return json_encode($allsetts);
    }

    public function actionSaveIncident()
    {
        $part = new Incident();
        $part->id_client = $_GET['id_client'];
        $part->id_car = $_GET['id_car'];
        $part->works = json_encode($_GET['works']);
        if (isset($_GET['parts'])) {
            $part->parts = json_encode($_GET['parts']);
        }
        $part->master = $_GET['master'];
        $part->time_to_start = $_GET['time_to_start'];
        $part->time_to_end_plane = $_GET['time_to_end_plane'];
        $part->time_t_end_real = $_GET['time_t_end_real'];
        $part->work_time = $_GET['work_time'];
        $part->status = $_GET['status'];
        $part->price = $_GET['price'];
        $part->save();
        return 'Заказ сохранён успешно!';
    }
}
