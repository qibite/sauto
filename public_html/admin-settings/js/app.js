var raspisanie = document.getElementsByClassName('raspisanie');
var month = document.querySelector('caption.month');
var day = document.querySelectorAll('.day');
var month_arr = new Array(
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
	);

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
var toogle_window;
/************************************************************************************************************************
*																														*
*											СОЗДАНИЕ НОВОГО ОКНА ЗАКАЗА НА РАБОТЫ										*
*																														*
************************************************************************************************************************/
function click_on_day () {
	toogle_window = 'incident_window';
	let data = new Date()
	zayavka.timestart.year = zayavka.timeplaneend.year = zayavka.timeend.year = data.getFullYear();
	let that_day = this;
	let clear_div = document.createElement('div');
		clear_div.style.clear = 'both';
		clear_div.style.height = '1em';


	month_arr.findIndex(function(el, indx, arr){
		if (el.toLowerCase() == month.innerText.toLowerCase()) {
			console.log(arr[indx]);
			zayavka.timestart.month = indx;
			return
		}
	})
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
		popup_zakaz_body.innerHTML = popup_zakaz_body.innerHTML+'<h3><i class="fa fa-info-circle" aria-hidden="true"></i> Запись на ' + that_day.firstChild.innerText + ' '+ return_month(month) +'</h3>';
		zayavka.timestart.date = that_day.firstChild.innerText;
		//sauto.insert_hr(popup_zakaz_body)
/************************************************************************************************************************
*									УСТАНОВКА НАЗНАЧЕНОГО ВРЕМЕНИ НОВОГО ОКНА ЗАКАЗА									*
************************************************************************************************************************/
	let popup_zakaz_time = document.createElement('div');
		popup_zakaz_time.className = 'col-md-6 popup_zakaz_time';
		popup_zakaz_time.innerText = 'Время начала работ: ';
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


	let hour = zayavka.timestart.hour = (data.getHours() < 10)?'0'+data.getHours():data.getHours();  
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
				hour_clocks.childNodes.forEach((el)=>{el.addEventListener('click', function(){document.querySelector('#setHour').setAttribute('value', this.innerText);zayavka.timestart.hour=this.innerText;this.parentElement.remove()})})
		}

		popup_zakaz_time.innerHTML = popup_zakaz_time.innerHTML + ' ч : ';
	let min = zayavka.timestart.minutes = (data.getMinutes() < 10)?'0'+data.getMinutes():data.getMinutes();
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
				min_clocks.childNodes.forEach((el)=>{el.addEventListener('click', function(){document.querySelector('#setMinutes').setAttribute('value', this.innerText);zayavka.timestart.minutes=this.innerText;this.parentElement.remove()})})
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
				list_masters.style.display = 'none';
				//popup_zakaz_vidi_rabot_list.innerHTML = '';
			}
		})

