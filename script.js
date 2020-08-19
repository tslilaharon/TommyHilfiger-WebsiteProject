//nav bar menu
//hamburger menu
var open = document.getElementById('hamburger');
var changeIcon = true;

open.addEventListener("click", function () {

  var overlay = document.querySelector('.overlay');
  var nav = document.querySelector('nav');
  var icon = document.querySelector('.menu-toggle i');
  overlay.classList.toggle("menu-open");
  nav.classList.toggle("menu-open");

  if (changeIcon) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");

    changeIcon = false;
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    changeIcon = true;
  }
});

//nav bar menu scroll bgcolor
window.addEventListener('scroll', function () {
  var nav = document.querySelector('nav');
  nav.classList.toggle('sticky', window.scrollY);
})

//bag box
window.onload = function () {
  const iconShopping = document.querySelector('.fa-shopping-bag');
  const bagCloseBtn = document.querySelector('.fa-times');
  const bagBox = document.querySelector('#bagBox');
  const cartTable = document.querySelector('#cartTable');
  const sumamryTable = document.querySelector('#sumamryTable');

  iconShopping.addEventListener("click", function () {
    if (!bagBox) return;
    bagBox.classList.add('active');

    const localCart = localStorage.getItem('cart')
    const cart = localCart ? JSON.parse(localCart) : null;

   /* Product table*/
    let totalPrice = 0;
    cart.forEach((item, i) => {
      totalPrice += item.amount * item.price;
      const row = cartTable.insertRow(-1);
      row.id = 'row-' + item.id;
      const cell1 = row.insertCell(-1);
      const cell2 = row.insertCell(-1);
      const cell3 = row.insertCell(-1);
      cell1.innerHTML = `
      <td>
          <div class="bag-info">
              <img src="${item.currentColor.link}">
              <div class="pname" >
                  <p>${item.name}</p>
                  <small>price: $${item.price}</small>
                  <br>
                  <small>Size:${item.currentSize}</small>
                  <br>
                  <a id="removeItem-${item.id}">Remove</a>
              </div>
          </div>
      </td>`;
      /*price*/
      cell2.innerHTML = `<input type="number" value="${item.amount}"></td>`;
      cell3.innerHTML = `$${(item.amount * item.price).toFixed(2)}`;
      /*remove*/
      const removeItem = document.getElementById(`removeItem-${item.id}`);
      removeItem.addEventListener('click', () => {
        const removedIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        const [removeItem] = cart.splice(removedIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('removeItem', removeItem)
        const totalPriceEl = document.getElementById(`totalPrice`);
        totalPriceEl.innerHTML = `$${totalPrice - removeItem.price * removeItem.amount}`
        const tbody = document.querySelector('#cartTable tbody');
        const row = document.getElementById(`row-${item.id}`);
        tbody.removeChild(row);
      })
    })

   /*total price table*/
    const totalROw = sumamryTable.insertRow(-1);
    const totalCell1 = totalROw.insertCell(-1);
    const totalCell2 = totalROw.insertCell(-1);
    totalCell1.innerHTML = 'total price';
    totalCell2.innerHTML = `$${(totalPrice).toFixed(2)}`;
    totalCell2.id = `totalPrice`;
  });
  bagCloseBtn.addEventListener("click", function () {
    bagBox.classList.remove('active');
  });

}

//slider video home
if (window.location.pathname.includes('home.html')) {
  function videourl(homeslider) {
    document.getElementById("slider").src = homeslider;
  }
}
//slider women
if (window.location.pathname.includes('women.html')) {
  const images = document.querySelectorAll(".slide"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");

  let current = 0;

  function changeImage() {
    images.forEach(img => {
      img.classList.remove("show");
      img.style.display = "none";

    });
    images[current].classList.add("show");
    images[current].style.display = "block";
  }


  /*next and prev*/
  changeImage();
  next.addEventListener("click", function () {
    current++;

    if (current > images.length - 1) {
      current = 0;
    } else if (current < 0) {
      current = images.length - 1;
    }

    changeImage();
  });
  prev.addEventListener("click", function () {
    current--;

    if (current > images.length - 1) {
      current = 0;
    } else if (current < 0) {
      current = images.length - 1;
    }

    changeImage();
  });

  /*5s*/
  setInterval(() => {
    next.click();
  }, 5000);

}

//products women
const products = [{
    id: 1,
    name: 'ESSENTIAL SWEATER DRESS',
    Typename: 'Dresses & Skirts',
    description: 'womens dress. So cute, and just a little flirty, our lightweight sweater dress is perfect for the office, and for fun after 5:00. Made from soft fabric that can be popped in the wash (no need to visit the dry cleaner).',
    img: 'images/Witem/1.jpg',
    price: 209.99,
    colors: [{
      color: 'black',
      link: 'images/Witem/1-1.jpg'
    }]
  }, {
    id: 2,
    name: 'SHORT-SLEEVE T-SHIRT DRESS',
    Typename: 'Dresses & Skirts',
    description: 'Tommy Hilfiger womens dress. Kick back in our comfy T-shirt dress, featuring a self-tie belt for definition and a flattering shape.',
    img: 'images/Witem/2.jpg',
    price: 120,
    colors: [{
        color: '#f0cec3',
        link: 'images/Witem/2-1.jpg'
      }, {
        color: 'snow',
        link: 'images/Witem/2-2.jpg'
      },
      {
        color: 'gray',
        link: 'images/Witem/2-3.jpg'
      }
    ]
  },
  {
    id: 3,
    name: 'LOW RISE SKINNY FIT JEAN',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens jean. Youll find a million ways to wear this pair. Dark wash power stretch denim in a skinny fit offers a sleek, versatile look youll reach for again and again.',
    img: 'images/Witem/3.jpg',
    price: 104,
    colors: [{
      color: '#413f3f',
      link: 'images/Witem/3-1.jpg'
    }]
  }, {
    id: 4,
    name: 'ESSENTIAL CHIFFON WRAP DRESS',
    Typename: 'Dresses & Skirts',
    description: 'Tommy Hilfiger womens dress. A must-have look that transitions from the office to an evening out in an instant. A layered hem and billowed sleeves add movement and drape to our lightweight wrap dress.',
    img: 'images/Witem/4.jpg',
    price: 99.99,
    colors: [{
      color: 'linear-gradient(to bottom, Gainsboro, #ADD8E6)',
      link: 'images/Witem/4-1.jpg'
    }]
  }, {
    id: 5,
    name: 'ULTRA HIGH RISE SKINNY FIT',
    Typename: 'Pants & Shorts ',
    description: 'Tommy Hilfiger womens jean. Designed in an ultra-skinny shape with a high rise waist, these stretchy jeans mold to your body for a super flattering fit.',
    img: 'images/Witem/5.jpg',
    price: 78,
    colors: [{
      color: 'black',
      link: 'images/Witem/5-3.jpg'
    }, {
      color: 'snow',
      link: 'images/Witem/5-2.jpg'
    }]
  },
  {
    id: 6,
    name: 'RELAXED FIT V-NECK POPOVER TOP  ',
    Typename: ' Tops & Shirts ',
    description: 'Tommy Hilfiger womens top. Made from soft, smooth viscose, our roomy popover top is lightweight and so easy to wear.',
    img: 'images/Witem/6.jpg',
    price: 64.99,
    colors: [{
      color: 'beige',
      link: 'images/Witem/6-2.jpg'
    }]
  }, {
    id: 7,
    name: 'JUTE PLATFORM SANDAL',
    Typename: 'Shoes',
    description: 'Tommy Hilfiger womens sandal. Our ever-popular platform sandal, perfect for your warm-weather wardrobe. Styled to go with everything thanks to the neutral hues and jute trim.',
    img: 'images/Witem/7.jpg',
    price: 84,
    colors: [{
      color: 'snow',
      link: 'images/Witem/7-1.jpg'
    }, {
      color: '#E9967A',
      link: 'images/Witem/7-2.jpg'
    }, {
      color: 'black',
      link: 'images/Witem/7-3.jpg'
    }]
  }, {
    id: 8,
    name: 'ESSENTIAL CHIFFON EYELET DRESS',
    Typename: ' Dresses & Skirts ',
    description: 'Tommy Hilfiger womens dress. Its a must-have look thats all about summer. Made from lightweight chiffon, our dress is breezy, flattering and comfortable.',
    img: 'images/Witem/8-2.jpg',
    price: 120,
    colors: [{
      color: '#f0cec3',
      link: 'images/Witem/8-1.jpg'
    }, {
      color: 'black',
      link: 'images/Witem/8.jpg'
    }]

  }, {
    id: 9,
    name: 'ROUND BUCKLE BELT',
    Typename: 'Belts',
    description: 'Tommy Hilfiger womens belt. Styled from premium leather with a gold buckle and our signature stripes.',
    img: 'images/Witem/9.jpg',
    price: 90.99,
    colors: [{
      color: '#B22222',
      link: 'images/Witem/9-1.jpg'
    }, {
      color: 'black',
      link: 'images/Witem/9-2.jpg'
    }]
  }, {
    id: 10,
    name: 'FLAG LOGO T-SHIRT DRESS ',
    Typename: ' Dresses & Skirts',
    description: 'Tommy Hilfiger womens dress. Go from the beach to a casual dinner in this T-shirt dress, emboldened by the Tommy Jeans flag logo across the front.',
    img: 'images/Witem/10.jpg',
    price: 120,
    colors: [{
      color: '#DC143C',
      link: 'images/Witem/10-1.jpg'
    }, {
      color: 'black',
      link: 'images/Witem/10-2.jpg'
    }, {
      color: 'snow',
      link: 'images/Witem/10-3.jpg'
    }]
  }, {
    id: 11,
    name: 'ROUND BUCKLE BELT',
    Typename: 'Belts',
    description: 'Tommy Hilfiger womens belt. Styled from premium leather with a gold buckle and our signature stripes.',
    img: 'images/Witem/11.jpg',
    price: 290.99,
    colors: [{
      color: '#D2B48C',
      link: 'images/Witem/11-1.jpg'
    }, {
      color: '#8B4513',
      link: 'images/Witem/11-2.jpg'
    }]
  }, {
    id: 12,
    name: 'ROUND BUCKLE BELT',
    Typename: 'Belts',
    description: 'Tommy Hilfiger womens belt. Styled from premium leather with a gold buckle and our signature stripes.',
    img: 'images/Witem/12.jpg',
    price: 290.99,
    colors: [{
      color: '#B22222',
      link: 'images/Witem/12-1.jpg'
    }, {
      color: '#6495ED',
      link: 'images/Witem/12-2.jpg'
    }, {
      color: 'black',
      link: 'images/Witem/12-3.jpg'
    }]
  },
  {
    id: 13,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/13.jpg',
    price: 99.00,
    colors: [{
      color: 'snow',
      link: 'images/Witem/13-1.jpg'
    }, {
      color: '#16036b',
      link: 'images/Witem/13-2.jpg'
    }]
  }, {
    id: 14,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Shoes',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/14.jpg',
    price: 130,
    colors: [{
      color: 'snow',
      link: 'images/Witem/14-1.jpg'
    }, {
      color: '#DCDCDC',
      link: 'images/Witem/14-2.jpg'
    }]
  }, {
    id: 15,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/15.jpg',
    price: 130,
    colors: [{
      color: 'black',
      link: 'images/Witem/15-1.jpg'
    }, {
      color: '#ADD8E6	',
      link: 'images/Witem/15-2.jpg'
    }, {
      color: 'MidnightBlue',
      link: 'images/Witem/15-3.jpg'
    }]
  }, {
    id: 16,
    name: 'LACE OVERLAY DRESS',
    Typename: ' Dresses & Skirts',
    description: 'Tommy Hilfiger womens dress. A delicate lace overlay of soft, lightweight cotton and viscose makes our latest dress a favorite for summer occasions.Slim Fit. 45% cotton, 28% viscose, 27% lyocell. Falls to knee. Imported.',
    img: 'images/Witem/16.jpg',
    price: 130,
    colors: [{
      color: 'black',
      link: 'images/Witem/16-1.jpg'
    }, {
      color: 'Ivory',
      link: 'images/Witem/16-2.jpg'
    }]
  }, {
    id: 17,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Dresses & Skirts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/17.jpg',
    price: 130,
    colors: [{
      color: 'linear-gradient(to bottom, black, #800000)',
      link: 'images/Witem/17-1.jpg'
    }]
  }, {
    id: 18,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/18.jpg',
    price: 130,
    colors: [{
      color: 'black',
      link: 'images/Witem/18-1.jpg'
    }, {
      color: 'snow',
      link: 'images/Witem/18-2.jpg'
    }]
  }, {
    id: 19,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Dresses & Skirts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/19.jpg',
    price: 130,
    colors: [{
      color: 'PapayaWhip',
      link: 'images/Witem/19-1.jpg'
    }]
  }, {
    id: 20,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/20.jpg',
    price: 130,
    colors: [{
      color: 'black',
      link: 'images/Witem/20-1.jpg'
    }, {
      color: 'LightBlue',
      link: 'images/Witem/20-2.jpg'
    }, {
      color: 'Khaki',
      link: 'images/Witem/20-3.jpg'
    }]
  }, {
    id: 21,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/21.jpg',
    price: 130,
    colors: [{
      color: 'LightCyan',
      link: 'images/Witem/21-1.jpg'
    }, {
      color: 'Red',
      link: 'images/Witem/21-2.jpg'
    }]
  }, {
    id: 22,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/22.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/22-1.jpg'
    }]
  }, {
    id: 23,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/23.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/23-1.jpg'
    }, {
      color: 'DimGrey	',
      link: 'images/Witem/23-2.jpg'
    }]
  }, {
    id: 24,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/24.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/24-1.jpg'
    }]
  }, {
    id: 25,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/25.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/25-1.jpg'
    }]
  }, {
    id: 26,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/26.jpg',
    price: 130,
    colors: [{
      color: 'linear-gradient(to right, MidnightBlue, #FFF)',
      link: 'images/Witem/26-1.jpg'
    }]
  }, {
    id: 27,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/27.jpg',
    price: 130,
    colors: [{
      color: '#315B7E',
      link: 'images/Witem/27-1.jpg'
    }]
  }, {
    id: 28,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/28.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/28-1.jpg'
    }]
  }, {
    id: 29,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/29.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/29-1.jpg'
    }]
  }, {
    id: 30,
    name: 'ESSENTIAL BELTED SHORT',
    Typename: 'Pants & Shorts',
    description: 'Tommy Hilfiger womens short. Made from breezy lightweight fabric, and cut in an easy fit, our shorts are comfortable and flattering.',
    img: 'images/Witem/30.jpg',
    price: 130,
    colors: [{
      color: 'Black',
      link: 'images/Witem/30-1.jpg'
    }]
  },
]
//img women Page
if (window.location.pathname.includes('/women.html')) {
  var allProductsEl = document.getElementById('allProducts');

  products.forEach(product => {
    var womenImgDiv = document.createElement('div');
    womenImgDiv.className = 'womens-img';
    womenImgDiv.innerHTML = `
        <a href="/Product.html?id=${product.id}">
          <img src="${product.img}" width="280" height="400">
        </a>
    `;
    allProductsEl.appendChild(womenImgDiv);
  })
}

