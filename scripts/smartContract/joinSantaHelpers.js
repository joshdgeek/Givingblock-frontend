import { ethers } from "https://unpkg.com/ethers@5.7.2/dist/ethers.esm.min.js";

const providers = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

var address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // smart contract 

const ERC_20_ABI = ["function joinSantaHelpers(address becomeAnElf) public",
    "event santaHelpersRegistration(becomeAnElf, message)"
]

const contract = new ethers.Contract(address, ERC_20_ABI, providers);



if (event) event.preventDefault();

async function register() {
    if (typeof window.ethereum === "undefined") {
        {
            alert("metamask not installed")
            return;
        }
    }

    try {
        const userAddress = await window.ethereum.request({ "method": "eth_requestAccounts" });
        const signer = await new ethers.providers.Web3Provider(window.ethereum).getSigner();
        const contractSigner = contract.connect(signer)
        var address = userAddress[0];
        alert(address)
        const tx = await contractSigner.joinSantaHelpers(`${address}`);
        const receipt = await tx.wait();
        console.log(providers)

        const getBlock = await provider.getBlockNumber();

        console.log("Transaction Confirmed:", receipt);
        alert("You have successfully joined Santa's helpers!");
    } catch (error) {
        console.log(error)
        alert(error)
    }

}
document.getElementById("reg-btn").addEventListener("click", register);