/************************************************************************************************************************
*							БЛОК ФИО ЗАКАЗЧИКА С ПОИСКОМ И ДОБАВЛЕНИЕМ НОВОГО 											*
************************************************************************************************************************/
	let popup_zakaz_fio = document.createElement('div'); // БЛОК С ВЫБОРОМ КЛИЕНТА ИЗ СПИСКА И ДОБАВЛЕНИЕМ НОВОГО ПРИ ОТСУТСТВИИ
		popup_zakaz_fio.className = 'col-md-4 popup_zakaz_fio';
		popup_zakaz_fio.setAttribute('id', 'select_client');
		let clients_base_list = document.getElementById('clients'); // КОНТЕЙНЕР СПИСКА КЛИЕНТОВ

			let spisok_conteiner = document.createElement('div'); //КОНТЕЙНЕР ДЛЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ
				spisok_conteiner.className = 'col-md-9 col-md-offset-2 spisok_conteiner';
			for (var i = clients_base_list.length - 1; i >= 0; i--) {
				let spisok = document.createElement('span'); // ГЕНЕРАЦИЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ ДЛЯ ВЫВОДА
					spisok.className = 'col-md-12 popup_zakaz_fio_spisok';
					spisok.setAttribute('data-idman', clients_base_list.children[i].getAttribute('data-idman'))
					spisok.setAttribute('data-idcar-idman', clients_base_list.children[i].getAttribute('data-idcar-idman'))
					spisok.setAttribute('data-phoneman', clients_base_list.children[i].getAttribute('data-phoneman'))
					spisok.setAttribute('data-idcar-idman-year', clients_base_list.children[i].getAttribute('data-idcar-idman-year'))
					spisok.innerText = clients_base_list[i].innerText;
					spisok.addEventListener('click', open_list_clients);
					popup_zakaz_fio.appendChild(spisok_conteiner);
					spisok_conteiner.appendChild(spisok);
			}
			function open_list_clients (argument) {
				zayavka.client = this.getAttribute('data-idman');
				zayavka.car = this.getAttribute('data-idcar-idman');
				popup_zakaz_fio_inp.value = this.innerText;
				this.parentElement.style.display = 'none';
				popup_zakaz_auto_firm_inp.value = document.querySelector('.spisok_conteiner_auto span[data-idcar="'+this.getAttribute('data-idcar-idman')+'"]').innerText;
				document.getElementById('year_car').value = zayavka.yearcar = this.getAttribute('data-idcar-idman-year');
				document.getElementById('phone_client').value = /*zayavka.phone = */this.getAttribute('data-phoneman');
			}

		let popup_zakaz_fio_inp = document.createElement('input'); // ПОЛЕ ВВОДА ФИО КЛИЕНТА С ФУНКЦИЕЙ ПОИСКА
			popup_zakaz_fio_inp.className = 'col-md-10 client_input_fio';
			popup_zakaz_fio_inp.type = 'text';
			popup_zakaz_fio_inp.placeholder = 'Клиент'
			//popup_zakaz_fio.insertBefore(popup_zakaz_fio_inp, popup_zakaz_fio.firstChild);
				/*
				*
				* ДОБАВИМ ИКОНКУ
				*
				**/		
			popup_zakaz_fio_inp.addEventListener('focus', focus_popup_zakaz_fio_inp); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА ФИО 
				function focus_popup_zakaz_fio_inp (argument) {
					if (document.querySelectorAll('.popup_zakaz_fio_spisok').length > 0) {
						let spiski = document.querySelectorAll('.popup_zakaz_fio_spisok');
							spiski[0].parentNode.style.display = 'block';
						for (var i = spiski.length - 1; i >= 0; i--) {
							spiski[i].style.display = 'inline-block';
						}
						let del = document.querySelector('.add_button');
								if (del) {del.remove()}
					}					
				}
			popup_zakaz_fio_inp.addEventListener('blur', function(){setTimeout(()=>{spisok_conteiner.style.display = 'none';}, 200)}); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА ФИО 

			popup_zakaz_fio_inp.addEventListener('input', search_client_fio) // ПОИСК КЛИЕНТА В БД, СОПАСТОВЛЕНИЕ С СПИСКОМ 
				function search_client_fio(vvod) {
					if (document.querySelectorAll('.popup_zakaz_fio_spisok').length <= 0) {
						let new_client_add = document.createElement('span');
							new_client_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
							new_client_add.innerHTML = 'Добавить <i class="fa fa-plus-circle" aria-hidden="true"></i>';
							popup_zakaz_fio.insertBefore(new_client_add, popup_zakaz_fio.lastChild);
							toogle_window = 'new_client_window';
							new_client_add.addEventListener('click', create_new_client)
					}
					else if (this.value.search(/[а-яА-ЯёЁ]||[\s]/) != -1 && document.querySelectorAll('.popup_zakaz_fio_spisok').length > 0) {						
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
					if (this.value != '' && document.querySelectorAll('.popup_zakaz_fio_spisok').length > 0) {						
						for (var i = spiski.length - 1; i >= 0; i--) {
							if (spiski[i].style.display == 'inline-block') {return}
						}
						let new_client_add = document.createElement('span');
							new_client_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
							new_client_add.innerHTML = 'Добавить <i class="fa fa-plus-circle" aria-hidden="true"></i>';
							popup_zakaz_fio.insertBefore(new_client_add, popup_zakaz_fio.lastChild);
							toogle_window = 'new_client_window';
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
					


					let create_new_person_family = sauto.create_input('text', 'person_family','family_new_person', 'col-md-12 input mBottomInp', 'Фамилия *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ИМЕНИ
						create_new_person_inpblock.appendChild(create_new_person_family);
						create_new_person_family.addEventListener('blur', succ_input);

					let create_new_person_name = sauto.create_input('text', 'person_name','name_new_person', 'col-md-12 input mBottomInp', 'Имя *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ИМЕНИ
						create_new_person_inpblock.appendChild(create_new_person_name)
						create_new_person_name.addEventListener('blur', succ_input);

					let create_new_person_otchestvo = sauto.create_input('text', 'person_otchestvo','otchestvo_new_person', 'col-md-12 input mBottomInp', 'Отчество'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_otchestvo)

					let container_for_avto = document.createElement('div');
						container_for_avto.className = 'row col-md-8 container_new_avto';
						create_new_person_inpblock.appendChild(container_for_avto);

					let create_new_person_auto =sauto.create_input('text', 'person_auto','auto_new_person', 'col-md-12 input mBottomInp', 'Автомобиль *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА АВТОМОБИЛЯ
						container_for_avto.appendChild(create_new_person_auto);
						create_new_person_auto.addEventListener('focus', getAllCars)
						create_new_person_auto.addEventListener('input', search_client_auto_firm)
						create_new_person_auto.addEventListener('blur', function (argument) {
							setTimeout(()=>{
								document.querySelector('.list_auto_client').style.display = 'none';
							}, 700);
							this.style.borderBottomColor = "#CCCCCC";
							
						})

					let container_for_avto_list_conteiner = document.createElement('div');
						container_for_avto_list_conteiner.className = 'row col-md-10 list_auto_client';
						container_for_avto.appendChild(container_for_avto_list_conteiner);


						
						function getAllCars() {
							let list_container = document.querySelector('.list_auto_client');
							if (list_container.children.length == 0) {
								list_container.style.display = 'block';
								$.get('get-car', function(data) {
									let cars = JSON.parse(data);
									let spisok_auto = new Array();
									cars.forEach((el, i, arr)=>{
										let container_for_avto_list = document.createElement('span');
											container_for_avto_list.style.display = 'inline-block';
											container_for_avto_list.className = 'row col-md-12';
											container_for_avto_list.innerText = el.firm +' '+ el.model;
											container_for_avto_list.setAttribute('data-carid', el.id)
											container_for_avto_list.addEventListener('click', add_auto_client)
											container_for_avto_list_conteiner.appendChild(container_for_avto_list);
									})
								});
							}
							else {list_container.style.display = 'block';document.querySelector('.list_auto_client > span').style.display = 'inline-block';return}
						}

						function add_auto_client (argument) {		
							create_new_person_auto.value = this.innerText;
							create_new_person_auto.setAttribute('data-carid', this.getAttribute('data-carid'))
							this.parentElement.style.display = 'none';
							//console.log(this.getAttribute('data-carid'));
						}

						function search_client_auto_firm(vvod) {
							//console.log(this.value)
							let list_container = document.querySelector('.list_auto_client');
							if (list_container.children.length > 0) {
								if (check_mathes_span(document.querySelector('.list_auto_client'))) {																	
									let car = new RegExp(this.value, 'gi');
									for (let i =0; i < list_container.children.length; i++) {									
										if (list_container.children[i].innerText.search(car) == -1) {
											list_container.children[i].style.display = 'none';
											continue;
										}
										list_container.children[i].style.display = 'inline-block';
										if (document.getElementById('new_client_new_car') != null){document.getElementById('new_client_new_car').remove()}
									}
								}
								else {
									console.log('Create button')
								}
							}
							if (this.value != '') {
								if (check_mathes_span(document.querySelector('.list_auto_client')) || document.getElementById('new_client_new_car') != null) {return}
								let new_client_add = document.createElement('span');
									new_client_add.id = 'new_client_new_car';
									new_client_add.className = 'btn-success add_button col-md-6 col-md-offset-2';
									new_client_add.innerHTML = 'Добавить <i class="fa fa-plus-circle" aria-hidden="true"></i>';
									container_for_avto.insertBefore(new_client_add, container_for_avto.lastChild);									
									new_client_add.addEventListener('click', create_new_auto_firm)

							}

						}
						

					let create_new_person_year =sauto.create_input('text', 'person_year','auto_new_person', 'col-md-3 col-md-offset-1 input mBottomInp', 'Год - 2007 *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_year);
						create_new_person_year.addEventListener('blur', succ_input);

					let create_new_person_auto_gosno =sauto.create_input('text', 'person_auto_gosno','auto_new_person', 'col-md-5 input mBottomInp', 'Гос. номер - x777xx77rus *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_auto_gosno);
						create_new_person_auto_gosno.addEventListener('blur', succ_input);

					let create_new_person_auto_sor =sauto.create_input('text', 'person_auto_sor','auto_new_person', 'col-md-5 col-md-offset-2 input mBottomInp', 'СОР - 77 XX 777777 *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_auto_sor);
						create_new_person_auto_sor.addEventListener('blur', succ_input);

						sauto.insert_clear_block(create_new_person);
						sauto.insert_hr(create_new_person);

					let create_new_person_phone = sauto.create_input('text', 'person_phone','phone_new_person', 'col-md-5 input mBottomInp', 'тел: +7 999 999-99-99 *'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_phone)
						$('#person_phone').mask("+7 (999) 999-99-99");

					let create_new_person_email =sauto.create_input('text', 'person_email','email_new_person', 'col-md-5 col-md-offset-2 input mBottomInp', 'E-mail'); //ДОБАВЛЯЕМ ПОЛЕ ВВОДА ОТЧЕСТВА
						create_new_person_inpblock.appendChild(create_new_person_email)

						sauto.insert_clear_block(create_new_person);

					let	create_new_person_save = sauto.create_new_button('create_new_person_save', 'btn', 'save');

						create_new_person_save.addEventListener('mouseover', function () {
							if (create_new_person_family.value != '' && create_new_person_name.value != '' && create_new_person_phone.value != '' && create_new_person_auto.value != '' && create_new_person_year.value != '' && create_new_person_auto_gosno.value != '' && create_new_person_auto_sor.value != '') {
								this.classList.add('btn-success')
								this.style.cursor = 'pointer';
								this.addEventListener('mouseout', function () {this.classList.remove('btn-success');this.removeEventListener('click', save_new_client_cart_finish)	})
								this.addEventListener('click', save_new_client_cart_finish)											
							}
							else {
									this.classList.add('btn-warning');
									this.classList.add('disabled');
									this.style.cursor = 'no-drop';
								let err = document.createElement('span');
									err.classList = 'err';
									err.innerHTML = '<strong style="color:red">Заполните обязательные поля</strong>';
									create_new_person_family.value == '' ? create_new_person_family.style.borderBottomColor = 'red' : false;
									create_new_person_name.value == '' ? create_new_person_name.style.borderBottomColor = 'red' : false;										
									create_new_person_phone.value == '' ? create_new_person_phone.style.borderBottomColor = 'red': false;
									create_new_person_auto.value == '' ? create_new_person_auto.style.borderBottomColor = 'red': false;
									create_new_person_year.value == '' ? create_new_person_year.style.borderBottomColor = 'red' : false;
									create_new_person_auto_gosno.value == '' ? create_new_person_auto_gosno.style.borderBottomColor = 'red' : false;
									create_new_person_auto_sor.value == '' ? create_new_person_auto_sor.style.borderBottomColor = 'red' : false;
									create_new_person.appendChild(err);
									this.addEventListener('mouseout', function () {err.remove();this.classList.remove('btn-warning');this.classList.remove('disabled')})
							}
						})

						function succ_input (argument) {
							if (this.value != '') {
								this.style.borderBottomColor = '#0fae31';
							}
							else {
								this.style.borderBottomColor = "#CCCCCC";
							}							
						}
						function save_new_client_cart () {
							let data_client = {
								family: create_new_person_family.value,
								name: create_new_person_name.value,
								surname: create_new_person_otchestvo.value,
								phone: create_new_person_phone.value,
								avto_id: create_new_person_auto.getAttribute('data-carid') || ++id_last_car,
								mail: create_new_person_email.value,
								gosno: create_new_person_auto_gosno.value,
								sor: create_new_person_auto_sor.value,
								year: create_new_person_year.value
							}
							zayavka.car = data_client.avto_id;
							$.get('client', data_client, function(data) {
								console.log('Ok!')
								document.querySelector('.add_button').remove();
							});
						}

						function save_new_client_cart_finish () {
							save_new_client_cart();
							this.parentElement.remove();
							sauto.success_window('Новый пользователь');
							popup_zakaz_body.classList.remove('HIDE_ON_TIME');									
							let buffer = create_new_person_family.value +' '+ create_new_person_name.value+' '+ create_new_person_otchestvo.value;
								popup_zakaz_fio_inp.value = buffer;
								popup_zakaz_auto_firm_inp.value = create_new_person_auto.value;
								document.getElementById('year_car').value = zayavka.yearcar = create_new_person_year.value;
								document.getElementById('phone_client').value = /*zayavka.phone = */create_new_person_phone.value;
								document.querySelector('#select_client > .add_button').remove();
						}
							
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
		popup_zakaz_auto_firm.className = 'col-md-4 popup_zakaz_auto_firm';
		popup_zakaz_auto_firm.setAttribute('id', 'select_client_car');
		let auto_firm_base_list = document.getElementById('auto_firm'); // КОНТЕЙНЕР СПИСКА КЛИЕНТОВ

			let spisok_conteiner_auto = document.createElement('div'); //КОНТЕЙНЕР ДЛЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ
				spisok_conteiner_auto.className = 'col-md-9 col-md-offset-2 spisok_conteiner_auto';
			for (var i = auto_firm_base_list.length - 1; i >= 0; i--) {
				let spisok = document.createElement('span'); // ГЕНЕРАЦИЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ ДЛЯ ВЫВОДА
					spisok.className = 'col-md-12 popup_zakaz_auto_firm_spisok';
					spisok.setAttribute('data-idcar', auto_firm_base_list.children[i].value);
					spisok.innerText = auto_firm_base_list[i].innerText;
					spisok.addEventListener('click', open_list_auto_firm);
					popup_zakaz_auto_firm.appendChild(spisok_conteiner_auto);
					spisok_conteiner_auto.appendChild(spisok);
			}
			function open_list_auto_firm (argument) {		
				popup_zakaz_auto_firm_inp.value = this.innerText;
				zayavka.car = this.getAttribute('data-idcar')
				this.parentElement.style.display = 'none';
			}

		let popup_zakaz_auto_firm_inp = document.createElement('input'); // ПОЛЕ ВВОДА ФИО КЛИЕНТА С ФУНКЦИЕЙ ПОИСКА
			popup_zakaz_auto_firm_inp.className = 'col-md-10 client_input_fio';
			popup_zakaz_auto_firm_inp.type = 'text';
			popup_zakaz_auto_firm_inp.placeholder = 'Автомобиль'
			//popup_zakaz_auto_firm.insertBefore(popup_zakaz_auto_firm_inp, popup_zakaz_auto_firm.firstChild);
				/*
				*
				* ДОБАВИМ ИКОНКУ
				*
				**/	
		let popup_zakaz_year_car = sauto.create_input('text', 'year_car', 'year_car', 'col-md-1 year_car', 'Год');
			popup_zakaz_year_car.style.textAlign = 'center';
			popup_zakaz_year_car.addEventListener('change', function (argument) {
				zayavka.yearcar = this.value;
			});
			

			popup_zakaz_auto_firm_inp.addEventListener('focus', focus_popup_zakaz_auto_firm_inp); // ПРИ ПОЛУЧЕНИИ ФОКУСА НА ПОЛЕ ВВОДА АВТО 
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
				label_af.appendChild(popup_zakaz_auto_firm_inp);
				popup_zakaz_auto_firm.insertBefore(label_af, popup_zakaz_auto_firm.firstChild);

/************************************************************************************************************************
*										ОКНО ДОБАВЛЕНИЯ НОВОГО АВТОМОБИЛЯ											*
************************************************************************************************************************/
				function create_new_auto_firm (argument) {					
											
					let create_new_firm_auto = document.createElement('div');
						create_new_firm_auto.className = 'create_new';
						//popup_zakaz_body.classList.add('HIDE_ON_TIME');
						popup_zakaz.appendChild(create_new_firm_auto)
						create_new_firm_auto.innerHTML = '<h3><i class="fa fa-info" aria-hidden="true"></i> Добавление фирмы производителя авто</h3>';						
						sauto.insert_hr(create_new_firm_auto);
					if (toogle_window == 'new_client_window') {
						document.querySelector('.create_new_person').classList.add('HIDE_ON_TIME');
						toogle_window = 'new_client_car_window';
						sauto.create_close_button(create_new_firm_auto, 'third'); // Добавляем кнопочку закрыть
					}
					else if (toogle_window == 'incident_window') {
						popup_zakaz_body.classList.add('HIDE_ON_TIME');
						toogle_window = 'new_car_window';
						sauto.create_close_button(create_new_firm_auto, 'second'); // Добавляем кнопочку закрыть
					}

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
						create_new_firm_auto_save.id = 'create_new_auto_save';						
							create_new_firm_auto_save.addEventListener('mouseover', function () {
								if (create_new_firm_auto_name.value != '' && create_new_firm_auto_model.value != '') {
									this.classList.add('btn-success')
									this.style.cursor = 'pointer';
									this.addEventListener('mouseout', function () {this.classList.remove('btn-success');this.removeEventListener('click', save_it_car);})
									this.addEventListener('click', save_it_car);
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

							function save_it_car () 
							{
								// Нажатие кнопки СОХРАНИТЬ
								let data_car = { firm: create_new_firm_auto_name.value, model: create_new_firm_auto_model.value };
								$.get('car', data_car, function(data, textStatus, xhr) {
									//console.log(data);
								});
								this.parentElement.remove();
								sauto.success_window('Новый автомобиль');
								if (toogle_window == 'new_client_car_window') {
									document.querySelector('.create_new_person').classList.remove('HIDE_ON_TIME');
									let buffer = create_new_firm_auto_name.value +' '+ create_new_firm_auto_model.value;
										document.querySelector('#new_client_new_car').remove();
										document.querySelector('#person_auto').value = buffer;
										document.querySelector('#person_auto').style.borderBottomColor = '#0fae31';
										toogle_window = 'new_client_window'
								}
								else if (toogle_window == 'incident_window') {
										popup_zakaz_body.classList.remove('HIDE_ON_TIME');
									let buffer = create_new_firm_auto_name.value +' '+ create_new_firm_auto_model.value;
										popup_zakaz_auto_firm_inp.value = buffer;
								}
							}
							
						create_new_firm_auto_save.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i> Сохранить';
						create_new_firm_auto.appendChild(create_new_firm_auto_save);


				}
/************************************************************************************************************************
*												Поле ввода видов работ													*
************************************************************************************************************************/
var popup_zakaz_vidi_rabot=document.createElement("div");popup_zakaz_vidi_rabot.className="col-md-4 popup_zakaz_vidi_rabot";popup_zakaz_vidi_rabot.style="margin-top:1em";var popup_zakaz_vidi_rabot_label=document.createElement("label");popup_zakaz_vidi_rabot_label.classList.add("col-md-12");popup_zakaz_vidi_rabot_label.innerHTML='<i class="fa fa-list-ol col-md-2" aria-hidden="true"></i>';popup_zakaz_vidi_rabot_label.children[0].style.cursor="pointer";var popup_zakaz_vidi_rabot_search=sauto.create_input("text","vidi_rabot","vidi_rabot","col-md-10 vidi_rabot","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0438\u0434 \u0440\u0430\u0431\u043e\u0442\u044b");popup_zakaz_vidi_rabot_search.addEventListener("input",search_vidi_rabot);popup_zakaz_vidi_rabot_label.appendChild(popup_zakaz_vidi_rabot_search);popup_zakaz_vidi_rabot.appendChild(popup_zakaz_vidi_rabot_label);var popup_zakaz_vidi_rabot_list=document.createElement("div");popup_zakaz_vidi_rabot_list.id="list_rabot";popup_zakaz_vidi_rabot_list.style.clear="both";popup_zakaz_vidi_rabot_list.className="col-md-6";popup_zakaz_vidi_rabot_list.style.backgroundColor="#\u0421\u0421\u0421";var add_rabota_icon=document.createElement("i");add_rabota_icon.className="fa fa-plus-circle add_this_work";add_rabota_icon.setAttribute("aria-hidden","true");var del_rabota_icon=document.createElement("i");del_rabota_icon.className="fa fa-trash-o del_this_hr";del_rabota_icon.setAttribute("aria-hidden","true");var popup_zakaz_vidi_rabot_viborka=document.createElement("table");popup_zakaz_vidi_rabot_viborka.id="viborka_rabot";popup_zakaz_vidi_rabot_viborka.className="col-md-12";popup_zakaz_vidi_rabot_viborka.style.backgroundColor="#\u0421\u0421\u0421";var popup_zakaz_vidi_rabot_viborka_head=document.createElement("thead");popup_zakaz_vidi_rabot_viborka_head.innerHTML='<tr class="vidi_rabot_th"><th style="width:50px">#</th><th style="width:64%">\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0440\u0430\u0431\u043e\u0442</th><th style="width:90px">\u041a\u043e\u043b-\u0432\u043e</th><th>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c</th></tr>';var popup_zakaz_vidi_rabot_viborka_body=document.createElement("tbody");var conteiner_tbody=document.createElement("div");conteiner_tbody.className="col-md-6 tablecontainer";conteiner_tbody.id="tbodycontainer";popup_zakaz_vidi_rabot_viborka.appendChild(popup_zakaz_vidi_rabot_viborka_body);conteiner_tbody.appendChild(popup_zakaz_vidi_rabot_viborka);var list_of_works=document.querySelector("#works");list_of_works.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{s=document.createElement("span");s.innerText=element.innerText;s.setAttribute("data-price",element.getAttribute("data-price"));s.setAttribute("data-idwork",element.getAttribute("data-idwork"));s.setAttribute("data-timeplane",element.getAttribute("data-timeplane"));s.insertBefore(add_rabota_icon.cloneNode(true),s.firstChild);popup_zakaz_vidi_rabot_list.appendChild(s);s.firstChild.addEventListener("click",add_work_in_tab)}});popup_zakaz_vidi_rabot_label.children[0].addEventListener("click",function(){if(popup_zakaz_vidi_rabot_list.innerHTML!="")return;list_of_works.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var s$0=document.createElement("span");s$0.innerText=element.innerText;s$0.setAttribute("data-price",element.getAttribute("data-price"));s$0.setAttribute("data-idwork",element.getAttribute("data-idwork"));s$0.setAttribute("data-timeplane",element.getAttribute("data-timeplane"));s$0.insertBefore(add_rabota_icon.cloneNode(true),s$0.firstChild);popup_zakaz_vidi_rabot_list.appendChild(s$0);s$0.firstChild.addEventListener("click",add_work_in_tab)}})});
function search_vidi_rabot(){if(this.value.search(/[\u0430-\u044f\u0410-\u042f\u0451\u0401]||[\s]/)!=-1){var del=document.querySelector(".add_button");if(del)del.remove();if(this.value!=""){var for_search_list_work_REGEXP=new RegExp(this.value,"gi");popup_zakaz_vidi_rabot_list.innerHTML=""}else{list_of_works.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var patt=element.innerText;if(patt.search(for_search_list_work_REGEXP)!=-1){var s$1=document.createElement("span");s$1.innerText=element.innerText;s$1.setAttribute("data-price",element.getAttribute("data-price"));s$1.setAttribute("data-idwork",element.getAttribute("data-idwork"));s$1.setAttribute("data-timeplane",element.getAttribute("data-timeplane"));s$1.insertBefore(add_rabota_icon.cloneNode(true),s$1.firstChild);popup_zakaz_vidi_rabot_list.appendChild(s$1);s$1.firstChild.addEventListener("click",add_work_in_tab)}}});return}list_of_works.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var patt=element.innerText;if(patt.search(for_search_list_work_REGEXP)!=-1){var s$2=document.createElement("span");s$2.innerText=element.innerText;s$2.setAttribute("data-price",element.getAttribute("data-price"));s$2.setAttribute("data-idwork",element.getAttribute("data-idwork"));s$2.setAttribute("data-timeplane",element.getAttribute("data-timeplane"));s$2.insertBefore(add_rabota_icon.cloneNode(true),s$2.firstChild);popup_zakaz_vidi_rabot_list.appendChild(s$2);s$2.firstChild.addEventListener("click",add_work_in_tab)}}})}if(this.value!="")for(var i=0;i<list_of_works.length;i++)if(popup_zakaz_vidi_rabot_list.innerHTML!=""){console.log("Yes");return}else{var new_work_add=document.createElement("span");new_work_add.className="btn-success add_button col-md-6 col-md-offset-2";new_work_add.innerHTML='\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0441\u043b\u0443\u0433\u0443 <i class="fa fa-plus-circle" aria-hidden="true"></i>';popup_zakaz_vidi_rabot.appendChild(new_work_add);new_work_add.addEventListener("click",create_new_work);return}}
function add_work_in_tab(){var tr_rabota=document.createElement("tr");tr_rabota.addEventListener("mouseover",show_del_td);tr_rabota.addEventListener("mouseout",hide_del_td);var td_id_rabota=document.createElement("td");td_id_rabota.className="id";td_id_rabota.innerHTML="<span>"+(popup_zakaz_vidi_rabot_viborka_body.children.length+1)+" </span>";td_id_rabota.appendChild(del_rabota_icon.cloneNode(true)).addEventListener("click",function(){var $jscomp$this=this;if(tbodycontainer.offsetHeight<200)tbodycontainer.style.overflow="hidden";this.parentElement.parentElement.style.backgroundColor="#ff9999";this.parentElement.parentElement.style.color="#ffffff";setTimeout(function(){zayavka.minets-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.innerText);calc_time();summ_zakaz.innerText=zayavka.summ-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.innerText);$jscomp$this.parentElement.parentElement.parentElement.removeChild($jscomp$this.parentElement.parentElement);for(var i=0;i<popup_zakaz_vidi_rabot_viborka_body.children.length;i++)popup_zakaz_vidi_rabot_viborka_body.children[i].firstChild.firstChild.innerText=i+1+" "},300)});var td_name_rabota=document.createElement("td");td_name_rabota.className="name_s";td_name_rabota.innerText=this.parentElement.innerText;var td_count_rabota=document.createElement("td");td_count_rabota.className="td_count";var td_input_rabota=document.createElement("input");td_input_rabota.type="number";td_input_rabota.className="input_work";td_input_rabota.value=1;td_input_rabota.setAttribute("min","1");td_input_rabota.addEventListener("input",mathPRICE);td_count_rabota.appendChild(td_input_rabota);var td_price_rabota=document.createElement("td");td_price_rabota.className="price_rabota";td_price_rabota.innerText=this.parentElement.getAttribute("data-price")+" \u0440\u0443\u0431";td_price_rabota.setAttribute("data-price",this.parentElement.getAttribute("data-price"));var td_time_rabota=document.createElement("td");td_time_rabota.className="time_rabota";td_time_rabota.innerText=this.parentElement.getAttribute("data-timeplane")+" \u043c\u0438\u043d.";td_time_rabota.setAttribute("data-timeplane",this.parentElement.getAttribute("data-timeplane"));tr_rabota.appendChild(td_id_rabota);tr_rabota.appendChild(td_name_rabota);tr_rabota.appendChild(td_count_rabota);tr_rabota.appendChild(td_price_rabota);tr_rabota.appendChild(td_time_rabota);popup_zakaz_vidi_rabot_viborka_body.appendChild(tr_rabota);this.parentElement.remove();if(tbodycontainer.offsetHeight>240){tbodycontainer.style.overflowY="auto";tbodycontainer.scrollTop=1E3}var bufer=time_bufer=0;document.querySelectorAll(".price_rabota, .price_zapchast").forEach(function(el,i){bufer+=parseInt(el.innerText)});document.querySelectorAll(".time_rabota").forEach(function(el,i){time_bufer+=parseInt(el.innerText)});summ_zakaz.innerText=zayavka.summ=bufer;zayavka.minets=time_bufer;calc_time();zayavka.worklist.push(this.parentElement.getAttribute("data-idwork"))}
function create_new_work(argument){if(zayavka.car=="")return alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c!");toogle_window="new_work_window";var create_new_work=document.createElement("div");create_new_work.className="create_new";popup_zakaz_body.classList.add("HIDE_ON_TIME");popup_zakaz.appendChild(create_new_work);create_new_work.innerHTML='<h3><i class="fa fa-info" aria-hidden="true"></i> \u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0443\u0441\u043b\u0443\u0433\u0438, \u0432\u0438\u0434\u0430 \u0440\u0430\u0431\u043e\u0442 \u0434\u043b\u044f '+document.querySelector('#auto_firm option[value="'+zayavka.car+'"]').innerText+"</h3>";sauto.insert_hr(create_new_work);sauto.create_close_button(create_new_work,"second");sauto.insert_clear_block(create_new_work);var icon_new_work=document.createElement("div");icon_new_work.className="col-md-2";icon_new_work.style.fontSize="6em";icon_new_work.innerHTML='<i class="fa fa-cogs" aria-hidden="true"></i>';create_new_work.appendChild(icon_new_work);var create_new_work_name_inpblock=document.createElement("div");create_new_work_name_inpblock.className="col-md-8";create_new_work.appendChild(create_new_work_name_inpblock);var create_new_work_name=sauto.create_input("text","work_name","new_work_name","col-md-12 input mBottomInp","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435");var create_new_work_price=sauto.create_input("text","auto_model","new_work_model","col-md-12 input mBottomInp","\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0431\u0435\u0437 \u043f\u0440\u043e\u0431\u0435\u043b\u043e\u0432");create_new_work_name.value=popup_zakaz_vidi_rabot_search.value;var create_new_work_code=sauto.create_input("number","auto_code","new_work_code","col-md-6 col-md-offset-4 input mBottomInp","\u0412\u0440\u0435\u043c\u044f \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043c\u0438\u043d.");create_new_work_name_inpblock.appendChild(create_new_work_name);create_new_work_name_inpblock.appendChild(create_new_work_price);create_new_work_name_inpblock.appendChild(create_new_work_code);sauto.insert_clear_block(create_new_work);sauto.insert_hr(create_new_work);sauto.insert_clear_block(create_new_work);var create_new_work_save=document.createElement("button");create_new_work_save.classList="btn";create_new_work_save.id="create_new_work_save";create_new_work_save.addEventListener("mouseover",function(){if(create_new_work_name.value!=""&&create_new_work_price.value!=""){this.classList.add("btn-success");this.style.cursor="pointer";this.addEventListener("mouseout",function(){this.classList.remove("btn-success");this.removeEventListener("click",save_new_WORK)});this.addEventListener("click",save_new_WORK)}else{this.classList.add("btn-warning");this.classList.add("disabled");this.style.cursor="no-drop";var err=document.createElement("span");err.classList="err";err.innerHTML='<strong style="color:red">\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u043e\u043b\u0435:</strong>';create_new_work_name.value==""?err.children[0].innerText=err.innerText+" -\u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435-":false;create_new_work_price.value==""?err.children[0].innerText=err.innerText+" -\u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c- ":false;create_new_work.appendChild(err);this.addEventListener("mouseout",function(){err.remove();this.classList.remove("btn-warning");this.classList.remove("disabled")})}});create_new_work_save.innerHTML='<i class="fa fa-floppy-o" aria-hidden="true"></i> \u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c';create_new_work.appendChild(create_new_work_save);function save_new_WORK(){var data_work={name:create_new_work_name.value,code:0,raiting:100,price:create_new_work_price.value,time:create_new_work_code.value};$.get("save-work",data_work,function(data){document.querySelector(".add_button").remove()});this.parentElement.remove();sauto.success_window("\u041d\u043e\u0432\u0430\u044f \u0443\u0441\u043b\u0443\u0433\u0430, \u0442\u043e\u0432\u0430\u0440");popup_zakaz_body.classList.remove("HIDE_ON_TIME");toogle_window="incident_window";var tr_rabota=document.createElement("tr");tr_rabota.addEventListener("mouseover",show_del_td);tr_rabota.addEventListener("mouseout",hide_del_td);var td_id_rabota=document.createElement("td");td_id_rabota.className="id";td_id_rabota.innerHTML="<span>"+(popup_zakaz_vidi_rabot_viborka_body.children.length+1)+" </span>";td_id_rabota.appendChild(del_rabota_icon.cloneNode(true)).addEventListener("click",function(){var $jscomp$this=this;if(tbodycontainer.offsetHeight<200)tbodycontainer.style.overflow="hidden";this.parentElement.parentElement.style.backgroundColor="#ff9999";this.parentElement.parentElement.style.color="#ffffff";setTimeout(function(){zayavka.minets-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.innerText);calc_time();summ_zakaz.innerText=zayavka.summ-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.innerText);$jscomp$this.parentElement.parentElement.parentElement.removeChild($jscomp$this.parentElement.parentElement);for(var i=0;i<popup_zakaz_vidi_rabot_viborka_body.children.length;i++)popup_zakaz_vidi_rabot_viborka_body.children[i].firstChild.firstChild.innerText=i+1+" "},300)});var td_name_rabota=document.createElement("td");td_name_rabota.className="name_s";td_name_rabota.innerText=create_new_work_name.value;var td_count_rabota=document.createElement("td");td_count_rabota.className="td_count";var td_input_rabota=document.createElement("input");td_input_rabota.type="number";td_input_rabota.className="input_work";td_input_rabota.value=1;td_input_rabota.setAttribute("min","1");td_input_rabota.addEventListener("input",mathPRICE);td_count_rabota.appendChild(td_input_rabota);var td_price_rabota=document.createElement("td");td_price_rabota.className="price_rabota";td_price_rabota.innerText=create_new_work_price.value+" \u0440\u0443\u0431";td_price_rabota.setAttribute("data-price",create_new_work_price.value);var td_time_rabota=document.createElement("td");td_time_rabota.className="time_rabota";td_time_rabota.innerText=create_new_work_code.value+" \u043c\u0438\u043d.";td_time_rabota.setAttribute("data-timeplane",create_new_work_code.value);tr_rabota.appendChild(td_id_rabota);tr_rabota.appendChild(td_name_rabota);tr_rabota.appendChild(td_count_rabota);tr_rabota.appendChild(td_price_rabota);tr_rabota.appendChild(td_time_rabota);popup_zakaz_vidi_rabot_viborka_body.appendChild(tr_rabota);if(tbodycontainer.offsetHeight>240){tbodycontainer.style.overflowY="auto";tbodycontainer.scrollTop=1E3}var bufer=time_bufer=0;document.querySelectorAll(".price_rabota, .price_zapchast").forEach(function(el,i){bufer+=parseInt(el.innerText)});document.querySelectorAll(".time_rabota").forEach(function(el,i){time_bufer+=parseInt(el.innerText)});summ_zakaz.innerText=zayavka.summ=bufer;zayavka.minets=time_bufer;calc_time()}};
/************************************************************************************************************************
*														Запчасти														*
************************************************************************************************************************/
	var popup_zakaz_zapchasti=document.createElement("div");popup_zakaz_zapchasti.className="col-md-4 popup_zakaz_zapchasti";popup_zakaz_zapchasti.style="margin-top:1em";var popup_zakaz_zapchasti_label=document.createElement("label");popup_zakaz_zapchasti_label.classList.add("col-md-12");popup_zakaz_zapchasti_label.innerHTML='<i class="fa fa-cogs col-md-2" aria-hidden="true"></i>';popup_zakaz_zapchasti_label.children[0].style.cursor="pointer";var popup_zakaz_zapchasti_search=sauto.create_input("text","zapchasti","zapchasti","col-md-10 zapchasti","\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0438");popup_zakaz_zapchasti_search.addEventListener("input",search_zapchasti);popup_zakaz_zapchasti_label.appendChild(popup_zakaz_zapchasti_search);popup_zakaz_zapchasti.appendChild(popup_zakaz_zapchasti_label);var popup_zakaz_zapchasti_list=document.createElement("div");popup_zakaz_zapchasti_list.id="list_parts";popup_zakaz_zapchasti_list.className="col-md-6";popup_zakaz_zapchasti_list.style.backgroundColor="#\u0421\u0421\u0421";var add_zapchast_icon=document.createElement("i");add_zapchast_icon.className="fa fa-plus-circle add_this_work";add_zapchast_icon.setAttribute("aria-hidden","true");var del_zapchast_icon=document.createElement("i");del_zapchast_icon.className="fa fa-trash-o del_this_hr";del_zapchast_icon.setAttribute("aria-hidden","true");var popup_zakaz_zapchasti_viborka=document.createElement("table");popup_zakaz_zapchasti_viborka.id="viborka_zapchastei";popup_zakaz_zapchasti_viborka.className="col-md-12";popup_zakaz_zapchasti_viborka.style.backgroundColor="#\u0421\u0421\u0421";var popup_zakaz_zapchasti_viborka_body=document.createElement("tbody");var conteiner_tbodyzapchast=document.createElement("div");conteiner_tbodyzapchast.className="col-md-6 tablecontainer";conteiner_tbodyzapchast.id="tbodyzapchastcontainer";popup_zakaz_zapchasti_viborka.appendChild(popup_zakaz_zapchasti_viborka_body);conteiner_tbodyzapchast.appendChild(popup_zakaz_zapchasti_viborka);var list_of_works_zapchast=document.querySelector("#zapchasti");list_of_works_zapchast.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var s=document.createElement("span");s.innerText=element.innerText;s.setAttribute("data-price",element.getAttribute("data-price"));s.setAttribute("data-idcarpart",element.getAttribute("data-idcarpart"));s.setAttribute("data-idpart",element.getAttribute("data-idpart"));s.insertBefore(add_zapchast_icon.cloneNode(true),s.firstChild);popup_zakaz_zapchasti_list.appendChild(s);s.firstChild.addEventListener("click",add_part_in_tab)}});popup_zakaz_zapchasti_label.children[0].addEventListener("click",function(){if(popup_zakaz_zapchasti_list.innerHTML!="")return;list_of_works_zapchast.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var s=document.createElement("span");s.innerText=element.innerText;s.setAttribute("data-price",element.getAttribute("data-price"));s.setAttribute("data-idcarpart",element.getAttribute("data-idcarpart"));s.setAttribute("data-idpart",element.getAttribute("data-idpart"));s.insertBefore(add_zapchast_icon.cloneNode(true),s.firstChild);popup_zakaz_zapchasti_list.appendChild(s);s.firstChild.addEventListener("click",add_part_in_tab)}})});
				

	function search_zapchasti(){if(this.value.search(/[\u0430-\u044f\u0410-\u042f\u0451\u0401]||[\s]/)!=-1){var del=document.querySelector(".add_button");if(del)del.remove();if(this.value!=""){var for_search_list_work_REGEXP=new RegExp(this.value,"gi");popup_zakaz_zapchasti_list.innerHTML=""}else{list_of_works_zapchast.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var patt=element.innerText;if(patt.search(for_search_list_work_REGEXP)!=-1){var s=document.createElement("span");s.innerText=element.innerText;s.setAttribute("data-price",element.getAttribute("data-price"));s.setAttribute("data-idcarpart",element.getAttribute("data-idcarpart"));s.setAttribute("data-idpart",element.getAttribute("data-idpart"));s.insertBefore(add_zapchast_icon.cloneNode(true),s.firstChild);popup_zakaz_zapchasti_list.appendChild(s);s.firstChild.addEventListener("click",add_part_in_tab)}}});return}list_of_works_zapchast.childNodes.forEach(function(element,index){if(element.nodeName=="#text")return;else{var patt=element.innerText;if(patt.search(for_search_list_work_REGEXP)!=-1){var s=document.createElement("span");s.innerText=element.innerText;s.setAttribute("data-price",element.getAttribute("data-price"));s.setAttribute("data-idcarpart",element.getAttribute("data-idcarpart"));s.setAttribute("data-idpart",element.getAttribute("data-idpart"));s.insertBefore(add_zapchast_icon.cloneNode(true),s.firstChild);popup_zakaz_zapchasti_list.appendChild(s);s.firstChild.addEventListener("click",add_part_in_tab)}}})}if(this.value!="")for(var i=0;i<list_of_works_zapchast.length;i++)if(popup_zakaz_zapchasti_list.innerHTML!=""){console.log("Yes");return}else{var new_work_add=document.createElement("span");new_work_add.className="btn-success add_button col-md-6 col-md-offset-2";new_work_add.innerHTML='\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0441\u043b\u0443\u0433\u0443 <i class="fa fa-plus-circle" aria-hidden="true"></i>';popup_zakaz_zapchasti.appendChild(new_work_add);new_work_add.addEventListener("click",create_new_zapchast);return}}

	function add_part_in_tab(){var tr_zapchast=document.createElement("tr");tr_zapchast.addEventListener("mouseover",show_del_td);tr_zapchast.addEventListener("mouseout",hide_del_td);var td_id_zapchast=document.createElement("td");td_id_zapchast.className="id";td_id_zapchast.innerHTML="<span>"+(popup_zakaz_zapchasti_viborka_body.children.length+1)+" </span>";td_id_zapchast.appendChild(del_zapchast_icon.cloneNode(true)).addEventListener("click",function(){var $jscomp$this=this;if(popup_zakaz_zapchasti_viborka.offsetHeight<200)tbodyzapchastcontainer.style.overflow="hidden";this.parentElement.parentElement.style.backgroundColor="#ff9999";this.parentElement.parentElement.style.color="#ffffff";setTimeout(function(){summ_zakaz.innerText=zayavka.summ-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.innerText);$jscomp$this.parentElement.parentElement.parentElement.removeChild($jscomp$this.parentElement.parentElement);for(var i=0;i<popup_zakaz_zapchasti_viborka_body.children.length;i++)popup_zakaz_zapchasti_viborka_body.children[i].firstChild.firstChild.innerText=i+1+" "},300)});var td_name_zapchast=document.createElement("td");td_name_zapchast.className="name_zapchast";td_name_zapchast.innerText=this.parentElement.innerText;var td_count_zapchast=document.createElement("td");td_count_zapchast.className="td_count";var td_input_zapchast=document.createElement("input");td_input_zapchast.type="number";td_input_zapchast.className="input_part";td_input_zapchast.value=1;td_input_zapchast.setAttribute("min","1");td_input_zapchast.addEventListener("input",mathPRICE);td_count_zapchast.appendChild(td_input_zapchast);var td_price_zapchast=document.createElement("td");td_price_zapchast.className="price_zapchast";td_price_zapchast.innerText=this.parentElement.getAttribute("data-price")+" \u0440\u0443\u0431";td_price_zapchast.setAttribute("data-price",this.parentElement.getAttribute("data-price"));tr_zapchast.appendChild(td_id_zapchast);tr_zapchast.appendChild(td_name_zapchast);tr_zapchast.appendChild(td_count_zapchast);tr_zapchast.appendChild(td_price_zapchast);popup_zakaz_zapchasti_viborka_body.appendChild(tr_zapchast);this.parentElement.parentElement.removeChild(this.parentElement);if(tbodyzapchastcontainer.offsetHeight>240){tbodyzapchastcontainer.style.overflowY="auto";tbodyzapchastcontainer.scrollTop=1E3}var bufer=0;document.querySelectorAll(".price_rabota, .price_zapchast").forEach(function(el,i){bufer+=parseInt(el.innerText)});summ_zakaz.innerText=zayavka.summ=bufer;zayavka.partslist.push(this.parentElement.getAttribute("data-idpart"))};

	function create_new_zapchast(argument){if(zayavka.car=="")return alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c!");toogle_window="new_zapchast_window";var create_new_zapchast=document.createElement("div");create_new_zapchast.className="create_new";popup_zakaz_body.classList.add("HIDE_ON_TIME");popup_zakaz.appendChild(create_new_zapchast);create_new_zapchast.innerHTML='<h3><i class="fa fa-info" aria-hidden="true"></i> \u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0442\u043e\u0432\u0430\u0440\u0430, \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0438 \u0434\u043b\u044f '+document.querySelector('#auto_firm option[value="'+zayavka.car+'"]').innerText+"</h3>";sauto.insert_hr(create_new_zapchast);sauto.create_close_button(create_new_zapchast,"second");sauto.insert_clear_block(create_new_zapchast);var icon_new_zapchast=document.createElement("div");icon_new_zapchast.className="col-md-2";icon_new_zapchast.style.fontSize="6em";icon_new_zapchast.innerHTML='<i class="fa fa-cogs" aria-hidden="true"></i>';create_new_zapchast.appendChild(icon_new_zapchast);var create_new_zapchast_name_inpblock=document.createElement("div");create_new_zapchast_name_inpblock.className="col-md-8";create_new_zapchast.appendChild(create_new_zapchast_name_inpblock);var create_new_zapchast_name=sauto.create_input("text","work_name","new_zapchast_name","col-md-12 input mBottomInp","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435");var create_new_zapchast_price=sauto.create_input("text","auto_model","new_zapchast_model","col-md-12 input mBottomInp","\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0431\u0435\u0437 \u043f\u0440\u043e\u0431\u0435\u043b\u043e\u0432");create_new_zapchast_name.value=popup_zakaz_zapchasti_search.value;var create_new_zapchast_code=sauto.create_input("number","auto_code","new_zapchast_code","col-md-3 col-md-offset-9 input mBottomInp","\u041a\u043e\u0434");create_new_zapchast_name_inpblock.appendChild(create_new_zapchast_name);create_new_zapchast_name_inpblock.appendChild(create_new_zapchast_price);create_new_zapchast_name_inpblock.appendChild(create_new_zapchast_code);sauto.insert_clear_block(create_new_zapchast);sauto.insert_hr(create_new_zapchast);sauto.insert_clear_block(create_new_zapchast);var create_new_zapchast_save=document.createElement("button");create_new_zapchast_save.classList="btn";create_new_zapchast_save.id="create_new_zapchast_save";create_new_zapchast_save.addEventListener("mouseover",function(){if(create_new_zapchast_name.value!=""&&create_new_zapchast_price.value!=""){this.classList.add("btn-success");this.style.cursor="pointer";this.addEventListener("mouseout",function(){this.classList.remove("btn-success");this.removeEventListener("click",save_new_PART)});this.addEventListener("click",save_new_PART)}else{this.classList.add("btn-warning");this.classList.add("disabled");this.style.cursor="no-drop";var err=document.createElement("span");err.classList="err";err.innerHTML='<strong style="color:red">\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u043e\u043b\u0435:</strong>';create_new_zapchast_name.value==""?err.children[0].innerText=err.innerText+" -\u043d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435-":false;create_new_zapchast_price.value==""?err.children[0].innerText=err.innerText+" -\u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c- ":false;create_new_zapchast.appendChild(err);this.addEventListener("mouseout",function(){err.remove();this.classList.remove("btn-warning");this.classList.remove("disabled")})}});create_new_zapchast_save.innerHTML='<i class="fa fa-floppy-o" aria-hidden="true"></i> \u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c';create_new_zapchast.appendChild(create_new_zapchast_save);function save_new_PART(){if(zayavka.car=="")return alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c \u0432 \u043e\u043a\u043d\u0435 \u0437\u0430\u044f\u0432\u043a\u0438!");var data_part={name:create_new_zapchast_name.value,code:create_new_zapchast_code.value,carid:zayavka.car,price:create_new_zapchast_price.value};$.get("save-part",data_part,function(data){document.querySelector(".add_button").remove()});this.parentElement.remove();sauto.success_window("\u041d\u043e\u0432\u0430\u044f \u0443\u0441\u043b\u0443\u0433\u0430, \u0442\u043e\u0432\u0430\u0440");popup_zakaz_body.classList.remove("HIDE_ON_TIME");toogle_window="incident_window";var tr_zapchast=document.createElement("tr");tr_zapchast.addEventListener("mouseover",show_del_td);tr_zapchast.addEventListener("mouseout",hide_del_td);var td_id_zapchast=document.createElement("td");td_id_zapchast.className="id";td_id_zapchast.innerHTML="<span>"+(popup_zakaz_zapchasti_viborka_body.children.length+1)+" </span>";td_id_zapchast.appendChild(del_zapchast_icon.cloneNode(true)).addEventListener("click",function(){var $jscomp$this=this;if(popup_zakaz_zapchasti_viborka.offsetHeight<200)tbodyzapchastcontainer.style.overflow="hidden";this.parentElement.parentElement.style.backgroundColor="#ff9999";this.parentElement.parentElement.style.color="#ffffff";setTimeout(function(){summ_zakaz.innerText=zayavka.summ-=parseInt($jscomp$this.parentElement.nextSibling.nextSibling.nextSibling.innerText);$jscomp$this.parentElement.parentElement.parentElement.removeChild($jscomp$this.parentElement.parentElement);for(var i=0;i<popup_zakaz_zapchasti_viborka_body.children.length;i++)popup_zakaz_zapchasti_viborka_body.children[i].firstChild.firstChild.innerText=i+1+" "},300)});var td_name_zapchast=document.createElement("td");td_name_zapchast.className="name_zapchast";td_name_zapchast.innerText=create_new_zapchast_name.value;var td_count_zapchast=document.createElement("td");td_count_zapchast.className="td_count";var td_input_zapchast=document.createElement("input");td_input_zapchast.type="number";td_input_zapchast.className="input_part";td_input_zapchast.value=1;td_input_zapchast.setAttribute("min","1");td_input_zapchast.addEventListener("input",mathPRICE);td_count_zapchast.appendChild(td_input_zapchast);var td_price_zapchast=document.createElement("td");td_price_zapchast.className="price_zapchast";td_price_zapchast.innerText=create_new_zapchast_price.value+" \u0440\u0443\u0431";td_price_zapchast.setAttribute("data-price",create_new_zapchast_price.value);tr_zapchast.appendChild(td_id_zapchast);tr_zapchast.appendChild(td_name_zapchast);tr_zapchast.appendChild(td_count_zapchast);tr_zapchast.appendChild(td_price_zapchast);popup_zakaz_zapchasti_viborka_body.appendChild(tr_zapchast);if(tbodyzapchastcontainer.offsetHeight>240){tbodyzapchastcontainer.style.overflowY="auto";tbodyzapchastcontainer.scrollTop=1E3}var bufer=0;document.querySelectorAll(".price_rabota, .price_zapchast").forEach(function(el,i){bufer+=parseInt(el.innerText)});summ_zakaz.innerText=zayavka.summ=bufer}};