//product 
if (window.location.pathname.includes('Product.html')) {
 
 /*URL Search Params*/
 var urlParams = new URLSearchParams(window.location.search);
 var id = urlParams.get('id');
 const product = products.find(function (p) {
   return p.id == id
 });


  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const amountInput = document.getElementById('number');
  let currentSize = 'm';
  let currentColor = {
    link: '',
    color: ','
  };

  /*qty*/
  let amount = 1;
  decreaseBtn.addEventListener('click', () => {
    if (amount <= 1) return;

    amount--;
    amountInput.value = amount;

  });
  increaseBtn.addEventListener('click', () => {
    if (amount >= 10) return;

    amount++;
    amountInput.value = amount;

  });

 
  /*product Details*/
  console.log('product', product);
  console.log('currentColor', currentColor);
  const imgBackgrounds = document.querySelectorAll('#imgBackground');
  const nameEl = document.querySelector('#name');
  const TypenameEl = document.querySelector('#Typename');
  const descriptionEl = document.querySelector('#description');
  const priceEl = document.querySelector('#price');

  nameEl.innerHTML = product.name;
  TypenameEl.innerHTML = product.Typename;
  descriptionEl.innerHTML = product.description;
  priceEl.innerHTML = product.price;

  drawColorPicker(product);
  changeBacgroundImg(product.img);
  currentColor.color = product.colors[0].color;
  currentColor.link = product.colors[0].link;


/*add To bag*/
  var addToCartBtn = document.getElementById('addToCartBtn');
  addToCartBtn.addEventListener('click', () => {
    var prevCart = localStorage.getItem('cart');
    var currentCart = prevCart ? JSON.parse(prevCart) : [];
    currentCart.push({
      ...product,
      currentSize: currentSize,
      currentColor: currentColor,
      amount: amount
    });
    localStorage.setItem('cart', JSON.stringify(currentCart))
  })

  /*img*/
  function changeBacgroundImg(img) {
    imgBackgrounds.forEach(function (imgBackground) {
      imgBackground.style.background = `url(${img})`;
      imgBackground.style.backgroundSize = `cover`;
      imgBackground.style.backgroundPosition = `center`;

    })
  }
  /*color Options product*/
  function drawColorPicker(product) {
    const div = document.createElement('div');
    const target = document.getElementById('colorOptions')
    div.innerHTML = ` 
  Color:
 <div id="colorsTarget" class="color-change">
 
 </div>
 <span class="small">COLOR: <span></span> c/3V5</span>`;
    target.appendChild(div)
    product.colors.forEach(colorItem => {
      const div = document.createElement('div');
      const colorsTarget = document.getElementById('colorsTarget');
      div.style.background = colorItem.color;
      div.className = 'color';
      div.addEventListener('click', () => {
        currentColor.color = colorItem.color;
        currentColor.link = colorItem.link;
        changeBacgroundImg(colorItem.link)
      })
      colorsTarget.appendChild(div);
    })

  }
  /*sizes Options product*/
  const sizes = document.querySelectorAll('#rangeColor > div');
  sizes.forEach(sizeEl => {
    sizeEl.addEventListener('click', event => {
      var id = event.target.id;
      changeSize(id);
    })
  })

  function changeSize(size) {
    var sizeEL = document.querySelector(`#${size}`);
    sizeEL.classList.add('active');
    var prevSizeEL = document.querySelector(`#${currentSize}`);
    prevSizeEL.classList.remove('active');
    currentSize = size;


  }
}

