import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_zg6y8gd';
const TEMPLATE_ID = 'template_j91fgke';
const PUBLIC_KEY = 'c3EZ_n2Z8vJBCYjKG';

const sendOrderMail = async ({ items, address, amount }) => {
  try {
    if (!items || !items.length) {
      throw new Error('No items provided for the order.');
    }

    // Build HTML table rows dynamically
    const itemsRows = items.map(item => `
      ${item.name}
      ${item.quantity}
      ${item.size || 'FREE SIZE'}
    
    `).join('');

    // Construct full address string safely
    const fullAddress = `${address.street || ''}, ${address.city || ''}, ${address.state || ''}, ${address.zipcode || ''}, ${address.country || ''}`;

    const emailParams = {
      name: `${address.firstName || ''} ${address.lastName || ''}`.trim(),
      email: address.email || '',
      phone: address.phone || '',
      address: fullAddress,
      amount: amount || 0,
      items: itemsRows
    };

    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY);
    console.log('Order email sent successfully!', result);
  } catch (error) {
    console.error('Failed to send order email:', error);
    throw error;
  }
};

export default sendOrderMail;
