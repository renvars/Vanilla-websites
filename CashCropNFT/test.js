var account;

// https://docs.walletconnect.com/quick-start/dapps/web3-provider

if (typeof window.ethereum !== 'undefined') {
    document.querySelector("#connect_btn_top").onclick = async() => {
        console.log("requesting metamask")
        if (window.ethereum) {
            await window.ethereum.send("eth_requestAccounts");
            window.web3 = new Web3(window.ethereum);

            var accounts = await web3.eth.getAccounts();
            account = accounts[0];

            contract = new web3.eth.Contract(ABI, ADDRESS);
            // const newItem = document.createElement('p');
            // newItem.innerHTML = account
            // var button = document.getElementById("connect")
            // button.parentNode.replaceChild(newItem, button)

            let isWhitelistedUser = await checkWhitelisted()

            if (contract) {
                document.querySelector("#connect_btn_top").innerHTML = "Connected"
                document.querySelector("#connect_btn_top").classList.add("connected")
                document.querySelector("#connect_btn_top")
                document.querySelector("#mint_amount").innerHTML = "1"
                document.querySelector("#mint_amount").style.fontSize = "2rem"
                document.querySelector("#connect_btn_bottom").style.display = "flex"

                if (isWhitelistedUser == true) {
                    document.querySelector("#mint_top").onclick = () => {
                        var mint_amnt = parseInt(document.querySelector("#mint_amount").innerHTML)
                        console.log("Minting " + mint_amnt)
                        contract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt * 25000000000000000) })
                    }
                } else {
                    document.querySelector("#mint_top").onclick = () => {
                        window.alert("This address is not Whitelisted")
                    }

                }

            }
        }
    }
} else {


    var provider = new WalletConnectProvider.default({
        rpc: {
            1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
            137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
            // ...

        },
        // bridge: 'https://bridge.walletconnect.org',
    });
    document.querySelector("#connect_btn_top").onclick = async() => {
        await provider.enable();

        //  Create Web3 instance
        const web3 = new Web3(provider);
        window.w3 = web3

        var accounts = await web3.eth.getAccounts(); // get all connected accounts
        account = accounts[0]; // get the primary account
    }


    var sign = async(msg) => {
        if (w3) {
            return await w3.eth.personal.sign(msg, account)
        } else {
            return false
        }
    }

    var contract = async(ABI, ADDRESS) => {
        if (w3) {
            return new w3.eth.Contract(ABI, ADDRESS)
        } else {
            return false
        }
    }

    var disconnect = async() => {
        // Close provider session
        await provider.disconnect()
    }

    let isWhitelistedUser = await checkWhitelisted()

    if (contract) {
        document.querySelector("#connect_btn_top").innerHTML = "Connected"
        document.querySelector("#connect_btn_top").classList.add("connected")
        document.querySelector("#connect_btn_top")
        document.querySelector("#mint_amount").innerHTML = "1"
        document.querySelector("#mint_amount").style.fontSize = "2rem"
        document.querySelector("#connect_btn_bottom").style.display = "flex"

        if (isWhitelistedUser == true) {
            document.querySelector("#mint_top").onclick = () => {
                var mint_amnt = parseInt(document.querySelector("#mint_amount").innerHTML)
                console.log("Minting " + mint_amnt)
                contract.methods.mint(mint_amnt).send({ from: account, value: String(mint_amnt * 30000000000000000) })
            }
        } else {
            document.querySelector("#mint_top").onclick = () => {
                window.alert("This address is not Whitelisted")
            }

        }

    }
}
const checkWhitelisted = async() => {
    if (contract) {
        let whitelisted = await contract.methods.isWhitelisted(`${account}`).call()
        console.log("IS whitelisted " + whitelisted)
        return whitelisted
    }

}