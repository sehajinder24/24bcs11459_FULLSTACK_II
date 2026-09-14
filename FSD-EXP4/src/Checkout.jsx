import { useCurrency } from "./Context/Context";

const Checkout = () => {
  const { formatPrice } = useCurrency();

  return (
    <section>
      <h2>Checkout Cart</h2>

      <p>Subtotal: {formatPrice(1)}</p>
    </section>
  );
};

export default Checkout;