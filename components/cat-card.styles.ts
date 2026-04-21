"use client";

import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
`;

export const Card = styled.article`
  overflow: hidden;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid #ead9c3;
  box-shadow: 0 18px 40px rgba(115, 77, 43, 0.12);
`;

export const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
  background: #f3e2ca;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
`;

export const InfoLine = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: #4b372d;
`;

export const Label = styled.span`
  font-weight: 700;
  color: #7a4b2a;
`;

export const CardButton = styled.button`
  margin-top: 4px;
  padding: 12px 16px;
  border: none;
  border-radius: 14px;
  background: #7a4b2a;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
