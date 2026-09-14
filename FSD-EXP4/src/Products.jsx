import { useCurrency } from "./Context/Context";

const Product = () => {
  const { formatPrice } = useCurrency();

  return (
    <section>
      <h2>Product List</h2>

      <div>
        <h3>Lenovo Legion Pro 7</h3>
        <p>Price: {formatPrice(2100)}</p>
        <br/>
      </div>

      <div>
        <h3>Acer Predator Helios 18</h3>
        <p>Price: {formatPrice(1971)}</p>
        <br/>
      </div>

      <div>
        <h3>HP OMEN MAX 16</h3>
        <p>Price: {formatPrice(2250)}</p>
        <br/>
      </div>


    <br/>
    </section>
  );
};

export default Product;

