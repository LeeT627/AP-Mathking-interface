import styled from '@emotion/styled';
import { FiX, FiActivity } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface DesmosPopupProps {
  open: boolean;
  onClose: () => void;
}

const PopupContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 500px;
  background: #232329;
  color: #fff;
  box-shadow: 2px 0 16px rgba(0,0,0,0.12);
  z-index: 225;
  display: flex;
  flex-direction: column;
`;

const PopupHeader = styled.div`
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

const DesmosFrame = styled.iframe`
  flex: 1;
  border: none;
  width: 100%;
  min-height: 500px;
  background: #fff;
`;

const DesmosPopup = ({ open, onClose }: DesmosPopupProps) => (
  <AnimatePresence>
    {open && (
      <PopupContainer
        initial={{ x: -520 }}
        animate={{ x: 0 }}
        exit={{ x: -520 }}
        transition={{ duration: 0.25 }}
      >
        <PopupHeader>
          <span><FiActivity style={{ marginRight: 8 }} />Desmos Graphing Calculator</span>
          <CloseButton onClick={onClose} aria-label="Close desmos">
            <FiX />
          </CloseButton>
        </PopupHeader>
        <DesmosFrame
          src="https://www.desmos.com/calculator"
          title="Desmos Graphing Calculator"
          allowFullScreen
        />
      </PopupContainer>
    )}
  </AnimatePresence>
);

export default DesmosPopup; 