/************************************************************************************************************************
*									Функции для работы с таблицами услуг и запчастей									*
************************************************************************************************************************/
			function show_del_td (argument) {
				this.children[0].children[1].style.display = 'inline-block';
				this.children[0].children[0].style.display = 'none';
			}

			function hide_del_td (argument) {
				this.children[0].children[1].style.display = 'none';
				this.children[0].children[0].style.display = 'inline-block';
			}

			function mathPRICE (cont) {				
				this.parentElement.nextElementSibling.innerText = parseInt(this.parentElement.nextElementSibling.getAttribute('data-price')) * this.value + ' руб';
				
			    let bufer = time_bufer = 0;
			    document.querySelectorAll('.price_rabota, .price_zapchast').forEach(function (el, i) {
			    	bufer += parseInt(el.innerText);
			    })			    				
				summ_zakaz.innerText = zayavka.summ = bufer;
				if (cont.target.classList.contains('input_work')) {
					this.parentElement.nextElementSibling.nextElementSibling.innerText = parseInt(this.parentElement.nextElementSibling.nextElementSibling.getAttribute('data-timeplane')) * this.value + ' мин';
					document.querySelectorAll('.time_rabota').forEach(function (el, i) {
						time_bufer += parseInt(el.innerText);
					});
					zayavka.minets = time_bufer;
					calc_time();
				}
			}
