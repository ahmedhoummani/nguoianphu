$(function() {
  FastClick.attach(document.body);

  function showSection(sectionName, scroll) {
    reset();
    $('.js-section-' + sectionName).show();
    $('.js-button-' + sectionName).addClass('active');
    $('.js-button.active.btn-default').addClass('btn-primary').removeClass('btn-default');
    window.location.hash = currentSectionName = sectionName;
    if (scroll) {
      $('html, body').scrollTop($('.js-toolbar').offset().top);
    }
  }

  function reset() {
    $('.js-section').hide();
    $('.js-button.active.btn-primary').addClass('btn-default').removeClass('btn-primary');
    $('.js-button').removeClass('active');
  }

  var currentSectionName = '';
  if (window.location.hash) {
    showSection(window.location.hash.replace('#', ''), false);
  }

  $('.js-button-clicktarget').tooltip({
    container: 'body'
  }).click(function(e) {
    e.preventDefault();
    var sectionName = $(this).data('section');
    if (sectionName === currentSectionName) {
      currentSectionName = "";
      window.location.hash = '';
      reset();
    } else {
      showSection(sectionName, $(this).data('is-navbar'));
    }
  });

  $('.js-toolbar').waypoint(function(direction) {
    $('.js-navbar').toggleClass('is-navbar-visible', direction === 'down');
  }, {
    offset: function() {
      return -2 * $(this).height();
    }
  });
});
