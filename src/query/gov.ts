import {
  Query,
  QueryDepositRequest,
  QueryDepositResponse,
  QueryDepositsRequest,
  QueryDepositsResponse,
  QueryParamsRequest,
  QueryParamsResponse,
  QueryProposalRequest,
  QueryProposalResponse,
  QueryProposalsRequest,
  QueryProposalsResponse,
  QueryTallyResultRequest,
  QueryTallyResultResponse,
  QueryVoteRequest,
  QueryVoteResponse,
  QueryVotesRequest,
  QueryVotesResponse,
} from "../grpc_gateway/cosmos/gov/v1beta1/query.pb";

export class GovQuerier {
  constructor(private url: string) {}

  proposal(
    req: QueryProposalRequest,
    headers?: HeadersInit,
  ): Promise<QueryProposalResponse> {
    return Query.Proposal(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  proposals(
    req: QueryProposalsRequest,
    headers?: HeadersInit,
  ): Promise<QueryProposalsResponse> {
    return Query.Proposals(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  vote(
    req: QueryVoteRequest,
    headers?: HeadersInit,
  ): Promise<QueryVoteResponse> {
    return Query.Vote(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  votes(
    req: QueryVotesRequest,
    headers?: HeadersInit,
  ): Promise<QueryVotesResponse> {
    return Query.Votes(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  params(
    req: QueryParamsRequest,
    headers?: HeadersInit,
  ): Promise<QueryParamsResponse> {
    return Query.Params(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  deposit(
    req: QueryDepositRequest,
    headers?: HeadersInit,
  ): Promise<QueryDepositResponse> {
    return Query.Deposit(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  deposits(
    req: QueryDepositsRequest,
    headers?: HeadersInit,
  ): Promise<QueryDepositsResponse> {
    return Query.Deposits(req, {
      headers,
      pathPrefix: this.url,
    });
  }

  tallyResult(
    req: QueryTallyResultRequest,
    headers?: HeadersInit,
  ): Promise<QueryTallyResultResponse> {
    return Query.TallyResult(req, {
      headers,
      pathPrefix: this.url,
    });
  }
}
