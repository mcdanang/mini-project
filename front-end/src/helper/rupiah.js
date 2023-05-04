export function rupiah(price) {
  const priceString = price.toString();
  const len = priceString.length;
  let str = "";
  for (let i = 0; i < len; i++) {
    str += priceString[i];
    if ((len - i - 1) % 3 === 0 && i !== len - 1) {
      str += ".";
    }
  }
  return `Rp${str}`;
}