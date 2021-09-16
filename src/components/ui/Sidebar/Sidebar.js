import React, { useState } from "react";

import { useClickOutsideListenerRef } from "@Hooks";
import { useLocation, useHistory } from "react-router-dom";

import {
  UmbrellaIcon,
  UmbrellaTypography,
  Gauge,
  Stack,
  Blocks,
  Shield,
  Mail,
  Menu,
  Close,
  Document,
  Twitter,
  Github,
  Medium,
  Telegram,
  Linkedin,
  Collapse,
} from "@Images";

import classnames from "classnames";

import "./sidebar.scss";

//eslint-disable-next-line
function NewKeys() {
  return (
    <div className="notification">
      <p>2 new</p>
    </div>
  );
}

const options = [
  {
    label: "Dashboard",
    icon: <Gauge />,
    path: "/",
    matches: ["/"],
  },
  {
    label: "API Pairs",
    icon: <Stack />,
    path: "/api-pairs",
    matches: ["/api-pairs"],
  },
  {
    label: "Blocks",
    icon: <Blocks />,
    path: "/blocks",
    matches: ["/blocks"],
  },
  {
    label: "Validators",
    icon: <Shield />,
    path: "/validators",
    matches: ["/validators"],
  },
];

const subOptions = [
  {
    label: "Contact us",
    icon: <Mail />,
    path: "https://discord.gg/QEatbAm8ey",
    matches: [],
  },
  {
    label: "Documentation",
    icon: <Document />,
    path: "https://umbrella-network.readme.io/docs",
    matches: [],
  },
];

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
        <div className="sidebar__header sidebar__link">
          <a href="/">
            <img src={UmbrellaIcon} alt="" />
            <img src={UmbrellaTypography} className="typography" alt="" />
          </a>
          <button aria-label="Close sidebar" onClick={close} className="close">
            <Close />
          </button>
        </div>

        <div className="sidebar__links">
          {options.map((option) => (
            <button
              onClick={() => handleClick(option)}
              key={JSON.stringify(option)}
              className={classnames("link", {
                "link--current": option.matches.includes(pathname),
              })}
            >
              {option.icon}
              <p className="link__label">{option.label}</p>
              {option?.notification}
            </button>
          ))}
        </div>

        <div className="sidebar__divider" />

        <div className="sidebar__links">
          {subOptions.map((option) => (
            <a
              href={option.path}
              target="_blanke"
              key={`$sidebar-links-suboptions-${JSON.stringify(option)}`}
              rel="noopener noreferrer"
              className={classnames("link", {
                "link--current": option.matches.includes(pathname),
              })}
            >
              {option.icon}
              <p className="link__label">{option.label}</p>
              {option?.notification}
            </a>
          ))}
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
