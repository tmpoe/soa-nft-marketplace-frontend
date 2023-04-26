import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { MeshHTTPHandler } from '@graphql-mesh/http';
import { ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import type { RefNftmarkPetProjTypes } from './sources/ref-nftmark-pet-proj/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
};
export type BlockChangedFilter = {
    number_gte: Scalars['Int'];
};
export type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
export type NftCatAttributesCreated = {
    id: Scalars['Bytes'];
    requestId: Scalars['BigInt'];
    requester: Scalars['Bytes'];
    breed: Scalars['Int'];
    eyecolor: Scalars['Int'];
    playfulness: Scalars['BigInt'];
    cuteness: Scalars['BigInt'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftCatAttributesCreated_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    requestId?: InputMaybe<Scalars['BigInt']>;
    requestId_not?: InputMaybe<Scalars['BigInt']>;
    requestId_gt?: InputMaybe<Scalars['BigInt']>;
    requestId_lt?: InputMaybe<Scalars['BigInt']>;
    requestId_gte?: InputMaybe<Scalars['BigInt']>;
    requestId_lte?: InputMaybe<Scalars['BigInt']>;
    requestId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    requestId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    requester?: InputMaybe<Scalars['Bytes']>;
    requester_not?: InputMaybe<Scalars['Bytes']>;
    requester_gt?: InputMaybe<Scalars['Bytes']>;
    requester_lt?: InputMaybe<Scalars['Bytes']>;
    requester_gte?: InputMaybe<Scalars['Bytes']>;
    requester_lte?: InputMaybe<Scalars['Bytes']>;
    requester_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_contains?: InputMaybe<Scalars['Bytes']>;
    requester_not_contains?: InputMaybe<Scalars['Bytes']>;
    breed?: InputMaybe<Scalars['Int']>;
    breed_not?: InputMaybe<Scalars['Int']>;
    breed_gt?: InputMaybe<Scalars['Int']>;
    breed_lt?: InputMaybe<Scalars['Int']>;
    breed_gte?: InputMaybe<Scalars['Int']>;
    breed_lte?: InputMaybe<Scalars['Int']>;
    breed_in?: InputMaybe<Array<Scalars['Int']>>;
    breed_not_in?: InputMaybe<Array<Scalars['Int']>>;
    eyecolor?: InputMaybe<Scalars['Int']>;
    eyecolor_not?: InputMaybe<Scalars['Int']>;
    eyecolor_gt?: InputMaybe<Scalars['Int']>;
    eyecolor_lt?: InputMaybe<Scalars['Int']>;
    eyecolor_gte?: InputMaybe<Scalars['Int']>;
    eyecolor_lte?: InputMaybe<Scalars['Int']>;
    eyecolor_in?: InputMaybe<Array<Scalars['Int']>>;
    eyecolor_not_in?: InputMaybe<Array<Scalars['Int']>>;
    playfulness?: InputMaybe<Scalars['BigInt']>;
    playfulness_not?: InputMaybe<Scalars['BigInt']>;
    playfulness_gt?: InputMaybe<Scalars['BigInt']>;
    playfulness_lt?: InputMaybe<Scalars['BigInt']>;
    playfulness_gte?: InputMaybe<Scalars['BigInt']>;
    playfulness_lte?: InputMaybe<Scalars['BigInt']>;
    playfulness_in?: InputMaybe<Array<Scalars['BigInt']>>;
    playfulness_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cuteness?: InputMaybe<Scalars['BigInt']>;
    cuteness_not?: InputMaybe<Scalars['BigInt']>;
    cuteness_gt?: InputMaybe<Scalars['BigInt']>;
    cuteness_lt?: InputMaybe<Scalars['BigInt']>;
    cuteness_gte?: InputMaybe<Scalars['BigInt']>;
    cuteness_lte?: InputMaybe<Scalars['BigInt']>;
    cuteness_in?: InputMaybe<Array<Scalars['BigInt']>>;
    cuteness_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftCatAttributesCreated_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftCatAttributesCreated_filter>>>;
};
export type NftCatAttributesCreated_orderBy = 'id' | 'requestId' | 'requester' | 'breed' | 'eyecolor' | 'playfulness' | 'cuteness' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftCatAttributesRequested = {
    id: Scalars['Bytes'];
    requestId: Scalars['BigInt'];
    requester: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftCatAttributesRequested_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    requestId?: InputMaybe<Scalars['BigInt']>;
    requestId_not?: InputMaybe<Scalars['BigInt']>;
    requestId_gt?: InputMaybe<Scalars['BigInt']>;
    requestId_lt?: InputMaybe<Scalars['BigInt']>;
    requestId_gte?: InputMaybe<Scalars['BigInt']>;
    requestId_lte?: InputMaybe<Scalars['BigInt']>;
    requestId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    requestId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    requester?: InputMaybe<Scalars['Bytes']>;
    requester_not?: InputMaybe<Scalars['Bytes']>;
    requester_gt?: InputMaybe<Scalars['Bytes']>;
    requester_lt?: InputMaybe<Scalars['Bytes']>;
    requester_gte?: InputMaybe<Scalars['Bytes']>;
    requester_lte?: InputMaybe<Scalars['Bytes']>;
    requester_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_contains?: InputMaybe<Scalars['Bytes']>;
    requester_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftCatAttributesRequested_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftCatAttributesRequested_filter>>>;
};
export type NftCatAttributesRequested_orderBy = 'id' | 'requestId' | 'requester' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftListed = {
    id: Scalars['Bytes'];
    nftId: Scalars['BigInt'];
    owner: Scalars['Bytes'];
    price: Scalars['BigInt'];
    ierc721TokenAddress: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftListed_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    nftId?: InputMaybe<Scalars['BigInt']>;
    nftId_not?: InputMaybe<Scalars['BigInt']>;
    nftId_gt?: InputMaybe<Scalars['BigInt']>;
    nftId_lt?: InputMaybe<Scalars['BigInt']>;
    nftId_gte?: InputMaybe<Scalars['BigInt']>;
    nftId_lte?: InputMaybe<Scalars['BigInt']>;
    nftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    nftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_gt?: InputMaybe<Scalars['Bytes']>;
    owner_lt?: InputMaybe<Scalars['Bytes']>;
    owner_gte?: InputMaybe<Scalars['Bytes']>;
    owner_lte?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    price?: InputMaybe<Scalars['BigInt']>;
    price_not?: InputMaybe<Scalars['BigInt']>;
    price_gt?: InputMaybe<Scalars['BigInt']>;
    price_lt?: InputMaybe<Scalars['BigInt']>;
    price_gte?: InputMaybe<Scalars['BigInt']>;
    price_lte?: InputMaybe<Scalars['BigInt']>;
    price_in?: InputMaybe<Array<Scalars['BigInt']>>;
    price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ierc721TokenAddress?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftListed_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftListed_filter>>>;
};
export type NftListed_orderBy = 'id' | 'nftId' | 'owner' | 'price' | 'ierc721TokenAddress' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftListingCancelled = {
    id: Scalars['Bytes'];
    nftId: Scalars['BigInt'];
    owner: Scalars['Bytes'];
    ierc721TokenAddress: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftListingCancelled_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    nftId?: InputMaybe<Scalars['BigInt']>;
    nftId_not?: InputMaybe<Scalars['BigInt']>;
    nftId_gt?: InputMaybe<Scalars['BigInt']>;
    nftId_lt?: InputMaybe<Scalars['BigInt']>;
    nftId_gte?: InputMaybe<Scalars['BigInt']>;
    nftId_lte?: InputMaybe<Scalars['BigInt']>;
    nftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    nftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_gt?: InputMaybe<Scalars['Bytes']>;
    owner_lt?: InputMaybe<Scalars['Bytes']>;
    owner_gte?: InputMaybe<Scalars['Bytes']>;
    owner_lte?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftListingCancelled_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftListingCancelled_filter>>>;
};
export type NftListingCancelled_orderBy = 'id' | 'nftId' | 'owner' | 'ierc721TokenAddress' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftListingUpdated = {
    id: Scalars['Bytes'];
    nftId: Scalars['BigInt'];
    owner: Scalars['Bytes'];
    price: Scalars['BigInt'];
    ierc721TokenAddress: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftListingUpdated_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    nftId?: InputMaybe<Scalars['BigInt']>;
    nftId_not?: InputMaybe<Scalars['BigInt']>;
    nftId_gt?: InputMaybe<Scalars['BigInt']>;
    nftId_lt?: InputMaybe<Scalars['BigInt']>;
    nftId_gte?: InputMaybe<Scalars['BigInt']>;
    nftId_lte?: InputMaybe<Scalars['BigInt']>;
    nftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    nftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_gt?: InputMaybe<Scalars['Bytes']>;
    owner_lt?: InputMaybe<Scalars['Bytes']>;
    owner_gte?: InputMaybe<Scalars['Bytes']>;
    owner_lte?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    price?: InputMaybe<Scalars['BigInt']>;
    price_not?: InputMaybe<Scalars['BigInt']>;
    price_gt?: InputMaybe<Scalars['BigInt']>;
    price_lt?: InputMaybe<Scalars['BigInt']>;
    price_gte?: InputMaybe<Scalars['BigInt']>;
    price_lte?: InputMaybe<Scalars['BigInt']>;
    price_in?: InputMaybe<Array<Scalars['BigInt']>>;
    price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ierc721TokenAddress?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftListingUpdated_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftListingUpdated_filter>>>;
};
export type NftListingUpdated_orderBy = 'id' | 'nftId' | 'owner' | 'price' | 'ierc721TokenAddress' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftMarketplaceOwnershipTransferred = {
    id: Scalars['Bytes'];
    previousOwner: Scalars['Bytes'];
    newOwner: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftMarketplaceOwnershipTransferred_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    previousOwner?: InputMaybe<Scalars['Bytes']>;
    previousOwner_not?: InputMaybe<Scalars['Bytes']>;
    previousOwner_gt?: InputMaybe<Scalars['Bytes']>;
    previousOwner_lt?: InputMaybe<Scalars['Bytes']>;
    previousOwner_gte?: InputMaybe<Scalars['Bytes']>;
    previousOwner_lte?: InputMaybe<Scalars['Bytes']>;
    previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
    previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
    newOwner?: InputMaybe<Scalars['Bytes']>;
    newOwner_not?: InputMaybe<Scalars['Bytes']>;
    newOwner_gt?: InputMaybe<Scalars['Bytes']>;
    newOwner_lt?: InputMaybe<Scalars['Bytes']>;
    newOwner_gte?: InputMaybe<Scalars['Bytes']>;
    newOwner_lte?: InputMaybe<Scalars['Bytes']>;
    newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    newOwner_contains?: InputMaybe<Scalars['Bytes']>;
    newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftMarketplaceOwnershipTransferred_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftMarketplaceOwnershipTransferred_filter>>>;
};
export type NftMarketplaceOwnershipTransferred_orderBy = 'id' | 'previousOwner' | 'newOwner' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftMinted = {
    id: Scalars['Bytes'];
    owner: Scalars['Bytes'];
    tokenId: Scalars['BigInt'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftMinted_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_gt?: InputMaybe<Scalars['Bytes']>;
    owner_lt?: InputMaybe<Scalars['Bytes']>;
    owner_gte?: InputMaybe<Scalars['Bytes']>;
    owner_lte?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    tokenId?: InputMaybe<Scalars['BigInt']>;
    tokenId_not?: InputMaybe<Scalars['BigInt']>;
    tokenId_gt?: InputMaybe<Scalars['BigInt']>;
    tokenId_lt?: InputMaybe<Scalars['BigInt']>;
    tokenId_gte?: InputMaybe<Scalars['BigInt']>;
    tokenId_lte?: InputMaybe<Scalars['BigInt']>;
    tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftMinted_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftMinted_filter>>>;
};
export type NftMinted_orderBy = 'id' | 'owner' | 'tokenId' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftRequested = {
    id: Scalars['Bytes'];
    requester: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftRequested_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    requester?: InputMaybe<Scalars['Bytes']>;
    requester_not?: InputMaybe<Scalars['Bytes']>;
    requester_gt?: InputMaybe<Scalars['Bytes']>;
    requester_lt?: InputMaybe<Scalars['Bytes']>;
    requester_gte?: InputMaybe<Scalars['Bytes']>;
    requester_lte?: InputMaybe<Scalars['Bytes']>;
    requester_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    requester_contains?: InputMaybe<Scalars['Bytes']>;
    requester_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftRequested_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftRequested_filter>>>;
};
export type NftRequested_orderBy = 'id' | 'requester' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type NftSold = {
    id: Scalars['Bytes'];
    owner: Scalars['Bytes'];
    nftId: Scalars['BigInt'];
    ierc721TokenAddress: Scalars['Bytes'];
    price: Scalars['BigInt'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type NftSold_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_gt?: InputMaybe<Scalars['Bytes']>;
    owner_lt?: InputMaybe<Scalars['Bytes']>;
    owner_gte?: InputMaybe<Scalars['Bytes']>;
    owner_lte?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    nftId?: InputMaybe<Scalars['BigInt']>;
    nftId_not?: InputMaybe<Scalars['BigInt']>;
    nftId_gt?: InputMaybe<Scalars['BigInt']>;
    nftId_lt?: InputMaybe<Scalars['BigInt']>;
    nftId_gte?: InputMaybe<Scalars['BigInt']>;
    nftId_lte?: InputMaybe<Scalars['BigInt']>;
    nftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    nftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ierc721TokenAddress?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lt?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_gte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_lte?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    ierc721TokenAddress_contains?: InputMaybe<Scalars['Bytes']>;
    ierc721TokenAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    price?: InputMaybe<Scalars['BigInt']>;
    price_not?: InputMaybe<Scalars['BigInt']>;
    price_gt?: InputMaybe<Scalars['BigInt']>;
    price_lt?: InputMaybe<Scalars['BigInt']>;
    price_gte?: InputMaybe<Scalars['BigInt']>;
    price_lte?: InputMaybe<Scalars['BigInt']>;
    price_in?: InputMaybe<Array<Scalars['BigInt']>>;
    price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<NftSold_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NftSold_filter>>>;
};
export type NftSold_orderBy = 'id' | 'owner' | 'nftId' | 'ierc721TokenAddress' | 'price' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';
export type OwnershipTransferred = {
    id: Scalars['Bytes'];
    previousOwner: Scalars['Bytes'];
    newOwner: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
};
export type OwnershipTransferred_filter = {
    id?: InputMaybe<Scalars['Bytes']>;
    id_not?: InputMaybe<Scalars['Bytes']>;
    id_gt?: InputMaybe<Scalars['Bytes']>;
    id_lt?: InputMaybe<Scalars['Bytes']>;
    id_gte?: InputMaybe<Scalars['Bytes']>;
    id_lte?: InputMaybe<Scalars['Bytes']>;
    id_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id_contains?: InputMaybe<Scalars['Bytes']>;
    id_not_contains?: InputMaybe<Scalars['Bytes']>;
    previousOwner?: InputMaybe<Scalars['Bytes']>;
    previousOwner_not?: InputMaybe<Scalars['Bytes']>;
    previousOwner_gt?: InputMaybe<Scalars['Bytes']>;
    previousOwner_lt?: InputMaybe<Scalars['Bytes']>;
    previousOwner_gte?: InputMaybe<Scalars['Bytes']>;
    previousOwner_lte?: InputMaybe<Scalars['Bytes']>;
    previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
    previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
    newOwner?: InputMaybe<Scalars['Bytes']>;
    newOwner_not?: InputMaybe<Scalars['Bytes']>;
    newOwner_gt?: InputMaybe<Scalars['Bytes']>;
    newOwner_lt?: InputMaybe<Scalars['Bytes']>;
    newOwner_gte?: InputMaybe<Scalars['Bytes']>;
    newOwner_lte?: InputMaybe<Scalars['Bytes']>;
    newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    newOwner_contains?: InputMaybe<Scalars['Bytes']>;
    newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
    blockNumber?: InputMaybe<Scalars['BigInt']>;
    blockNumber_not?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
    blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
    blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
    blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    transactionHash?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
    transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
    transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
    transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
    or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
};
export type OwnershipTransferred_orderBy = 'id' | 'previousOwner' | 'newOwner' | 'blockNumber' | 'blockTimestamp' | 'transactionHash';
export type Query = {
    nftCatAttributesCreated?: Maybe<NftCatAttributesCreated>;
    nftCatAttributesCreateds: Array<NftCatAttributesCreated>;
    nftCatAttributesRequested?: Maybe<NftCatAttributesRequested>;
    nftCatAttributesRequesteds: Array<NftCatAttributesRequested>;
    ownershipTransferred?: Maybe<OwnershipTransferred>;
    ownershipTransferreds: Array<OwnershipTransferred>;
    nftListed?: Maybe<NftListed>;
    nftListeds: Array<NftListed>;
    nftListingCancelled?: Maybe<NftListingCancelled>;
    nftListingCancelleds: Array<NftListingCancelled>;
    nftListingUpdated?: Maybe<NftListingUpdated>;
    nftListingUpdateds: Array<NftListingUpdated>;
    nftMinted?: Maybe<NftMinted>;
    nftMinteds: Array<NftMinted>;
    nftRequested?: Maybe<NftRequested>;
    nftRequesteds: Array<NftRequested>;
    nftSold?: Maybe<NftSold>;
    nftSolds: Array<NftSold>;
    nftMarketplaceOwnershipTransferred?: Maybe<NftMarketplaceOwnershipTransferred>;
    nftMarketplaceOwnershipTransferreds: Array<NftMarketplaceOwnershipTransferred>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export type QuerynftCatAttributesCreatedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftCatAttributesCreatedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftCatAttributesCreated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftCatAttributesCreated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftCatAttributesRequestedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftCatAttributesRequestedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftCatAttributesRequested_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftCatAttributesRequested_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QueryownershipTransferredArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QueryownershipTransferredsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OwnershipTransferred_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListed_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListed_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListingCancelledArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListingCancelledsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListingCancelled_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListingCancelled_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListingUpdatedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftListingUpdatedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListingUpdated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListingUpdated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftMintedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftMintedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftMinted_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftMinted_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftRequestedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftRequestedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftRequested_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftRequested_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftSoldArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftSoldsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftSold_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftSold_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftMarketplaceOwnershipTransferredArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type QuerynftMarketplaceOwnershipTransferredsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftMarketplaceOwnershipTransferred_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftMarketplaceOwnershipTransferred_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export type Subscription = {
    nftCatAttributesCreated?: Maybe<NftCatAttributesCreated>;
    nftCatAttributesCreateds: Array<NftCatAttributesCreated>;
    nftCatAttributesRequested?: Maybe<NftCatAttributesRequested>;
    nftCatAttributesRequesteds: Array<NftCatAttributesRequested>;
    ownershipTransferred?: Maybe<OwnershipTransferred>;
    ownershipTransferreds: Array<OwnershipTransferred>;
    nftListed?: Maybe<NftListed>;
    nftListeds: Array<NftListed>;
    nftListingCancelled?: Maybe<NftListingCancelled>;
    nftListingCancelleds: Array<NftListingCancelled>;
    nftListingUpdated?: Maybe<NftListingUpdated>;
    nftListingUpdateds: Array<NftListingUpdated>;
    nftMinted?: Maybe<NftMinted>;
    nftMinteds: Array<NftMinted>;
    nftRequested?: Maybe<NftRequested>;
    nftRequesteds: Array<NftRequested>;
    nftSold?: Maybe<NftSold>;
    nftSolds: Array<NftSold>;
    nftMarketplaceOwnershipTransferred?: Maybe<NftMarketplaceOwnershipTransferred>;
    nftMarketplaceOwnershipTransferreds: Array<NftMarketplaceOwnershipTransferred>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export type SubscriptionnftCatAttributesCreatedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftCatAttributesCreatedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftCatAttributesCreated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftCatAttributesCreated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftCatAttributesRequestedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftCatAttributesRequestedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftCatAttributesRequested_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftCatAttributesRequested_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionownershipTransferredArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionownershipTransferredsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<OwnershipTransferred_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListed_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListed_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListingCancelledArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListingCancelledsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListingCancelled_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListingCancelled_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListingUpdatedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftListingUpdatedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftListingUpdated_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftListingUpdated_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftMintedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftMintedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftMinted_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftMinted_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftRequestedArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftRequestedsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftRequested_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftRequested_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftSoldArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftSoldsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftSold_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftSold_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftMarketplaceOwnershipTransferredArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type SubscriptionnftMarketplaceOwnershipTransferredsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NftMarketplaceOwnershipTransferred_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NftMarketplaceOwnershipTransferred_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
    /** Integer representation of the timestamp stored in blocks for the chain */
    timestamp?: Maybe<Scalars['Int']>;
};
/** The type for the top-level _meta field */
export type _Meta_ = {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
export type _SubgraphErrorPolicy_ = 
/** Data will be returned even if the subgraph has indexing errors */
'allow'
/** If the subgraph has indexing errors, data will be omitted. The default. */
 | 'deny';
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
    BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    NftCatAttributesCreated: ResolverTypeWrapper<NftCatAttributesCreated>;
    NftCatAttributesCreated_filter: NftCatAttributesCreated_filter;
    NftCatAttributesCreated_orderBy: NftCatAttributesCreated_orderBy;
    NftCatAttributesRequested: ResolverTypeWrapper<NftCatAttributesRequested>;
    NftCatAttributesRequested_filter: NftCatAttributesRequested_filter;
    NftCatAttributesRequested_orderBy: NftCatAttributesRequested_orderBy;
    NftListed: ResolverTypeWrapper<NftListed>;
    NftListed_filter: NftListed_filter;
    NftListed_orderBy: NftListed_orderBy;
    NftListingCancelled: ResolverTypeWrapper<NftListingCancelled>;
    NftListingCancelled_filter: NftListingCancelled_filter;
    NftListingCancelled_orderBy: NftListingCancelled_orderBy;
    NftListingUpdated: ResolverTypeWrapper<NftListingUpdated>;
    NftListingUpdated_filter: NftListingUpdated_filter;
    NftListingUpdated_orderBy: NftListingUpdated_orderBy;
    NftMarketplaceOwnershipTransferred: ResolverTypeWrapper<NftMarketplaceOwnershipTransferred>;
    NftMarketplaceOwnershipTransferred_filter: NftMarketplaceOwnershipTransferred_filter;
    NftMarketplaceOwnershipTransferred_orderBy: NftMarketplaceOwnershipTransferred_orderBy;
    NftMinted: ResolverTypeWrapper<NftMinted>;
    NftMinted_filter: NftMinted_filter;
    NftMinted_orderBy: NftMinted_orderBy;
    NftRequested: ResolverTypeWrapper<NftRequested>;
    NftRequested_filter: NftRequested_filter;
    NftRequested_orderBy: NftRequested_orderBy;
    NftSold: ResolverTypeWrapper<NftSold>;
    NftSold_filter: NftSold_filter;
    NftSold_orderBy: NftSold_orderBy;
    OrderDirection: OrderDirection;
    OwnershipTransferred: ResolverTypeWrapper<OwnershipTransferred>;
    OwnershipTransferred_filter: OwnershipTransferred_filter;
    OwnershipTransferred_orderBy: OwnershipTransferred_orderBy;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Subscription: ResolverTypeWrapper<{}>;
    _Block_: ResolverTypeWrapper<_Block_>;
    _Meta_: ResolverTypeWrapper<_Meta_>;
    _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    BigDecimal: Scalars['BigDecimal'];
    BigInt: Scalars['BigInt'];
    BlockChangedFilter: BlockChangedFilter;
    Block_height: Block_height;
    Boolean: Scalars['Boolean'];
    Bytes: Scalars['Bytes'];
    Float: Scalars['Float'];
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    NftCatAttributesCreated: NftCatAttributesCreated;
    NftCatAttributesCreated_filter: NftCatAttributesCreated_filter;
    NftCatAttributesRequested: NftCatAttributesRequested;
    NftCatAttributesRequested_filter: NftCatAttributesRequested_filter;
    NftListed: NftListed;
    NftListed_filter: NftListed_filter;
    NftListingCancelled: NftListingCancelled;
    NftListingCancelled_filter: NftListingCancelled_filter;
    NftListingUpdated: NftListingUpdated;
    NftListingUpdated_filter: NftListingUpdated_filter;
    NftMarketplaceOwnershipTransferred: NftMarketplaceOwnershipTransferred;
    NftMarketplaceOwnershipTransferred_filter: NftMarketplaceOwnershipTransferred_filter;
    NftMinted: NftMinted;
    NftMinted_filter: NftMinted_filter;
    NftRequested: NftRequested;
    NftRequested_filter: NftRequested_filter;
    NftSold: NftSold;
    NftSold_filter: NftSold_filter;
    OwnershipTransferred: OwnershipTransferred;
    OwnershipTransferred_filter: OwnershipTransferred_filter;
    Query: {};
    String: Scalars['String'];
    Subscription: {};
    _Block_: _Block_;
    _Meta_: _Meta_;
}>;
export type entityDirectiveArgs = {};
export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type subgraphIdDirectiveArgs = {
    id: Scalars['String'];
};
export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export type derivedFromDirectiveArgs = {
    field: Scalars['String'];
};
export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;
export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
    name: 'BigDecimal';
}
export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
    name: 'BigInt';
}
export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
    name: 'Bytes';
}
export type NftCatAttributesCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftCatAttributesCreated'] = ResolversParentTypes['NftCatAttributesCreated']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    requester?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    breed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    eyecolor?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    playfulness?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    cuteness?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftCatAttributesRequestedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftCatAttributesRequested'] = ResolversParentTypes['NftCatAttributesRequested']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    requestId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    requester?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftListedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftListed'] = ResolversParentTypes['NftListed']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    nftId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    ierc721TokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftListingCancelledResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftListingCancelled'] = ResolversParentTypes['NftListingCancelled']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    nftId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    ierc721TokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftListingUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftListingUpdated'] = ResolversParentTypes['NftListingUpdated']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    nftId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    ierc721TokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftMarketplaceOwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftMarketplaceOwnershipTransferred'] = ResolversParentTypes['NftMarketplaceOwnershipTransferred']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftMintedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftMinted'] = ResolversParentTypes['NftMinted']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftRequestedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftRequested'] = ResolversParentTypes['NftRequested']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    requester?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type NftSoldResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftSold'] = ResolversParentTypes['NftSold']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    nftId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    ierc721TokenAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type OwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OwnershipTransferred'] = ResolversParentTypes['OwnershipTransferred']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    nftCatAttributesCreated?: Resolver<Maybe<ResolversTypes['NftCatAttributesCreated']>, ParentType, ContextType, RequireFields<QuerynftCatAttributesCreatedArgs, 'id' | 'subgraphError'>>;
    nftCatAttributesCreateds?: Resolver<Array<ResolversTypes['NftCatAttributesCreated']>, ParentType, ContextType, RequireFields<QuerynftCatAttributesCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftCatAttributesRequested?: Resolver<Maybe<ResolversTypes['NftCatAttributesRequested']>, ParentType, ContextType, RequireFields<QuerynftCatAttributesRequestedArgs, 'id' | 'subgraphError'>>;
    nftCatAttributesRequesteds?: Resolver<Array<ResolversTypes['NftCatAttributesRequested']>, ParentType, ContextType, RequireFields<QuerynftCatAttributesRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    ownershipTransferred?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredArgs, 'id' | 'subgraphError'>>;
    ownershipTransferreds?: Resolver<Array<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListed?: Resolver<Maybe<ResolversTypes['NftListed']>, ParentType, ContextType, RequireFields<QuerynftListedArgs, 'id' | 'subgraphError'>>;
    nftListeds?: Resolver<Array<ResolversTypes['NftListed']>, ParentType, ContextType, RequireFields<QuerynftListedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListingCancelled?: Resolver<Maybe<ResolversTypes['NftListingCancelled']>, ParentType, ContextType, RequireFields<QuerynftListingCancelledArgs, 'id' | 'subgraphError'>>;
    nftListingCancelleds?: Resolver<Array<ResolversTypes['NftListingCancelled']>, ParentType, ContextType, RequireFields<QuerynftListingCancelledsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListingUpdated?: Resolver<Maybe<ResolversTypes['NftListingUpdated']>, ParentType, ContextType, RequireFields<QuerynftListingUpdatedArgs, 'id' | 'subgraphError'>>;
    nftListingUpdateds?: Resolver<Array<ResolversTypes['NftListingUpdated']>, ParentType, ContextType, RequireFields<QuerynftListingUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftMinted?: Resolver<Maybe<ResolversTypes['NftMinted']>, ParentType, ContextType, RequireFields<QuerynftMintedArgs, 'id' | 'subgraphError'>>;
    nftMinteds?: Resolver<Array<ResolversTypes['NftMinted']>, ParentType, ContextType, RequireFields<QuerynftMintedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftRequested?: Resolver<Maybe<ResolversTypes['NftRequested']>, ParentType, ContextType, RequireFields<QuerynftRequestedArgs, 'id' | 'subgraphError'>>;
    nftRequesteds?: Resolver<Array<ResolversTypes['NftRequested']>, ParentType, ContextType, RequireFields<QuerynftRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftSold?: Resolver<Maybe<ResolversTypes['NftSold']>, ParentType, ContextType, RequireFields<QuerynftSoldArgs, 'id' | 'subgraphError'>>;
    nftSolds?: Resolver<Array<ResolversTypes['NftSold']>, ParentType, ContextType, RequireFields<QuerynftSoldsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftMarketplaceOwnershipTransferred?: Resolver<Maybe<ResolversTypes['NftMarketplaceOwnershipTransferred']>, ParentType, ContextType, RequireFields<QuerynftMarketplaceOwnershipTransferredArgs, 'id' | 'subgraphError'>>;
    nftMarketplaceOwnershipTransferreds?: Resolver<Array<ResolversTypes['NftMarketplaceOwnershipTransferred']>, ParentType, ContextType, RequireFields<QuerynftMarketplaceOwnershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;
