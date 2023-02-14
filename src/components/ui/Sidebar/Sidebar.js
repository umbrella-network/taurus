import React, { useState } from "react";
import classnames from "classnames";
import { useLocation, useHistory } from "react-router-dom";

import { useClickOutsideListenerRef } from "hooks";

import {
  Stack,
  Blocks,
  Contact,
  Document,
  BlocksAlt,
  StackAlt,
  DocumentAlt,
  ContactAlt,
  Menu,
  Close,
  UmbSocial,
  Twitter,
  Github,
  Medium,
  Telegram,
  Linkedin,
  Collapse,
  UmbrellaFullLogo,
} from "assets/images";

import "./sidebar.scss";
import { useTranslation } from "react-i18next";

const optionsProperties = {
  datapairs: {
    icon: Stack,
    hoverIcon: StackAlt,
    path: "/datapairs",
    matches: ["/datapairs", "/"],
  },
  blocks: {
    icon: Blocks,
    hoverIcon: BlocksAlt,
    path: "/blocks",
    matches: ["/blocks"],
  },
  contactUs: {
    icon: Contact,
    hoverIcon: ContactAlt,
    path: "https://discord.gg/QEatbAm8ey",
    matches: [],
  },
  documentation: {
    icon: Document,
    hoverIcon: DocumentAlt,
    path: "https://umbrella-network.readme.io/docs",
    matches: [],
  },
};

const socialMedia = [
  {
    label: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/umbnetwork",
  },
  {
    label: "Github",
    icon: Github,
    url: "https://github.com/umbrella-network",
  },
  {
    label: "Main website",
    icon: UmbSocial,
    url: "https://umb.network/",
  },
  {
    label: "Medium",
    icon: Medium,
    url: "https://medium.com/umbrella-network",
  },
  {
    label: "Telegram",
    icon: Telegram,
    url: "https://t.me/umbrellanet",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/umbrella-network/",
  },
];

function Sidebar() {
  const { t } = useTranslation("ui", { keyPrefix: "sidebar" });

  const options = [
    {
      property: "datapairs",
      label: t("datapairsLabel"),
    },
    {
      property: "blocks",
      label: t("blocksLabel"),
    },
  ];

  const subOptions = [
    {
      property: "contactUs",
      label: t("contactUsLabel"),
    },
    {
      property: "documentation",
      label: t("documentationLabel"),
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const open = () => setIsSidebarOpen(true);
  const close = () => setIsSidebarOpen(false);
  const toggle = () => setIsSidebarOpen(!isSidebarOpen);

  const ref = useClickOutsideListenerRef(close);

  const { pathname } = useLocation();
  const history = useHistory();

  const handleClick = (option) => {
    if (!option.matches.includes(pathname)) {
      history.push(option.path);
      close();
    }
  };

  return (
    <div
      ref={ref}
      className={classnames("sidebar", { "sidebar--open": isSidebarOpen })}
      onClick={() => {}}
    >
      <button
        aria-label="Open sidebar"
        onClick={open}
        className="sidebar__open"
      >
        <Menu />
      </button>
      <div className="content">
        <div aria-label="Home" className="sidebar__header sidebar__link">
          <button onClick={() => handleClick({ path: "/", matches: [] })}>
            <img src={UmbrellaFullLogo} alt="" />
          </button>
          <button aria-label="Close sidebar" onClick={close} className="close">
            <Close />
          </button>
        </div>

        <div className="sidebar__links">
          {options.map(({ label, property }) => {
            const option = optionsProperties[property];

            return (
              <button
                onClick={() => handleClick(option)}
                key={JSON.stringify(option)}
                className={classnames("link", {
                  "link--current": option.matches.includes(pathname),
                })}
              >
                <img alt="" src={option.hoverIcon} className="icon--hover" />
                <img alt="" src={option.icon} className="icon--default" />
                <p className="link__label">{label}</p>
                {option?.notification}
              </button>
            );
          })}
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__links">
          {subOptions.map(({ label, property }) => {
            const option = optionsProperties[property];

            return (
              <a
                href={option.path}
                target="_blanke"
                key={`$sidebar-links-suboptions-${JSON.stringify(option)}`}
                rel="noopener noreferrer"
                className={classnames("link", {
                  "link--current": option.matches.includes(pathname),
                })}
              >
                <img alt="" src={option.icon} className="icon--default" />
                <img alt="" src={option.hoverIcon} className="icon--hover" />
                <p className="link__label">{label}</p>
                {option?.notification}
              </a>
            );
          })}
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__social-media">
          {socialMedia.map(({ url, label, icon }, index) => (
            <a
              key={`${url}${label}-sidebar-media-${index}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={icon} alt={label} />
            </a>
          ))}
        </div>

        <button onClick={toggle} className="sidebar__collapse">
          <Collapse />
          <p>Collapse menu</p>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
