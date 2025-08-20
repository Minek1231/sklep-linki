import { useEffect, useState } from 'react';

export default function Admin(){
  const [products,setProducts] = useState([]);
  const [form,setForm] = useState({name:'',price:'',url:''});

  const load = () => fetch('/api/products').then(r=>r.json()).then(setProducts);
  useEffect(()=>{ load(); },[]);

  const add = async () => {
    await fetch('/api/products',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    setForm({name:'',price:'',url:''});
    load();
  };

  const delItem = async (id) => {
    await fetch('/api/products?id='+id,{method:'DELETE'});
    load();
  };

  return (
    <div className="container">
      <h1>Panel admin</h1>
      <div className="card">
        <h3>Dodaj produkt</h3>
        <div className="row">
          <input className="input" placeholder="Nazwa" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Cena w groszach" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <input className="input" placeholder="URL do wydania (po zapłacie)" value={form.url} onChange={e=>setForm({...form,url:e.target.value})} />
          <button className="btn" onClick={add}>Dodaj</button>
        </div>
      </div>

      <div className="grid" style={{marginTop:16}}>
        {products.map(p=>(
          <div key={p.id} className="card">
            <b>{p.name}</b>
            <p>{(p.price/100).toFixed(2)} PLN</p>
            <p style={{fontSize:12,opacity:.7,wordBreak:'break-all'}}>{p.url}</p>
            <button className="btn" onClick={()=>delItem(p.id)}>Usuń</button>
          </div>
        ))}
      </div>
    </div>
  )
}
