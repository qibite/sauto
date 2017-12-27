<?php
namespace backend\models;

use yii\db\ActiveRecord;
/**
*  AjaxController
*/
class NewClient extends ActiveRecord
{
	public static function tableName()
	{
		return 'clients';
	}
}