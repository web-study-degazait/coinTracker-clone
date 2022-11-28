import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import {
  Coin,
  Container,
  Header,
  Loader,
  Title,
  Img,
  ConisList,
} from "./Coins.styled";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Helmet>
      <Header>
        <Title>백트코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ConisList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </ConisList>
      )}
    </Container>
  );
}
export default Coins;
