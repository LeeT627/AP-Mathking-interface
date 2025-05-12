import React from 'react';
import styled from '@emotion/styled';

const AvatarContainer = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 300;
  width: 120px;
  height: 160px;
  display: flex;
  align-items: flex-end;
  pointer-events: none;
`;

const TeacherSVG = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

const LeftArmHand = styled.path<{ isWriting: boolean }>`
  fill: #ffe0b2;
  stroke: #bfa06a;
  stroke-width: 2;
  transform-origin: 32px 96px;
  animation: ${({ isWriting }) =>
    isWriting ? 'writing-hand 0.5s infinite alternate' : 'none'};

  @keyframes writing-hand {
    0% { transform: rotate(10deg); }
    100% { transform: rotate(-15deg); }
  }
`;

const RightArmHand = styled.path`
  fill: #ffe0b2;
  stroke: #bfa06a;
  stroke-width: 2;
`;

interface TeacherAvatarProps {
  isWriting: boolean;
}

const TeacherAvatar: React.FC<TeacherAvatarProps> = ({ isWriting }) => (
  <AvatarContainer>
    <TeacherSVG viewBox="0 0 120 160">
      {/* Head */}
      <circle cx="60" cy="50" r="28" fill="#ffe0b2" stroke="#bfa06a" strokeWidth="2" />
      {/* Body */}
      <rect x="38" y="78" width="44" height="60" rx="18" fill="#4f46e5" />
      {/* Left Arm+Hand (animated, writing, single shape, pointing toward center) */}
      <LeftArmHand
        isWriting={isWriting}
        d="M48 110 Q30 90 50 70 Q70 60 72 80 Q60 82 56 90 Q52 100 48 110 Z"
      />
      {/* Chalk in left hand, connected and angled */}
      <rect x="68" y="77" width="18" height="5" rx="2.2" fill="#232329" transform="rotate(-18 77 80)" />
      {/* Right Arm+Hand (static, single shape) */}
      <RightArmHand d="M72 110 Q95 110 104 120 Q110 128 98 130 Q94 134 88 130 Q92 126 90 120 Q86 114 72 110 Z" />
      {/* Face details */}
      <ellipse cx="60" cy="60" rx="8" ry="4" fill="#fff" />
      <ellipse cx="52" cy="48" rx="3" ry="3.5" fill="#232329" />
      <ellipse cx="68" cy="48" rx="3" ry="3.5" fill="#232329" />
      <ellipse cx="60" cy="70" rx="6" ry="2" fill="#fff" />
      <path d="M54 66 Q60 72 66 66" stroke="#232329" strokeWidth="2" fill="none" />
    </TeacherSVG>
  </AvatarContainer>
);

export default TeacherAvatar; 