export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    nftCatAttributesCreated?: SubscriptionResolver<Maybe<ResolversTypes['NftCatAttributesCreated']>, "nftCatAttributesCreated", ParentType, ContextType, RequireFields<SubscriptionnftCatAttributesCreatedArgs, 'id' | 'subgraphError'>>;
    nftCatAttributesCreateds?: SubscriptionResolver<Array<ResolversTypes['NftCatAttributesCreated']>, "nftCatAttributesCreateds", ParentType, ContextType, RequireFields<SubscriptionnftCatAttributesCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftCatAttributesRequested?: SubscriptionResolver<Maybe<ResolversTypes['NftCatAttributesRequested']>, "nftCatAttributesRequested", ParentType, ContextType, RequireFields<SubscriptionnftCatAttributesRequestedArgs, 'id' | 'subgraphError'>>;
    nftCatAttributesRequesteds?: SubscriptionResolver<Array<ResolversTypes['NftCatAttributesRequested']>, "nftCatAttributesRequesteds", ParentType, ContextType, RequireFields<SubscriptionnftCatAttributesRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    ownershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['OwnershipTransferred']>, "ownershipTransferred", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredArgs, 'id' | 'subgraphError'>>;
    ownershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['OwnershipTransferred']>, "ownershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListed?: SubscriptionResolver<Maybe<ResolversTypes['NftListed']>, "nftListed", ParentType, ContextType, RequireFields<SubscriptionnftListedArgs, 'id' | 'subgraphError'>>;
    nftListeds?: SubscriptionResolver<Array<ResolversTypes['NftListed']>, "nftListeds", ParentType, ContextType, RequireFields<SubscriptionnftListedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListingCancelled?: SubscriptionResolver<Maybe<ResolversTypes['NftListingCancelled']>, "nftListingCancelled", ParentType, ContextType, RequireFields<SubscriptionnftListingCancelledArgs, 'id' | 'subgraphError'>>;
    nftListingCancelleds?: SubscriptionResolver<Array<ResolversTypes['NftListingCancelled']>, "nftListingCancelleds", ParentType, ContextType, RequireFields<SubscriptionnftListingCancelledsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftListingUpdated?: SubscriptionResolver<Maybe<ResolversTypes['NftListingUpdated']>, "nftListingUpdated", ParentType, ContextType, RequireFields<SubscriptionnftListingUpdatedArgs, 'id' | 'subgraphError'>>;
    nftListingUpdateds?: SubscriptionResolver<Array<ResolversTypes['NftListingUpdated']>, "nftListingUpdateds", ParentType, ContextType, RequireFields<SubscriptionnftListingUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftMinted?: SubscriptionResolver<Maybe<ResolversTypes['NftMinted']>, "nftMinted", ParentType, ContextType, RequireFields<SubscriptionnftMintedArgs, 'id' | 'subgraphError'>>;
    nftMinteds?: SubscriptionResolver<Array<ResolversTypes['NftMinted']>, "nftMinteds", ParentType, ContextType, RequireFields<SubscriptionnftMintedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftRequested?: SubscriptionResolver<Maybe<ResolversTypes['NftRequested']>, "nftRequested", ParentType, ContextType, RequireFields<SubscriptionnftRequestedArgs, 'id' | 'subgraphError'>>;
    nftRequesteds?: SubscriptionResolver<Array<ResolversTypes['NftRequested']>, "nftRequesteds", ParentType, ContextType, RequireFields<SubscriptionnftRequestedsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftSold?: SubscriptionResolver<Maybe<ResolversTypes['NftSold']>, "nftSold", ParentType, ContextType, RequireFields<SubscriptionnftSoldArgs, 'id' | 'subgraphError'>>;
    nftSolds?: SubscriptionResolver<Array<ResolversTypes['NftSold']>, "nftSolds", ParentType, ContextType, RequireFields<SubscriptionnftSoldsArgs, 'skip' | 'first' | 'subgraphError'>>;
    nftMarketplaceOwnershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['NftMarketplaceOwnershipTransferred']>, "nftMarketplaceOwnershipTransferred", ParentType, ContextType, RequireFields<SubscriptionnftMarketplaceOwnershipTransferredArgs, 'id' | 'subgraphError'>>;
    nftMarketplaceOwnershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['NftMarketplaceOwnershipTransferred']>, "nftMarketplaceOwnershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionnftMarketplaceOwnershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;