/************************************************************************************************************************
*										Выбор мастера для выполнения работ												*
************************************************************************************************************************/
	let popup_zakaz_master = document.createElement('div');
		popup_zakaz_master.className = 'col-md-4 popup_zakaz_master';
		popup_zakaz_master.style = 'margin-top:1em';
	let popup_zakaz_master_label = document.createElement('label');
		popup_zakaz_master_label.classList.add('col-md-12');
		popup_zakaz_master_label.innerHTML = '<i class="fa fa-users col-md-2" aria-hidden="true"></i>';
		popup_zakaz_master_label.children[0].style.cursor = 'pointer';
	let popup_zakaz_master_search = sauto.create_input('text', 'master', 'master', 'col-md-10 master', 'Выбор мастера');
		//popup_zakaz_master_search.addEventListener('input', search_master)

		popup_zakaz_master_label.appendChild(popup_zakaz_master_search);
		popup_zakaz_master.appendChild(popup_zakaz_master_label);

	let popup_zakaz_master_cont = document.createElement('div');
		popup_zakaz_master_cont.id = 'list_masters';
		popup_zakaz_master_cont.className = 'col-md-9 col-md-offset-2 popup_zakaz_master';
		popup_zakaz_master.appendChild(popup_zakaz_master_cont);

		let data_work = { code_work:100 }
		popup_zakaz_master_search.addEventListener('click', function(){
			popup_zakaz_master_cont.style.display = 'block';
			if (popup_zakaz_master_cont.children.length == 0) {
				$.get('get-personal', data_work, function(data) {
					let list = JSON.parse(data);
					list.forEach( function(el, i) {
						let spisok = document.createElement('span'); // ГЕНЕРАЦИЯ СПИСКА КЛИЕНТСКОЙ БАЗЫ ДЛЯ ВЫВОДА
						spisok.className = 'col-md-12 popup_zakaz_master_cont_spisok';
						spisok.setAttribute('data-idmaster', el.id)
						spisok.innerText = el.master;
						spisok.addEventListener('click', open_list_masters);
						popup_zakaz_master_cont.appendChild(spisok);
					});
				});
			}			
		})

		function open_list_masters (argument) {
			this.parentElement.previousSibling.lastChild.value = this.innerText;
			this.parentElement.style.display = 'none';
			zayavka.implementer = this.getAttribute('data-idmaster');
		}
