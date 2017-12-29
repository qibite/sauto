var raspisanie = document.getElementsByClassName('raspisanie');
var month = document.querySelector('caption.month');
var day = document.querySelectorAll('.day');

function return_month(that_month) {
	let name = that_month.innerText;
	if (name[name.length-1] == 'ь')
	{
		var new_month = ''; 
		for (let i = 0; i < name.length; i++)
		{
			new_month = new_month + (name[i] == 'ь'?'я':name[i]);
		}
	}
	return new_month;
}

for (var i = day.length - 1; i >= 0; i--) {
	day[i].addEventListener('click', click_on_day);
}

/************************************************************************************************************************
*																														*
*											СОЗДАНИЕ НОВОГО ОКНА ЗАКАЗА НА РАБОТЫ										*
*																														*
************************************************************************************************************************/
function click_on_day () {
	let data = new Date()
	let that_day = this;
	let clear_div = document.createElement('div');
		clear_div.style.clear = 'both';
		clear_div.style.height = '1em';
/************************************************************************************************************************
*													ФОН НОВОГО ОКНА ЗАКАЗА												*
************************************************************************************************************************/
	let popup_zakaz = document.createElement('div');
		popup_zakaz.className = 'popup_zakaz';
/************************************************************************************************************************
*													ТЕЛО НОВОГО ОКНА ЗАКАЗА												*
************************************************************************************************************************/
	let	popup_zakaz_body = document.createElement('div');
		popup_zakaz_body.className = 'popup_zakaz_body';
/************************************************************************************************************************
*													КНОПКА ЗАКРЫТЬНОВОГО ОКНА ЗАКАЗА									*
************************************************************************************************************************/
	
	popup_zakaz.appendChild(popup_zakaz_body)
	sauto.create_close_button(popup_zakaz_body, 'main');
		
/************************************************************************************************************************
*												ЗАГОЛОВОК НОВОГО ОКНА ЗАКАЗА											*
************************************************************************************************************************/
		popup_zakaz_body.innerHTML = popup_zakaz_body.innerHTML+'<h3><i class="fa fa-info" aria-hidden="true"></i> Запись на ' + that_day.firstChild.innerText + ' '+ return_month(month) +'</h3>';
		sauto.insert_hr(popup_zakaz_body)
/************************************************************************************************************************
*									УСТАНОВКА НАЗНАЧЕНОГО ВРЕМЕНИ НОВОГО ОКНА ЗАКАЗА									*
************************************************************************************************************************/
	let popup_zakaz_time = document.createElement('div');
		popup_zakaz_time.className = 'col-md-6 popup_zakaz_time';
		popup_zakaz_time.innerText = 'Время посещения: ';
		popup_zakaz_time.addEventListener('click', setHM)
		function setHM (el) 
		{
			switch (el.path[0].id) {
				case 'setHour':
					setH();
					break;
				case 'setMinutes':
					setM();
					break;
				default:
					//console.log('Невнятные данные времени')
					break;
			}
		}


	let hour = (data.getHours() < 10)?'0'+data.getHours():data.getHours();
	let	popup_zakaz_timeH = document.createElement('input');
		popup_zakaz_timeH.type = 'number';
		popup_zakaz_timeH.id = 'setHour';
		popup_zakaz_timeH.className = 'popup_zakaz_timeH number';
		popup_zakaz_timeH.setAttribute('value', hour)
		popup_zakaz_timeH.setAttribute('min', '0');
		popup_zakaz_timeH.setAttribute('max', '23');
		popup_zakaz_timeH.setAttribute('step', '1');
		popup_zakaz_timeH.style.width = '1.3em';
		popup_zakaz_time.appendChild(popup_zakaz_timeH);
		function setH ()
		{
			let hour_clocks = document.createElement('div');
				hour_clocks.id = 'setH';
				hour_clocks.innerHTML = '<i>08</i><i>09</i><i>10</i><i>11</i><i>12</i><i>13</i><i>14</i><i>15</i><i>16</i><i>17</i><i>18</i><i>19</i><i>20</i><i>21</i><i>22</i><i>23</i>';
				popup_zakaz_time.appendChild(hour_clocks);
				hour_clocks.childNodes.forEach((el)=>{el.addEventListener('click', function(){document.querySelector('#setHour').setAttribute('value', this.innerText);this.parentElement.remove()})})
		}

		popup_zakaz_time.innerHTML = popup_zakaz_time.innerHTML + ' ч : ';
	let min = (data.getMinutes() < 10)?'0'+data.getMinutes():data.getMinutes();
	let	popup_zakaz_timeM = document.createElement('input');
		popup_zakaz_timeM.type = 'number';
		popup_zakaz_timeM.id = 'setMinutes';
		popup_zakaz_timeM.className = 'popup_zakaz_timeM number';
		popup_zakaz_timeM.setAttribute('value', min)
		popup_zakaz_timeM.setAttribute('min', '0');
		popup_zakaz_timeM.setAttribute('max', '59');
		popup_zakaz_timeM.setAttribute('step', '1');
		popup_zakaz_timeM.style.width = '1.3em';
		popup_zakaz_timeM.addEventListener('focus', setM);
		popup_zakaz_time.appendChild(popup_zakaz_timeM);
		popup_zakaz_time.innerHTML = popup_zakaz_time.innerHTML + ' м';
		popup_zakaz_body.appendChild(popup_zakaz_time);
		function setM ()
		{
			let min_clocks = document.createElement('div');
				min_clocks.id = 'setM';
				min_clocks.innerHTML = '<i>00</i><i>05</i><i>10</i><i>15</i><i>20</i><i>25</i><i>30</i><i>35</i><i>40</i><i>45</i><i>50</i><i>55</i>';
				popup_zakaz_time.appendChild(min_clocks);
				min_clocks.childNodes.forEach((el)=>{el.addEventListener('click', function(){document.querySelector('#setMinutes').setAttribute('value', this.innerText);this.parentElement.remove()})})
		}
/************************************************************************************************************************
*												БЛОК ДЛЯ ОТДЕЛЕНИЯ ЭЛЕМЕНТОВ											*
************************************************************************************************************************/		
	
		popup_zakaz_body.appendChild(clear_div);
		popup_zakaz_body.addEventListener('click', function (ev, prevent) {
				//console.log(ev)
			if (event.target != this) {
				//console.log('Дочка')
			} else {
				//console.log('Родитель')
				document.querySelector('#setH')?document.querySelector('#setH').remove():0;
				document.querySelector('#setM')?document.querySelector('#setM').remove():0;
				//popup_zakaz_vidi_rabot_list.innerHTML = '';
			}
		})

/************************************************************************************************************************
*							БЛОК ФИО ЗАКАЗЧИКА С ПОИСКОМ И ДОБАВЛЕНИЕМ НОВОГО 											*
************************************************************************************************************************/
	let popup_zakaz_fio = document.createElement('div'); // БЛОК С ВЫБОРОМ КЛИЕНТА ИЗ СПИСКА И ДОБАВЛЕНИЕМ НОВОГО ПРИ ОТСУТСТВИИ
		popup_zakaz_fio.className = 'col-md-6 popup_zakaz_fio';
		popup_zakaz_fio.setAttribute('id', 'select_client');
		let clients_base_list = document.getElementById('clients'); // КОНТЕЙНЕР СПИСКА КЛИЕНТОВ

			let spisok_conteiner = document.createElement('div'); //КОНТЕЙНЕР ДЛЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ
				spisok_conteiner.className = 'col-md-10 col-md-offset-2 spisok_conteiner';
			for (var i = clients_base_list.length - 1; i >= 0; i--) {
				let spisok = document.createElement('span'); // ГЕНЕРАЦИЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ ДЛЯ ВЫВОДА
					spisok.className = 'col-md-11 col-md-offset-1 popup_zakaz_fio_spisok';
					spisok.innerText = clients_base_list[i].innerText;
					spisok.addEventListener('click', open_list_clients);
					popup_zakaz_fio.appendChild(spisok_conteiner);
					spisok_conteiner.appendChild(spisok);
			}
			function open_list_clients (argument) {		
				popup_zakaz_fio_inp.value = this.innerText;
				this.parentElement.style.display = 'none';
			}

		let popup_zakaz_fio_inp = document.createElement('input'); // ПОЛЕ ВВОДА ФИО КЛИЕНТА С ФУНКЦИЕЙ ПОИСКА
			popup_zakaz_fio_inp.className = 'col-md-10 client_input_fio';
			popup_zakaz_fio_inp.type = 'text';
			popup_zakaz_fio_inp.placeholder = 'Начните ввод ФИО - Ивано..'
			//popup_zakaz_fio.insertBefore(popup_zakaz_fio_inp, popup_zakaz_fio.firstChild);
				/*
				*
				* ДОБАВИМ ИКОНКУ
				*
				**/		
			popup_zakaz_fio_inp.addEventListener('focus', focus_popup_zakaz_fio_inp); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА ФИО 
				function focus_popup_zakaz_fio_inp (argument) {
					let spiski = document.querySelectorAll('.popup_zakaz_fio_spisok');
						spiski[0].parentNode.style.display = 'block';
					for (var i = spiski.length - 1; i >= 0; i--) {
						spiski[i].style.display = 'inline-block';
					}
					let del = document.querySelector('.add_button');
							if (del) {del.remove()}
				}
			popup_zakaz_fio_inp.addEventListener('blur', function(){setTimeout(()=>{spisok_conteiner.style.display = 'none';}, 200)}); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА ФИО 

			popup_zakaz_fio_inp.addEventListener('input', search_client_fio) // ПОИСК КЛИЕНТА В БД, СОПАСТОВЛЕНИЕ С СПИСКОМ 
				function search_client_fio(vvod) {
					if (this.value.search(/[а-яА-ЯёЁ]||[\s]/) != -1) {						
						let del = document.querySelector('.add_button');
							if (del) {del.remove()}

						var spiski = document.querySelectorAll('.popup_zakaz_fio_spisok');
						spiski[0].parentNode.style.display = 'block';

						if (this.value != '') {
							var for_search_clients_REGEXP = new RegExp(this.value, 'gi');
						} else {return}

						for (var i = spiski.length - 1; i >= 0; i--) {
							if (spiski[i].innerText.search(for_search_clients_REGEXP) != -1) {
								spiski[i].style.display = 'inline-block';
								//label_u.children[0].style.color = 'green';
							} else {
								spiski[i].style.display = 'none';
								//label_u.children[0].style.color = 'red';
							}
						}
					}
					if (this.value != '') {						
						for (var i = spiski.length - 1; i >= 0; i--) {
							if (spiski[i].style.display == 'inline-block') {return}
						}
						let new_client_add = document.createElement('span');
							new_client_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
							new_client_add.innerHTML = 'Добавить <i class="fa fa-plus-circle" aria-hidden="true"></i>';
							popup_zakaz_fio.insertBefore(new_client_add, popup_zakaz_fio.lastChild);
							new_client_add.addEventListener('click', create_new_client)

					}
				}
			let label_u = document.createElement('label');
				label_u.classList.add('col-md-12');
				label_u.innerHTML = '<i class="fa fa-id-card-o col-md-2" aria-hidden="true"></i>';
				label_u.appendChild(popup_zakaz_fio_inp)
				popup_zakaz_fio.insertBefore(label_u, popup_zakaz_fio.firstChild);
/************************************************************************************************************************
*										ОКНО ДОБАВЛЕНИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ 											*
************************************************************************************************************************/
				function create_new_client (argument) {
					let create_new_person = document.createElement('div');
						create_new_person.className = 'create_new_person';
						popup_zakaz_body.classList.add('HIDE_ON_TIME');
						popup_zakaz.appendChild(create_new_person)
						create_new_person.innerHTML = '<h3><i class="fa fa-info" aria-hidden="true"></i> Создание нового клиента</h3>';						
						sauto.insert_hr(create_new_person);
						sauto.create_close_button(create_new_person, 'second'); // Добавляем кнопочку закрыть

						sauto.insert_clear_block(create_new_person);

					let icon_new_user = document.createElement('div');
						icon_new_user.className = 'col-md-2';
						icon_new_user.style.fontSize = '6em';
						icon_new_user.innerHTML = '<i class="fa fa-user-plus" aria-hidden="true"></i>';
						create_new_person.appendChild(icon_new_user);


					let create_new_person_inpblock = document.createElement('div');
						create_new_person_inpblock.className = 'col-md-8';
						create_new_person.appendChild(create_new_person_inpblock);
					


					let create_new_person_family = sauto.create_input('text', 'person_family','family_new_person', 'col-md-12 input mBottomInp', 'Фамилия'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ИМЕНИ
						create_new_person_inpblock.appendChild(create_new_person_family)

					let create_new_person_name = sauto.create_input('text', 'person_name','name_new_person', 'col-md-12 input mBottomInp', 'Имя'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ИМЕНИ
						create_new_person_inpblock.appendChild(create_new_person_name)

					let create_new_person_otchestvo = sauto.create_input('text', 'person_otchestvo','otchestvo_new_person', 'col-md-12 input mBottomInp', 'Отчество (при наличии)'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_otchestvo)

					let create_new_person_auto =sauto.create_input('text', 'person_auto','auto_new_person', 'col-md-12 input mBottomInp', 'Автомобиль'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_auto);

						sauto.insert_clear_block(create_new_person);
						sauto.insert_hr(create_new_person);

					let create_new_person_phone = sauto.create_input('text', 'person_phone','phone_new_person', 'col-md-4 col-md-offset-1 input mBottomInp', 'Номер телефона [ +7 (999) 999-99-99 ]'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person.appendChild(create_new_person_phone)

					let create_new_person_email =sauto.create_input('text', 'person_email','email_new_person', 'col-md-4 col-md-offset-1 input mBottomInp', 'Почта e-mail'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person.appendChild(create_new_person_email)

						sauto.insert_clear_block(create_new_person);

					let	create_new_person_save = sauto.create_new_button('create_new_person_save', 'btn', 'save');

						create_new_person_save.addEventListener('mouseover', function () {
							if (create_new_person_family.value != '' && create_new_person_name.value != '' && create_new_person_phone.value != '') {
								this.classList.add('btn-success')
								this.style.cursor = 'pointer';
								this.addEventListener('mouseout', function () {this.classList.remove('btn-success')})
								this.addEventListener('click', function () {
									this.parentElement.remove();
									sauto.success_window('Новый пользователь');
									popup_zakaz_body.classList.remove('HIDE_ON_TIME');
									let buffer = create_new_person_family.value +' '+ create_new_person_name.value+' '+ create_new_person_otchestvo.value;
										popup_zakaz_fio_inp.value = buffer;
								})											
							}
							else {
									this.classList.add('btn-warning')
									this.classList.add('disabled')
									this.style.cursor = 'no-drop';
								let err = document.createElement('span');
									err.classList = 'err';
									err.innerHTML = '<strong style="color:red">Заполните обязательные поля:</strong>';
									create_new_person_family.value == '' ? err.children[0].innerText = err.innerText + '| -Фамилия- |' : false;
									create_new_person_name.value == '' ? err.children[0].innerText = err.innerText + ' -Имя- |' : false;										
									create_new_person_phone.value == '' ? err.children[0].innerText = err.innerText + ' -Номер телефона- |' : false;
									create_new_person.appendChild(err);
									this.addEventListener('mouseout', function () {err.remove();this.classList.remove('btn-warning');this.classList.remove('disabled')})
							}
						})
							
						create_new_person_save.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить';
						create_new_person.appendChild(create_new_person_save);


				}
/************************************************************************************************************************
*					БЛОК МОДЕЛИ АВТО ЗАКАЗЧИКА С ПОИСКОМ И ДОБАВЛЕНИЕМ НОВОГО 											*
************************************************************************************************************************/				
/************************************************************************************************************************
*												БЛОК ДЛЯ ОТДЕЛЕНИЯ ЭЛЕМЕНТОВ											*
************************************************************************************************************************/		
	
		popup_zakaz_body.appendChild(clear_div);
/************************************************************************************************************************
*								БЛОК ФИРМЫ АВТО С ПОИСКОМ И ДОБАВЛЕНИЕМ НОВОГО 											*
************************************************************************************************************************/
	let popup_zakaz_auto_firm = document.createElement('div'); // БЛОК С ВЫБОРОМ КЛИЕНТА ИЗ СПИСКА И ДОБАВЛЕНИЕМ НОВОГО ПРИ ОТСУТСТВИИ
		popup_zakaz_auto_firm.className = 'col-md-6 popup_zakaz_auto_firm';
		popup_zakaz_auto_firm.setAttribute('id', 'select_client_car');
		let auto_firm_base_list = document.getElementById('auto_firm'); // КОНТЕЙНЕР СПИСКА КЛИЕНТОВ

			let spisok_conteiner_auto = document.createElement('div'); //КОНТЕЙНЕР ДЛЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ
				spisok_conteiner_auto.className = 'col-md-12 spisok_conteiner_auto';
			for (var i = auto_firm_base_list.length - 1; i >= 0; i--) {
				let spisok = document.createElement('span'); // ГЕНЕРАЦИЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ ДЛЯ ВЫВОДА
					spisok.className = 'col-md-11 col-md-offset-1 popup_zakaz_auto_firm_spisok';
					spisok.innerText = auto_firm_base_list[i].innerText;
					spisok.addEventListener('click', open_list_auto_firm);
					popup_zakaz_auto_firm.appendChild(spisok_conteiner_auto);
					spisok_conteiner_auto.appendChild(spisok);
			}
			function open_list_auto_firm (argument) {		
				popup_zakaz_auto_firm_inp.value = this.innerText;
				this.parentElement.style.display = 'none';
			}

		let popup_zakaz_auto_firm_inp = document.createElement('input'); // ПОЛЕ ВВОДА ФИО КЛИЕНТА С ФУНКЦИЕЙ ПОИСКА
			popup_zakaz_auto_firm_inp.className = 'col-md-10 client_input_fio';
			popup_zakaz_auto_firm_inp.type = 'text';
			popup_zakaz_auto_firm_inp.placeholder = 'Начните ввод фирмы авто - Toyo..'
			//popup_zakaz_auto_firm.insertBefore(popup_zakaz_auto_firm_inp, popup_zakaz_auto_firm.firstChild);
				/*
				*
				* ДОБАВИМ ИКОНКУ
				*
				**/		
			popup_zakaz_auto_firm_inp.addEventListener('focus', focus_popup_zakaz_auto_firm_inp); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА ФИО 
				function focus_popup_zakaz_auto_firm_inp (argument) {
					let spiski = document.querySelectorAll('.popup_zakaz_auto_firm_spisok');
						spiski[0].parentNode.style.display = 'block';
					for (var i = spiski.length - 1; i >= 0; i--) {
						spiski[i].style.display = 'inline-block';
					}
					let del = document.querySelector('.add_button');
							if (del) {del.remove()}
				}
			popup_zakaz_auto_firm_inp.addEventListener('blur', function(){setTimeout(()=>{spisok_conteiner_auto.style.display = 'none';}, 200)});

			popup_zakaz_auto_firm_inp.addEventListener('input', search_auto_firm) // ПОИСК КЛИЕНТА В БД, СОПАСТОВЛЕНИЕ С СПИСКОМ 
				function search_auto_firm(vvod) {
					if (this.value.search(/[а-яА-ЯёЁ]||[\s]/) != -1) {

						let del = document.querySelector('.add_button');
							if (del) {del.remove()}

						var spiski = document.querySelectorAll('.popup_zakaz_auto_firm_spisok');
						spiski[0].parentNode.style.display = 'block';

						if (this.value != '') {
							var for_search_auto_firm_REGEXP = new RegExp(this.value, 'gi');
						} else {return}

						for (var i = spiski.length - 1; i >= 0; i--) {
							if (spiski[i].innerText.search(for_search_auto_firm_REGEXP) != -1) {
								spiski[i].style.display = 'inline-block';
							} else {spiski[i].style.display = 'none'}
						}
					}
					if (this.value != '') {
						for (var i = spiski.length - 1; i >= 0; i--) {
							if (spiski[i].style.display == 'inline-block') {return}
						}
						let new_client_add = document.createElement('span');
							new_client_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
							new_client_add.innerHTML = 'Добавить <i class="fa fa-plus-circle" aria-hidden="true"></i>';
							popup_zakaz_auto_firm.insertBefore(new_client_add, popup_zakaz_auto_firm.lastChild);
							new_client_add.addEventListener('click', create_new_auto_firm)

					}
				}
			let label_af = document.createElement('label');
				label_af.classList.add('col-md-12');
				label_af.innerHTML = '<i class="fa fa-car col-md-2" aria-hidden="true"></i>';
				label_af.appendChild(popup_zakaz_auto_firm_inp)
				popup_zakaz_auto_firm.insertBefore(label_af, popup_zakaz_auto_firm.firstChild);

/************************************************************************************************************************
*										ОКНО ДОБАВЛЕНИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ 											*
************************************************************************************************************************/
				function create_new_auto_firm (argument) {
					let create_new_firm_auto = document.createElement('div');
						create_new_firm_auto.className = 'create_new';
						popup_zakaz_body.classList.add('HIDE_ON_TIME');
						popup_zakaz.appendChild(create_new_firm_auto)
						create_new_firm_auto.innerHTML = '<h3><i class="fa fa-info" aria-hidden="true"></i> Добавление фирмы производителя авто</h3>';						
						sauto.insert_hr(create_new_firm_auto);
						sauto.create_close_button(create_new_firm_auto, 'second'); // Добавляем кнопочку закрыть

						sauto.insert_clear_block(create_new_firm_auto);

					let icon_new_user = document.createElement('div');
						icon_new_user.className = 'col-md-2';
						icon_new_user.style.fontSize = '6em';
						icon_new_user.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>';
						create_new_firm_auto.appendChild(icon_new_user);

					let create_new_firm_auto_name_inpblock = document.createElement('div');
						create_new_firm_auto_name_inpblock.className = 'col-md-8';
						create_new_firm_auto.appendChild(create_new_firm_auto_name_inpblock);

					let create_new_firm_auto_name = sauto.create_input('text', 'firm_auto_name','new_firm_auto_name', 'col-md-12 input mBottomInp', 'Производитель авто - Toyota')
					let create_new_firm_auto_model = sauto.create_input('text', 'auto_model','new_firm_auto_model', 'col-md-12 input mBottomInp', 'Модель авто - Corolla')

						create_new_firm_auto_name_inpblock.appendChild(create_new_firm_auto_name)
						create_new_firm_auto_name_inpblock.appendChild(create_new_firm_auto_model)


						sauto.insert_clear_block(create_new_firm_auto);
						sauto.insert_hr(create_new_firm_auto);

						sauto.insert_clear_block(create_new_firm_auto);

					let create_new_firm_auto_save = document.createElement('button');
						create_new_firm_auto_save.classList = 'btn';
						create_new_firm_auto_save.id = 'reate_new_person_save';						
							create_new_firm_auto_save.addEventListener('mouseover', function () {
								if (create_new_firm_auto_name.value != '' && create_new_firm_auto_model.value != '') {
									this.classList.add('btn-success')
									this.style.cursor = 'pointer';
									this.addEventListener('mouseout', function () {this.classList.remove('btn-success')})
									this.addEventListener('click', function () {
										this.parentElement.remove();
										sauto.success_window('Новый автомобиль');
										popup_zakaz_body.classList.remove('HIDE_ON_TIME');
									let buffer = create_new_firm_auto_name.value +' '+ create_new_firm_auto_model.value;
										popup_zakaz_auto_firm_inp.value = buffer;
									});
								}
								else {
										this.classList.add('btn-warning')
										this.classList.add('disabled')
										this.style.cursor = 'no-drop';
									let err = document.createElement('span');
										err.classList = 'err';
										err.innerHTML = '<strong style="color:red">Заполните поле:</strong>';
										create_new_firm_auto_name.value == '' ? err.children[0].innerText = err.innerText + ' -производителя-' : false;										
										create_new_firm_auto_model.value == '' ? err.children[0].innerText = err.innerText + ' -модели- ' : false;
										create_new_firm_auto.appendChild(err);
										this.addEventListener('mouseout', function () {err.remove();this.classList.remove('btn-warning');this.classList.remove('disabled')})
								}
							})
							
						create_new_firm_auto_save.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить';
						create_new_firm_auto.appendChild(create_new_firm_auto_save);


				}
/************************************************************************************************************************
*												Поле ввода видов работ													*
************************************************************************************************************************/
			let popup_zakaz_vidi_rabot = document.createElement('div');
				popup_zakaz_vidi_rabot.className = 'col-md-6 popup_zakaz_vidi_rabot';
				popup_zakaz_vidi_rabot.style = 'margin-top:1em';
			let popup_zakaz_vidi_rabot_label = document.createElement('label');
				popup_zakaz_vidi_rabot_label.classList.add('col-md-12');
				popup_zakaz_vidi_rabot_label.innerHTML = '<i class="fa fa-list-ol col-md-2" aria-hidden="true"></i>';
				popup_zakaz_vidi_rabot_label.children[0].style.cursor = 'pointer';
			let popup_zakaz_vidi_rabot_search = sauto.create_input('text', 'vidi_rabot', 'vidi_rabot', 'col-md-10 vidi_rabot', 'Введите вид работы');
				popup_zakaz_vidi_rabot_search.addEventListener('input', search_vidi_rabot)


				popup_zakaz_vidi_rabot_label.appendChild(popup_zakaz_vidi_rabot_search);
				popup_zakaz_vidi_rabot.appendChild(popup_zakaz_vidi_rabot_label);

			let popup_zakaz_vidi_rabot_list = document.createElement('div');
				popup_zakaz_vidi_rabot_list.id = 'list_rabot';
				popup_zakaz_vidi_rabot_list.style.clear = 'both';
				popup_zakaz_vidi_rabot_list.className = 'col-md-6 col-md-offset-6';
				popup_zakaz_vidi_rabot_list.style.backgroundColor = '#ССС';


			let add_rabota_icon = document.createElement('i');
				add_rabota_icon.className = 'fa fa-plus-circle add_this_work';
				add_rabota_icon.setAttribute('aria-hidden', 'true');

			let del_rabota_icon = document.createElement('i');
				del_rabota_icon.className = 'fa fa-trash-o del_this_work';
				del_rabota_icon.setAttribute('aria-hidden', 'true');


			let popup_zakaz_vidi_rabot_viborka = document.createElement('div');
				popup_zakaz_vidi_rabot_viborka.id = 'viborka_rabot';
				popup_zakaz_vidi_rabot_viborka.className = 'col-md-6';
				popup_zakaz_vidi_rabot_viborka.style.backgroundColor = '#ССС';


			let	list_of_works = document.querySelector('#works');
				list_of_works.childNodes.forEach(function (element, index) {
				        if (element.nodeName == '#text') {
				            return;
				        } else {
				            let s = document.createElement('span');			                    	
			                 	s.innerText = element.innerText;
			                   	s.insertBefore(add_rabota_icon.cloneNode(true), s.firstChild);
			                popup_zakaz_vidi_rabot_list.appendChild(s);
			                   	s.firstChild.addEventListener('click', function () {
			                   		popup_zakaz_vidi_rabot_viborka.appendChild(this.parentElement);
			                   		popup_zakaz_vidi_rabot_viborka.lastChild.removeChild(popup_zakaz_vidi_rabot_viborka.lastChild.firstChild);
			                   		popup_zakaz_vidi_rabot_viborka.lastChild.insertBefore(del_rabota_icon.cloneNode(true), popup_zakaz_vidi_rabot_viborka.lastChild.firstChild).addEventListener('click', function () {
			                   			this.parentElement.parentElement.removeChild(this.parentElement)
			                   		});
			                   	})
				            }
			    	});

				popup_zakaz_vidi_rabot_label.children[0].addEventListener('click', function () {
					if (popup_zakaz_vidi_rabot_list.innerHTML != '') {return}
					list_of_works.childNodes.forEach(function (element, index) {
				        if (element.nodeName == '#text') {
				            return;
				        } else {
				            let s = document.createElement('span');			                    	
			                 	s.innerText = element.innerText;
			                   	s.insertBefore(add_rabota_icon.cloneNode(true), s.firstChild);
			                popup_zakaz_vidi_rabot_list.appendChild(s);
			                   	s.firstChild.addEventListener('click', function () {
			                   		popup_zakaz_vidi_rabot_viborka.appendChild(this.parentElement);
			                   		popup_zakaz_vidi_rabot_viborka.lastChild.removeChild(popup_zakaz_vidi_rabot_viborka.lastChild.firstChild);
			                   		popup_zakaz_vidi_rabot_viborka.lastChild.insertBefore(del_rabota_icon.cloneNode(true), popup_zakaz_vidi_rabot_viborka.lastChild.firstChild).addEventListener('click', function () {
			                   			this.parentElement.parentElement.removeChild(this.parentElement)
			                   		});
			                   	})
				            }
			    	});
				})
				

			function search_vidi_rabot() {
			    /*if (this.value.length < 1) {
			        popup_zakaz_vidi_rabot_list.innerHTML = '';
			    }*/


			    if (this.value.search(/[а-яА-ЯёЁ]||[\s]/) != -1) {

			        let del = document.querySelector('.add_button');
			        if (del) { del.remove() }


			        if (this.value != '') {
			            var for_search_list_work_REGEXP = new RegExp(this.value, 'gi');
			            popup_zakaz_vidi_rabot_list.innerHTML = '';
			        } else { return }

			        list_of_works.childNodes.forEach(function(element, index) {
			            if (element.nodeName == '#text') {
			                return;
			            } else {
			                let patt = element.innerText;
			                if (patt.search(for_search_list_work_REGEXP) != -1) {
			                    let s = document.createElement('span');			                    	
			                    	s.innerText = element.innerText;
			                    	s.insertBefore(add_rabota_icon.cloneNode(true), s.firstChild);
			                    popup_zakaz_vidi_rabot_list.appendChild(s);
			                    	s.firstChild.addEventListener('click', function () {
			                    		popup_zakaz_vidi_rabot_viborka.appendChild(this.parentElement);
			                    		popup_zakaz_vidi_rabot_viborka.lastChild.removeChild(popup_zakaz_vidi_rabot_viborka.lastChild.firstChild);
			                    		popup_zakaz_vidi_rabot_viborka.lastChild.insertBefore(del_rabota_icon.cloneNode(true), popup_zakaz_vidi_rabot_viborka.lastChild.firstChild).addEventListener('click', function () {
			                    			this.parentElement.parentElement.removeChild(this.parentElement)
			                    		});
			                    	})
			                }
			            }
			        });
			    }
			    if (this.value != '') {

			    	for (let i=0; i<list_of_works.length; i++)
			    	{
			    		if (popup_zakaz_vidi_rabot_list.innerHTML != '') {
			    			console.log('Yes')
			    			return;
			    		}
			    		else {
			    			let new_work_add = document.createElement('span');
								new_work_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
								new_work_add.innerHTML = 'Добавить услугу <i class="fa fa-plus-circle" aria-hidden="true"></i>';
								popup_zakaz_vidi_rabot.appendChild(new_work_add);
								new_work_add.addEventListener('click', create_new_work)
			    			return;
			    		}
			    	}
			    }
			}

			function create_new_work (argument) {
					let create_new_work = document.createElement('div');
						create_new_work.className = 'create_new';
						popup_zakaz_body.classList.add('HIDE_ON_TIME');
						popup_zakaz.appendChild(create_new_work)
						create_new_work.innerHTML = '<h3><i class="fa fa-info" aria-hidden="true"></i> Добавление услуги, вида работ или товара</h3>';						
						sauto.insert_hr(create_new_work);
						sauto.create_close_button(create_new_work, 'second'); // Добавляем кнопочку закрыть

						sauto.insert_clear_block(create_new_work);

					let icon_new_work = document.createElement('div');
						icon_new_work.className = 'col-md-2';
						icon_new_work.style.fontSize = '6em';
						icon_new_work.innerHTML = '<i class="fa fa-cogs" aria-hidden="true"></i>';
						create_new_work.appendChild(icon_new_work);

					let create_new_work_name_inpblock = document.createElement('div');
						create_new_work_name_inpblock.className = 'col-md-8';
						create_new_work.appendChild(create_new_work_name_inpblock);

					let create_new_work_name = sauto.create_input('text', 'work_name','new_work_name', 'col-md-12 input mBottomInp', 'Введите наименование')
					let create_new_work_model = sauto.create_input('text', 'auto_model','new_work_model', 'col-md-12 input mBottomInp', 'Стоимость без пробелов')
						create_new_work_name.value = popup_zakaz_vidi_rabot_search.value;

						create_new_work_name_inpblock.appendChild(create_new_work_name)
						create_new_work_name_inpblock.appendChild(create_new_work_model)


						sauto.insert_clear_block(create_new_work);
						sauto.insert_hr(create_new_work);

						sauto.insert_clear_block(create_new_work);

					let create_new_work_save = document.createElement('button');
						create_new_work_save.classList = 'btn';
						create_new_work_save.id = 'reate_new_person_save';						
							create_new_work_save.addEventListener('mouseover', function () {
								if (create_new_work_name.value != '' && create_new_work_model.value != '') {
									this.classList.add('btn-success')
									this.style.cursor = 'pointer';
									this.addEventListener('mouseout', function () {this.classList.remove('btn-success')})
									this.addEventListener('click', function () {
										this.parentElement.remove();
										sauto.success_window('Новая услуга, товар');
										popup_zakaz_body.classList.remove('HIDE_ON_TIME');
										let s = document.createElement('span');			                    	
					                    	s.innerText = create_new_work_name.value;
					                    	s.insertBefore(del_rabota_icon.cloneNode(true), s.firstChild);
					                    popup_zakaz_vidi_rabot_viborka.appendChild(s);
					                    s.firstChild.addEventListener('click', function () {
			                    			this.parentElement.parentElement.removeChild(this.parentElement)
			                    		})
									});
								}
								else {
										this.classList.add('btn-warning')
										this.classList.add('disabled')
										this.style.cursor = 'no-drop';
									let err = document.createElement('span');
										err.classList = 'err';
										err.innerHTML = '<strong style="color:red">Заполните поле:</strong>';
										create_new_work_name.value == '' ? err.children[0].innerText = err.innerText + ' -наименование-' : false;										
										create_new_work_model.value == '' ? err.children[0].innerText = err.innerText + ' -стоимость- ' : false;
										create_new_work.appendChild(err);
										this.addEventListener('mouseout', function () {err.remove();this.classList.remove('btn-warning');this.classList.remove('disabled')})
								}
							})
							
						create_new_work_save.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить';
						create_new_work.appendChild(create_new_work_save);


				}




























		popup_zakaz_body.appendChild(popup_zakaz_fio);
		popup_zakaz_body.appendChild(popup_zakaz_auto_firm);
		popup_zakaz_body.appendChild(popup_zakaz_vidi_rabot);
	let zag2 = document.createElement('h4');
		zag2.style.marginTop = '.2em';
		zag2.className = 'col-md-6';
		zag2.innerText = 'Виды работ:';		
		popup_zakaz_body.appendChild(zag2);
		popup_zakaz_body.appendChild(popup_zakaz_vidi_rabot_viborka);
	let zag = document.createElement('h4');
		zag.style.marginTop = '1.2em';
		zag.className = 'col-md-6 col-md-offset-6';
		zag.innerText = 'Популярные виды работ:';
		popup_zakaz_body.appendChild(zag);
		popup_zakaz_body.appendChild(popup_zakaz_vidi_rabot_list);
		sauto.insert_clear_block(popup_zakaz_body);
	













	/*let popup_zakaz_button = document.createElement('button');
		popup_zakaz_button.className = 'btn popup_zakaz_button';
		popup_zakaz_button.innerText = 'Создать';
		popup_zakaz_body.appendChild(popup_zakaz_button);*/












	document.body.appendChild(popup_zakaz);
	close_popup();
}


var sauto = {
	create_close_button : (conteiner/*БЛОК КУДА ДОБАВЛЯЕТСЯ КНОПКА ЗАКРЫТЬ*/, wind)=>{
		let	popup_close = document.createElement('span');
		popup_close.className = 'popup_close';
		popup_close.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';	
		conteiner.appendChild(popup_close)
		close_popup(wind)
	},
	insert_clear_block: (conteiner/*БЛОК ДЛЯ ОТМЕНЫ ГОРИЗОНТАЛЬНОЙ ОБТЕКАЕМОСТИ ЭЛЕМЕНТОВ*/)=>{
		let clear = document.createElement('div');
			clear.style.clear = 'both';
			conteiner.appendChild(clear);
	},
	insert_hr: (conteiner)=>{
		let hr = document.createElement('hr');
			hr.className = 'hr';
			conteiner.appendChild(hr)
	},
	success_window: (check_event)=>{
		switch (check_event) {
			case 'Новый пользователь':
				var event_info = 'Карточка клиента сохранена'
				break;
			case 'Новый автомобиль':
				var event_info = 'Модель автомобиля сохранена'
				break;
			case 'Новая услуга, товар':
				var event_info = 'Карточка товара успешно сохранена'
				break;
			default:
				event_info = 'Неизвестное событие сохранено'
				break;
		}
		let success_w = document.createElement('div');
			success_w.className = 'info_window success_w';
			success_w.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> '+event_info;
			document.body.appendChild(success_w);
			setTimeout(()=>{success_w.classList.add('success_w_out')}, 6000)
			setTimeout(()=>{success_w.remove()}, 10000)
	},
	create_input: (type_input /* string */, identif, name_inp/** string **/, class_name/** string **/, placeholder/** string **/)=>{
		let create_new_input = document.createElement('input'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ИМЕНИ
			identif ? create_new_input.id = identif : 0;
			create_new_input.type = type_input;
			create_new_input.name = name_inp;
			create_new_input.placeholder = placeholder;
			create_new_input.className = class_name;
			return create_new_input;
	},
	create_new_button: (identificator, class_name, type_button, text_on_btn)=>{
		let create_new_button = document.createElement('button');
			create_new_button.classList = 'btn';
			create_new_button.id = 'reate_new_person_save';
			switch (type_button) {
				case 'save':
					create_new_button.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i> '+text_on_btn;
					break;
				default:
					create_new_button.innerText = text_on_btn;
					break;
			}
			return create_new_button;
	}
}

function close_popup (wind)
	{
		var closers = document.querySelectorAll('.popup_close')
		for (var i = closers.length - 1; i >= 0; i--) {
			closers[i].addEventListener('click', zakaz_close);
		}
		function zakaz_close () {
			switch (wind) {
				case 'second':
					this.parentElement.parentElement.removeChild(this.parentElement);
					document.querySelector('.popup_zakaz_body').classList.remove('HIDE_ON_TIME');
					break;
				default:
					this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
					break;
			}
		}
	}