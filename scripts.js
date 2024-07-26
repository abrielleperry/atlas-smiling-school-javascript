$(document).ready(function () {
  $(".loader").show();
  $("#quote-carousel").addClass("d-none");
  $("#popular-carousel").addClass("d-none");

  function getQuotesCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      success: function (response) {
        $(".loader").hide();
        $("#quote-carousel").removeClass("d-none");

        response.forEach((quote, index) => {
          const carouselItem = `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${quote.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${index + 1}" />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">« ${quote.text}</p>
                  <h4 class="text-white font-weight-bold">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>
          `;
          $("#quote-carousel .carousel-inner").append(carouselItem);
        });

        $('#quote-carousel').carousel();
      },
      error: function () {
        $(".loader").hide();
        alert("failed to load quotes api");
      }
    });
  }
  getQuotesCarouselData();

function getPopularCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      beforeSend: function () {
        $(".loader").show();
      },
      success: function (response) {
        $(".loader").hide();
        $("#popular-carousel").removeClass("d-none");

        response.forEach((video, index) => {
          const carouselInner = `
          <div class="carousel-item">
              <div class="card">
                <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center ">
                  <img src="images/play.png" alt="Play" width="64px" class="d-flex mx-auto play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">${video["sub-title"]}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${video.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating row">
                      ${getRatingStars(video.star)}
                    </div>
                    <span class="main-color">${video.duration}</span>
                  </div>
              </div>
            </div>
          </div>
          `;
          $("#popular-carousel .carousel-inner").append(carouselInner);
        });

        $('#popular-carousel .carousel-inner').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
          prevArrow: $("#popular-carousel .carousel-control-prev"),
          nextArrow: $("#popular-carousel .carousel-control-next"),
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      },
      error: function () {
        $(".loader").hide();
        alert("failed to load most popular tutorials api");
      }
    });
  }
  getPopularCarouselData();

  function getRatingStars(starCount) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars += '<img src="images/star_on.png" alt="star on" width="15px" height="15px" />';
      } else {
        stars += '<img src="images/star_off.png" alt="star off" width="15px" height="15px" />';
      }
    }
    return stars;
  }
});
