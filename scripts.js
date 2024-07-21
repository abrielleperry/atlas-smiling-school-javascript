
document.addEventListener('DOMContentLoaded', function () {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  const quoteSection = document.querySelector('.quotes');
})

$.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        type: 'GET',
        dataType: 'json',
        beforeSend: function() {
          loader.show();
        },
        success: function(quotes) {
          loader.hide()
          displayQuotes(quotes);
        }

      });
