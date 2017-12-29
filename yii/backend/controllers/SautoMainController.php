<?php
namespace backend\controllers;


use Yii;
use yii\web\Controller;
use backend\models\Cars;
use backend\models\NewClient;
use backend\models\NewWork;
/**
 * Site controller
 */
class SautoMainController extends Controller
{
	public $layout = 'sauto_main';
    public function actionIndex()
    {
    	$car = Cars::find()->all();
    	$clients = NewClient::find()->all();
        $works = NewWork::find()->all();
        return $this->render('index', compact('car', 'clients', 'works'));
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
        $Work->save();
        return 'NewWork is save! Work add';
    }
}
