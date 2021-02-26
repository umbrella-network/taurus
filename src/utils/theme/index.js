import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

const override = {
  name: "my theme",
  rounding: 2,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        light: "#0054A6",
      },
      background: {
        light: "#FFFFFF",
      },
      "background-back": {
        light: "#EEEEEE",
      },
      "background-front": {
        light: "#FFFFFF",
      },
      "background-contrast": {
        light: "#11111111",
      },
      text: {
        light: "#333333",
      },
      "text-strong": {
        light: "#000000",
      },
      "text-weak": {
        light: "#444444",
      },
      "text-xweak": {
        light: "#666666",
      },
      border: {
        light: "#CCCCCC",
      },
      control: "#1988F7",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": {
        light: "control",
      },
      "selected-text": "1988F7",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      focus: {
        outline: { size: "0.5px" },
        light: "#1988F7",
      },
    },
    font: {
      family: '"Poppins"',
      size: "18px",
      height: "24px",
      maxWidth: "432px",
      face: "Poppins",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "2px",
      },
    },
    drop: {
      border: {
        radius: "2px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px",
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px",
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "384px",
          xlarge: "768px",
          full: "100%",
        },
      },
      medium: {
        value: 1536,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "3px",
      font: {
        weight: 200,
      },
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      light: "#FFFFFF",
    },
  },
  anchor: {
    color: { light: "control" },
    fontWeight: 200,
  },
  button: {
    border: {
      width: "2px",
      radius: "18px",
    },
    padding: {
      vertical: "4px",
      horizontal: "22px",
    },
  },
  checkBox: {
    check: {
      radius: "2px",
    },
    toggle: {
      radius: "24px",
      size: "48px",
    },
    size: "24px",
  },
  radioButton: {
    size: "24px",
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
      style: "dashed",
      size: "xsmall",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
      weight: "normal",
    },
    margin: {
      bottom: "medium",
    },
    round: "2px",
  },
  scale: 0.3,
  calendar: {
    small: {
      fontSize: "16.8px",
      lineHeight: 1.375,
      daySize: "27.43px",
    },
    medium: {
      fontSize: "18px",
      lineHeight: 1.45,
      daySize: "54.86px",
    },
    large: {
      fontSize: "21.6px",
      lineHeight: 1.11,
      daySize: "109.71px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "8px",
        size: "24px",
      },
      minute: {
        width: "4px",
        size: "12px",
      },
      second: {
        width: "3px",
        size: "9px",
      },
      size: {
        small: "72px",
        medium: "96px",
        large: "144px",
        xlarge: "216px",
        huge: "288px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "15.6px",
          height: 1.5,
        },
        small: {
          size: "16.8px",
          height: 1.43,
        },
        medium: {
          size: "18px",
          height: 1.375,
        },
        large: {
          size: "19.2px",
          height: 1.167,
        },
        xlarge: {
          size: "20.4px",
          height: 1.1875,
        },
        xxlarge: {
          size: "22.8px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: "23px",
          height: "29px",
          maxWidth: "547px",
        },
        medium: {
          size: "28px",
          height: "34px",
          maxWidth: "662px",
        },
        large: {
          size: "37px",
          height: "43px",
          maxWidth: "893px",
        },
        xlarge: {
          size: "47px",
          height: "53px",
          maxWidth: "1123px",
        },
      },
      2: {
        small: {
          size: "22px",
          height: "28px",
          maxWidth: "518px",
        },
        medium: {
          size: "25px",
          height: "31px",
          maxWidth: "605px",
        },
        large: {
          size: "29px",
          height: "35px",
          maxWidth: "691px",
        },
        xlarge: {
          size: "32px",
          height: "38px",
          maxWidth: "778px",
        },
      },
      3: {
        small: {
          size: "20px",
          height: "26px",
          maxWidth: "490px",
        },
        medium: {
          size: "23px",
          height: "29px",
          maxWidth: "547px",
        },
        large: {
          size: "25px",
          height: "31px",
          maxWidth: "605px",
        },
        xlarge: {
          size: "28px",
          height: "34px",
          maxWidth: "662px",
        },
      },
      4: {
        small: {
          size: "19px",
          height: "25px",
          maxWidth: "461px",
        },
        medium: {
          size: "20px",
          height: "26px",
          maxWidth: "490px",
        },
        large: {
          size: "22px",
          height: "28px",
          maxWidth: "518px",
        },
        xlarge: {
          size: "23px",
          height: "29px",
          maxWidth: "547px",
        },
      },
      5: {
        small: {
          size: "17px",
          height: "23px",
          maxWidth: "418px",
        },
        medium: {
          size: "17px",
          height: "23px",
          maxWidth: "418px",
        },
        large: {
          size: "17px",
          height: "23px",
          maxWidth: "418px",
        },
        xlarge: {
          size: "17px",
          height: "23px",
          maxWidth: "418px",
        },
      },
      6: {
        small: {
          size: "17px",
          height: "23px",
          maxWidth: "403px",
        },
        medium: {
          size: "17px",
          height: "23px",
          maxWidth: "403px",
        },
        large: {
          size: "17px",
          height: "23px",
          maxWidth: "403px",
        },
        xlarge: {
          size: "17px",
          height: "23px",
          maxWidth: "403px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "17px",
      height: "23px",
      maxWidth: "418px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "19px",
      height: "25px",
      maxWidth: "461px",
    },
    xlarge: {
      size: "20px",
      height: "26px",
      maxWidth: "490px",
    },
    xxlarge: {
      size: "23px",
      height: "29px",
      maxWidth: "547px",
    },
  },
  text: {
    xsmall: {
      size: "17px",
      height: "23px",
      maxWidth: "403px",
    },
    small: {
      size: "17px",
      height: "23px",
      maxWidth: "418px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "19px",
      height: "25px",
      maxWidth: "461px",
    },
    xlarge: {
      size: "20px",
      height: "26px",
      maxWidth: "490px",
    },
    xxlarge: {
      size: "23px",
      height: "29px",
      maxWidth: "547px",
    },
  },
  table: {
    extend: `
        table-layout: auto !important
      `,
  },
};

export const theme = deepMerge(grommet, override);
