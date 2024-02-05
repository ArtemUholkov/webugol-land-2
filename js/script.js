AOS.init();

const burger = document.querySelector('#burger');
const popup = document.querySelector('#popup');
const popupSlide = document.querySelector('#popupSlide');
const sliderItem = document.querySelectorAll('.our_requirements_content_item');
const sliderPhoto = document.querySelector('.our_requirements_img');
const body = document.body;
const casualLogo = document.querySelector('.logo-white');
const colorLogo = document.querySelector('.logo-color');

burger.addEventListener('click', burgerHandler);
popup.addEventListener('click', (e) => {
  burgerHandler(e);
});

sliderItem.forEach((e) => {
  e.addEventListener('click', () => {
    setImage(e, sliderItem);
  });
});

function burgerHandler(e) {
  if (popup.classList.contains('open')) {
    popup.classList.add('close');
    body.classList.remove('noscroll');
    popupSlide.classList.add('slideout');
    casualLogo.classList.remove('logo-hide');
    colorLogo.classList.add('logo-hide');
    setTimeout(() => {
      casualLogo.classList.remove('logo-hide');
      colorLogo.classList.add('logo-hide');
      // colorLogo.classList.remove('logo-hide');
      // casualLogo.classList.add('logo-hide');
    }, 270);
    setTimeout(() => {
      popup.classList.remove('close');
      popup.classList.remove('open');
      popupSlide.classList.remove('slideout');
      popupSlide.classList.remove('slidein');
    }, 270);
  } else {
    body.classList.add('noscroll');
    popup.classList.add('open');
    popupSlide.classList.add('slidein');
    setTimeout(() => {
      //   casualLogo.classList.remove('logo-hide');
      // colorLogo.classList.add('logo-hide');
      colorLogo.classList.remove('logo-hide');
      casualLogo.classList.add('logo-hide');
    }, 270);
  }
  burger.classList.toggle('active');
}

function scrollToNumbers() {
  document.querySelector('#numbers').scrollIntoView(true);
}
function scrollToSolutions() {
  document.querySelector('#solutions').scrollIntoView(true);
}
function scrollToProcess() {
  document.querySelector('#process').scrollIntoView(true);
}
function scrollToReviews() {
  document.querySelector('#reviews').scrollIntoView(true);
}
function scrollToTeam() {
  document.querySelector('#team').scrollIntoView(true);
}
function scrollToSub() {
  document.querySelector('#sub').scrollIntoView(true);
}
let copiedText = document.querySelectorAll('#trythis');
copiedText.forEach((elem) => elem.addEventListener('click', () => copyText(elem)));
console.log(colorLogo);

$(window).on('scroll', function () {
  if ($(window).scrollTop() > 50) {
    $('.header').addClass('active');
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $('.header').removeClass('active');
  }
});

data = {
  type: 'subscription',
  attributes: {
    custom_source: 'Homepage footer signup form',
    profile: {
      data: {
        type: 'profile',
        id: '01GDDKASAP8TKDDA2GRZDSVP4H',
        attributes: {
          email: 'sarah.mason@klaviyo-demo.com',
          phone_number: '+15005550006',

          first_name: 'Sarah',
          last_name: ' ',
          organization: 'Klaviyo',
          title: 'Engineer',
          image: 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg',
          location: {},
          properties: { newKey: 'New Value' },
          meta: {
            patch_properties: {
              append: { newKey: 'New Value' },
              unappend: { newKey: 'New Value' },
              unset: 'skus',
            },
          },
        },
      },
    },
  },
  relationships: { list: { data: { type: 'list', id: 'id' } } },
};

console.log(data.attributes.profile.data.attributes);

//update this with your js_form selector
var form_id_js = 'javascript_form';

var data_js = {
  access_token: 'b6ptufawi5qmc6uw1hqngyoz',
  // access_token: 'fi2138nc5t3t25unwm7thdou',
};

function js_onSuccess() {
  window.location = 'step-2.html';
}

function js_onError(error) {
  // remove this to avoid redirect
  window.location = window.location.pathname + '?message=Email+could+not+be+sent.&isError=1';
}

var sendButton = document.getElementById('js_send');

function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    } else if (request.readyState == 4) {
      js_onError(request.response);
    }
  };

  var subject = document.querySelector('#' + form_id_js + " [name='Subject']").value;
  var message = document.querySelector('#' + form_id_js + " [name='text']").value;
  var name = document.querySelector('#' + form_id_js + " [name='extra_name']").value;
  var lastname = document.querySelector('#' + form_id_js + " [name='extra_last_name']").value;
  var link = document.querySelector('#' + form_id_js + " [name='extra_link']").value;
  var phone = document.querySelector('#' + form_id_js + " [name='extra_phone_number']").value;
  var about = document.querySelector('#' + form_id_js + " [name='extra_about']").value;
  var location = document.querySelector('#' + form_id_js + " [name='extra_target']").value;

  data_js['subject'] = subject;
  data_js['text'] = message;
  data_js['extra_name'] = name;
  data_js['extra_link'] = link;
  data_js['extra_phone_number'] = phone;
  data_js['extra_last_name'] = lastname;
  data_js['extra_about'] = about;
  data_js['extra_target'] = location;

  data.attributes.profile.data.attributes.first_name = name;
  data.attributes.profile.data.attributes.last_name = lastname;
  data.attributes.profile.data.attributes.phone_number = phone;

  const options = {
    method: 'POST',
    headers: { revision: '2023-10-15', 'content-type': 'application/json' },
    body: JSON.stringify({ data }),
  };
  fetch('https://a.klaviyo.com/client/subscriptions/?company_id=id', options)
    .then((response) => response)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  var params = toParams(data_js);

  request.open('POST', 'https://postmail.invotes.com/send', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  request.send(params);

  return false;
}

function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(encodeURIComponent(key) + '=' + encodeURIComponent(data_js[key]));
  }

  return form_data.join('&');
}

sendButton.addEventListener('click', () => {
  if (document.querySelector('#javascript_form').reportValidity() == true) {
    js_send();
  }
});
var js_form = document.getElementById(form_id_js);
js_form.addEventListener('submit', function (e) {
  e.preventDefault();
});
