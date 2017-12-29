<?php
namespace backend\models;

use yii\db\ActiveRecord;
/**
*  AjaxController
*/
class NewWork extends ActiveRecord
{
	public static function tableName()
	{
		return 'services';
	}
}