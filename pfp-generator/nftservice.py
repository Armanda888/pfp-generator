import base64
from typing import Optional

from algosdk.transaction import SignedTransaction
from algosdk.v2client import algod


class NetworkInteraction:

    @staticmethod
    def wait_for_confirmation(client: algod.AlgodClient, txid):
        """
        Utility function to wait until the transaction is
        confirmed before proceeding.
        """
        last_round = client.status().get('last-round')
        txinfo = client.pending_transaction_info(txid)
        while not (txinfo.get('confirmed-round') and txinfo.get('confirmed-round') > 0):
            print("Waiting for confirmation")
            last_round += 1
            client.status_after_block(last_round)
            txinfo = client.pending_transaction_info(txid)
        print(f"Transaction {txid} confirmed in round {txinfo.get('confirmed-round')}.")
        return txinfo

    @staticmethod
    def get_default_suggested_params(client: algod.AlgodClient):
        """
        Gets default suggested params with flat transaction fee and fee amount of 1000.
        :param client:
        :return:
        """
        suggested_params = client.suggested_params()

        suggested_params.flat_fee = True
        suggested_params.fee = 1000

        return suggested_params

    @staticmethod
    def submit_asa_creation(client: algod.AlgodClient, transaction: SignedTransaction) -> (Optional[int], str):
        """
        Submits a ASA creation transaction to the network. If the transaction is successful the ASA's id is returned.
        :param client:
        :param transaction:
        :return:
        """
        txid = client.send_transaction(transaction)

        NetworkInteraction.wait_for_confirmation(client, txid)

        try:
            ptx = client.pending_transaction_info(txid)
            return ptx["asset-index"], txid
        except Exception as e:
            # TODO: Proper logging needed.
            print(e)
            print('Unsuccessful creation of Algorand Standard Asset.')

    @staticmethod
    def submit_transaction(client: algod.AlgodClient, transaction: SignedTransaction) -> Optional[str]:
        txid = client.send_transaction(transaction)

        NetworkInteraction.wait_for_confirmation(client, txid)

        return txid

    @staticmethod
    def compile_program(client: algod.AlgodClient, source_code):
        """
        :param client: algorand client
        :param source_code: teal source code
        :return:
            Decoded byte program
        """
        compile_response = client.compile(source_code)
        return base64.b64decode(compile_response['result'])
    

import base64
from algosdk.v2client import algod
from algosdk import transaction as algo_txn
from typing import List, Any, Optional, Union
from algosdk import account as algo_acc
from algosdk.transaction import Transaction, SignedTransaction


def get_default_suggested_params(client: algod.AlgodClient):
    """
    Gets default suggested params with flat transaction fee and fee amount of 1000.
    :param client:
    :return:
    """
    suggested_params = client.suggested_params()

    suggested_params.flat_fee = True
    suggested_params.fee = 1000

    return suggested_params


