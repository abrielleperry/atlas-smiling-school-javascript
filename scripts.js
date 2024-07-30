$(document).ready(function() {
  function showLoader() {
    $(".loader").show();
  }

  function hideLoader() {
    $(".loader").hide();
  }

  $("#quote-carousel").addClass("d-none");
  $("#popular-carousel").addClass("d-none");
  $("#latest-carousel").addClass("d-none");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getQuotesCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();
        $("#quote-carousel").removeClass("d-none");

        response.forEach((quote, index) => {
          let carouselItem = `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${quote.pic_url}" class="d-block align-self-center rounded-circle"  alt="Carousel Pic ${index +
            1}" />
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

        $("#quote-carousel").carousel({
          interval: false
        });
      },
      error: function() {
        hideLoader();
        alert("failed to load quotes api");
      }
    });
  }
  getQuotesCarouselData();

  function getPopularCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();
        $("#popular-carousel").removeClass("d-none");

        response.forEach((video, index) => {
          let carouselInner = `
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

        $("#popular-carousel .carousel-inner").slick({
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
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      },
      error: function() {
        hideLoader();
        alert("failed to load most popular tutorials api");
      }
    });
  }
  getPopularCarouselData();

  function getLatestCarouselData() {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/latest-videos",
      method: "GET",
      beforeSend: function() {
        showLoader();
      },
      success: function(response) {
        hideLoader();
        $("#latest-carousel").removeClass("d-none");

        if (response.length <= 4) {
          response = [...response, ...response];
        }

        response.forEach((card, index) => {
          let carouselInner = `
        <div class="carousel-item">
            <div class="card">
              <img src="${card.thumb_url}" class="card-img-top" alt="Video thumbnail" />
              <div class="card-img-overlay text-center ">
                <img src="images/play.png" alt="Play" width="64px" class="d-flex mx-auto play-overlay" />
              </div>
              <div class="card-body">
                <h5 class="card-title font-weight-bold">${card.title}</h5>
                <p class="card-text text-muted">${card["sub-title"]}</p>
                <div class="creator d-flex align-items-center">
                  <img src="${card.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                  <h6 class="pl-3 m-0 main-color">${card.author}</h6>
                </div>
                <div class="info pt-3 d-flex justify-content-between">
                  <div class="rating row">
                    ${getRatingStars(card.star)}
                  </div>
                  <span class="main-color">${card.duration}</span>
                </div>
            </div>
          </div>
        </div>
      
        `;
          $("#latest-carousel .carousel-inner").append(carouselInner);
        });

        $("#latest-carousel .carousel-inner").slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,

          prevArrow: $("#latest-carousel .carousel-control-prev"),
          nextArrow: $("#latest-carousel .carousel-control-next"),

          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: $("#latest-carousel .carousel-control-prev"),
                nextArrow: $("#latest-carousel .carousel-control-next")
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
                prevArrow: $("#latest-carousel .carousel-control-prev"),
                nextArrow: $("#latest-carousel .carousel-control-next")
              }
            }
          ]
        }), $(
          "#latest-carousel .carousel-control-prev"
        ).on("click", function() {
          console.log("prev arrow clicked");
        });
      },
      error: function() {
        hideLoader();
        alert("failed to load most popular tutorials api");
      }
    });
  }
  getLatestCarouselData();

  function getDataForSearchResults() {
    showLoader();
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      data: {
        q: $("#search-input").val(),
        topic: $("#topicDropdown").data("value"),
        sort: $("#sortDropdown").data("value")
      },
      success: function(response) {
        hideLoader();
        loadDropDowns(response.topics, response.sorts);

        $("#search-input").val(response.q);
        $("#topicDropdown").data("value", response.topic);
        $("#sortDropdown").data("value", response.sort);

        loadVideoCards(response.courses);

        $(".video-count").text(`${response.courses.length} videos`);
      },
      error: function() {
        hideLoader();
        alert("failed to load search results");
      }
    });
  }

  // LOAD/POPULATE DROPDOWNS
  function loadDropDowns(topics, sorts) {
    // pop topic dd
    $("#topic-menu").empty();
    topics.forEach(topic => {
      const capitalizeTopics = capitalizeFirstLetter(topic);
      $("#topic-menu").append(
        `<a class="dropdown-item" href="#" data-value="${topic}">${capitalizeTopics}</a>`
      );
    });

    // pop sort by dd
    $("#sort-menu").empty();
    sorts.forEach(sort => {
      const capitalizeSortBys = capitalizeFirstLetter(sort.replace(/_/g, " "));

      $("#sort-menu").append(
        `<a class="dropdown-item" href="#" data-value="${sort}">${capitalizeSortBys}</a>`
      );
    });

    // set default values for dropdowns
    $("#topicDropdown > span").text("All");
    $("#sortDropdown > span").text("Most Popular");
  }

  function loadVideoCards(courses) {
    $("#video-cards").empty();
    courses.forEach(video => {
      let videoItem = `
      <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img
                  src="${video.thumb_url}"
                  class="card-img-top"
                  alt="Video thumbnail"
                />
                <div class="card-img-overlay text-center">
                  <img
                    src="images/play.png"
                    alt="Play"
                    width="64px"
                    class="align-self-center play-overlay"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">
                    ${video["sub-title"]}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src="${video.author_pic_url}"
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                  ${getRatingStars(video.star)}
                    </div>
                    <span class="main-color">${video.duration}</span>
                  </div>
                </div>
              </div>
            </div>
    `;
      $("#video-cards").append(videoItem);
    });
  }

  function getRatingStars(starCount) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars +=
          '<img src="images/star_on.png" alt="star on" width="15px" height="15px" />';
      } else {
        stars +=
          '<img src="images/star_off.png" alt="star off" width="15px" height="15px" />';
      }
    }
    return stars;
  }

  $("#search-input").on("input", getDataForSearchResults);

  $("#topic-menu").on("click", "a", function(e) {
    e.preventDefault();
    const selectedTopic = $(this).data("value");
    $("#topicDropdown").data("value", selectedTopic);
    $("#topicDropdown span").text(capitalizeFirstLetter($(this).text()));
    getDataForSearchResults();
  });

  $("#sort-menu").on("click", "a", function(e) {
    e.preventDefault();
    const selectedSort = $(this).data("value");
    $("#sortDropdown").data("value", selectedSort);
    $("#sortDropdown span").text(
      capitalizeFirstLetter($(this).text().replace(/_/g, " "))
    );
    getDataForSearchResults();
  });
  getDataForSearchResults();
});
