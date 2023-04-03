import { Contract } from "ethers"
import { TOKEN_FACTORY_ABI, TOKEN_FACTORY_ADDRESS } from "../constants"
import { NFTStorage } from "nft.storage"

const API_KEY = process.env.API_KEY

export const createNFt = async (provider, name, symbol, image, description) => {
    try {
        console.log(image)
        const nft = {
            image,
            name: name,
            description: description,
        }
        const client = new NFTStorage({ token: API_KEY })
        const metadata = await client.store(nft)

        console.log("NFT data stored")
        console.log(`Metadata URI`, metadata.url)
        const signer = provider.getSigner()
        const TokenFactory = new Contract(
            TOKEN_FACTORY_ADDRESS,
            TOKEN_FACTORY_ABI,
            signer
        )
        console.log(TokenFactory)
        const tx = await TokenFactory.createNewToken(name, symbol, "Sdgsg")
        console.log(name, symbol, signer)
        // const tx = await TokenFactory.createNewToken(name, symbol, "sdfa")
        // console.log(tx)

        await tx.wait()
    } catch (e) {
        console.error(e)
    }
}
