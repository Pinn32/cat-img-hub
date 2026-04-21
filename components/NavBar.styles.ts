// Member: Aiqi Xu
// NavBar styled components

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
    gap: 1.2rem;
    padding: 1.2rem 1.5rem;
    background: #fff8ef;
    border-bottom: 1px solid #e7d4bc;
`;

export const Brand = styled(Link)`
    margin: 0 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #7a4b2a;
`;

export const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const NavLink = styled(Link)`
    height: 100%;
    color: #8f5628;
    padding: 0.5rem 0.5rem;
    border-radius: 12px;
    background: white;
    border: 2px solid #e8c190;
`;

export const NavButton = styled.button`
    font-size: 1rem;
    font-weight: bold;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    background: #e68d4b;
    border: 2px solid #c1771c;
    color: white;
    cursor: pointer;
`;
