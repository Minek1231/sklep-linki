import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req,res){
  if (req.method === 'GET'){
    const products = JSON.parse(fs.readFileSync(filePath,'utf8'));
    return res.status(200).json(products);
  }
  if (req.method === 'POST'){
    const { name, price, url } = req.body || {};
    if(!name || !price || !url) return res.status(400).json({error:'Brak danych'});
    const products = JSON.parse(fs.readFileSync(filePath,'utf8'));
    const newItem = { id: `link${products.length+1}`, name, price: parseInt(price,10), url };
    products.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(products,null,2));
    return res.status(201).json(newItem);
  }
  if (req.method === 'DELETE'){
    const { id } = req.query;
    const products = JSON.parse(fs.readFileSync(filePath,'utf8'));
    const filtered = products.filter(p => p.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(filtered,null,2));
    return res.status(200).json({ok:true});
  }
  return res.status(405).json({error:'Method not allowed'});
}