/************************************************************************************************************************
*														Общая сумма														*
************************************************************************************************************************/
	let popup_zakaz_cash = document.createElement('div');
		popup_zakaz_cash.className = 'col-md-12 popup_zakaz_cash';
		popup_zakaz_cash.innerHTML = 'Стоимость заказа - <span id="summ_zakaz">0</span> руб.';

	let popup_zakaz_hours = document.createElement('div');
		popup_zakaz_hours.className = 'col-md-12 popup_zakaz_hours';
		popup_zakaz_hours.innerHTML = 'Плановое завершение <span id="summ_hours"></span>';












   // background-color: #92cef2;
   // border-radius: 25px;






		popup_zakaz_body.appendChild(popup_zakaz_fio);
		popup_zakaz_body.appendChild(popup_zakaz_auto_firm);
	let phone_conteiner = document.createElement('div');
		phone_conteiner.className = 'col-md-3';
		phone_conteiner.innerHTML = '<label class="col-md-12"><i class="fa fa-phone-square col-md-2" aria-hidden="true"></i></label>';

	let phone = sauto.create_input( 'text', 'phone_client', 'phone_client', 'col-md-10', 'тел: +7 999 999-99-99' );
		phone.style.textAlign = 'center';
		popup_zakaz_body.appendChild(popup_zakaz_year_car);
		phone_conteiner.firstChild.appendChild(phone);
		popup_zakaz_body.appendChild(phone_conteiner);
		popup_zakaz_body.appendChild(popup_zakaz_vidi_rabot);
		popup_zakaz_body.appendChild(popup_zakaz_zapchasti);
		popup_zakaz_body.appendChild(popup_zakaz_master);

	/*let label_year = document.createElement('label');
		label_year.classList.add('col-md-12');
		label_year.innerHTML = '<i class="fa fa-calendar col-md-2" aria-hidden="true"></i>';*/

	let zag = document.createElement('h4');
		zag.style.marginTop = '-.7em';
		//zag.style.marginLeft = '2.6%';
		zag.className = 'col-md-6';
		zag.style.paddingLeft = '0';
		sauto.insert_clear_block(popup_zakaz_body, '28px');
		zag.innerText = 'Популярные виды работ:';
		popup_zakaz_body.appendChild(zag);
		//sauto.insert_clear_block(popup_zakaz_body);
	let zag_parts = document.createElement('h4');
		zag_parts.style.marginTop = '-.7em';
		zag_parts.style.paddingLeft = '0';
		zag_parts.className = 'col-md-6';
		zag_parts.innerText = 'Запчасти:';
		popup_zakaz_body.appendChild(zag_parts);


		//sauto.insert_clear_block(popup_zakaz_body);
	let container_tab_h_uslugi = document.createElement('div');
		container_tab_h_uslugi.className = 'col-md-6';
		container_tab_h_uslugi.style.padding = '0'
	let popup_zakaz_vidi_rabot_tab = document.createElement('table');
		popup_zakaz_vidi_rabot_tab.style.width = '99.4%';
		popup_zakaz_vidi_rabot_tab.innerHTML = '<thead><tr class="vidi_rabot_th"><th style="width:31px">#</th><th style="width:52.7%">Услуга</th><th style="width:60px">Кол-во</th><th style="width:70px">Стоимость</th><th style="width:70px">Время</th></tr></thead>';
		container_tab_h_uslugi.appendChild(popup_zakaz_vidi_rabot_tab);


	let container_tab_h_zapchasti = document.createElement('div');
		container_tab_h_zapchasti.className = 'col-md-6';
		container_tab_h_zapchasti.style.padding = '0'
	let popup_zakaz_zapchasti_tab = document.createElement('table');
		popup_zakaz_zapchasti_tab.style.width = '99.4%';
		popup_zakaz_zapchasti_tab.innerHTML = '<thead><tr class="zapchasti_th"><th style="width:31px">#</th><th style="width:52.7%">Запчасть</th><th style="width:60px">Кол-во</th><th style="width:70px">Стоимость</th></tr></thead>';
		container_tab_h_zapchasti.appendChild(popup_zakaz_zapchasti_tab);
		
		popup_zakaz_body.appendChild(popup_zakaz_vidi_rabot_list);
		popup_zakaz_body.appendChild(popup_zakaz_zapchasti_list);

		sauto.insert_clear_block(popup_zakaz_body, '10px');

		popup_zakaz_body.appendChild(container_tab_h_uslugi);
		popup_zakaz_body.appendChild(container_tab_h_zapchasti);

		sauto.insert_clear_block(popup_zakaz_body);

		popup_zakaz_body.appendChild(conteiner_tbody);
		popup_zakaz_body.appendChild(conteiner_tbodyzapchast);
		

		sauto.insert_clear_block(popup_zakaz_body);

		
		popup_zakaz_body.appendChild(popup_zakaz_cash);
		popup_zakaz_body.appendChild(popup_zakaz_hours);

		let save_zayavka_button = sauto.create_new_button('save_zayavka', 'btn', 'save', 'Записать');

		save_zayavka_button.addEventListener('mouseover', function () {
			if 
			( document.querySelector('#select_client .client_input_fio').value == '' || document.querySelector('#select_client_car .client_input_fio').value == '' || document.querySelector('#year_car').value == '' || document.querySelector('#phone_client').value == '' ||  document.querySelector('#viborka_rabot > tbody').children.length < 1 || document.querySelector('#master').value == '' ) 
			{
				this.classList.remove('btn-success')
				this.classList.add('btn-warning');
				this.classList.add('disabled');
				this.style.cursor = 'no-drop';
			}
			else {
				this.classList.remove('btn-warning');
				this.classList.remove('disabled');
				this.classList.add('btn-success')
				this.style.cursor = 'pointer';
				//console.log('Ready to save')
			}
		});

		save_zayavka_button.addEventListener('mouseout', function () {
			this.classList.remove('btn-warning');
			this.classList.remove('disabled');
			this.classList.remove('btn-success')
		});

		save_zayavka_button.addEventListener('click', save_incident)
		function save_incident (argument) {
			if (this.classList.contains('btn-warning')){
				console.log('ffffff')
			}
			else {
				//calc_time();
				create_zayavka();
			}
		}

		popup_zakaz_body.appendChild(save_zayavka_button);



		function calc_time (argument) {
			$.get('get-settings', function(data, textStatus, xhr) {
				let settings_time = JSON.parse(data);

				let weekends = settings_time[0].weekends;

				let nachalo_raboty_H = settings_time[0].start_day_h;
				let nachalo_raboty_M = settings_time[0].start_day_m;
				let nach_raboty = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, nachalo_raboty_H /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */, nachalo_raboty_M /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */ ); // Начало рабочего дня

				let konec_raboty_H = settings_time[0].end_day_h;
				let konec_raboty_M = settings_time[0].end_day_m;
				let konec_raboty = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, konec_raboty_H /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */, konec_raboty_M /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */ ); // Конец рабочего дня


				let obed_start_H = settings_time[0].start_obed_h;
				let obed_start_M = settings_time[0].start_obed_m;
				let nach_obed = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, obed_start_H /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */, obed_start_M /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */ ); // Начало обеда

				let obed_end_H = settings_time[0].end_obed_h;
				let obed_end_M =  settings_time[0].end_obed_m;
				let konec_obed = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, obed_end_H /* БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */, obed_end_M /* ИЗ БАЗЫ С ТАБЛИЦЫ НАСТРОЕК */ ); // Конец обеда

				let obed = (konec_obed - nach_obed) / 1000 / 60 /* Длительность обеда в минутах */;
				let rab_den =  (konec_raboty - nach_raboty) / 1000 / 60 - obed /* Длительность рабочего дня без обеда в минутах */;
				let do_obeda = (nach_obed - nach_raboty) / 1000 / 60 /* Длительность рабочего дня до обеда в минутах */;
				let posle_obeda = (konec_raboty - konec_obed) / 1000 / 60 /* Длительность рабочего дня после обеда в минутах */;


				let nerabochee_vremya =  ( ( nach_raboty.getDay() + 1 ) - konec_raboty )  / 1000 / 60;
				/*console.log('Нерабочее время: '+nerabochee_vremya+' минут')
				console.log('Рабочее время до обеда: '+do_obeda+' минут')
				console.log('Рабочее время после обеда: '+posle_obeda+' минут')
				console.log('Начало рабочего дня: '+nachalo_raboty_H+':'+nachalo_raboty_M)
				console.log('Конец рабочего дня: '+konec_raboty_H+':'+konec_raboty_M)

				console.log('Начало обеда: '+obed_start_H+':'+obed_start_M)
				console.log('Конец обеда: '+obed_end_H+':'+obed_end_M)
				console.log('Длительность обеда: '+obed+' минут')*/

				let zapis = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, zayavka.timestart.hour, zayavka.timestart.minutes );
				let timer = new Date( zayavka.timestart.year, zayavka.timestart.month, zayavka.timestart.date, zayavka.timestart.hour, zayavka.timestart.minutes );
				let otschet = new Date (timer.setMinutes(timer.getMinutes() + zayavka.minets));
				//console.log('Время начала работ: '+zapis)
					

				
				var calendar_brush;
				this_day(zapis, otschet, obed_start_H, obed_start_M, obed_end_H, obed_end_M, konec_raboty_H, konec_raboty_M, obed, zayavka.minets, nachalo_raboty_H, nachalo_raboty_M, weekends, zayavka.days_work);
				console.log(zayavka.days_work_timer)
				

				
			});
		}

		/*function this_day(a,c,b,m,n,p,q,r,h,d,e,f,k){var t=String(k),l=k.split(","),g=10>a.getDate()?"0"+a.getDate():a.getDate(),u=10>a.getMonth()?"0"+(a.getMonth()+1):a.getMonth(),v=a.getFullYear();g=g+"."+u+"."+v;for(u=0;u<l.length;u++)if(g==l[u])return console.warn(g+" \u0412\u042b\u0425\u041e\u0414\u041d\u041e\u0419 \u0414\u0415\u041d\u042c!"),k=new Date(a.setDate(a.getDate()+1)),this_day(k,c,b,m,n,p,q,r,h,d,e,f,t);console.log("----------------------------------------------------------------------------------------------------------------------------- ");console.log("Start iteration - "+a);console.log("Start day - "+e+":"+f);console.log("Timer_local - "+c);console.log("----------------------------------------------------------------------------------------------------------------------------- ");t=new Date(a.getFullYear(),a.getMonth(),a.getDate(),q,r);l=new Date(a.getFullYear(),a.getMonth(),a.getDate(),b,m);g=new Date(a.getFullYear(),a.getMonth(),a.getDate(),n,p);if(a<=l&&c<l)if(c=(t-a)/1E3/60-d-h,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),this_day(d,a,b,m,n,p,q,r,h,Math.abs(c),e,f,k);else return b=new Date(a.setMinutes(a.getMinutes()+d)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()+1):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a<=g&&a<g&&c>l)if(c=(t-a)/1E3/60-d-h,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),this_day(d,a,b,m,n,p,q,r,h,Math.abs(c),e,f,k);else return b=new Date(a.setMinutes(a.getMinutes()+d+h)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()+1):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a>=g)if(c=(t-a)/1E3/60-d,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),this_day(d,a,b,m,n,p,q,r,h,Math.abs(c),e,f,k);else return b=new Date(a.setMinutes(a.getMinutes()+d)),console.log(b),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()+1):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes};*/


		/*function this_day(a,c,b,n,p,q,r,t,h,d,e,f,k,l){l=String(k);var m=k.split(","),g=10>a.getDate()?"0"+a.getDate():a.getDate(),u=10>a.getMonth()?"0"+(a.getMonth()+1):a.getMonth(),v=a.getFullYear();g=g+"."+u+"."+v;for(u=0;u<m.length;u++)if(g==m[u])return console.warn(g+" \u0412\u042b\u0425\u041e\u0414\u041d\u041e\u0419 \u0414\u0415\u041d\u042c!"),k=new Date(a.setDate(a.getDate()+1)),zayavka.days_work++,this_day(k,c,b,n,p,q,r,t,h,d,e,f,l,zayavka.days_work);console.log("----------------------------------------------------------------------------------------------------------------------------- ");console.log("Start iteration - "+a);console.log("Start day - "+e+":"+f);console.log("Timer_local - "+c);console.log("----------------------------------------------------------------------------------------------------------------------------- ");l=new Date(a.getFullYear(),a.getMonth(),a.getDate(),r,t);m=new Date(a.getFullYear(),a.getMonth(),a.getDate(),b,n);g=new Date(a.getFullYear(),a.getMonth(),a.getDate(),p,q);if(a<=m&&c<m)if(c=(l-a)/1E3/60-d-h,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,h,Math.abs(c),e,f,k,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a<=g&&a<g&&c>m)if(c=(l-a)/1E3/60-d-h,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,h,Math.abs(c),e,f,k,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d+h)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a>=g)if(c=(l-a)/1E3/60-d,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,h,Math.abs(c),e,f,k,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),console.log(b),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+(b.getMonth()):b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes};*/

		/*function this_day(a,c,b,n,p,q,r,t,k,d,e,f,l,m){m=String(l);var h=l.split(","),g=10>a.getDate()?"0"+a.getDate():a.getDate(),u=10>a.getMonth()?"0"+(a.getMonth()+1):a.getMonth(),v=a.getFullYear();g=g+"."+u+"."+v;if(c<a)for(;c<a;)c.setDate(c.getDate()+1);for(u=0;u<h.length;u++)if(g==h[u])return console.warn(g+" \u0412\u042b\u0425\u041e\u0414\u041d\u041e\u0419 \u0414\u0415\u041d\u042c!"),l=new Date(a.setDate(a.getDate()+1)),zayavka.days_work++,this_day(l,c,b,n,p,q,r,t,k,d,e,f,m,zayavka.days_work);console.log("----------------------------------------------------------------------------------------------------------------------------- ");console.log("Start iteration - "+a);console.log("Start day - "+e+":"+f);console.log("Timer_local - "+c);console.log("----------------------------------------------------------------------------------------------------------------------------- ");m=new Date(a.getFullYear(),a.getMonth(),a.getDate(),r,t);h=new Date(a.getFullYear(),a.getMonth(),a.getDate(),b,n);g=new Date(a.getFullYear(),a.getMonth(),a.getDate(),p,q);if(a<=h&&c<h)if(console.warn(a+" <= "+h+" && "+c+" < "+h),c=(m-a)/1E3/60-d-k,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a<=g&&a<g&&c>h)if(console.warn(a+" <= "+g+" && "+a+" < "+g+" && "+c+" > "+h),c=(m-a)/1E3/60-d-k,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d+k)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a>=g)if(console.warn(a+" >= "+g),c=(m-a)/1E3/60-d,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),console.log(b),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes};*/

		function this_day(a,c,b,n,p,q,r,t,k,d,e,f,l,m){m=String(l);var h=l.split(","),g=10>a.getDate()?"0"+a.getDate():a.getDate(),u=10>a.getMonth()?"0"+(a.getMonth()+1):a.getMonth(),v=a.getFullYear();g=g+"."+u+"."+v;if(c<a)for(;c<a;)c.setDate(c.getDate()+1);for(u=0;u<h.length;u++)if(g==h[u])return console.warn(g+" \u0412\u042b\u0425\u041e\u0414\u041d\u041e\u0419 \u0414\u0415\u041d\u042c!"),l=new Date(a.setDate(a.getDate()+1)),zayavka.days_work++,this_day(l,c,b,n,p,q,r,t,k,d,e,f,m,zayavka.days_work);m=new Date(a.getFullYear(),a.getMonth(),a.getDate(),r,t);h=new Date(a.getFullYear(),a.getMonth(),a.getDate(),b,n);g=new Date(a.getFullYear(),a.getMonth(),a.getDate(),p,q);if(a<=h&&c<h)if(c=(m-a)/1E3/60-d-k,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a<=g&&a<g&&c>=h)if(c=(m-a)/1E3/60-d-k,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d+k)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes;else if(a>=g)if(c=(m-a)/1E3/60-d,0>c)d=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1,e,f),a=new Date(a.setMinutes(a.getMinutes()+Math.abs(c))),zayavka.days_work++,this_day(d,a,b,n,p,q,r,t,k,Math.abs(c),e,f,l,zayavka.days_work);else return b=new Date(a.setMinutes(a.getMinutes()+d)),zayavka.timeplaneend.year=b.getFullYear(),zayavka.timeplaneend.month=10>b.getMonth()?"0"+b.getMonth():b.getMonth(),zayavka.timeplaneend.date=10>b.getDate()?"0"+b.getDate():b.getDate(),zayavka.timeplaneend.hour=10>b.getHours()?"0"+b.getHours():b.getHours(),zayavka.timeplaneend.minutes=10>b.getMinutes()?"0"+b.getMinutes():b.getMinutes(),zayavka.days_work_timer=zayavka.days_work,zayavka.days_work=0,summ_hours.innerText=zayavka.timeplaneend.date+"."+zayavka.timeplaneend.month+"."+zayavka.timeplaneend.year+" "+zayavka.timeplaneend.hour+":"+zayavka.timeplaneend.minutes};

		function create_zayavka (argument) {
			let order_data = { 
				id_client: zayavka.client,
				id_car: zayavka.car,
				works: zayavka.worklist,
				parts: zayavka.partslist,
				master: zayavka.implementer,
				time_to_start: zayavka.timestart.year+'-'+zayavka.timestart.month+'-'+zayavka.timestart.date+' '+zayavka.timestart.hour+':'+zayavka.timestart.minutes+':00',
				time_to_end_plane: zayavka.timeplaneend.year+'-'+zayavka.timeplaneend.month+'-'+zayavka.timeplaneend.date+' '+zayavka.timeplaneend.hour+':'+zayavka.timeplaneend.minutes+':00',
				time_t_end_real: '',
				work_time: zayavka.minets,
				status: 1,
				price: zayavka.summ
			};
			$.get('save-incident', order_data, function(data) {
				console.warn('Суток: ' + data);
			});
		}

	
