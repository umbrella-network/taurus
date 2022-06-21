import React from "react";

import { useChain } from "store/Chain";

import { Card, Url } from "components/ui";

import { parseAndMillifyToken } from "utils/formatters";

import {
  BlocksAltComponent,
  StackAltComponent,
  Shield,
  Staked,
} from "assets/images";

import "./headerCards.scss";

function HeaderCards() {
  const {
    state: { lastBlock, datapairs },
  } = useChain();

  const staked = lastBlock && parseAndMillifyToken(lastBlock.staked, "UMB");

  const data = [
    {
      label: "Latest block",
      value: lastBlock?.blockId,
      url: `/blocks/${lastBlock?.blockId}`,
      icon: <BlocksAltComponent />,
    },
    {
      label: "Total datapairs",
      value: datapairs?.length,
      url: "/datapairs",
      icon: <StackAltComponent />,
    },
    {
      label: "Total validators",
      value: lastBlock?.voters.length,
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
          {url && value ? (
            <Url className="header-card__value" label={value} url={url} />
          ) : (
            <p className="header-card__value">{value ? value : "Loading..."}</p>
          )}
        </Card>
      ))}
    </div>
  );
}

export default HeaderCards;
