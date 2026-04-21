"use client";

import Link from "next/link";
import styled from "styled-components";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  background: rgba(255, 248, 239, 0.94);
  border-bottom: 1px solid #e7d4bc;
  backdrop-filter: blur(8px);
`;

export const Brand = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #7a4b2a;
`;

export const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const NavLink = styled(Link)`
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e7d4bc;
  font-size: 14px;
  font-weight: 600;
`;

export const NavButton = styled.button`
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e7d4bc;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
`;
