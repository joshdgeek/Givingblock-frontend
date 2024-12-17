export function getTokenUnit(hexValue) {
    const hexToEth = BigInt(hexValue * (10 ** 18));
    const hexToString = hexToEth.toString(16);
    const hexResult = `0x${hexToString}`;
    console.log(hexValue, hexResult)

    return hexResult
}