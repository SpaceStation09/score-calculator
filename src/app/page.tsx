"use client";
import useSWRInfinite from "swr/infinite";
import { useEffect, useState } from "react";
import { uniq } from "lodash";
import { MASK_SOCIAL_CAMPAIGN, _QUERY } from "./queryConstant";


const _fetcher = async (variables: any) => {
  const payload = {
    query: _QUERY,
    variables,
  };
  const result = (
    await fetch("https://graphigo.prd.galaxy.eco/query", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return result;
};

const getURL = (index: number, prev: any) => {
  const hasNextPage =
    prev?.data?.campaign?.nftHolderSnapshot?.holders?.pageInfo?.hasNextPage;
  const cursor =
    prev?.data.campaign?.nftHolderSnapshot?.holders?.pageInfo?.endCursor ?? "";
  if (index !== 0 && prev && !hasNextPage) return null;
  const res = {
    campaignId: MASK_SOCIAL_CAMPAIGN,
    cursor: cursor,
  };
  return res;
};
 
export default function Home() {
  const initial: string[] = [];
  const [holderAddresses, setHolderAddresses] = useState(initial);
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index, prev) => getURL(index, prev),
    _fetcher,
    {
      persistSize: false,
    }
  );
   
  useEffect(() => {
    let holders: string[] = []
    const id = setInterval(() => {
      const hasNextPage =
        data?.[data.length - 1]?.data?.campaign?.nftHolderSnapshot?.holders
          ?.pageInfo?.hasNextPage;
      if (hasNextPage && !isValidating) {
        setSize(size + 1);
      } else {
        clearInterval(id);
      }
    }, 1000);
    data?.map((x) => {
      x.data.campaign?.nftHolderSnapshot?.holders.list.map((i: string) =>
        holders.push(i)
      );
    });
    holders = uniq(holders);
    setHolderAddresses(holders);
    return () => clearInterval(id);
  }, [data]);

}
