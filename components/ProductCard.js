export default function ProductCard({ product, onBuy }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>{product.name}</h3>
      <p style={{fontSize:14,opacity:.7,marginTop:-6}}>ID: {product.id}</p>
      <p style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>
        {(product.price/100).toFixed(2)} PLN
      </p>
      <button className="btn" onClick={() => onBuy(product)}>Kup teraz</button>
    </div>
  );
}
