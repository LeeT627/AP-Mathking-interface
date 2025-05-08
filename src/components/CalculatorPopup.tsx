import styled from '@emotion/styled';
import { FiX, FiCalculator } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorPopupProps {
  open: boolean;
  onClose: () => void;
}

const PopupContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 340px;
  background: #232329;
  color: #fff;
  box-shadow: 2px 0 16px rgba(0,0,0,0.12);
  z-index: 220;
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

const CalculatorImage = styled.img`
  width: 90%;
  margin: 32px auto 0 auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const CalculatorPopup = ({ open, onClose }: CalculatorPopupProps) => (
  <AnimatePresence>
    {open && (
      <PopupContainer
        initial={{ x: -360 }}
        animate={{ x: 0 }}
        exit={{ x: -360 }}
        transition={{ duration: 0.25 }}
      >
        <PopupHeader>
          <span><FiCalculator style={{ marginRight: 8 }} />Calculator</span>
          <CloseButton onClick={onClose} aria-label="Close calculator">
            <FiX />
          </CloseButton>
        </PopupHeader>
        <CalculatorImage src="/calculator.png" alt="Calculator" />
      </PopupContainer>
    )}
  </AnimatePresence>
);

export default CalculatorPopup; 