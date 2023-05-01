-   decide is it token or is it nft?
    -   use only one for naming
-   refactor

    -   use contract adapters instead of direct contract manipulation in business logic
        -   use them everywhere, see the pain points
    -   refine contract adapters and contract util

        -   after seeing the weaknesses, correct them

    -   Add a list of the listed NFTs to the marketplace contract that you can use to query before turning to thegraph

-   NEXT

    -   fix OnChainData Type usage and content. Sometimes nftId sometimes tokenId can be found inside

-   BEFORE ANYTHING ELSE~~ THE NEXT TIME I GO ON WITH THIS PROJECT~~
    -   UPDATE: Not really what I need. I need more like to test interactions with the graph - I will refactor to move out thos components and test them accordingly
    -   TEST REACT COMPONENTS
        -   https://medium.com/swlh/a-beginners-guide-for-testing-react-function-component-part-i-5c2ceef3fbde
        -   https://dev.to/bonnie/testing-functions-within-functional-react-components-1mba
