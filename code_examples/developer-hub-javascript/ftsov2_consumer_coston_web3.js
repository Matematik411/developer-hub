// THIS IS EXAMPLE CODE. DO NOT USE THIS CODE IN PRODUCTION.
import { Web3 } from "web3";

// FastUpdater address (Songbird Testnet Coston)
const FTSO_ADDRESS = "0x9B931f5d3e24fc8C9064DB35bDc8FB4bE0E862f9";
const RPC_URL = "https://rpc.ankr.com/flare_coston";
// Feed indexes: 0 = FLR/USD, 2 = BTC/USD, 9 = ETH/USD
const FEED_INDEXES = [0, 2, 9];
// ABI for FastUpdater contract
const ABI =
  '[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governanceSettings","internalType":"contract IGovernanceSettings"},{"type":"address","name":"_initialGovernance","internalType":"address"},{"type":"address","name":"_addressUpdater","internalType":"address"},{"type":"address","name":"_flareDaemon","internalType":"address"},{"type":"uint32","name":"_firstVotingRoundStartTs","internalType":"uint32"},{"type":"uint8","name":"_votingEpochDurationSeconds","internalType":"uint8"},{"type":"uint8","name":"_submissionWindow","internalType":"uint8"}]},{"type":"error","name":"ECDSAInvalidSignature","inputs":[]},{"type":"error","name":"ECDSAInvalidSignatureLength","inputs":[{"type":"uint256","name":"length","internalType":"uint256"}]},{"type":"error","name":"ECDSAInvalidSignatureS","inputs":[{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"event","name":"FastUpdateFeedRemoved","inputs":[{"type":"uint256","name":"index","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"FastUpdateFeedReset","inputs":[{"type":"uint256","name":"votingRoundId","internalType":"uint256","indexed":true},{"type":"uint256","name":"index","internalType":"uint256","indexed":true},{"type":"bytes21","name":"id","internalType":"bytes21","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false},{"type":"int8","name":"decimals","internalType":"int8","indexed":false}],"anonymous":false},{"type":"event","name":"FastUpdateFeeds","inputs":[{"type":"uint256","name":"votingEpochId","internalType":"uint256","indexed":true},{"type":"uint256[]","name":"feeds","internalType":"uint256[]","indexed":false},{"type":"int8[]","name":"decimals","internalType":"int8[]","indexed":false}],"anonymous":false},{"type":"event","name":"FastUpdateFeedsSubmitted","inputs":[{"type":"uint32","name":"votingRoundId","internalType":"uint32","indexed":true},{"type":"address","name":"signingPolicyAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"GovernanceCallTimelocked","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"allowedAfterTimestamp","internalType":"uint256","indexed":false},{"type":"bytes","name":"encodedCall","internalType":"bytes","indexed":false}],"anonymous":false},{"type":"event","name":"GovernanceInitialised","inputs":[{"type":"address","name":"initialGovernance","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernedProductionModeEntered","inputs":[{"type":"address","name":"governanceSettings","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"TimelockedGovernanceCallCanceled","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TimelockedGovernanceCallExecuted","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_BLOCKS_HISTORY","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MAX_FEED_AGE_IN_VOTING_EPOCHS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_cutoff","internalType":"uint256"}],"name":"blockScoreCutoff","inputs":[{"type":"uint256","name":"_blockNum","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"cancelGovernanceCall","inputs":[{"type":"bytes4","name":"_selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint24","name":"","internalType":"uint24"}],"name":"currentRewardEpochId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_cutoff","internalType":"uint256"}],"name":"currentScoreCutoff","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_weight","internalType":"uint256"}],"name":"currentSortitionWeight","inputs":[{"type":"address","name":"_signingPolicyAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"daemonize","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"executeGovernanceCall","inputs":[{"type":"bytes4","name":"_selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIFastUpdateIncentiveManager"}],"name":"fastUpdateIncentiveManager","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IFastUpdatesConfiguration"}],"name":"fastUpdatesConfiguration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes21[]","name":"_feedIds","internalType":"bytes21[]"},{"type":"uint256[]","name":"_feeds","internalType":"uint256[]"},{"type":"int8[]","name":"_decimals","internalType":"int8[]"},{"type":"uint64","name":"_timestamp","internalType":"uint64"}],"name":"fetchAllCurrentFeeds","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"_feeds","internalType":"uint256[]"},{"type":"int8[]","name":"_decimals","internalType":"int8[]"},{"type":"uint64","name":"_timestamp","internalType":"uint64"}],"name":"fetchCurrentFeeds","inputs":[{"type":"uint256[]","name":"_indices","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"firstVotingRoundStartTs","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"flareDaemon","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IFlareSystemsManager"}],"name":"flareSystemsManager","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IFtsoFeedPublisher"}],"name":"ftsoFeedPublisher","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"_addressUpdater","internalType":"address"}],"name":"getAddressUpdater","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"getContractName","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IGovernanceSettings"}],"name":"governanceSettings","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialise","inputs":[{"type":"address","name":"_governanceSettings","internalType":"contract IGovernanceSettings"},{"type":"address","name":"_initialGovernance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isExecutor","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"_noOfUpdates","internalType":"uint256[]"}],"name":"numberOfUpdates","inputs":[{"type":"uint256","name":"_historySize","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"numberOfUpdatesInBlock","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"productionMode","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeFeeds","inputs":[{"type":"uint256[]","name":"_indices","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"resetFeeds","inputs":[{"type":"uint256[]","name":"_indices","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSubmissionWindow","inputs":[{"type":"uint8","name":"_submissionWindow","internalType":"uint8"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"submissionWindow","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"submitUpdates","inputs":[{"type":"tuple","name":"_updates","internalType":"struct IFastUpdater.FastUpdates","components":[{"type":"uint256","name":"sortitionBlock","internalType":"uint256"},{"type":"tuple","name":"sortitionCredential","internalType":"struct SortitionCredential","components":[{"type":"uint256","name":"replicate","internalType":"uint256"},{"type":"tuple","name":"gamma","internalType":"struct Bn256.G1Point","components":[{"type":"uint256","name":"x","internalType":"uint256"},{"type":"uint256","name":"y","internalType":"uint256"}]},{"type":"uint256","name":"c","internalType":"uint256"},{"type":"uint256","name":"s","internalType":"uint256"}]},{"type":"bytes","name":"deltas","internalType":"bytes"},{"type":"tuple","name":"signature","internalType":"struct IFastUpdater.Signature","components":[{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]}]}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"switchToFallbackMode","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"switchToProductionMode","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"allowedAfterTimestamp","internalType":"uint256"},{"type":"bytes","name":"encodedCall","internalType":"bytes"}],"name":"timelockedCalls","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateContractAddresses","inputs":[{"type":"bytes32[]","name":"_contractNameHashes","internalType":"bytes32[]"},{"type":"address[]","name":"_contractAddresses","internalType":"address[]"}]},{"type":"function","stateMutability":"view","outputs":[],"name":"verifyPublicKey","inputs":[{"type":"address","name":"_voter","internalType":"address"},{"type":"bytes32","name":"_part1","internalType":"bytes32"},{"type":"bytes32","name":"_part2","internalType":"bytes32"},{"type":"bytes","name":"_verificationData","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIVoterRegistry"}],"name":"voterRegistry","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint64","name":"","internalType":"uint64"}],"name":"votingEpochDurationSeconds","inputs":[]}]';

async function main() {
  // Connect to an RPC node
  const w3 = new Web3(RPC_URL);
  // Set up contract instance
  const ftsov2 = new w3.eth.Contract(JSON.parse(ABI), FTSO_ADDRESS);
  // Fetch current feeds
  const res = await ftsov2.methods.fetchCurrentFeeds(FEED_INDEXES).call();
  // Log results
  console.log("Feeds:", res["_feeds"]);
  console.log("Decimals:", res["_decimals"]);
  console.log("Timestamp:", res["_timestamp"]);
}

main();
