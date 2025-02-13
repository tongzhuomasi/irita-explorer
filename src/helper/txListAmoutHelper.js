import {TX_TYPE,decimals} from "../constant";
import { converCoin } from "../helper/IritaHelper";
import Tools from '@/util/Tools';
export async function getAmountByTx (message, events, isShowDenom) {
	let amountDecimals = decimals.amount
	if (message ) {
		let msg = message.msg;
		// let amount = {
		// 	amount:'',
		// 	denom: ''
		// }
		let amount = '--'
		let txType = message.type || '--';
		switch (txType) {
			case TX_TYPE.define_service:
				break;
			case TX_TYPE.bind_service:
				break;
			case TX_TYPE.call_service:
				break;
			case TX_TYPE.respond_service:
				break;
			case TX_TYPE.update_service_binding:
				break;
			case TX_TYPE.disable_service_binding:
				break;
			case TX_TYPE.enable_service_binding:
				break;
			case TX_TYPE.refund_service_deposit:
				break;
			case TX_TYPE.pause_request_context:
				break;
			case TX_TYPE.start_request_context:
				break;
			case TX_TYPE.kill_request_context:
				break;
			case TX_TYPE.update_request_context:
				break;
			case TX_TYPE.create_record:
				break;
			case TX_TYPE.service_set_withdraw_address:
				break;
			case TX_TYPE.withdraw_earned_fees:
				break;
			case TX_TYPE.burn_nft:
				break;
			case TX_TYPE.transfer_nft:
				break;
			case TX_TYPE.edit_nft:
				break;
			case TX_TYPE.issue_denom:
				break;
			case TX_TYPE.mint_nft:
				break;
			case TX_TYPE.issue_token:
				break;
			case TX_TYPE.edit_token:
				break;
			case TX_TYPE.mint_token:
				amount = msg.amount || '--';
				break;
			case TX_TYPE.transfer_token_owner:
				break;
			case TX_TYPE.burn_token:
				amount = msg.amount || '--';
				break;
			case TX_TYPE.send:
				if (msg && msg.amount && msg.amount.length === 1) {
					const sendAmount = msg && msg.amount.length > 0 ? await converCoin(msg.amount[0]) : null
					// formatPriceToFixed 四舍五入 toDecimal 截取
					amount = sendAmount && sendAmount.amount && sendAmount.denom ?  isShowDenom ? `${Tools.toDecimal(sendAmount.amount,amountDecimals) } ${sendAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(sendAmount.amount,amountDecimals) }` : '--';
				}
				break;
			case TX_TYPE.multisend:
				break;
			case TX_TYPE.verify_invariant:
				break;
			case TX_TYPE.submit_evidence:
				break;
			case TX_TYPE.begin_unbonding:
				let beginUnbondingAmount = msg &&  msg.amount ? await converCoin(msg.amount) : null
				amount = beginUnbondingAmount && beginUnbondingAmount.amount && beginUnbondingAmount.denom ? isShowDenom ? `${Tools.toDecimal(beginUnbondingAmount.amount,amountDecimals)} ${beginUnbondingAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(beginUnbondingAmount.amount,amountDecimals)}` : '--';
				break;
			case TX_TYPE.edit_validator:
				break;
			case TX_TYPE.create_validator:
				break;
			case TX_TYPE.delegate:
				let delegateAmount = msg &&  msg.amount ? await converCoin(msg.amount) : null
				amount = delegateAmount && delegateAmount.amount  && delegateAmount.denom ? isShowDenom ? `${Tools.toDecimal(delegateAmount.amount,amountDecimals)} ${delegateAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(delegateAmount.amount,amountDecimals)}` : '--'
				break;
			case TX_TYPE.begin_redelegate:
				const beginRedelegateAmount = msg && msg.amount ?  await converCoin(msg.amount) :null
				amount = beginRedelegateAmount && beginRedelegateAmount.amount && beginRedelegateAmount.denom ? isShowDenom ? `${Tools.toDecimal(beginRedelegateAmount.amount,amountDecimals)} ${beginRedelegateAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(beginRedelegateAmount.amount,amountDecimals)}` : '--';
				break;
			case TX_TYPE.unjail:
				break;
			case TX_TYPE.set_withdraw_address:
				break;
			case TX_TYPE.withdraw_delegator_reward:
				let rewardAmount = msg &&  msg.amount ? await converCoin(msg.amount) : null
				amount = rewardAmount && rewardAmount.amount  && rewardAmount.denom ? isShowDenom ? `${Tools.toDecimal(rewardAmount.amount,amountDecimals)} ${rewardAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(rewardAmount.amount,amountDecimals)}` : '--'
				break;
			case TX_TYPE.withdraw_validator_commission:
				break;
			case TX_TYPE.fund_community_pool:
				let poolAmount = msg && msg.amount && msg.amount.length > 0 ? await converCoin(msg.amount[0]) : null
				amount = poolAmount && poolAmount.amount  && poolAmount.denom?  isShowDenom ? `${Tools.toDecimal(poolAmount.amount,amountDecimals)} ${poolAmount.denom.toLocaleUpperCase()}` : `${Tools.toDecimal(poolAmount.amount,amountDecimals)}` : '--'
				break;
			case TX_TYPE.deposit:
				break;
			case TX_TYPE.vote:
				break;
			case TX_TYPE.submit_proposal:
				let content = msg.content && msg.content.amount && msg.content.amount[0]
				if(content) {
					content = await converCoin(content)
					if(content.amount !== '0') {
						amount = isShowDenom ? `${Tools.toDecimal(content.amount,amountDecimals)} ${content.denom.toUpperCase()}` : `${Tools.toDecimal(content.amount,amountDecimals)}`
					} else {
						amount = '--'
					}
				}
				if (amount === '--') {
					let initialDeposit = msg.initial_deposit && msg.initial_deposit[0];
					if (initialDeposit) {
						initialDeposit = await converCoin(initialDeposit)
						amount = isShowDenom ? `${Tools.toDecimal(initialDeposit.amount,amountDecimals)} ${initialDeposit.denom.toUpperCase()}` : `${Tools.toDecimal(initialDeposit.amount,amountDecimals)}`
					}
				}
				break;
			case TX_TYPE.add_liquidity:
				// events display eg: 18dog,1000000ubif
				// (events || []).forEach(event => {
				// 	if(event.type === 'transfer') {
				// 		(event.attributes || []).forEach(attribute => {
				// 			if(attribute.key === 'amount') {
				// 				if(attribute.value && attribute.value.includes(",")) {
				// 					amount = attribute.value
				// 				}
				// 			}
				// 		})
				// 	}
				// })
				break;
			case TX_TYPE.remove_liquidity:
				// events display eg: 4dog,252824ubif
				// (events || []).forEach(event => {
				// 	if(event.type === 'transfer') {
				// 		(event.attributes || []).forEach(attribute => {
				// 			if(attribute.key === 'amount') {
				// 				if(attribute.value && attribute.value.includes(",")) {
				// 					amount = attribute.value
				// 				}
				// 			}
				// 		})
				// 	}
				// })
				break;
			case TX_TYPE.swap_order:
				break;
			case TX_TYPE.create_htlc:
				if(msg.amount && msg.amount[0]) {
					let amountMaxUnit = await converCoin(msg.amount[0]);
					amount = isShowDenom ? `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)} ${amountMaxUnit.denom.toUpperCase()}` : `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)}`;
				}
				break;
			case TX_TYPE.claim_htlc:
				if(msg.amount) {
					let amountMaxUnit = await converCoin(msg.amount);
					amount = isShowDenom ? `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)} ${amountMaxUnit.denom.toUpperCase()}` : `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)}`;
				}
				break;
			case TX_TYPE.refund_htlc:
				break;
			case TX_TYPE.add_profiler:
				break;
			case TX_TYPE.delete_profiler:
				break;
			case TX_TYPE.add_trustee:
				break;
			case TX_TYPE.delete_trustee:
				break;
			case TX_TYPE.create_feed:
				break;
			case TX_TYPE.start_feed:
				break;
			case TX_TYPE.pause_feed:
				break;
			case TX_TYPE.edit_feed:
				break;
			// 联盟链和公有链 ibc交易类型名称一致
			case TX_TYPE.recv_packet:
                if(msg.packet && msg.packet.data) {
                    let amountMaxUnit = await converCoin({
                        amount:msg.packet.data.amount,
                        denom:msg.packet.data.denom,
                    });
                    amount = isShowDenom ? `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)} ${amountMaxUnit.denom.toUpperCase()}` : `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)}`;
                }
				break;
			// 联盟链和公有链 ibc交易类型名称一致
			case TX_TYPE.create_client:
				break;
			// 联盟链和公有链 ibc交易类型名称一致
			case TX_TYPE.update_client:
				break;
			case TX_TYPE.create_identity:
				break;
			case TX_TYPE.update_identity:
				break;
			case TX_TYPE.transfer:
                if(msg.token) {
                    let amountMaxUnit = await converCoin(msg.token);
                    amount = isShowDenom ? `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)} ${amountMaxUnit.denom.toUpperCase()}` : `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)}`;
                }
				break;
			case TX_TYPE.timeout_packet:
                if(msg.packet && msg.packet.data) {
                    let amountMaxUnit = await converCoin({
                        amount:msg.packet.data.amount,
                        denom:msg.packet.data.denom,
                    });
                    amount = isShowDenom ? `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)} ${amountMaxUnit.denom.toUpperCase()}` : `${Tools.toDecimal(amountMaxUnit.amount,amountDecimals)}`;
                }
                break;
			case TX_TYPE.upgrade_client:
				break;
			case TX_TYPE.submit_misbehaviour:
				break;
			case TX_TYPE.connection_open_init:
				break;
			case TX_TYPE.connection_open_try:
				break;
			case TX_TYPE.connection_open_ack:
				break;
			case TX_TYPE.connection_open_confirm:
				break;
			case TX_TYPE.channel_open_init:
				break;
			case TX_TYPE.channel_open_try:
				break;
			case TX_TYPE.channel_open_ack:
				break;
			case TX_TYPE.channel_open_confirm:
				break;
			case TX_TYPE.channel_close_init:
				break;
			case TX_TYPE.channel_close_confirm:
				break;
			case TX_TYPE.timeout_on_close_packet:
				break;
			case TX_TYPE.acknowledge_packet:
				break;
			case TX_TYPE.request_rand:
				break;
		}
		return amount
	}
}
