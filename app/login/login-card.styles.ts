"use client";

import styled from "styled-components";

export const LoginWrap = styled.main`
  max-width: 640px;
  margin: 0 auto;
  padding: 48px 20px;
`;

export const LoginCard = styled.section`
  padding: 32px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #ead9c3;
  box-shadow: 0 18px 40px rgba(115, 77, 43, 0.12);
`;

export const LoginTitle = styled.h1`
  font-size: 32px;
  color: #6d4125;
`;

export const LoginText = styled.p`
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.6;
  color: #5d4637;
`;

export const LoginButton = styled.button`
  margin-top: 20px;
  padding: 14px 18px;
  border: none;
  border-radius: 14px;
  background: #7a4b2a;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;
