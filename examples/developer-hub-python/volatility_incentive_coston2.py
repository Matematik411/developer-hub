# THIS IS EXAMPLE CODE. DO NOT USE THIS CODE IN PRODUCTION.
import asyncio
import os

from web3 import AsyncHTTPProvider, AsyncWeb3

# FastUpdatesIncentiveManager address (Flare Testnet Coston2)
# See https://dev.flare.network/ftso/solidity-reference
INCENTIVE_ADDRESS = "0x003e9bD18f73e0B25BED0DC8382Bde6aa999525c"
RPC_URL = "https://coston2-api.flare.network/ext/C/rpc"
# ABI for FastUpdatesIncentiveManager contract
ABI = '[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governanceSettings","internalType":"contract IGovernanceSettings"},{"type":"address","name":"_initialGovernance","internalType":"address"},{"type":"address","name":"_addressUpdater","internalType":"address"},{"type":"uint256","name":"_ss","internalType":"SampleSize"},{"type":"uint256","name":"_r","internalType":"Range"},{"type":"uint256","name":"_sil","internalType":"SampleSize"},{"type":"uint256","name":"_ril","internalType":"Range"},{"type":"uint256","name":"_x","internalType":"Fee"},{"type":"uint256","name":"_rip","internalType":"Fee"},{"type":"uint256","name":"_dur","internalType":"uint256"}]},{"type":"event","name":"DailyAuthorizedInflationSet","inputs":[{"type":"uint256","name":"authorizedAmountWei","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"GovernanceCallTimelocked","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"allowedAfterTimestamp","internalType":"uint256","indexed":false},{"type":"bytes","name":"encodedCall","internalType":"bytes","indexed":false}],"anonymous":false},{"type":"event","name":"GovernanceInitialised","inputs":[{"type":"address","name":"initialGovernance","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernedProductionModeEntered","inputs":[{"type":"address","name":"governanceSettings","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"IncentiveOffered","inputs":[{"type":"uint24","name":"rewardEpochId","internalType":"uint24","indexed":true},{"type":"uint256","name":"rangeIncrease","internalType":"Range","indexed":false},{"type":"uint256","name":"sampleSizeIncrease","internalType":"SampleSize","indexed":false},{"type":"uint256","name":"offerAmount","internalType":"Fee","indexed":false}],"anonymous":false},{"type":"event","name":"InflationReceived","inputs":[{"type":"uint256","name":"amountReceivedWei","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"InflationRewardsOffered","inputs":[{"type":"uint24","name":"rewardEpochId","internalType":"uint24","indexed":true},{"type":"tuple[]","name":"feedConfigurations","internalType":"struct IFastUpdatesConfiguration.FeedConfiguration[]","indexed":false,"components":[{"type":"bytes21","name":"feedId","internalType":"bytes21"},{"type":"uint32","name":"rewardBandValue","internalType":"uint32"},{"type":"uint24","name":"inflationShare","internalType":"uint24"}]},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TimelockedGovernanceCallCanceled","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"TimelockedGovernanceCallExecuted","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"advance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"cancelGovernanceCall","inputs":[{"type":"bytes4","name":"_selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"dailyAuthorizedInflation","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"executeGovernanceCall","inputs":[{"type":"bytes4","name":"_selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"fastUpdater","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IFastUpdatesConfiguration"}],"name":"fastUpdatesConfiguration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIFlareSystemsManager"}],"name":"flareSystemsManager","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"_addressUpdater","internalType":"address"}],"name":"getAddressUpdater","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Scale"}],"name":"getBaseScale","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"getContractName","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Fee"}],"name":"getCurrentSampleSizeIncreasePrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getExpectedBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"SampleSize"}],"name":"getExpectedSampleSize","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getIncentiveDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getInflationAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Precision"}],"name":"getPrecision","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Range"}],"name":"getRange","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Scale"}],"name":"getScale","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_lockedFundsWei","internalType":"uint256"},{"type":"uint256","name":"_totalInflationAuthorizedWei","internalType":"uint256"},{"type":"uint256","name":"_totalClaimedWei","internalType":"uint256"}],"name":"getTokenPoolSupplyData","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IGovernanceSettings"}],"name":"governanceSettings","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialise","inputs":[{"type":"address","name":"_governanceSettings","internalType":"contract IGovernanceSettings"},{"type":"address","name":"_initialGovernance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isExecutor","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastInflationAuthorizationReceivedTs","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastInflationReceivedTs","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"offerIncentive","inputs":[{"type":"tuple","name":"_offer","internalType":"struct IFastUpdateIncentiveManager.IncentiveOffer","components":[{"type":"uint256","name":"rangeIncrease","internalType":"Range"},{"type":"uint256","name":"rangeLimit","internalType":"Range"}]}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"productionMode","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Range"}],"name":"rangeIncreaseLimit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"Fee"}],"name":"rangeIncreasePrice","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"receiveInflation","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIRewardManager"}],"name":"rewardManager","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"SampleSize"}],"name":"sampleIncreaseLimit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDailyAuthorizedInflation","inputs":[{"type":"uint256","name":"_toAuthorizeWei","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setIncentiveParameters","inputs":[{"type":"uint256","name":"_ss","internalType":"SampleSize"},{"type":"uint256","name":"_r","internalType":"Range"},{"type":"uint256","name":"_x","internalType":"Fee"},{"type":"uint256","name":"_dur","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRangeIncreaseLimit","inputs":[{"type":"uint256","name":"_lim","internalType":"Range"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRangeIncreasePrice","inputs":[{"type":"uint256","name":"_price","internalType":"Fee"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSampleIncreaseLimit","inputs":[{"type":"uint256","name":"_lim","internalType":"SampleSize"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"switchToProductionMode","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"allowedAfterTimestamp","internalType":"uint256"},{"type":"bytes","name":"encodedCall","internalType":"bytes"}],"name":"timelockedCalls","inputs":[{"type":"bytes4","name":"selector","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalInflationAuthorizedWei","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalInflationReceivedWei","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalInflationRewardsOfferedWei","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"triggerRewardEpochSwitchover","inputs":[{"type":"uint24","name":"_currentRewardEpochId","internalType":"uint24"},{"type":"uint64","name":"_currentRewardEpochExpectedEndTs","internalType":"uint64"},{"type":"uint64","name":"_rewardEpochDurationSeconds","internalType":"uint64"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateContractAddresses","inputs":[{"type":"bytes32[]","name":"_contractNameHashes","internalType":"bytes32[]"},{"type":"address[]","name":"_contractAddresses","internalType":"address[]"}]}]'  # noqa: E501


