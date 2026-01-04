const CART_KEY = "ebuy_cart";

// Read cart from localStorage || return empty cart
export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

// Save cart to localStorage
export function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// Add product to cart 
export function addToCart(product) {
  const cart = getCart();

  const found = cart.find((item) => item.id === product.id);

  if (found) {
    found.qty += 1;
    setCart(cart);
    return cart;
  }

  const newItem = { ...product, qty: 1 };
  const updated = [...cart, newItem];
  setCart(updated);
  return updated;
};

// Remove one product completely
export function removeFromCart(id) {
  const cart = getCart();
  const updated = cart.filter((item) => item.id !== id);
  setCart(updated);
  return updated;
};

// Change quantity 
export function setQty(id, qty) {
  const cart = getCart();
  const updated = cart.map((item) =>
    item.id === id ? { ...item, qty: Math.max(1, qty) } : item
  );
  setCart(updated);
  return updated;
};

// Clear cart
export function clearCart() {
  setCart([]);
  return [];
};
