window.addEventListener('load', () => {
  const cartContainer = document.querySelector('.listcart');

  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
      cart.forEach((item) => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');
          itemElement.innerHTML = `
              <div class="image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="name">${item.name}</div>
              <div class="totalprice">${item.price}</div>
          `;
          cartContainer.appendChild(itemElement);
      });
  }

  document.querySelector('.checkOut').addEventListener('click', () => {
      alert('Checkout successful!');
      localStorage.removeItem('cart');
      location.reload();
  });

  document.querySelector('.close').addEventListener('click', () => {
      window.location.href = './mainpage.html';
  });
});
