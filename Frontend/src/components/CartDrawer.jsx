import { useNavigate } from "react-router-dom";
const CartDrawer = ({ open, onClose, cartItems, cartCount }) => {
  if (!open) return null;
const itemsTotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);
const navigate = useNavigate();

const deliveryCharge =
  itemsTotal >= 199 ? 0 : itemsTotal > 0 ? 60 : 0;

const handlingCharge = itemsTotal > 0 ? 2 : 0;
const smallCartCharge = itemsTotal > 0 && itemsTotal < 99 ? 20 : 0;

const grandTotal =
  itemsTotal + deliveryCharge + handlingCharge + smallCartCharge;
const updateQty = (id, delta) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((i) => i._id === id);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    const newCart = cart.filter((i) => i._id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div className="
        fixed top-0 right-0 h-full w-[360px]
        bg-[#f7fce9] z-50 shadow-xl
        flex flex-col
        animate-slideIn
      ">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="font-semibold text-lg">My Cart</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 items-center border rounded-lg p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
               <div className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-2">
  <button
    onClick={() => updateQty(item._id, -1)}
    className="text-lg"
  >
    −
  </button>
  <span className="text-sm font-semibold">{item.qty}</span>
  <button
    onClick={() => updateQty(item._id, 1)}
    className="text-lg"
  >
    +
  </button>
</div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
     {cartCount > 0 && (
  <div className="border-t p-4 space-y-4">

    {/* Bill Details */}
    <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
      <p className="font-semibold text-gray-900">Bill details</p>

      <div className="flex justify-between">
        <span className="text-gray-600">Items total</span>
        <span>₹{itemsTotal}</span>
      </div>

     <div className="flex justify-between">
  <span className="text-gray-600">
    Delivery charge
    {itemsTotal >= 199 && (
      <span className="text-green-600 text-xs ml-1">(FREE)</span>
    )}
  </span>
  <span>₹{deliveryCharge}</span>
</div>


      <div className="flex justify-between">
        <span className="text-gray-600">Handling charge</span>
        <span>₹{handlingCharge}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Small cart charge</span>
        <span>₹{smallCartCharge}</span>
      </div>

      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Grand total</span>
        <span>₹{grandTotal}</span>
      </div>
    </div>

    {/* Checkout Button */}
    <button
  onClick={() => {
    onClose();
    navigate("/checkout");
  }}
  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-between px-4"
>
  <span>₹{grandTotal}</span>
  <span>Proceed to Checkout →</span>
</button>


  </div>
)}

      </div>
    </>
  );
};

export default CartDrawer;
