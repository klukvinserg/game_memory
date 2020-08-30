let arr = [
  { id: 1, url: 'krug.jpg' },
  { id: 2, url: 'kv.jpg' },
  { id: 3, url: 'r.jpg' },
  { id: 4, url: 'star.jpg' },
  { id: 5, url: 'tr.jpg' },
];

let clickOne;
let clickTwo;
let count = 0;

let clickOneElement;
let clickTwoElement;

let start;
let finish;

$(document).ready(function () {
  $('.button-start').on('click', getAllCard);

  function getAllCard() {
    start = Date.now();
    console.log(start);

    $('.block').empty();

    $('.button-start').attr('disabled', true);

    $('.block').append("<div class='top'></div>");

    let copyArr = arr.slice();

    for (let i = 0; i < arr.length; i++) {
      let randomNumber = RandomFunction(0, copyArr.length - 1);

      $('.top').append(
        `<div class="background" value='${copyArr[randomNumber].id}'><img src='${copyArr[randomNumber].url}'></div>`
      );

      copyArr.splice(randomNumber, 1);
    }

    $('.block').append("<div class='bottom'></div>");

    let copyArrTwo = arr.slice();

    for (let i = 0; i < arr.length; i++) {
      let randomNumber = RandomFunction(0, copyArrTwo.length - 1);

      $('.bottom').append(
        `<div class="background" value='${copyArrTwo[randomNumber].id}'><img src='${copyArrTwo[randomNumber].url}'></div>`
      );

      copyArrTwo.splice(randomNumber, 1);
    }

    setTimeout(hideImg, 500);
  }

  function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
  }

  function hideImg() {
    $('.background > img').fadeOut(1000);
    $('.button-start').text('Finish').off('click');
    $('.button-start').attr('disabled', false);
    $('.button-start').on('click', showImg);
    $('.top > .background').on('click', showCard);
    $('.bottom > .background').on('click', showCard);
  }

  function showImg() {
    $('.background > img').fadeIn();
    $('.button-start').hide();
    $('.top-main > p').text('Game memory - GAME OVER!');
    $('.background').off('click');
  }

  function showCard(e) {
    if (e.target.parentElement.className === 'top') {
      clickOne = e.currentTarget.attributes[1].value;
      clickOneElement = e.currentTarget.children[0];
      $(e.currentTarget.children[0]).show();
      $('.top > .background').off('click');
      count += 1;
    }

    if (e.target.parentElement.className === 'bottom') {
      clickTwo = e.currentTarget.attributes[1].value;
      clickTwoElement = e.currentTarget.children[0];
      $(e.currentTarget.children[0]).show();
      $('.bottom > .background').off('click');
      count += 1;
    }

    if (count === 2 && clickTwo !== clickOne) {
      $('.top > .background').on('click', showCard);
      $('.bottom > .background').on('click', showCard);
    } else if (count === 2 && clickTwo === clickOne) {
      finish = Date.now();

      $(clickOneElement).unwrap();
      $(clickTwoElement).unwrap();

      $(clickOneElement).css('margin', '10px');
      $(clickOneElement).css('border', '1px solid black');
      $(clickOneElement).css('opacity', '0.5');

      $(clickTwoElement).css('margin', '10px');
      $(clickTwoElement).css('border', '1px solid black');
      $(clickTwoElement).css('opacity', '0.5');

      let temp = $('.background');

      if (temp.length === 0) {
        $('.block').hide();
        $('.top-main > p').hide();
        $('.top-main > .button-start').hide();
        $('.top-main').css('border-bottom', 'none');
        $('.text-small').html(
          `Твій час ${((finish - start) / 1000).toFixed(2)} с.`
        );
        $('.win').show();
      }

      count = 0;

      $('.top > .background').on('click', showCard);
      $('.bottom > .background').on('click', showCard);
    }

    if (count === 3) {
      $('.background > img').hide();
      count = 0;

      if (e.target.parentElement.className === 'top') {
        clickOne = e.currentTarget.attributes[1].value;
        clickOneElement = e.currentTarget.children[0];
        $(e.currentTarget.children[0]).show();
        $('.top > .background').off('click');
        count += 1;
      }

      if (e.target.parentElement.className === 'bottom') {
        clickTwo = e.currentTarget.attributes[1].value;
        clickTwoElement = e.currentTarget.children[0];
        $(e.currentTarget.children[0]).show();
        $('.bottom > .background').off('click');
        count += 1;
      }
    }
  }
});