async def main() -> None:
    # Connect to an RPC node
    w3 = AsyncWeb3(
        AsyncHTTPProvider(RPC_URL),
    )
    private_key = os.getenv("ACCOUNT_PRIVATE_KEY")
    account = w3.eth.account.from_key(private_key)
    # Set up contract instance
    incentive = w3.eth.contract(
        address=w3.to_checksum_address(INCENTIVE_ADDRESS), abi=ABI
    )
    # Get the current sample size, sample size increase price, precision, and scale
    sample_size_increase_price = (
        await incentive.functions.getCurrentSampleSizeIncreasePrice().call()
    )
    print(
        f"Sample Size Increase Price: {sample_size_increase_price},"
        f"Sample Size: {await incentive.functions.getExpectedSampleSize().call()},"
        f"Range: {await incentive.functions.getRange().call()},"
        f"Scale: {await incentive.functions.getScale().call()},"
    )

    # Offer the incentive
    tx = await incentive.functions.offerIncentive(
        {"rangeIncrease": 0, "rangeLimit": 0}
    ).build_transaction(
        {
            "from": account.address,
            "nonce": await w3.eth.get_transaction_count(account.address),
            "gasPrice": await w3.eth.gas_price,
            "value": sample_size_increase_price,
        }
    )

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = await w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    print("Transaction hash:", tx_hash.hex())
    await w3.eth.wait_for_transaction_receipt(tx_hash)

    # Print the new sample size, precision, and scale
    print(
        f"Sample Size Increase Price: {sample_size_increase_price},"
        f"New Sample Size: {await incentive.functions.getExpectedSampleSize().call()},"
        f"New Range: {await incentive.functions.getRange().call()},"
        f"New Scale: {await incentive.functions.getScale().call()},"
    )


if __name__ == "__main__":
    asyncio.run(main())
