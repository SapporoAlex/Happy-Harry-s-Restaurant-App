document.addEventListener('DOMContentLoaded', () => {
  const menuImages = document.querySelectorAll('.menu-item-box-top img');
  const dealImages = document.querySelectorAll('.deal-item img');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const clearBtn = document.getElementById('clear-cart-button');
  const shoppingCartSection = document.querySelectorAll('.shopping-cart-section');

  let total = 0;

  // 🛒 Show cart only if on basket page
  if (shoppingCartSection.length > 0) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}`;
      cartList.appendChild(li);
      total += parseFloat(item.price.replace('$', ''));
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('cart');
      cartList.innerHTML = '';
      cartTotal.textContent = 'Total: $0.00';
    });
  }

  function addItemToCart(name, price) {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  // Menu items
  document.querySelectorAll('.price-container').forEach(container => {
    container.addEventListener('click', () => {
      const parent = container.closest('.menu-item-box');
      const name = parent.querySelector('.menu-item-box-bottom-name').textContent.trim();
      const price = parent.querySelector('.menu-item-box-bottom-price').textContent.trim();
      addItemToCart(name, price);
      showToast(`${name} added to cart!`);
    });
  });

  // Deal items
  document.querySelectorAll('.price-container-deal').forEach(container => {
    container.addEventListener('click', () => {
      const parent = container.closest('.deal-item');
      const name = parent.querySelector('.deal-item-name').textContent.trim();
      const price = parent.querySelector('.menu-item-box-bottom-price').textContent.trim();
      addItemToCart(name, price);
      showToast(`${name} added to cart!`);
    });
  });

  // Fade-in animation
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  menuImages.forEach(img => observer.observe(img));
  dealImages.forEach(img => observer.observe(img));

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.className = 'toast';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
});