//comments box
if (window.location.pathname.includes('Product.html')) {

  const submit = document.querySelector('.comment-submit');
  const commentList = document.querySelector('.comments');
  const commentInput = document.querySelector('.comment-input');

  function template(data) {
    commentList.insertAdjacentHTML("beforeend", `
  <div class="comment flex items-start justify-start">
      <img class="comment-userimg" src="${data.userimg}" />
      <div class="flex-1">
        <h3 class="comment-username">${data.username}</h3>
        <p class="comment-body">${data.comment}</p>
      </div>
    </div>
  </div>`);
  }

  function appendComment(event) {
    const data = {
      userimg: "images/user.png",
      comment: commentInput.value,
      username: "unknown"
    };

    event.preventDefault();
    if (commentInput.value.length < 1) return;
    template(data);
    commentInput.value = "";
    localStorage.setItem('commentListing', commentList.innerHTML);
  }
  submit.addEventListener('click', appendComment, false)
  const saved = localStorage.getItem('commentListing');
  if (saved) {
    commentList.innerHTML = saved;
  }
}

//log in Box
document.getElementById("fa-user").addEventListener("click", function () {
  document.querySelector(".loginBox").style.display = "flex";
})
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".loginBox").style.display = "none";
})
var lg = document.getElementById('login');
var sp = document.getElementById('SignUp');
var bl = document.getElementById('btnl');
/*SignUp */
function SignUp() {
  sp.style.display = "block";
  lg.style.display = "none";
  bl.style.transform = "translatex(100px)";
}
/*login */
function login() {
  lg.style.display = "block";
  sp.style.display = "none";
  bl.style.transform = "translatex(0px)";
}