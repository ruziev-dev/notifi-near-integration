/** yoctoNear -> NEAR tokens*/
export const countNearTokens = (yoctoNear: number) =>
  Math.round(yoctoNear / 10e23) || "??";
