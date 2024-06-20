import {
    Query,
    QueryGroupInfoRequest,
    QueryGroupInfoResponse,
    QueryGroupPolicyInfoRequest,
    QueryGroupPolicyInfoResponse,
    QueryGroupMembersRequest,
    QueryGroupMembersResponse,
    QueryGroupsByAdminRequest,
    QueryGroupsByAdminResponse,
    QueryGroupPoliciesByGroupRequest,
    QueryGroupPoliciesByGroupResponse,
    QueryGroupPoliciesByAdminRequest,
    QueryGroupPoliciesByAdminResponse,
    QueryProposalRequest,
    QueryProposalResponse,
    QueryProposalsByGroupPolicyRequest,
    QueryProposalsByGroupPolicyResponse,
    QueryVoteByProposalVoterRequest,
    QueryVoteByProposalVoterResponse,
    QueryVotesByProposalRequest,
    QueryVotesByProposalResponse,
    QueryVotesByVoterRequest,
    QueryVotesByVoterResponse,
    QueryGroupsByMemberRequest,
    QueryGroupsByMemberResponse,
    QueryTallyResultRequest,
    QueryTallyResultResponse,
    QueryGroupsRequest,
    QueryGroupsResponse,
} from "../grpc_gateway/cosmos/group/v1/query.pb";

export class GroupQuerier {
    constructor(private url: string) {}
  
    groupInfo(
      req: QueryGroupInfoRequest,
      headers?: HeadersInit,
    ): Promise<QueryGroupInfoResponse> {
      return Query.GroupInfo(req, {
        headers,
        pathPrefix: this.url,
      });
    }

    groupPolicyInfo(
        req: QueryGroupPolicyInfoRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupPolicyInfoResponse> {
        return Query.GroupPolicyInfo(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groupMembers(
        req: QueryGroupMembersRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupMembersResponse> {
        return Query.GroupMembers(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groupsByAdmin(
        req: QueryGroupsByAdminRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupsByAdminResponse> {
        return Query.GroupsByAdmin(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groupPoliciesByGroup(
        req: QueryGroupPoliciesByGroupRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupPoliciesByGroupResponse> {
        return Query.GroupPoliciesByGroup(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groupPoliciesByAdmin(
        req: QueryGroupPoliciesByAdminRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupPoliciesByAdminResponse> {
        return Query.GroupPoliciesByAdmin(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    proposal(
        req: QueryProposalRequest,
        headers?: HeadersInit,
    ): Promise<QueryProposalResponse> {
        return Query.Proposal(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    proposalsByGroupPolicy(
        req: QueryProposalsByGroupPolicyRequest,
        headers?: HeadersInit,
    ): Promise<QueryProposalsByGroupPolicyResponse> {
        return Query.ProposalsByGroupPolicy(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    voteByProposalVoter(
        req: QueryVoteByProposalVoterRequest,
        headers?: HeadersInit,
    ): Promise<QueryVoteByProposalVoterResponse> {
        return Query.VoteByProposalVoter(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    votesByProposal(
        req: QueryVotesByProposalRequest,
        headers?: HeadersInit,
    ): Promise<QueryVotesByProposalResponse> {
        return Query.VotesByProposal(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    votesByVoter(
        req: QueryVotesByVoterRequest,
        headers?: HeadersInit,
    ): Promise<QueryVotesByVoterResponse> {
        return Query.VotesByVoter(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groupsByMember(
        req: QueryGroupsByMemberRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupsByMemberResponse> {
        return Query.GroupsByMember(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    tallyResult(
        req: QueryTallyResultRequest,
        headers?: HeadersInit,
    ): Promise<QueryTallyResultResponse> {
        return Query.TallyResult(req, {
            headers,
            pathPrefix: this.url,    
        })
    }

    groups(
        req: QueryGroupsRequest,
        headers?: HeadersInit,
    ): Promise<QueryGroupsResponse> {
        return Query.Groups(req, {
            headers,
            pathPrefix: this.url,    
        })
    }
}  

