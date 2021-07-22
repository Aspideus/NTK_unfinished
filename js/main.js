const ANIM_TIMEOUT = 600;


      $('.header_wrapper').html(`
      <div class="header_content">
        <div class="">
          <img src="./img/logo.svg"/>
        </div>
        <div class="">
          <div id="current_date_time_block" class="h_datetime h_date" ></div>
          <div class="">
            <span id="USD" class="USD_val" ><span>USD</span>  00,00</span>
            <span id="CNY" class="CNY_val" ><span>CNY</span>  00,00</span>
          </div>
        </div>
        <div class="header_tel">
          <a href="tel:89240036619">+7 (924) 003-66-19</a>
        </div>
        <div class="">
          <button class="contact_us__button" onclick="call_popup();">Написать нам</button>
        </div>
      </div>
      `);

    /* функция добавления ведущих нулей */
    /* (если число меньше десяти, перед числом добавляем ноль) */
    function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    /* функция получения текущей даты и времени */
    function date_time()
    {
        var current_datetime = new Date();
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth()+1);
        var hours = zero_first_format(current_datetime.getHours());
        var minutes = zero_first_format(current_datetime.getMinutes());

        return day+"/"+month+" "+hours+":"+minutes;
    }

    /* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
    //document.getElementById('current_date_time_block').innerHTML = date_time();
    //document.getElementById('current_date_time_block1').innerHTML = date_time();
    function CBR_XML_Daily_Ru(rates) {
      let USDrate = rates.Valute.USD.Value.toFixed(2).replace('.', ',');
      let CNYrate = rates.Valute.CNY.Value.toFixed(2).replace('.', ',');

	  $('.USD_val').html(`<span>USD</span>  ${USDrate}`);
	  $('.CNY_val').html(`<span>CNY</span>  ${CNYrate}`);

      $('.h_date').html(date_time());
    }


(function() {
  const BURGER = document.getElementsByClassName("burger")[0];
  const MENU = document.getElementsByClassName("menu")[0];
  const ACTIVECLASS = "menu_active";
  BURGER.onclick = event => {
    if (menu.classList.contains(ACTIVECLASS)) {
      MENU.classList.remove(ACTIVECLASS);
    } else {
      MENU.classList.add(ACTIVECLASS);
    }
  };
})();


$(document).ready(function(){
  $(".footer_ul li a").click(function(){
    $(".footer_ul li a").removeClass("footer__active_button");
    $(this).toggleClass("footer__active_button");
  });

  $('.changes').on('click', function() {
    $('.hidden_side').toggle();
    $('.active_side').toggle();
    $(this).parent().parent().toggleClass('new_bottom');
  });
});

let check = 0;
let disp = 1;
let disp_ext = 1;

let mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
console.log(mousewheelevt);

//при скролле колеса мыши (для свайпа будет отдельно ниже)
$(function(){
  $(document).on(mousewheelevt, function(event){
//  var course = event.originalEvent.wheelDelta;

    var course = (/Firefox/i.test(navigator.userAgent)) ? -event.detail : event.originalEvent.wheelDelta;
    //console.log(course);

  if(course > 0) {
    check -= 90;
    disp--;
    disp_ext--;
    $(".cube").css("transform", `rotateX(${check}deg)`);
  }
  else if (course < 0) {
    check += 90;
    disp++;
    disp_ext++;
    $(".cube").css("transform", `rotateX(${check}deg)`);
  }
  else {
    console.log('swiped');  //потому что undefined, но при обычных условиях этого в консоль не выведет вообще
  };

  if(disp <= 0) {
    disp += 4;
  }
  else if (disp > 4) {
    disp -= 4;
  }

  //работа с панелью футера
  $('.footer__active_button').removeClass('footer__active_button');
  $(`.footer_0${disp_ext}`).addClass('footer__active_button');

  if(disp_ext <= 0) {
    disp_ext += 8;
    $(`.footer_0${disp_ext}`).addClass('footer__active_button');
  }
  else if (disp_ext > 8) {
    $(`.footer_0${disp_ext}`).removeClass('footer__active_button');
    $(`.footer_01`).addClass('footer__active_button');
    disp_ext -= 8;
  }

  //смена рубашек на обратные стороны
  if((disp == 1) && (course < 0)) {
      $('.hidden_side').toggle(ANIM_TIMEOUT);
      $('.active_side').toggle(ANIM_TIMEOUT);

      window.setTimeout(function() {
        $('.cube > .top').toggleClass('cubetop');
      }, 500);
      $('.cube > .bottom').toggleClass('cubebottom');
      $('.cube > .back').toggleClass('cubeback');
      $('.cube > .front').toggleClass('cubefront');
  }
  else if ((disp == 4) && (course > 0)) {
      $('.hidden_side').toggle(ANIM_TIMEOUT);
      $('.active_side').toggle(ANIM_TIMEOUT);

      $('.cube > .top').toggleClass('cubetop');
      $('.cube > .bottom').toggleClass('cubebottom');
      $('.cube > .back').toggleClass('cubeback');
      window.setTimeout(function() {
        $('.cube > .front').toggleClass('cubefront');
      }, 500);
  }
});
});

//делаем теперь тоже самое, но не при повороте колеса мыши а при свайпе (приходится повторять код из за функциональной видимости)
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let x1 = null;
let y1 = null;


function handleTouchStart(event) {
  const FIRSTTOUCH = event.touches[0];
  x1 = FIRSTTOUCH.clientX;
  y1 = FIRSTTOUCH.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }

  var x2 = event.touches[0].clientX;
  var y2 = event.touches[0].clientY;

  var xDiff = x2 - x1;
  var yDiff = y2 - y1;

  if (Math.abs(xDiff) < Math.abs(yDiff)) {

    if (yDiff > 0) {
      check -= 90;
      disp--;
      disp_ext--;
      $(".cube").css("transform", `rotateX(${check}deg)`);
    }//down
    else {
      check += 90;
      disp++;
      disp_ext++;
      $(".cube").css("transform", `rotateX(${check}deg)`);
    }//up

    $('.footer__active_button').removeClass('footer__active_button');
    //console.log((`.footer_0${disp - 1}`));
    $(`.footer_0${disp}`).addClass('footer__active_button');

    if(disp <= 0) {
      disp += 4;
    }
    else if (disp > 4) {
      disp -= 4;
    }

    //работа с панелью футера
    $('.footer__active_button').removeClass('footer__active_button');
    $(`.footer_0${disp_ext}`).addClass('footer__active_button');

    if(disp_ext <= 0) {
      disp_ext += 8;
      $(`.footer_0${disp_ext}`).addClass('footer__active_button');
    }
    else if (disp_ext > 8) {

      $(`.footer_0${disp_ext}`).removeClass('footer__active_button');
      $(`.footer_01`).addClass('footer__active_button');
      disp_ext -= 8;
    }

    //смена рубашек на обратные
    if((disp == 1) && (yDiff < 0)) {
        $('.hidden_side').toggle(ANIM_TIMEOUT);
        $('.active_side').toggle(ANIM_TIMEOUT);

        window.setTimeout(function() {
          $('.cube > .top').toggleClass('cubetop');
        }, 500);
        $('.cube > .bottom').toggleClass('cubebottom');
        $('.cube > .back').toggleClass('cubeback');
        $('.cube > .front').toggleClass('cubefront');

    }
    else if ((disp == 4) && (yDiff > 0)) {
        $('.active_side').toggle(ANIM_TIMEOUT);
        $('.hidden_side').toggle(ANIM_TIMEOUT);

        $('.cube > .top').toggleClass('cubetop');
        $('.cube > .bottom').toggleClass('cubebottom');
        $('.cube > .back').toggleClass('cubeback');
        window.setTimeout(function() {
          $('.cube > .front').toggleClass('cubefront');
        }, 500);
    }

  }
  /*else { //Если это раскомментировать то можно также отслеживать свайпы влево/вправо
    if (xDiff > 0) console.log('right')
    else console.log('left');
  }*/
  x1 = null;
  y1 = null;
}

