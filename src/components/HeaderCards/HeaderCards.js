import React, { useEffect, useState } from "react";

import { usePrices } from "@Store";
import { valueToToken } from "@Formatters";
import { Card, Url } from "@Ui";
import { BlocksAltComponent, StackAltComponent, Shield, Staked } from "@Images";

import { isEmpty } from "ramda";
import millify from "millify";

import "./headerCards.scss";

const loading = "Loading...";

function HeaderCards() {
  const {
    state: {
      proof: { block },
      datapairs: { list },
    },
  } = usePrices();

  const [latestBlock, setLatestBlock] = useState(loading);
  const [datapairs, setDatapairs] = useState(loading);
  const [validators, setValidators] = useState(loading);
  const [staked, setStaked] = useState(loading);

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
      url: `/blocks/${latestBlock}`,
      icon: <BlocksAltComponent />,
    },
    {
      label: "Total datapairs",
      value: datapairs,
      url: "/datapairs",
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
      {data.map(({ value, label, icon, url }) => (
        <Card key={`${value} card ${label}`} className="header-cards__card">
          {icon}
          <p className="header-card__label">{label}</p>
          {url && value !== loading ? (
            <Url className="header-card__value" label={value} url={url} />
          ) : (
            <p className="header-card__value">{value}</p>
          )}
        </Card>
      ))}
    </div>
  );
}

export default HeaderCards;
