import {
    Query,
    QueryBalanceRequest,
    QueryBalanceResponse,
    QueryOwnerRequest,
    QueryOwnerResponse,
    QuerySupplyRequest,
    QuerySupplyResponse,
    QueryNFTsRequest,
    QueryNFTsResponse,
    QueryNFTRequest,
    QueryNFTResponse,
    QueryClassRequest,
    QueryClassResponse,
    QueryClassesRequest,
    QueryClassesResponse,
    
} from "../grpc_gateway/cosmos/nft/v1beta1/query.pb"

export class NftQuerier {
    constructor(private url: string) {}
 
    balance(
        req: QueryBalanceRequest,
        headers?: HeadersInit,
      ): Promise<QueryBalanceResponse> {
        return Query.Balance(req, {
          headers,
          pathPrefix: this.url,
        });
      }
  
      owner(
        req: QueryOwnerRequest,
        headers?: HeadersInit,
      ): Promise<QueryOwnerResponse> {
        return Query.Owner(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      supply(
        req: QuerySupplyRequest,
        headers?: HeadersInit,
      ): Promise<QuerySupplyResponse> {
        return Query.Supply(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      nFTs(
        req: QueryNFTsRequest,
        headers?: HeadersInit,
      ): Promise<QueryNFTsResponse> {
        return Query.NFTs(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      nFT(
        req: QueryNFTRequest,
        headers?: HeadersInit,
      ): Promise<QueryNFTResponse> {
        return Query.NFT(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      class(
        req: QueryClassRequest,
        headers?: HeadersInit,
      ): Promise<QueryClassResponse> {
        return Query.Class(req, {
          headers,
          pathPrefix: this.url,
        });
      }

      classes(
        req: QueryClassesRequest,
        headers?: HeadersInit,
      ): Promise<QueryClassesResponse> {
        return Query.Classes(req, {
          headers,
          pathPrefix: this.url,
        });
      }
}

