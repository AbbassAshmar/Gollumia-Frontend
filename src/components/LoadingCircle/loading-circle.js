import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
border: 4px solid rgba(0, 0, 0, 0.1);
border-left-color: #4A90E2;
border-radius: 50%;
width: 40px;
height: 40px;
animation: ${rotate} 1s linear infinite;
`;

export default function LoadingCircle(){
    return <Loader />;
}