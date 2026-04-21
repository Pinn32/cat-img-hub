// Member: Yuchen Bao
// CatCard styled components

"use client";

import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
`;

// article: single meaningful content unit
export const Card = styled.article`
    overflow: hidden;
    border-radius: 22px;
    background: white;
    border: 1px solid #ead9c3;
    box-shadow: 0 18px 40px #e8d5c2;
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
    gap: 0.5rem;
    padding: 1.2rem;
`;

export const InfoLine = styled.p`
    color: #4b372d;
`;

export const Label = styled.span`
    font-weight: bold;
    color: #7a4b2a;
`;

export const CardButton = styled.button`
    margin-top: 0.5rem;
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 12px;
    background: #7a4b2a;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;
