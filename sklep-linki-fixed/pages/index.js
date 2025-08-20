import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/products').then(r=>r.json()).then(setProducts);
  }, []);

  const startCheckout = async () => {
    if (!email || !selected) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id, email })
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (data.error) {
        setMessage(data.error);
      }
    } catch (e) {
      setMessage('Błąd połączenia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="row">
          <img src="/logo.svg" alt="logo" height="28" />
          <span className="pill">Sklep gotowy</span>
        </div>
        <a href="/admin">Panel admin</a>
      </header>

      <h1 style={{marginTop:0}}>Sklep z linkami</h1>
      <p>Wybierz produkt i podaj e-mail do dostarczenia linku.</p>

      <div className="grid" style={{marginTop:14}}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} onBuy={(prod) => setSelected(prod)} />
        ))}
      </div>

      <div className="card" style={{marginTop:20}}>
        <h3 style={{marginTop:0}}>Dane do zamówienia</h3>
        <div className="row" style={{marginTop:8}}>
          <input className="input" placeholder="Twój e-mail do wysyłki linku"
                 value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button className="btn" onClick={startCheckout} disabled={!selected || !email || loading}>
            {loading ? 'Przetwarzanie…' : 'Zapłać'}
          </button>
        </div>
        <p style={{marginTop:8, fontSize:13, opacity:.7}}>
          Wybrany produkt: {selected ? selected.name : '— nie wybrano —'}
        </p>
        {message && <p style={{color:'#b91c1c'}}>{message}</p>}
      </div>
    </div>
  );
}
