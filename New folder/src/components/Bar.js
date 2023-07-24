import './bar.css';

function Bar({ setDeliveri }) {
  const li = ['Торти', 'Зефір', 'Капкейки'];

  return (
    <div className='bar'>
      <ul>
        {li.map((e, key) => (
          <li key={key}>{e}</li>
        ))}
        <li>Замовлення</li>
        <li onClick={() => setDeliveri(true)}>Доставка</li>
      </ul>
    </div>
  );
}

export default Bar;
