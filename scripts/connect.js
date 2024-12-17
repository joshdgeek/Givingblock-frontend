import { getTokenUnit } from "./testhex.js";

//Getting form eleents by ID
const connectButton = document.getElementById("connectButton");
const addressofSender = document.getElementById("crypto-address");


if (event) event.preventDefault();


//Make sure the user is on amoy network
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
    const amountField = Number(document.getElementById("amount").value)
    const tokenValue = getTokenUnit(amountField)
    //check if metamask exists
    if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask.");
    } else {
        alert("metamask is active");
    }

    try {
        // Request wallet connection and grab accounts
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        await switchToAmoy();

        //SEND TRANSACTIONS 
        await window.ethereum.request({
            "method": "eth_sendTransaction",
            "params": [
                {
                    to: "0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7",
                    from: "0x384f9d04a76a138182d7405906a3255177949ea4",
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
        addressofSender.value = accounts[0]
        alert("successfully on polygon")

    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
}

//Event to trigger the metamask functon
document.getElementById("connectButton").addEventListener("click", connectMetaMask);
