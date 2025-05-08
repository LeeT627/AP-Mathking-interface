import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import Notepad from './components/Notepad';
import CalculatorPopup from './components/CalculatorPopup';
import { FiMessageCircle, FiMenu, FiEdit3, FiHash } from 'react-icons/fi';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CenterContent = styled.div`
  max-width: 700px;
  color: #18181b;
  border-radius: 0;
  padding: 32px 36px 32px 36px;
  font-size: 1.13rem;
  font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  margin-top: 32px;
  background: none;
  box-shadow: none;
  user-select: text;
  cursor: url('data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="2" width="8" height="20" rx="4" fill="%23FFD600" stroke="%23222" stroke-width="2"/><polygon points="12,22 20,22 16,30" fill="%23FFD600" stroke="%23222" stroke-width="2"/></svg>') 16 28, pointer;
`;

const Title = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Bullet = styled.li`
  margin-bottom: 10px;
  line-height: 1.7;
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #232329;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  z-index: 101;
  transition: background 0.2s;
  &:hover {
    background: #6366f1;
  }
`;

const SidebarButtonGroup = styled.div`
  position: fixed;
  top: 32px;
  left: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 202;
`;

const SideButton = styled.button`
  background: #232329;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #6366f1;
  }
`;

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setMessages((prev) => [...prev, { text: selection.toString(), isUser: true }]);
        setChatOpen(true);
        setChatInput('');
        selection.removeAllRanges();
      }
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  return (
    <AppContainer>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Notepad open={notepadOpen} onClose={() => setNotepadOpen(false)} />
      <CalculatorPopup open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
      <SidebarButtonGroup>
        {!sidebarOpen && !notepadOpen && !calculatorOpen && (
          <SideButton onClick={() => { setSidebarOpen(true); setNotepadOpen(false); setCalculatorOpen(false); }} aria-label="Open sidebar">
            <FiMenu />
          </SideButton>
        )}
        {!notepadOpen && !sidebarOpen && !calculatorOpen && (
          <SideButton onClick={() => { setNotepadOpen(true); setSidebarOpen(false); setCalculatorOpen(false); }} aria-label="Open notepad">
            <FiEdit3 />
          </SideButton>
        )}
        {!calculatorOpen && !sidebarOpen && !notepadOpen && (
          <SideButton onClick={() => { setCalculatorOpen(true); setSidebarOpen(false); setNotepadOpen(false); }} aria-label="Open calculator">
            <FiHash />
          </SideButton>
        )}
      </SidebarButtonGroup>
      <CenterContent>
        <Title>1. What is a Limit?</Title>
        <ul style={{ paddingLeft: 20 }}>
          <Bullet>
            The limit of a function <b><i>f(x)</i></b> as <b><i>x</i></b> approaches a value <b><i>c</i></b> is the value <b><i>R</i></b> that <b><i>f(x)</i></b> gets closer and closer to as <b><i>x</i></b> gets closer to <b><i>c</i></b> (but <b><i>x</i></b> does not equal <b><i>c</i></b>).
          </Bullet>
          <Bullet>
            We write this as <TeX math={"\\lim_{x \to c} f(x) = R"} />.
          </Bullet>
          <Bullet>
            It means that we can make <b><i>f(x)</i></b> as close as we want to <b><i>R</i></b> by taking <b><i>x</i></b> sufficiently close to <b><i>c</i></b>, without actually being equal to <b><i>c</i></b>.
          </Bullet>
        </ul>
      </CenterContent>
      {!chatOpen && (
        <ChatButton onClick={() => setChatOpen(true)} aria-label="Open chat">
          <FiMessageCircle />
        </ChatButton>
      )}
      {chatOpen && <ChatBox onClose={() => setChatOpen(false)} input={chatInput} setInput={setChatInput} messages={messages} setMessages={setMessages} />}
    </AppContainer>
  );
}

export default App;
