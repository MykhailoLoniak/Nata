function Post({ img, p, setActive, postId, handleButtonClick }) {
  const handleButtonClickAndSetActive = (event) => {
    handleButtonClick(event);
    setActive(true);
  };

  return (
    <div className='post'>
      <img src={img} alt='' />
      <button id={postId} onClick={handleButtonClickAndSetActive}>
        Деталі
      </button>
      <p>{p}</p>
    </div>
  );
}

export default Post;