/*

в инцидент пишем:
ид заказа - автоинкремент
ид человека +
ид машины +
состав ид вида работ +
состав ид запчастей +
ид мастера +
ид места (подъемника)
время начала работ +
время завершения работ планируемое
время завершения работ фактическое
сколько часов выполняется заказ 
статус заказа +
стоимость заказа + 



*/




	document.body.appendChild(popup_zakaz);
	close_popup();
	$("body #phone_client").mask("+7 (999) 999-99-99");
}


var sauto = {
	create_close_button : (conteiner/*БЛОК КУДА ДОБАВЛЯЕТСЯ КНОПКА ЗАКРЫТЬ*/, wind)=>{
		let	popup_close = document.createElement('span');
		popup_close.className = 'popup_close';
		popup_close.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';	
		conteiner.appendChild(popup_close)
		close_popup(wind)
	},
	insert_clear_block: (conteiner/*БЛОК ДЛЯ ОТМЕНЫ ГОРИЗОНТАЛЬНОЙ ОБТЕКАЕМОСТИ ЭЛЕМЕНТОВ*/, margintop)=>{
		let clear = document.createElement('div');
			clear.style.clear = 'both';
			clear.style.marginTop = margintop;
			//clear.style.marginTop = '28px';
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
			create_new_button.id = identificator;
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
				case 'third':
					if (toogle_window == 'new_client_car_window') { document.querySelector('.create_new_person').classList.remove('HIDE_ON_TIME');toogle_window = 'new_client_window';document.querySelector('.create_new_person ').nextSibling.remove() }
					break;
				case 'second':
					this.parentElement.parentElement.removeChild(this.parentElement);
					if (toogle_window == 'new_client_window' || toogle_window == 'new_car_window' || toogle_window == 'new_work_window' || toogle_window == 'new_zapchast_window'){toogle_window = 'incident_window';document.querySelector('.add_button').remove();document.querySelector('.popup_zakaz_body').classList.remove('HIDE_ON_TIME')}
					//if (toogle_window == 'incident_window') {toogle_window = 'main';document.querySelector('.popup_zakaz_body').classList.remove('HIDE_ON_TIME')}
					break;
				case 'main':
					if (toogle_window == 'incident_window') {toogle_window = 'main';document.querySelector('.popup_zakaz_body').classList.remove('HIDE_ON_TIME')}
					break;
				default:
					this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
					break;
			}
		}		
	}

