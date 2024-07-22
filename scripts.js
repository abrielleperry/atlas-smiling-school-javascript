$(document).ready(function () {
  $(".loader").show();
  $("#quote-carousel").addClass("d-none");

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
                <img src="${
                  quote.pic_url
                }" class="d-block align-self-center" alt="Carousel Pic ${
          index + 1
        }" />
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

      $("#quote-carousel").slick({
        prevArrow: $(".carousel-control-prev"),
        nextArrow: $(".carousel-control-next")
      });
    },
    error: function () {
      $(".loader").hide();
      alert("Failed to load quotes.");
    }
  });

  $(".loader").show();
  $("#popular").addClass("d-none");

  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    method: "GET",
    success: function (response) {
      $(".popular .loader").hide();
      $("#carouselExampleControls2").removeClass("d-none");
    
      response.forEach(video, index) => {
        const videoCard = `
        `
      })
});
