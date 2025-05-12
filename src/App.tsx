import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import Notepad from './components/Notepad';
import CalculatorPopup from './components/CalculatorPopup';
import FormulaSheetPopup from './components/FormulaSheetPopup';
import DesmosPopup from './components/DesmosPopup';
import { FiMessageCircle, FiMenu, FiEdit3, FiActivity } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import TeacherAvatar from './components/TeacherAvatar';

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
  right: 70px;
  bottom: 210px;
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
  z-index: 301;
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

const FormulaSheetButton = styled.button`
  position: fixed;
  top: 32px;
  right: 32px;
  background: #232329;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  cursor: pointer;
  z-index: 240;
  transition: background 0.2s;
  &:hover {
    background: #6366f1;
  }
`;

const SpacebarHint = styled.div`
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  color: #888;
  font-size: 1rem;
  background: rgba(255,255,255,0.85);
  padding: 6px 18px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  z-index: 50;
  pointer-events: none;
`;

const DesmosButton = styled.button`
  background: #232329;
  color: #fff;
  border: none;
  border-radius: 16px;
  width: 90px;
  height: 44px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 0.5px;
  margin-bottom: 2px;
  &:hover {
    background: #6366f1;
  }
`;

const ContextMenu = styled.div`
  position: fixed;
  background: #232329;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
  z-index: 9999;
  min-width: 160px;
  padding: 6px 0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContextMenuItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  text-align: left;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #6366f1;
  }
`;

