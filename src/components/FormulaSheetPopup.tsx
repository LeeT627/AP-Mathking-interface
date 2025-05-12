import styled from '@emotion/styled';
import { FiX, FiBook } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FormulaSheetPopupProps {
  open: boolean;
  onClose: () => void;
}

const PopupContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  background: #232329;
  color: #fff;
  box-shadow: -2px 0 16px rgba(0,0,0,0.12);
  z-index: 230;
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

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

const FormulaSheetPopup = ({ open, onClose }: FormulaSheetPopupProps) => (
  <AnimatePresence>
    {open && (
      <PopupContainer
        initial={{ x: 360 }}
        animate={{ x: 0 }}
        exit={{ x: 360 }}
        transition={{ duration: 0.25 }}
      >
        <PopupHeader>
          <span><FiBook style={{ marginRight: 8 }} />Formula Sheet</span>
          <CloseButton onClick={onClose} aria-label="Close formula sheet">
            <FiX />
          </CloseButton>
        </PopupHeader>
        <Content>
          {/* Replace this with your actual formula sheet content */}
          <h3>Common Math Formulas</h3>
          <ul>
            <li>Quadratic Formula: <b>x = [-b ± √(b²-4ac)] / 2a</b></li>
            <li>Slope: <b>m = (y₂ - y₁) / (x₂ - x₁)</b></li>
            <li>Area of Circle: <b>A = πr²</b></li>
            <li>Pythagorean Theorem: <b>a² + b² = c²</b></li>
            <li>Derivative: <b>f'(x) = limₕ→₀ [f(x+h)-f(x)]/h</b></li>
          </ul>
        </Content>
      </PopupContainer>
    )}
  </AnimatePresence>
);

export default FormulaSheetPopup; 