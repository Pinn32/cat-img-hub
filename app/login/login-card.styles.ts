// Member: Aiqi Xu
// Login page styled components

"use client";

import styled from "styled-components";

export const LoginWrap = styled.main`
    width: clamp(100px, 500px, 80vw);
    margin: 0 auto;
    padding: 3rem 1.2rem;
`;

export const LoginCard = styled.section`
    padding: 2rem;
    border-radius: 24px;
    background: #ffffff;
    border: 1px solid #ead9c3;
    box-shadow: 0 12px 32px #e8d5c2;
`;

export const LoginTitle = styled.h1`
    font-size: 2rem;
    color: #6d4125;
`;

export const LoginText = styled.p`
    margin-top: 0.5rem;
    color: #5d4637;
`;

export const LoginButton = styled.button`
    margin-top: 1.2rem;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 14px;
    background: #7a4b2a;
    font-size: 1rem;
    color: white;
    cursor: pointer;
`;
