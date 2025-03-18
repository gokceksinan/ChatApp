import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const lastMsg = useRef(null);

  // form gönderilince mesajı veritabanına kaydet.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // mesaj document'inin kaydedileceği koleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // referansı alınan koleksiyonu document'i ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu temizle
    setText("")
  };

  // mevcut odada gönderilen mesajları anlık olarak almam lazım.
  useEffect(() => {
    //1) abone olunacak kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // 2) sorgu ayaralarını yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //3) onSnapshot ile anlık olarak koleksiyondaki değişimleri izler
    // her değiştiğinde callback fn tetiklenir ve güncellemeleri alır.
    const unsub = onSnapshot(q, (snapshot) => {
      let temp = [];

      // data() methodu ile dökümanların içerisindeki veriye erişip geçici diziye aktardık.
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      //son mesaja odakla
      lastMsg.current.scrollIntoView({ behavior: "smooth" });

      setMessages(temp);
    });

    // 4) kullanıcı sayfadan ayrıldığı anda dinlemeyi durdur.
    return () => {
      unsub();
    };
  }, []);

  console.log(text);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length < 1 ? (
          <div className="warn"><p>Sohbete ilk mesajı gönderin</p></div>
        ) : (
          messages.map((data, key) => <Message data={data} key={key} />)
        )}

        <div ref={lastMsg} />
      </main>

      <form className="send-form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız"
          type="text"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
              setIsOpen(false);
            }}
            open={isOpen}
            skinTonesDisabled
          />

          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            😀
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
