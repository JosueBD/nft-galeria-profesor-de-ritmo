import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

require("@solana/wallet-adapter-react-ui/styles.css");

const connection = new Connection("https://api.mainnet-beta.solana.com");
const metaplex = new Metaplex(connection);

function NFTGaleriaContent() {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) return;
      try {
        const owner = new PublicKey(publicKey);
        const nfts = await metaplex.nfts().findAllByOwner({ owner });
        setNfts(nfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey]);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-end">
        <WalletMultiButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center col-span-full">Cargando NFTs...</p>
        ) : nfts.length > 0 ? (
          nfts.map((nft) => (
            <Card key={nft.mintAddress.toBase58()}>
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={nft.metadata.image}
                  alt={nft.name}
                  className="w-full h-64 object-contain rounded-xl mb-2"
                />
                <h2 className="text-lg font-semibold">{nft.name}</h2>
                <p className="text-sm text-muted-foreground text-center">
                  {nft.metadata.description}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full">No se encontraron NFTs.</p>
        )}
      </div>
    </div>
  );
}

export default function NFTGaleria() {
  const wallets = [new PhantomWalletAdapter()];
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <NFTGaleriaContent />
      </WalletModalProvider>
    </WalletProvider>
  );
}