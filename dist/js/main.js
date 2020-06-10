/* Resize Header on Scroll*/
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 50) {
    document.querySelector('.logo h2 a').style.fontSize = '1.5rem';
    document.querySelector('header').style.borderBottom = '1px solid #0f8dba';
  } else {
    document.querySelector('.logo h2 a').style.fontSize = '2.4rem';
    document.querySelector('header').style.borderBottom = 'none';
  }
}

/* slide nav to the right on smaller devices */

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navList = document.querySelectorAll('.nav-links li');

  /* Toggle nav */
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    //Animate links
    navList.forEach((link, index) => {
      /* If the link has animation on it already, we don't need to add anymore */
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        /* to make the links appear with certain delay  */
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s `;
      }
    });
    burger.classList.toggle('animate');
  });
};
navSlide();

/* Portfolio */
/*preview= href="${item.site}" */
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolio();
});

function loadPortfolio(id = '') {
  const url = './js/projects.json';
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.portfolio);

      let html = '';
      let courosel_content = '';
      let imgCourosel = '';

      data.portfolio.forEach((item) => {
        html += `
        <div class="item ">
          <img src ="./img/projects/${item.id}.jpg">
          <div class="portfolio-content">
          <h2 class="projectname">${item.projectname}</h2>
           <a class="project-type"  href="$#{item.site}">${item.type}</a>
          <p class="item-desc">${item.desc}</p>
         
          <div class="links">
         <a class="preview" id="preview" href="#myModal" data-id="${item.id}">Preview <i class="fas fa-external-link-alt"></i></a>
          <a class="visit" href="${item.site}">Visit site</a>
          </div>
          </div>
        </div>
        
        `;
      });
      /* render html */
      document.querySelector('.portfolio').innerHTML = html;

      /* Fetching carousel images from JSON */
      var array = data.portfolio;

      var newArr = [];
      for (var i = 0; i < data.portfolio.length; i++) {
        if (data.portfolio[i].id == id) {
          newArr.push(data.portfolio[i]);
          break;
        }
      }

      if (newArr.length > 0) {
        //console.log(newArr);
        if (newArr[0].slideImages.length > 0) {
          for (var j = 0; j < newArr[0].slideImages.length; j++) {
            //Img and alt object from JSON file
            let img = newArr[0].slideImages[j].img;
            let alt = newArr[0].slideImages[j].alt;

            imgCourosel += `
                    <div class="tem"><img src=${img}/${newArr[0].id}/${
              j + 1
            }.jpg alt =${alt} >   </div>
                      `;
          }

          //document.querySelector('.content-caroursel').innerHTML = courosel_content;
          $('#owl_demo_wrap')
            .empty()
            .html(
              '<div id="owl_demo" class="owl-carousel owl-theme">' +
                imgCourosel +
                '</div>' +
                `<h2>${newArr[0].projectname}</h2>
                  <h3>${newArr[0].type}</h3>
                  <p>${newArr[0].detail}</p>`
            );
          /*---------carousel Setting -------*/

          $('body #owl_demo').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            margin: 10,
            nav: false,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 1,
              },
              1000: {
                items: 1,
              },
            },
          });
        }
      }
    });
}

//Get Modal
let modal = document.querySelector('#myModal');
//Get Preview button
let preview = document.querySelector('#preview');
// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0];
let owlcarousel = document.querySelector('.img-preview');

//When the user clicks the button opens the modal
/* preview.onclick = function () {
  modal.style.display = 'block';
};
 */
$('body').on('click', '.preview', function () {
  loadPortfolio($(this).attr('data-id'));
  modal.style.display = 'block';
});

//When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
/*------- End of Modal------------- */

/* Typewriting js library Setting */
const content = document.querySelector('.hero-content');

const typewriter = new Typewriter(content, {
  loop: false,
});
let typingSpeed = 10;
let deleteSpeed = 1;

typewriter
  .changeDelay(typingSpeed)
  .changeDeleteSpeed(deleteSpeed)

  .typeString("<h1>Hi I'm <span>Mesfin</span></h1>")
  .pauseFor(500)
  .typeString('<h2>Nice to see you!</h2>')
  .pauseFor(500)
  .deleteChars(16)
  .typeString('<h2>I am a front end developer</h2>')
  .pauseFor(500)
  .typeString('<h3> With skill sets of HTML5, CSS and JS  </h3>')
  .pauseFor(500)
  .typeString(
    ' <div class="view-work"><a href="#portfolio">View my work below</a><i class="fas fa-arrow-down"></i></div>'
  )
  .pauseFor(1000)
  .start();

/* Particles js */
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

particlesJS.load('particles-js', './js/particles.json', function () {
  console.log('callback - particles.js config loaded');
});

/* Top scroll button */
const topScrollFunc = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
