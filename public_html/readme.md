Object sauto metods sauto.\*:
create_close_button (parent) - указывается родительское окно, куда вставляется "крестик" закрыть.
insert_clear_block (parent) - указывается родительское элемент, добавляет блок для float элементов разделяющай по горизонтали.
insert_hr (parent) - указывается родительское элемент, добавляет горизонтальную линию.
success_window (check_event) - добавляется в функции записи в БД, имя события указывается в параметре прим: success_window ('Новый пользователь') - выведет -'Карточка клиента сохранена';
create_input (type_input, name_inp, class_name, placeholder) - создает новый инпут в вновь созданом окне прим: "let new_inp = sauto.create_input('text','name','my_class class','Введите данные..')"
create_new_button (identificator, class_name, type_button, text_on_btn) - создает кнопку. identificator присваевает id, class_name указывает класс (несколько через пробел), type_button предопределенные типы кнопок, например 'save' - кнопка сохранения изменений, text_on_button - текст на кнопке.