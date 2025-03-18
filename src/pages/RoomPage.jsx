import React from "react";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    // Yetki stateini falsea çekeceğim.
    setIsAuth(false);

    // local' deki tokeni kaldır.
    localStorage.removeItem("token");
  };

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputtaki girdiyi al ve küçük harfe çevir (büyük küçük harf duyarlılığını ortadan kaldırır.)
    const room = e.target[0].value.toLocaleLowerCase();

    // statei güncelle.
    setRoom(room);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya gireceksiniz</p>

      <input placeholder="ör:haftaiçi" type="text" required />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">
        Çıkış Yap
      </button>
    </form>
  );
};

export default RoomPage;
