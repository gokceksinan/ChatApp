import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  // kullanıcı giriş yaptı mı statei.
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  // kullanıcının girdiği oda state' i
  const [room, setRoom] = useState(null);

  console.log(room);

  // kullanıcının yetkisi yoksa: oda seçme sayfası.
  if (!isAuth) {
    return <LoginPage setIsAuth={setIsAuth} />;
  }

  // kullanıcının yetkisi varsa: 
  return (
    <div className="container">
      {room ? (
        // oda seçiliyse: Sohbet sayfası
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        // oda seçilmediyse oda seçme sayfası.
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
