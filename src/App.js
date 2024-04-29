import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import rocket from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMsgToOpenAI } from './openai';
import { useState,useRef, useEffect } from 'react';


function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi I am ChatGPT, How can I help you today?",
    isBot: true,

  }]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ])
    const res = await sendMsgToOpenAI(input)
    setMessages([...messages,
    { text, isBot:false},
    {text:res, isBot:true}])
  }
  const handleEnter =async(e) =>{
    if(e.key==='Enter') await handleSend();
  }
  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="Query" className="addBtn"/>New Chat</button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" />What is programming?</button>
            <button className="query"><img src={msgIcon} alt="Query" />How to use API?</button>
          </div>         
        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="" className="listItemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats"> 
          {messages.map((message, i) => {
            return <div key={i} className={message.isBot?"chat bot":"chat"}>
            <img className="chatImg" src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{ message.text}</p>
          </div>
          })}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" name="" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' onClick={handleSend}><img src={sendBtn} alt="" /></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, place or facts.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
