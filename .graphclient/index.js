import { gql } from '@graphql-mesh/utils';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';
import GraphqlHandler from "@graphql-mesh/graphql";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');
const importFn = (moduleId) => {
    const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
    switch (relativeModuleId) {
        case ".graphclient/sources/ref-nftmark-pet-proj/introspectionSchema.js":
            return import("./sources/ref-nftmark-pet-proj/introspectionSchema.js");
        default:
            return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
    }
};
const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: "js",
}), {
    readonly: true,
    validate: false
});
export const rawServeConfig = undefined;
export async function getMeshOptions() {
    const pubsub = new PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger("GraphClient");
    const cache = new MeshCache({
        ...{},
        importFn,
        store: rootStore.child('cache'),
        pubsub,
        logger,
    });
    const sources = [];
    const transforms = [];
    const additionalEnvelopPlugins = [];
    const refNftmarkPetProjTransforms = [];
    const additionalTypeDefs = [];
    const refNftmarkPetProjHandler = new GraphqlHandler({
        name: "ref-nftmark-pet-proj",
        config: { "endpoint": "http://localhost:8000/subgraphs/name/ref-nftmark-pet-proj" },
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child("ref-nftmark-pet-proj"),
        logger: logger.child("ref-nftmark-pet-proj"),
        importFn,
    });
    sources[0] = {
        name: 'ref-nftmark-pet-proj',
        handler: refNftmarkPetProjHandler,
        transforms: refNftmarkPetProjTransforms
    };
    const additionalResolvers = [];
    const merger = new BareMerger({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
    });
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        additionalEnvelopPlugins,
        get documents() {
            return [
                {
                    document: GetLatestOwnerNftDocument,
                    get rawSDL() {
                        return printWithCache(GetLatestOwnerNftDocument);
                    },
                    location: 'GetLatestOwnerNftDocument.graphql'
                }, {
                    document: GetOwnerNftsDocument,
                    get rawSDL() {
                        return printWithCache(GetOwnerNftsDocument);
                    },
                    location: 'GetOwnerNftsDocument.graphql'
                }, {
                    document: GetAllListingsDocument,
                    get rawSDL() {
                        return printWithCache(GetAllListingsDocument);
                    },
                    location: 'GetAllListingsDocument.graphql'
                }, {
                    document: GetNListingsDocument,
                    get rawSDL() {
                        return printWithCache(GetNListingsDocument);
                    },
                    location: 'GetNListingsDocument.graphql'
                }, {
                    document: GetOwnerListingsDocument,
                    get rawSDL() {
                        return printWithCache(GetOwnerListingsDocument);
                    },
                    location: 'GetOwnerListingsDocument.graphql'
                }
            ];
        },
        fetchFn,
    };
}
export function createBuiltMeshHTTPHandler() {
    return createMeshHTTPHandler({
        baseDir,
        getBuiltMesh: getBuiltGraphClient,
        rawServeConfig: undefined,
    });
}
let meshInstance$;
export function getBuiltGraphClient() {
    if (meshInstance$ == null) {
        meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
            const id = mesh.pubsub.subscribe('destroy', () => {
                meshInstance$ = undefined;
                mesh.pubsub.unsubscribe(id);
            });
            return mesh;
        });
    }
    return meshInstance$;
}
export const execute = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));
export const subscribe = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK(globalContext) {
    const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
    return getSdk((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export const GetLatestOwnerNftDocument = gql `
    query GetLatestOwnerNft($owner: Bytes = "") {
  nftMinteds(
    where: {owner: $owner}
    orderBy: tokenId
    orderDirection: desc
    first: 1
  ) {
    owner
    tokenId
  }
}
    `;
export const GetOwnerNftsDocument = gql `
    query GetOwnerNfts($owner: Bytes = "") {
  nftMinteds(where: {owner: $owner}, orderBy: tokenId, orderDirection: desc) {
    owner
    tokenId
  }
}
    `;
export const GetAllListingsDocument = gql `
    query GetAllListings {
  nftListeds {
    nftId
    owner
    price
  }
}
    `;
export const GetNListingsDocument = gql `
    query GetNListings($n: Int) {
  nftListeds(first: $n) {
    nftId
    owner
    price
  }
}
    `;
export const GetOwnerListingsDocument = gql `
    query GetOwnerListings($owner: Bytes = "") {
  nftListeds(where: {owner: $owner}, orderBy: nftId, orderDirection: desc) {
    nftId
    owner
    price
  }
}
    `;
export function getSdk(requester) {
    return {
        GetLatestOwnerNft(variables, options) {
            return requester(GetLatestOwnerNftDocument, variables, options);
        },
        GetOwnerNfts(variables, options) {
            return requester(GetOwnerNftsDocument, variables, options);
        },
        GetAllListings(variables, options) {
            return requester(GetAllListingsDocument, variables, options);
        },
        GetNListings(variables, options) {
            return requester(GetNListingsDocument, variables, options);
        },
        GetOwnerListings(variables, options) {
            return requester(GetOwnerListingsDocument, variables, options);
        }
    };
}