export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
    hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
    block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
    deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export type Resolvers<ContextType = MeshContext> = ResolversObject<{
    BigDecimal?: GraphQLScalarType;
    BigInt?: GraphQLScalarType;
    Bytes?: GraphQLScalarType;
    NftCatAttributesCreated?: NftCatAttributesCreatedResolvers<ContextType>;
    NftCatAttributesRequested?: NftCatAttributesRequestedResolvers<ContextType>;
    NftListed?: NftListedResolvers<ContextType>;
    NftListingCancelled?: NftListingCancelledResolvers<ContextType>;
    NftListingUpdated?: NftListingUpdatedResolvers<ContextType>;
    NftMarketplaceOwnershipTransferred?: NftMarketplaceOwnershipTransferredResolvers<ContextType>;
    NftMinted?: NftMintedResolvers<ContextType>;
    NftRequested?: NftRequestedResolvers<ContextType>;
    NftSold?: NftSoldResolvers<ContextType>;
    OwnershipTransferred?: OwnershipTransferredResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    _Block_?: _Block_Resolvers<ContextType>;
    _Meta_?: _Meta_Resolvers<ContextType>;
}>;
export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
    entity?: entityDirectiveResolver<any, any, ContextType>;
    subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
    derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;
export type MeshContext = RefNftmarkPetProjTypes.Context & BaseMeshContext;
export declare const rawServeConfig: YamlConfig.Config['serve'];
export declare function getMeshOptions(): Promise<GetMeshOptions>;
export declare function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext>;
export declare function getBuiltGraphClient(): Promise<MeshInstance>;
export declare const execute: ExecuteMeshFn;
export declare const subscribe: SubscribeMeshFn;
export declare function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext): {
    GetLatestOwnerNft(variables?: Exact<{
        owner?: any;
    }>, options?: TOperationContext): Promise<GetLatestOwnerNftQuery>;
    GetOwnerNfts(variables?: Exact<{
        owner?: any;
    }>, options?: TOperationContext): Promise<GetOwnerNftsQuery>;
    GetAllListings(variables?: Exact<{
        [key: string]: never;
    }>, options?: TOperationContext): Promise<GetAllListingsQuery>;
    GetNListings(variables?: Exact<{
        n?: number;
    }>, options?: TOperationContext): Promise<GetNListingsQuery>;
    GetOwnerListings(variables?: Exact<{
        owner?: any;
    }>, options?: TOperationContext): Promise<GetOwnerListingsQuery>;
};
export type GetLatestOwnerNftQueryVariables = Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>;
export type GetLatestOwnerNftQuery = {
    nftMinteds: Array<Pick<NftMinted, 'owner' | 'tokenId'>>;
};
export type GetOwnerNftsQueryVariables = Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>;
export type GetOwnerNftsQuery = {
    nftMinteds: Array<Pick<NftMinted, 'owner' | 'tokenId'>>;
};
export type GetAllListingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetAllListingsQuery = {
    nftListeds: Array<Pick<NftListed, 'nftId' | 'owner' | 'price'>>;
};
export type GetNListingsQueryVariables = Exact<{
    n?: InputMaybe<Scalars['Int']>;
}>;
export type GetNListingsQuery = {
    nftListeds: Array<Pick<NftListed, 'nftId' | 'owner' | 'price'>>;
};
export type GetOwnerListingsQueryVariables = Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>;
export type GetOwnerListingsQuery = {
    nftListeds: Array<Pick<NftListed, 'nftId' | 'owner' | 'price'>>;
};
export declare const GetLatestOwnerNftDocument: DocumentNode<GetLatestOwnerNftQuery, Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>>;
export declare const GetOwnerNftsDocument: DocumentNode<GetOwnerNftsQuery, Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>>;
export declare const GetAllListingsDocument: DocumentNode<GetAllListingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare const GetNListingsDocument: DocumentNode<GetNListingsQuery, Exact<{
    n?: InputMaybe<Scalars['Int']>;
}>>;
export declare const GetOwnerListingsDocument: DocumentNode<GetOwnerListingsQuery, Exact<{
    owner?: InputMaybe<Scalars['Bytes']>;
}>>;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>;
export declare function getSdk<C, E>(requester: Requester<C, E>): {
    GetLatestOwnerNft(variables?: GetLatestOwnerNftQueryVariables, options?: C): Promise<GetLatestOwnerNftQuery>;
    GetOwnerNfts(variables?: GetOwnerNftsQueryVariables, options?: C): Promise<GetOwnerNftsQuery>;
    GetAllListings(variables?: GetAllListingsQueryVariables, options?: C): Promise<GetAllListingsQuery>;
    GetNListings(variables?: GetNListingsQueryVariables, options?: C): Promise<GetNListingsQuery>;
    GetOwnerListings(variables?: GetOwnerListingsQueryVariables, options?: C): Promise<GetOwnerListingsQuery>;
};
export type Sdk = ReturnType<typeof getSdk>;
