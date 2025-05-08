import styled from '@emotion/styled';
import { FiX, FiEdit3 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NotepadProps {
  open: boolean;
  onClose: () => void;
}

const NotepadContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 340px;
  background: #232329;
  color: #fff;
  box-shadow: 2px 0 16px rgba(0,0,0,0.12);
  z-index: 210;
  display: flex;
  flex-direction: column;
`;

const NotepadHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px 16px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid #35353b;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a1a1aa;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  background: #18181b;
  color: #fff;
  border: none;
  border-radius: 12px;
  margin: 20px;
  padding: 16px;
  font-size: 1.08rem;
  resize: none;
  outline: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const Notepad = ({ open, onClose }: NotepadProps) => {
  const [note, setNote] = useState('');
  return (
    <AnimatePresence>
      {open && (
        <NotepadContainer
          initial={{ x: -360 }}
          animate={{ x: 0 }}
          exit={{ x: -360 }}
          transition={{ duration: 0.25 }}
        >
          <NotepadHeader>
            <span><FiEdit3 style={{ marginRight: 8 }} />Notepad</span>
            <CloseButton onClick={onClose} aria-label="Close notepad">
              <FiX />
            </CloseButton>
          </NotepadHeader>
          <TextArea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Write your notes here..."
            rows={18}
          />
        </NotepadContainer>
      )}
    </AnimatePresence>
  );
};

export default Notepad; 