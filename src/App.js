import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import MsgBox from './components/MsgBox/MsgBox';
import ChatArea from './components/ChatArea/ChatArea';

import './App.css';

function App() {

  return (
    <div className="wrapper">

      <SideBar />

      <div className="content">
          <Header />
          <ChatArea />
          <MsgBox />
      </div>

    </div>
  );
}

export default App;