function check_mathes_span (parent) {
	for(let i=0;i<parent.children.length;i++)
	{
		if (parent.children[i].style.display == 'inline-block') {
			return true;
		}
	}
	console.log(parent.children[0].style.display)
	console.log(parent)
	return false;
}

var zayavka = 
{
	client:'',
	car:'',
	worklist:[],
	partslist:[],
	implementer:'',
	place:'',
	timestart:
	{
		year:'',
		month:'',
		date:'',
		hour:'',
		minutes:''
	},
	timeplaneend:
	{
		year:'',
		month:'',
		date:'',
		hour:'',
		minutes:''
	},
	timeend:
	{
		year:'',
		month:'',
		date:'',
		hour:'',
		minutes:''
	},
	days_work_timer:0,
	days_work:0,
	status:'1',
	minets:0,
	summ:''
}









					/*

					if (zapis <= nach_obed && otschet > nach_obed) {
						let ot_nachala_zap_do_konca_dnya_M = (konec_raboty - zapis)/1000/60;
						console.log('Оставшееся время от начала работ до конца рабочего дня с учетом обеда: '+ot_nachala_zap_do_konca_dnya_M)

						let raznica_vremeni_zayavki_i_RD = ot_nachala_zap_do_konca_dnya_M - zayavka.minets - obed;
						console.log('Нужно мминут для выполнения услуг: '+zayavka.minets)
						console.log('Разница времени исполнения заказа и фактически оставшегося времени до конца рабочего дня: '+raznica_vremeni_zayavki_i_RD)
						if (raznica_vremeni_zayavki_i_RD >= 0)
						{
							let planeEND = new Date (zapis.setMinutes(zapis.getMinutes()+zayavka.minets));
							console.log(planeEND)
						}
						else
						{

						}
					}

					else {
						let ot_nachala_zap_do_konca_dnya_M = (konec_raboty - zapis)/1000/60;
						console.log('Оставшееся время от начала работ до конца рабочего дня без учёта обеда: '+ot_nachala_zap_do_konca_dnya_M)

						let raznica_vremeni_zayavki_i_RD = ot_nachala_zap_do_konca_dnya_M - zayavka.minets;
						console.log('Нужно мминут для выполнения услуг: '+zayavka.minets)
						console.log('Разница времени исполнения заказа и фактически оставшегося времени до конца рабочего дня: '+raznica_vremeni_zayavki_i_RD)
					}

					*/



					
					/*zayavka.timeplaneend.month = planeEND.getMonth();
					zayavka.timeplaneend.date = planeEND.getDate();
					zayavka.timeplaneend.hour = planeEND.getHours();
					zayavka.timeplaneend.minutes = planeEND.getMinutes();
					summ_hours.innerText = planeEND.getDate() + '.' + planeEND.getMonth()+1 + '.' + planeEND.getFullYear() + ' ' + planeEND.getHours() + ':' + planeEND.getMinutes();*/