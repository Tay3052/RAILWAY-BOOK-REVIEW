const emailCheck = () => {
  return (
    <>
      <form>
        <input type="email" placeholder="email" id="email" />
        <button type="submit" id="submit">
          メール送信
        </button>
      </form>
    </>
  );
};

export default emailCheck;
