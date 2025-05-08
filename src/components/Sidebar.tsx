import styled from '@emotion/styled';
import { FiX, FiBookOpen } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background: #232329;
  color: #fff;
  box-shadow: 2px 0 16px rgba(0,0,0,0.12);
  z-index: 200;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px 16px 20px;
  font-size: 1.3rem;
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

const ChapterList = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

const ChapterItem = styled.li`
  padding: 16px 0;
  border-bottom: 1px solid #35353b;
  font-size: 1.08rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #18181b;
  }
`;

const chapters = [
  'Chapter 1: Introduction',
  'Chapter 2: Algebra',
  'Chapter 3: Geometry',
  'Chapter 4: Calculus',
  'Chapter 5: Statistics',
  'Chapter 6: Probability',
  'Chapter 7: Review',
];

const Sidebar = ({ open, onClose }: SidebarProps) => (
  <AnimatePresence>
    {open && (
      <SidebarContainer
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ duration: 0.25 }}
      >
        <SidebarHeader>
          <span><FiBookOpen style={{ marginRight: 8 }} />Chapters</span>
          <CloseButton onClick={onClose} aria-label="Close sidebar">
            <FiX />
          </CloseButton>
        </SidebarHeader>
        <ChapterList>
          {chapters.map((chapter, idx) => (
            <ChapterItem key={idx}>{chapter}</ChapterItem>
          ))}
        </ChapterList>
      </SidebarContainer>
    )}
  </AnimatePresence>
);

export default Sidebar; 