class ASATransactionRepository:
    """
    Initializes transactions related to Algorand Standard Assets
    """

    @classmethod
    def create_asa(cls,
                   client: algod.AlgodClient,
                   creator_private_key: str,
                   unit_name: str,
                   asset_name: str,
                   total: int,
                   decimals: int,
                   note: Optional[bytes] = None,
                   manager_address: Optional[str] = None,
                   reserve_address: Optional[str] = None,
                   freeze_address: Optional[str] = None,
                   clawback_address: Optional[str] = None,
                   url: Optional[str] = None,
                   default_frozen: bool = False,
                   sign_transaction: bool = True) -> Union[Transaction, SignedTransaction]:
        """

        :param client:
        :param creator_private_key:
        :param unit_name:
        :param asset_name:
        :param total:
        :param decimals:
        :param note:
        :param manager_address:
        :param reserve_address:
        :param freeze_address:
        :param clawback_address:
        :param url:
        :param default_frozen:
        :param sign_transaction:
        :return:
        """

        suggested_params = get_default_suggested_params(client=client)

        creator_address = algo_acc.address_from_private_key(private_key=creator_private_key)

        txn = algo_txn.AssetConfigTxn(sender=creator_address,
                                      sp=suggested_params,
                                      total=total,
                                      default_frozen=default_frozen,
                                      unit_name=unit_name,
                                      asset_name=asset_name,
                                      manager=manager_address,
                                      reserve=reserve_address,
                                      freeze=freeze_address,
                                      clawback=clawback_address,
                                      url=url,
                                      decimals=decimals,
                                      note=note)

        if sign_transaction:
            txn = txn.sign(private_key=creator_private_key)

        return txn

    @classmethod
    def create_non_fungible_asa(cls,
                                client: algod.AlgodClient,
                                creator_private_key: str,
                                unit_name: str,
                                asset_name: str,
                                note: Optional[bytes] = None,
                                manager_address: Optional[str] = None,
                                reserve_address: Optional[str] = None,
                                freeze_address: Optional[str] = None,
                                clawback_address: Optional[str] = None,
                                url: Optional[str] = None,
                                default_frozen: bool = False,
                                sign_transaction: bool = True) -> Union[Transaction, SignedTransaction]:
        """

        :param client:
        :param creator_private_key:
        :param unit_name:
        :param asset_name:
        :param note:
        :param manager_address:
        :param reserve_address:
        :param freeze_address:
        :param clawback_address:
        :param url:
        :param default_frozen:
        :param sign_transaction:
        :return:
        """

        return ASATransactionRepository.create_asa(client=client,
                                                   creator_private_key=creator_private_key,
                                                   unit_name=unit_name,
                                                   asset_name=asset_name,
                                                   total=1,
                                                   decimals=0,
                                                   note=note,
                                                   manager_address=manager_address,
                                                   reserve_address=reserve_address,
                                                   freeze_address=freeze_address,
                                                   clawback_address=clawback_address,
                                                   url=url,
                                                   default_frozen=default_frozen,
                                                   sign_transaction=sign_transaction)

    @classmethod
    def asa_opt_in(cls,
                   client: algod.AlgodClient,
                   sender_private_key: str,
                   asa_id: int,
                   sign_transaction: bool = True) -> Union[Transaction, SignedTransaction]:
        """
        Opts-in the sender's account to the specified asa with an id: asa_id.
        :param client:
        :param sender_private_key:
        :param asa_id:
        :param sign_transaction:
        :return:
        """

        suggested_params = get_default_suggested_params(client=client)
        sender_address = algo_acc.address_from_private_key(sender_private_key)

        txn = algo_txn.AssetTransferTxn(sender=sender_address,
                                        sp=suggested_params,
                                        receiver=sender_address,
                                        amt=0,
                                        index=asa_id)

        if sign_transaction:
            txn = txn.sign(private_key=sender_private_key)

        return txn

    @classmethod
    def asa_transfer(cls,
                     client: algod.AlgodClient,
                     sender_address: str,
                     receiver_address: str,
                     asa_id: int,
                     amount: int,
                     revocation_target: Optional[str],
                     sender_private_key: Optional[str],
                     sign_transaction: bool = True) -> Union[Transaction, SignedTransaction]:
        """
        :param client:
        :param sender_address:
        :param receiver_address:
        :param asa_id:
        :param amount:
        :param revocation_target:
        :param sender_private_key:
        :param sign_transaction:
        :return:
        """
        suggested_params = get_default_suggested_params(client=client)

        txn = algo_txn.AssetTransferTxn(sender=sender_address,
                                        sp=suggested_params,
                                        receiver=receiver_address,
                                        amt=amount,
                                        index=asa_id,
                                        revocation_target=revocation_target)

        if sign_transaction:
            txn = txn.sign(private_key=sender_private_key)

        return txn

    @classmethod
    def change_asa_management(cls,
                              client: algod.AlgodClient,
                              current_manager_pk: str,
                              asa_id: int,
                              manager_address: Optional[str] = None,
                              reserve_address: Optional[str] = None,
                              freeze_address: Optional[str] = None,
                              clawback_address: Optional[str] = None,
                              strict_empty_address_check: bool = True,
                              sign_transaction: bool = True) -> Union[Transaction, SignedTransaction]:
        """
        Changes the management properties of a given ASA.
        :param client:
        :param current_manager_pk:
        :param asa_id:
        :param manager_address:
        :param reserve_address:
        :param freeze_address:
        :param clawback_address:
        :param strict_empty_address_check:
        :param sign_transaction:
        :return:
        """

        params = get_default_suggested_params(client=client)

        current_manager_address = algo_acc.address_from_private_key(private_key=current_manager_pk)

        txn = algo_txn.AssetConfigTxn(
            sender=current_manager_address,
            sp=params,
            index=asa_id,
            manager=manager_address,
            reserve=reserve_address,
            freeze=freeze_address,
            clawback=clawback_address,
            strict_empty_address_check=strict_empty_address_check)

        if sign_transaction:
            txn = txn.sign(private_key=current_manager_pk)

        return txn


class NFTService:
    def __init__(
            self,
            nft_creator_address: str,
            nft_creator_pk: str,
            client,
            unit_name: str,
            asset_name: str,
            nft_url=None,
    ):
        self.nft_creator_address = nft_creator_address
        self.nft_creator_pk = nft_creator_pk
        self.client = client

        self.unit_name = unit_name
        self.asset_name = asset_name
        self.nft_url = nft_url

        self.nft_id = None

    def create_nft(self):
        signed_txn = ASATransactionRepository.create_non_fungible_asa(
            client=self.client,
            creator_private_key=self.nft_creator_pk,
            unit_name=self.unit_name,
            asset_name=self.asset_name,
            note=None,
            manager_address=self.nft_creator_address,
            reserve_address=self.nft_creator_address,
            freeze_address=self.nft_creator_address,
            clawback_address=self.nft_creator_address,
            url=self.nft_url,
            default_frozen=True,
            sign_transaction=True,
        )

        nft_id, tx_id = NetworkInteraction.submit_asa_creation(
            client=self.client, transaction=signed_txn
        )
        self.nft_id = nft_id
        return tx_id


from pyteal import *
from beaker import *

def demo():
    service = NFTService(
        nft_creator_address = sandbox.get_accounts().pop().address,
        nft_creator_pk = sandbox.get_accounts().pop().private_key,
        client = sandbox.get_algod_client(),
        unit_name = "USDT",
        asset_name = "test_asset",
        nft_url=None,
    )
    service.create_nft()


if __name__ == "__main__":
    demo()