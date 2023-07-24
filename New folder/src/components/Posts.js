import { useEffect, useState } from 'react';
import Post from './Post';
import Modal from './Modal';
import Bar from './Bar';
import { GiStorkDelivery } from 'react-icons/gi';
import { MdDeliveryDining } from 'react-icons/md';

function Posts() {
  const toket =
    'IGQVJWWGRhVUtYcFo5eW8yOWpTLTVEMWQ4eklib1U1VzZApd3N6ZAEllZAE9OZAzFwd05jaFl6RjRKdkNjZAGdPVkFrUGpqdnhqSkxjLTBuV0owR1NrVnJUTzlzXzdpdjZApb3pRQjdBLTVHZAXlDUHhzb0NfQwZDZD';

  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(0); // Використовуємо стан React для зберігання обраного індексу
  const [isDeliveri, setIsDeliveri] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,thumbnail_url,timestamp,caption,username,children{media_type,media_url}&access_token=${toket}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log('Помилка отримання даних:', error);
      }
    }
    fetchData();
  }, []);

  const handleButtonClick = (index) => {
    setSelectedDataIndex(index); // Оновлюємо обраний індекс за допомогою стану React
    setModalActive(true);
  };

  return (
    <div className='body'>
      <div className='box'>
        <Bar setDeliveri={setIsDeliveri} />
        <Modal active={isDeliveri} setActive={setIsDeliveri}>
          <h3>Доставка</h3>
          <ul>
            <li>
              {' '}
              <MdDeliveryDining /> Самовивіз безкоштовно{' '}
            </li>
            <li>
              {' '}
              <GiStorkDelivery /> Достакка курєром м.Львів 100 грн.{' '}
            </li>
          </ul>
        </Modal>

        <div className='content '>
          {data.map((e, index) => (
            <div key={e.id}>
              <Post
                img={e.media_url}
                p={e.caption}
                setActive={() => handleButtonClick(index)}
                postId={index}
                handleButtonClick={() => handleButtonClick(index)}
              />
              <Modal active={modalActive} setActive={setModalActive}>
                {data[selectedDataIndex]?.children?.data.map((el) => (
                  <img className='modalImg' src={el.media_url} key={el.id} />
                ))}
                <p>{data[selectedDataIndex].caption}</p>
              </Modal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
