// scroll plugin
$('.cardPage--tarot .cardWrap__scroll').mCustomScrollbar({
  axis: 'x',
  setWidth: '768px',
  scrollbarPosition: 'outside',
  mouseWheel: { enable: true },
  scrollInertia: 500,
  scrollButtons: {
    enable: true,
    scrollType: 'stepless',
    scrollAmount: 40,
  },
  callbacks: {
    onUpdate: function () {
      $('.cardWrap__scroll').mCustomScrollbar('scrollTo', '50%');
    },
  },
});

let isPicked = false; //카드 animate 동작중에 선택 금지
//페이지 진입시 startStart();
setTimeout(() => {
  cardAnimate();
}, 10);

// 카드 다시섞기
$('#btn-cardReShuffle').click(function () {
  if (!isPicked) {
    cardAnimate();
  }
});

function randomPick(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const cardShuffle = () => {
  return new Promise((res, reject) => {
    isPicked = true;
    //섞기 애니메이션 시작.
    $('.cardPage .card').removeClass('complete pick').addClass('shuffle');
    $('.cardWrap__scroll').mCustomScrollbar('scrollTo', '50%');
    //섞기 애니메이션 끝난후 펼치기
    setTimeout(() => {
      $('.cardPage .card').each(function (index) {
        if (!$('.cardPage .card').eq(index).hasClass('complete')) {
          var row = $(this);
          setTimeout(() => {
            row.removeClass('shuffle').addClass('complete');
          }, 50 * index);
        }
      });
      // console.log('섞기완료');
      res('shuffle done');
    }, 2010); // $lapDuration + 10
  });
};

const cardPick = () => {
  return new Promise((res, reject) => {
    //펼치기 끝난 후 다시섞기 가능(isPicked=false)
    //카드 고르기

    setTimeout(() => {
      // console.log('이제 뽑아');
      const cardLength = $('.card').length;

      $('.card').click(function (e) {
        $('.cardWrap__scroll').mCustomScrollbar('scrollTo', '50%');
        const cardType = $(this).attr('data-card-kind');

        if (!isPicked) {
          isPicked = true;
          const cardNumber = randomPick(1, cardLength); //카드 갯수 중에 랜덤 pick
          // console.log(`선택한 카드는 ${cardNumber}`);
          $(this).find('.card__front').html(`<img src="assets/images/${cardType}/${cardNumber}.jpg" />`);
          $(this).addClass('pick');

          setTimeout(() => {
            // console.log('뽑고 2000ms뒤 뷰페이지로 이동');
            if (cardType == 'tarot') {
              localStorage.setItem('tarot', cardNumber);
            } else {
              localStorage.setItem('soulmate', cardNumber);
            }

            location.href = `${cardType}View.html`;
          }, 2000);
        }
      });

      isPicked = false; //다시섞기 가능
    }, 1100);
    res();
  });
};

function cardAnimate() {
  // isPicked = false;
  cardShuffle()
    .then((response) => cardPick(response))
    .finally(function () {
      // console.log('카드펼치기 완료');
    });
}
