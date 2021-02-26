import { BigNumber } from "ethers";
import { converters } from "@umb-network/toolbox";

const blocksFcdValues = {
  18713: [
    281.41,
    42.09,
    1.77,
    31247.57,
    229.64,
    1.0,
    1279.92,
    114.9,
    154.46,
    23.08,
    0.55,
    15.49,
    14.48,
    28479.0,
  ],
  18712: [
    281.95,
    42.13,
    1.77,
    31272.48,
    229.69,
    1.0,
    1280.64,
    114.9,
    154.46,
    23.11,
    0.55,
    15.46,
    14.49,
    28479.74,
  ],
  18711: [
    281.59,
    42.1,
    1.77,
    31269.59,
    229.87,
    1.0,
    1280.75,
    114.9,
    154.46,
    23.1,
    0.55,
    15.5,
    14.54,
    28485.07,
  ],
  18710: [
    281.59,
    42.19,
    1.77,
    31287.3,
    230.21,
    1.0,
    1283.3,
    114.89,
    154.46,
    23.12,
    0.55,
    15.5,
    14.61,
    28484.0,
  ],
  18709: [
    281.59,
    42.18,
    1.77,
    31281.25,
    230.01,
    1.0,
    1282.68,
    114.9,
    154.46,
    23.09,
    0.55,
    15.5,
    14.61,
    28496.07,
  ],
  18708: [
    281.59,
    42.15,
    1.77,
    31262.48,
    230.01,
    1.0,
    1281.69,
    114.92,
    154.49,
    23.06,
    0.55,
    15.5,
    14.53,
    28484.0,
  ],
  18707: [
    281.59,
    42.1,
    1.77,
    31231.51,
    229.69,
    1.0,
    1280.57,
    114.92,
    154.52,
    23.01,
    0.54,
    15.5,
    14.52,
    28484.0,
  ],
  18706: [
    281.42,
    42.05,
    1.77,
    31197.71,
    229.49,
    1.0,
    1278.72,
    114.92,
    154.52,
    22.96,
    0.55,
    15.5,
    14.51,
    28484.0,
  ],
  18705: [
    281.17,
    42.02,
    1.77,
    31154.0,
    229.12,
    1.0,
    1277.79,
    114.92,
    154.52,
    22.91,
    0.54,
    15.5,
    14.51,
    28565.0,
  ],
  18704: [
    281.42,
    42.1,
    1.77,
    31234.24,
    229.22,
    1.0,
    1280.23,
    114.92,
    154.52,
    22.98,
    0.55,
    15.61,
    14.53,
    28565.0,
  ],
  18703: [
    282.0,
    42.1,
    1.78,
    31268.09,
    229.65,
    1.0,
    1282.47,
    114.92,
    154.52,
    23.02,
    0.55,
    15.61,
    14.56,
    28557.0,
  ],
  18702: [
    281.51,
    42.08,
    1.78,
    31266.58,
    229.58,
    1.0,
    1282.47,
    114.92,
    154.52,
    22.99,
    0.55,
    15.59,
    14.56,
    28497.9,
  ],
  18701: [
    280.86,
    41.99,
    1.78,
    31245.49,
    229.24,
    1.0,
    1280.49,
    114.92,
    154.68,
    22.96,
    0.55,
    15.58,
    14.52,
    28411.85,
  ],
  18700: [
    280.56,
    42.01,
    1.78,
    31278.9,
    229.24,
    1.0,
    1281.94,
    114.91,
    154.68,
    22.96,
    0.55,
    15.65,
    14.51,
    28487.04,
  ],
  18699: [
    280.8,
    42.01,
    1.77,
    31287.69,
    229.24,
    1.0,
    1281.51,
    114.91,
    154.68,
    22.87,
    0.55,
    15.65,
    14.54,
    28516.57,
  ],
};

export const fcdValues = (blockHeight) =>
  blocksFcdValues[blockHeight].map((value) =>
    BigNumber.from(converters.numberToUint256(value))
  );
