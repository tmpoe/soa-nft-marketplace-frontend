import { gql } from "@apollo/client"

const GET_USER_TOKENS = gql`
    {
        nftMinteds(where: { owner: $owner }) {
            owner
            tokenId
        }
    }
`
export { GET_USER_TOKENS }