const ChatBoxContainer = styled.div`
  position: fixed;
  right: 40px;
  bottom: 280px;
  z-index: 302;
`;

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [formulaSheetOpen, setFormulaSheetOpen] = useState(false);
  const [desmosOpen, setDesmosOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [typedWords, setTypedWords] = useState(0);
  const secondPart = [
    'We write this as ',
    <span key="math"><TeX math={"\\lim_{x \to c} f(x) = R"} /></span>,
    '.',
    ' It means that we can make ',
    <b key="fx"><i>f(x)</i></b>,
    ' as close as we want to ',
    <b key="r">R</b>,
    ' by taking ',
    <b key="x">x</b>,
    ' sufficiently close to ',
    <b key="c">c</b>,
    ', without actually being equal to ',
    <b key="c2">c</b>,
    '.',
  ];
  const [notepadText, setNotepadText] = useState('');
  const notepadRef = useRef<{ setNote: (val: string) => void } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; text: string } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  // Track the most recent content position
  const centerContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (showSecondPart && typedWords < secondPart.length) {
      interval = setInterval(() => {
        setTypedWords((prev) => prev + 1);
      }, 120);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showSecondPart, typedWords, secondPart.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !showSecondPart) {
        setShowSecondPart(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSecondPart]);

  const handleAskMK = () => {
    if (contextMenu && contextMenu.text.trim()) {
      setMessages((prev) => [...prev, { text: contextMenu.text, isUser: true }]);
      setChatOpen(true);
      setChatInput('');
      setContextMenu(null);
      window.getSelection()?.removeAllRanges();
    }
  };
  const handleAddToNotes = () => {
    if (contextMenu && contextMenu.text.trim()) {
      setNotepadText((prev) => prev ? prev + '\n' + contextMenu.text : contextMenu.text);
      setNotepadOpen(true);
      setContextMenu(null);
      window.getSelection()?.removeAllRanges();
    }
  };
  const handleCopy = () => {
    if (contextMenu && contextMenu.text.trim()) {
      navigator.clipboard.writeText(contextMenu.text);
    }
    setContextMenu(null);
    window.getSelection()?.removeAllRanges();
  };

  // Update content center when new content is generated
  const [contentCenter, setContentCenter] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (centerContentRef.current) {
      const rect = centerContentRef.current.getBoundingClientRect();
      setContentCenter({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY,
      });
    }
  }, [showSecondPart, typedWords]);

  return (
    <AppContainer>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Notepad open={notepadOpen} onClose={() => setNotepadOpen(false)} note={notepadText} setNote={setNotepadText} />
      <CalculatorPopup open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
      <FormulaSheetPopup open={formulaSheetOpen} onClose={() => setFormulaSheetOpen(false)} />
      <DesmosPopup open={desmosOpen} onClose={() => setDesmosOpen(false)} />
      <FormulaSheetButton
        onClick={() => {
          setFormulaSheetOpen(true);
          setSidebarOpen(false);
          setNotepadOpen(false);
          setCalculatorOpen(false);
        }}
        style={{ display: formulaSheetOpen ? 'none' : 'block' }}
      >
        Formula Sheet
      </FormulaSheetButton>
      <SidebarButtonGroup>
        {!sidebarOpen && !notepadOpen && !calculatorOpen && !formulaSheetOpen && !desmosOpen && (
          <SideButton onClick={() => { setSidebarOpen(true); setNotepadOpen(false); setCalculatorOpen(false); setFormulaSheetOpen(false); setDesmosOpen(false); }} aria-label="Open sidebar">
            <FiMenu />
          </SideButton>
        )}
        {!notepadOpen && !sidebarOpen && !calculatorOpen && !formulaSheetOpen && !desmosOpen && (
          <SideButton onClick={() => { setNotepadOpen(true); setSidebarOpen(false); setCalculatorOpen(false); setFormulaSheetOpen(false); setDesmosOpen(false); }} aria-label="Open notepad">
            <FiEdit3 />
          </SideButton>
        )}
        {!calculatorOpen && !sidebarOpen && !notepadOpen && !formulaSheetOpen && !desmosOpen && (
          <SideButton onClick={() => { setCalculatorOpen(true); setSidebarOpen(false); setNotepadOpen(false); setFormulaSheetOpen(false); setDesmosOpen(false); }} aria-label="Open calculator">
            <FaCalculator />
          </SideButton>
        )}
        {!desmosOpen && !calculatorOpen && !sidebarOpen && !notepadOpen && !formulaSheetOpen && (
          <DesmosButton onClick={() => { setDesmosOpen(true); setCalculatorOpen(false); setSidebarOpen(false); setNotepadOpen(false); setFormulaSheetOpen(false); }} aria-label="Open Desmos calculator">
            Desmos
          </DesmosButton>
        )}
      </SidebarButtonGroup>
      <CenterContent
        ref={centerContentRef}
        onMouseUp={e => {
          // Only show context menu on right click, handled in onContextMenu
          // But store selection for context menu
          const selection = window.getSelection();
          if (selection && selection.toString().trim()) {
            // Store selection for context menu
            // We'll use this in onContextMenu
          }
        }}
        onContextMenu={e => {
          const selection = window.getSelection();
          const selectedText = selection ? selection.toString() : '';
          if (selectedText.trim()) {
            e.preventDefault();
            setContextMenu({
              x: e.clientX,
              y: e.clientY,
              text: selectedText,
            });
          } else {
            setContextMenu(null);
          }
        }}
      >
        <Title>1. What is a Limit?</Title>
        <ul style={{ paddingLeft: 20 }}>
          <Bullet>
            The limit of a function <b><i>f(x)</i></b> as <b><i>x</i></b> approaches a value <b><i>c</i></b> is the value <b><i>R</i></b> that <b><i>f(x)</i></b> gets closer and closer to as <b><i>x</i></b> gets closer to <b><i>c</i></b> (but <b><i>x</i></b> does not equal <b><i>c</i></b>).
          </Bullet>
          {showSecondPart && (
            <Bullet>
              {secondPart.slice(0, typedWords).map((word, i) => word)}
              {typedWords < secondPart.length && <span className="type-cursor">|</span>}
            </Bullet>
          )}
        </ul>
      </CenterContent>
      {!showSecondPart && (
        <SpacebarHint>press space bar to continue</SpacebarHint>
      )}
      {contextMenu && (
        (() => {
          console.log('Rendering context menu at', contextMenu.x, contextMenu.y, 'with text:', contextMenu.text);
          return (
            <ContextMenu ref={contextMenuRef} style={{ left: contextMenu.x, top: contextMenu.y }} onClick={e => e.stopPropagation()}>
              <ContextMenuItem onClick={handleAskMK}>Ask MK</ContextMenuItem>
              <ContextMenuItem onClick={handleAddToNotes}>Add to my notes</ContextMenuItem>
              <ContextMenuItem onClick={handleCopy}>Copy</ContextMenuItem>
            </ContextMenu>
          );
        })()
      )}
      {(!chatOpen && !sidebarOpen && !notepadOpen && !calculatorOpen && !formulaSheetOpen && !desmosOpen) && (
        <ChatButton onClick={() => setChatOpen(true)} aria-label="Open chat">
          <FiMessageCircle />
        </ChatButton>
      )}
      {chatOpen && (
        <ChatBoxContainer>
          <ChatBox
            onClose={() => setChatOpen(false)}
            input={chatInput}
            setInput={setChatInput}
            messages={messages}
            setMessages={setMessages}
          />
        </ChatBoxContainer>
      )}
      <TeacherAvatar isWriting={typedWords < secondPart.length} />
    </AppContainer>
  );
}

export default App;
