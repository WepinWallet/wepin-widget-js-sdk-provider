# @wepin/provider
Wepin Provider Widget SDK for Web.

This package is only available in the web environment. It cannot be used in Android and iOS apps(Webview).

Wipin supports providers that return JSON-RPC request responses to connect with blockchain networks in webs. With Wipin Provider, you can easily connect to various networks supported by Wipin.

The providers supported by Wipin are as follows.
- EVM compatible Networks
- Klaytn Network (Comming soon)

## EVM compatible Networks
Ethers.js or Web3.js can be used with Wepin Provider to interoperate with EVM compatible blockchains.

### Support Networks
| Chain ID | Network Name | Network Variable |
|-|-|-|
| 1 | Ethereum Mainnet | ethereum |
| 5 | Ethereum Goerli Testnet | evmeth-goerli |
| 19 | Songbird Canary Network | evmsongbird |
| 137 | Polygon Mainnet | evmpolygon |
| 80001 | Polygon Mumbai | evmpolygon-testnet |

### Install 
First, import `@wepin/widget-sdk` and `@wepin/provider` into the project.
You must import `@wepin/widget-sdk` widget-sdk first.
```javascript
import '@wepin/widget-sdk'
import '@wepin/provider'
```

### Method
- **Get Accounts**
You can receive account information through the initialized web3.
```javascript
const accounts = await web3.eth.getAccounts()
```

- **Get Balance**
account 정보를 이용해 balance를 조회할 수 있습니다.
```javascript
const balance = await web3.eth.getBalance(accounts[0])
```
아래 링크를 참고하여 Balance 뿐만 아니라 fee 정보, block number 등을 조회할 수 있습니다.

Document: [web3.js 1.0.0 documentation](https://web3js-kr.readthedocs.io/ko/latest/getting-started.html)

- **Send Transaction**
Transaction can be sent.
```javascript
const accounts = await web3.eth.getAccounts()
const tx = {
    from: accounts[0],
    gasPrice: "2000000000",
    gas: "21000",
    to: '0x11f4d0A3c1......13F7E19D048276DAe',
    value: "10000000000000000",
}
const response = await web3.eth.sendTransaction(tx)
```

- **Contract Call**
A contract call can be performed.
```javascript
const callObject = {
	to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', //contract address
	data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
}
const response = await web3.eth.call(callObject)
```


For details of Ethereum compatible network providers, please refer to the link below.

[EIP-1193: Ethereum Provider Javascript API](https://eips.ethereum.org/EIPS/eip-1193)