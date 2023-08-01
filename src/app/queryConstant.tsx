export const _QUERY = `
query nftHolders($campaignId: ID!, $cursor: String!) {
  campaign(id: $campaignId) {
    nftHolderSnapshot {
      holdersCount
      holders(block: 45716583, first: 100, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        list {
          holder
        }
      }
    }
  }
}`;

export const MASK_SOCIAL_CAMPAIGN = "GCosxUtqZX";