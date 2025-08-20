import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'data', 'products.json');

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { id, email } = req.body || {};
  if (!id || !email) return res.status(400).json({error:'Brak id lub email'});

  const products = JSON.parse(fs.readFileSync(productsPath,'utf8'));
  const product = products.find(p=>p.id===id);
  if (!product) return res.status(404).json({error:'Produkt nie znaleziony'});

  // TEST_MODE: jeśli nie ma P24 danych, wysyłamy e-mail i od razu sukces
  const hasP24 = !!process.env.P24_MERCHANT_ID && !!process.env.P24_POS_ID && !!process.env.P24_CRC;
  if (!hasP24){
    try {
      await sendEmail(email, product);
    } catch (e){
      console.error('Mail error', e);
    }
    return res.status(200).json({ redirectUrl: '/success' });
  }

  // TODO: Integracja z realnym Przelewy24 (po podaniu kluczy).
  // Na potrzeby gotowości sklepu kierujemy na success.
  try {
    await sendEmail(email, product);
  } catch (e) {
    console.error('Mail error', e);
  }
  return res.status(200).json({ redirectUrl: '/success' });
}

async function sendEmail(email, product){
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '465', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass){
    console.log('Brak danych email w ENV – pomijam wysyłkę (LOG ONLY).');
    return;
  }

  const transporter = nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass }
  });

  const info = await transporter.sendMail({
    from: `Sklep Linki <${user}>`,
    to: email,
    subject: `Dostęp: ${product.name}`,
    text: `Dziękujemy za zakup. Twój link: ${product.url}`,
    html: `<p>Dziękujemy za zakup.</p><p><b>Twój link:</b> <a href="${product.url}">${product.url}</a></p>`
  });
  console.log('Mail sent', info.messageId);
}
