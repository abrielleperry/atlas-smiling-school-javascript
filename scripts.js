$(document).ready(function () {
  $("#loader").show();

  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    method: "GET",
    success: function (data) {
      $("#loader").hide();

      data.forEach(function (quote) {
        $("#quotes-carousel").append(`
                        <div class="carousel-item">
                            <div class="row mx-auto align-items-center">
                                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                                    <img src="${quote.pic_url}" class="d-block align-self-center" alt="Carousel Pic">
                                </div>
                                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                                    <div class="quote-text">
                                        <p class="text-white">"${quote.text}"</p>
                                        <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                        <span class="text-white">${quote.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
      });

      $("#quotes-carousel").slick({
        slidesToShow: 1,
        prevArrow:
          '<button type="button" class="slick-prev"><img src="images/arrow_white_left.png" alt="Previous quote" aria-hidden="true"/></button>',
        nextArrow:
          '<button type="button" class="slick-next"><img src="images/arrow_white_right.png" alt="Next quote" aria-hidden="true"/></button>'
      });
    },
    error: function () {
      $("#loader").hide();
      alert("Failed to load quotes");
    }
  });
});
