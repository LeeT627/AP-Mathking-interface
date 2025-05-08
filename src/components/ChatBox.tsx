import { useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { FiSend, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatBoxProps {
  onClose: () => void;
  input: string;
  setInput: (val: string) => void;
  messages: { text: string; isUser: boolean }[];
  setMessages: Dispatch<SetStateAction<{ text: string; isUser: boolean }[]>>;
}

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 420px;
  max-width: 95vw;
  height: 520px;
  background: #232329;
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #a1a1aa;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 32px 24px 16px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div<{ isUser: boolean }>`
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  background: ${props => (props.isUser ? '#6366f1' : '#18181b')};
  color: #fff;
  padding: 12px 18px;
  border-radius: 18px;
  font-size: 1.05rem;
  max-width: 75%;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const ChatBar = styled.form`
  display: flex;
  align-items: center;
  background: #18181b;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.18);
  padding: 0.5rem 1.25rem;
  margin: 16px;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  padding: 0.75rem 0;
  outline: none;

  &::placeholder {
    color: #a1a1aa;
    font-size: 1.1rem;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #a1a1aa;
  font-size: 1.7rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #6366f1;
  }
`;

const ChatBox = ({ onClose, input, setInput, messages, setMessages }: ChatBoxProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }]);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      <ChatContainer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
      >
        <CloseButton onClick={onClose} aria-label="Close chat">
          <FiX />
        </CloseButton>
        <MessagesArea>
          {messages.map((message, idx) => (
            <Message key={idx} isUser={message.isUser}>
              {message.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesArea>
        <ChatBar onSubmit={handleSend}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything"
          />
          <SendButton type="submit" aria-label="Send">
            <FiSend />
          </SendButton>
        </ChatBar>
      </ChatContainer>
    </AnimatePresence>
  );
};

export default ChatBox; 