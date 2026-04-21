// Member: Aiqi Xu
// Main styled components

"use client";

import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
    max-width: 95vw;
    margin: 0 auto;
    padding: 2rem 1.2rem 3rem;
`;

// header text section
export const Hero = styled.section`
    margin-bottom: 1.2rem;
    padding: 1.5rem;
    border-radius: 24px;
    background-color: #ffe5c4;
    border: 1px solid #d1b188;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: #6d4125;
`;

export const Text = styled.p`
    margin: 0.5rem 0;
    color: #5d4637;
`;

// refresh & go-to-login & search, etc
export const MainButton = styled.button`
    display: inline-block;
    margin: 0 0 1.2rem;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 12px;
    background: #d87a39;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
`;

// go-to-login
export const MainLinkButton = styled(Link)`
    display: inline-block;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: #d87a39;
    color: white;
    font-weight: bold;
`;

export const Message = styled.p`
    margin: 0.5rem 0.2rem 1rem;
    color: #7a4b2a;
`;

export const SearchForm = styled.form`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1.5rem 0;
`;

export const SearchInput = styled.input`
    flex: 1;
    margin: 0 0 1.2rem;
    padding: 0.8rem 1rem;
    border-radius: 12px;
    border: 1px solid #d8c0a2;
    background: #fffdf9;
    font-size: 1rem;
`;
