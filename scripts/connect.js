import { getTokenUnit } from "./testhex.js";

//Getting form eleents by ID
const connectButton = document.getElementById("connectButton");
const addressField = document.getElementById("crypto-address");


if (event) event.preventDefault();


//Make sure the user is on amoy network

//add chain 
async function addChain() {
    await window.ethereum.request({
        "method": "wallet_addEthereumChain",
        "params": [
            {
                chainId: "0x13882",
                chainName: "Polygon Amoy",
                rpcUrls: [
                    "https://rpc-amoy.polygon.technology"
                ],
                iconUrls: [],
                nativeCurrency: {
                    name: "POL",
                    symbol: "POL",
                    decimals: 18
                },
                blockExplorerUrls: [
                    "https://amoy.polygonscan.com"
                ]
            }
        ],
    });
}



async function switchToAmoy() {
    //switch chain to polygon
    try {
        const chain = await window.ethereum.request({
            "method": "wallet_switchEthereumChain",
            "params": [
                {
                    chainId: "0x13882"
                }
            ],
        });

    } catch (error) {
        console.log(` failure to switch to polygon : ${error}`)
    }

}

//Trigger metamask actions 
async function connectMetaMask() {

    //get value of token to be sent 
    const amountField = Number(document.getElementById("amount").value)
    const tokenValue = getTokenUnit(amountField)

    //check if metamask exists
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please load this app in your MetaMask or any browser with metamask extension.");
    }

    //check if the chain exists on the user's wallet
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId !== "0x13882") {
        //await addChain();
    }

    try {
        // Request wallet connection and grab accounts
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        //await switchToAmoy();

        //SEND TRANSACTIONS 
        await window.ethereum.request({
            "method": "eth_sendTransaction",
            "params": [
                {
                    to: `${addressField.value}`, //madeup address
                    from: `${accounts[0]}`,
                    gas: "0x76c0",
                    value: tokenValue,
                    data: "0x",
                    gasPrice: "0x4a817c800"
                }
            ],
        });


        //Rendering and verification of data
        connectButton.textContent = "Connecting...";
        console.log("Connected Address:", accounts[0]);
        console.log(tokenValue)
        console.log(chain)
        connectButton.value = `connected`
        alert("successfully on polygon")

    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
}

//Event to trigger the metamask functon
document.getElementById("connectButton").addEventListener("click", connectMetaMask);
