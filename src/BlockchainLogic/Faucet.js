import Metaverse from "metaversejs";
import Blockchain from "mvs-blockchain";
let blockchain = Blockchain({ url: "https://explorer-testnet.mvs.org/api/" });

let faucetMnemonic =
  "butter vacuum breeze glow virtual mutual veteran argue want pipe elite blast judge write sand toilet file joy exotic reflect truck topic receive wait";
let newUserAddress;
let wallet;
let faucet;
let addresses;
let avatar;

export const generateReceiverWallet = async () => {
  let mnemonic = await Metaverse.wallet.generateMnemonic();
  wallet = await Metaverse.wallet.fromMnemonic(mnemonic, "testnet");
  addresses = await wallet.getAddresses();
  // let address = await wallet.getAddress();
  console.log(addresses[0], "address[0]");
  return [mnemonic, addresses[0]];
};

const generateFaucet = async () => {
  faucet = await Metaverse.wallet.fromMnemonic(faucetMnemonic, "testnet");

  //console.log("FAUCET ADDRESS : ", faucet.getAddresses());
};

async function getETPBalance() {
  //Get the lastest Blockchain Length
  let height = await blockchain.height();
  let address = addresses[0];
  // console.log(1, height)

  //Get a list of wallet transactions
  let txs = await blockchain.address.txs(address);
  // console.log(2, txs)

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, address);
  // console.log(3, utxo)

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addresses, height);
  // console.log(4, balances)

  let ETPBalance = balances.ETP.available;
  return ETPBalance;
}

async function sendETP(amount, recipient_address) {
  var target = {
    ETP: amount //100 million units = 1 ETP
  };

  //Define recipient
  console.log("faucet", await faucet);

  //Get latest blockchain length
  let height = await blockchain.height();
  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(await faucet.getAddresses());

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(
    txs.transactions,
    await faucet.getAddresses()
  );
  //Collect enough utxos to pay for the transfer
  let result = await Metaverse.output.findUtxo(utxos, target, height);
  // console.log(1, result);

  //Build the transaction object
  let tx = await Metaverse.transaction_builder.send(
    result.utxo,
    recipient_address,
    undefined,
    target,
    result.utxo[0].address,
    result.change
  );

  //Sign the transaction with your wallet
  tx = await faucet.sign(tx);

  //Encode the transaction into bytecode
  tx = await tx.encode();
  // console.log(11, tx);

  //Broadcast the transaction to the metaverse network.
  tx = await blockchain.transaction.broadcast(tx.toString("hex"));

  // console.log("tx hash: ", tx);

  //log amount ETP sent to WHO
}

async function registerAvatar(avatar_name, avatar_address) {
  let change_address = avatar_address;
  let height = await blockchain.height();
  let txs = await blockchain.addresses.txs(addresses);
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, addresses); //Get all utxo for the avatar address
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000); //Collect utxo to pay for the fee of 1 ETP
  let tx = await Metaverse.transaction_builder.issueDid(
    result.utxo,
    avatar_address,
    avatar_name,
    change_address,
    result.change,
    80000000,
    "testnet"
  );
  // console.log("avt1", tx);
  tx = await wallet.sign(tx);
  tx = await tx.encode();

  tx = await blockchain.transaction.broadcast(tx.toString("hex"));
  // console.log("avt2", tx);
}

async function withdraw() {
  let balance = await getETPBalance();
  if ((await balance) < 110000000) {
    await generateFaucet();
    await sendETP(100000000, addresses[0]);

    setTimeout(async () => {
      await registerAvatar("LASTOFUS", addresses[0]);
    }, 55000);
  }
}

export async function run() {
  const mnemonic = await generateReceiverWallet();
  await withdraw();
  return mnemonic;
}

export const getAvatar = async address => {
  const testVar = await blockchain.avatar.get(address);
  console.log(testVar, "<<<====testVar");
  return testVar;
};
