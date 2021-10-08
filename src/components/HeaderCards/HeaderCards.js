import React, { useEffect, useState } from "react";

import { usePrices } from "@Store";
import { valueToToken } from "@Formatters";
import { Card } from "@Ui";
import { BlocksAltComponent, StackAltComponent, Shield, Staked } from "@Images";

import { isEmpty } from "ramda";
import millify from "millify";

import "./headerCards.scss";

function HeaderCards() {
  const {
    state: {
      proof: { block },
      datapairs: { list },
    },
  } = usePrices();

  const [latestBlock, setLatestBlock] = useState("Loading...");
  const [datapairs, setDatapairs] = useState("Loading...");
  const [validators, setValidators] = useState("Loading...");
  const [staked, setStaked] = useState("Loading...");

  useEffect(() => {
    if (block) {
      const staked = valueToToken({
        value: block.staked,
        floatDecimals: 2,
        toFloat: true,
      });
      const millifiedStaked = millify(staked, {
        precision: 1,
        lowercase: true,
      });

      setLatestBlock(block.blockId);
      setValidators(block.voters.length);
      setStaked(`${millifiedStaked} UMB`);
    }
  }, [block]);

  useEffect(() => {
    if (!isEmpty(list)) {
      setDatapairs(list.length);
    }
  }, [list]);

  const data = [
    {
      label: "Latest block",
      value: latestBlock,
      icon: <BlocksAltComponent />,
    },
    {
      label: "Total datapairs",
      value: datapairs,
      icon: <StackAltComponent />,
    },
    {
      label: "Total validators",
      value: validators,
      icon: <Shield />,
    },
    {
      label: "Total staked",
      value: staked,
      icon: <Staked />,
    },
  ];

  return (
    <div className="header-cards">
      {data.map(({ value, label, icon }) => (
        <Card key={`${value} card ${label}`} className="header-cards__card">
          {icon}
          <p className="header-card__label">{label}</p>
          <p className="header-card__value">{value}</p>
        </Card>
      ))}
    </div>
  );
}

export default HeaderCards;
