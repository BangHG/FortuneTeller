$(document).ready(function () {
  AOS.init();

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  window.addEventListener('resize', function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });

  $('.nav__toggle').click(function () {
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(this).attr('title', 'open navigation');
      $('.nav').stop().removeClass('active');
    } else {
      $(this).addClass('on');
      $(this).attr('title', 'close navigation');
      $('.nav').stop().addClass('active');
    }
  });
});

//전환효과
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    $('body').attr('data-loading', 'done');
  }, 10);
});
// $(window).on('load', function(){

// });

// 블라인드 활성화 함수.
function open_blind() {
  $('.blind, .blind--btnClosed').fadeIn(300);
}
// 블라인드 비 활성화 함수.
function closed_blind() {
  $('.blind, .blind--btnClosed').fadeOut(300);
}
// 팝업 닫기 버튼 클릭 시 함수.
function closed_popup() {
  closed_blind();
  $('.popup').fadeOut(300);
}

$(document).keyup(function (e) {
  if (e.key === 'Escape') {
    closed_popup();
  }
});

//팝업열기
$(document).on('click', '.popup-link', function () {
  const targetPopupName = $(this).attr('data-popup');
  open_blind();
  $('.' + targetPopupName).fadeIn();
  return false;
});
