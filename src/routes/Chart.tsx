import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface CharProps {
  coinId: string;
}

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
