"use client";

import Link from "next/link";
import styled from "styled-components";

export const PageShell = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 48px;
`;

export const Hero = styled.section`
  margin-bottom: 24px;
  padding: 26px;
  border-radius: 24px;
  background: linear-gradient(135deg, #fff6e7, #ffe5c3);
  border: 1px solid #ead9c3;
`;

export const Title = styled.h1`
  font-size: 34px;
  line-height: 1.1;
  color: #6d4125;
`;

export const Text = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  color: #5d4637;
`;

export const Row = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0 24px;
`;

export const MainButton = styled.button`
  padding: 12px 18px;
  border: none;
  border-radius: 14px;
  background: #d87a39;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`;

export const MainLinkButton = styled(Link)`
  display: inline-block;
  padding: 12px 18px;
  border-radius: 14px;
  background: #d87a39;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;

export const Message = styled.p`
  margin-top: 14px;
  font-size: 15px;
  color: #7a4b2a;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 20px 0 24px;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 260px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid #d8c0a2;
  background: #fffdf9;
  font-size: 15px;
`;