//но нам же нужно по клику на номер в футере тоже поворачивать куб
function turn(number) {
  disp = number;
  disp_ext = number;
  check = 90 * (number - 1);
  console.log(disp, disp_ext, check)
  if(number > 4) {
    $('.hidden_side').show(ANIM_TIMEOUT);
    $('.active_side').hide(ANIM_TIMEOUT);

    $('.cube > .top').addClass('cubetop');
    $('.cube > .bottom').addClass('cubebottom');
    $('.cube > .back').addClass('cubeback');
    $('.cube > .front').addClass('cubefront');

  }
  else {
    $('.hidden_side').hide(ANIM_TIMEOUT);
    $('.active_side').show(ANIM_TIMEOUT);

    $('.cube > .top').removeClass('cubetop');
    $('.cube > .bottom').removeClass('cubebottom');
    $('.cube > .back').removeClass('cubeback');
    $('.cube > .front').removeClass('cubefront');
  }

    $(".cube").css("transform", `rotateX(${check}deg)`);
}





    $('.grid_panel_block__button').on('click', function() {
      $(this).parent().parent().hide();
      $('.panel_block__information').html(

        //
        `<div class="pb_left_flex">
          Таможенное оформление
          <div class="grid_panel_block__subtitle"> грузов из Китая, ЮВА и других стран</div>
        </div>
        <div class="pb_right_flex">
          <div class="pb_close"></div>
          <ul>
            <li>Анализ документов;</li>
            <li>Классификация товара в соответствие с ТН ВЭД ЕврАзЭс;</li>
            <li>Предварительный расчет таможенных платежей и сборов;</li>
            <li>Подготовка декларации на товары;</li>
            <li>Оформление разрешительной документации (сертификат соответствия, декларация
              соответствия, свидетельство о государственной регистрации, лицензии и т. д.);
            </li>
            <li>Подача документов в таможенные органы и контроль прохождения этапов таможенного оформления.</li>
          </ul>
        </div>`
        //

      ).show();

      $('.pb_close').on('click', function() {
        $(this).parent().parent().hide();
        $('.grid_panel_4x3').show();
      });
    });
    //можно потом с помощью id и ${enum} сделать функцию одну

    $('.sp_button').on('click', function() {
      if(!($(this).hasClass('side_panel__active'))) {
        $('.side__panel_block').toggle();
        $('.side__panel_block_2').toggle();

        $('.sp_button').removeClass('side_panel__active');
        $(this).addClass('side_panel__active');

        //$('#sp_adv').toggleClass('side_panel__active');
        //$('#sp_docs').toggleClass('side_panel__active');
      }
    });


    /* Показ и скрытие попапа */
    function call_popup() {
      if(!document.querySelector('.popup_area').classList.contains('isShown_flex'))
        document.querySelector('.popup_area').classList.add('isShown_flex');
        //document.querySelector('.popup_area').classList.hasClass
      }
    function hide_popup() {
      if(document.querySelector('.popup_area').classList.contains('isShown_flex'))
      document.querySelector('.popup_area').classList.remove('isShown_flex');
    }

    /*Обработка заявок */
    function call() {
      var msg = $(`#call_request`).serialize();
      $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: msg,
      success: function(data) {
          console.log("excellent!");
          alert('Заявка успешно отправлена. В ближайшее время наши специалисты свяжутся с вами.');
      },
      error:  function(xhr, str){
        alert("После загрузки на сайт заявка будет работать правильно, пока можно посмотреть на передаваемые данные (кириллица хранится в другом формате, но на сервер передается корректно): " + msg);
          //console.log(msg);
          //alert('Возникла ошибка: ' + xhr.responseCode);
          }
      });
  }
