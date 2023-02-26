from pyteal import *
from beaker import *

import algosdk.transaction as txns


class Avatar(Application):
    owner = ApplicationStateValue(stack_type=TealType.bytes)
    name = ApplicationStateValue(stack_type=TealType.bytes)
    url = ApplicationStateValue(stack_type=TealType.bytes)
    created_time = ApplicationStateValue(stack_type=TealType.uint64)
    asset_id = ApplicationStateValue(stack_type=TealType.uint64)

    @create
    def create(self, name: abi.String, url: abi.String, created_time: abi.Uint64):
        return Seq(
            self.initialize_application_state(),
            self.owner.set(Txn.sender()),
            # self.owner.set(Bytes("TD7Y3JQX6DCHDRHZP2X6P4H6WFKY5EUPEBT7BMILFGS4DMRPUM6TM4MJSM")),
            self.name.set(name.get()),
            self.url.set(url.get()),
            self.created_time.set(created_time.get()),
            self.mint(),
            # self.set_owner(self.asset_id)
        )

    @internal(TealType.none)
    def mint(self):
       return Seq(
            InnerTxnBuilder.Execute(
                {
                    TxnField.type_enum: TxnType.AssetConfig,
                    TxnField.config_asset_name: self.name,
                    TxnField.config_asset_url: self.url,
                    TxnField.config_asset_total: Int(0)
                }
            ),
            self.asset_id.set(InnerTxn.created_asset_id())
        )
    
    @internal(TealType.none)
    def set_owner(self, asset_id: abi.Uint64):
        return InnerTxnBuilder.Execute(
            {
                TxnField.type_enum: TxnType.AssetTransfer,
                TxnField.xfer_asset: asset_id.get(),
                TxnField.asset_amount: Int(0),
                TxnField.asset_receiver: self.owner,
                TxnField.fee: Int(0),
            }
        )

    
def demo():
    app = Avatar()

    app_client = client.ApplicationClient(
        client=sandbox.get_algod_client(),
        app=app,
        signer=sandbox.get_accounts().pop().signer,
    )

    app_client.create(name="abc", url="cde", created_time=1234)

if __name__ == "__main__":
    demo()
