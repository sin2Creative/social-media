"use client";
import { switchBlock, swithFollow } from "@/lib/actions";
import { User } from "@prisma/client";
import React, { useOptimistic, useState } from "react";

const UseInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowRequested,
}: {
  userId: string;
  currentUserId: string | null;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowRequested: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followRequested: isFollowRequested,
  });

  const follow = async () => {
    swithOptimisticState("follow");
    try {
      await swithFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followRequested:
          !prev.following && !prev.followRequested ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    swithOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.error(error);
      throw new Error("Failed to block user");
    }
  };

  const [optimisticState, swithOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followRequested:
              !state.following && !state.followRequested ? true : false,
          }
        : {
            ...state,
            blocked: !state.blocked,
          }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm p-2 rounded-md">
          {optimisticState.following
            ? "Following"
            : optimisticState.followRequested
            ? "Request Sent "
            : "Follow"}
        </button>
      </form>
      <form className="self-end" action={block}>
        <button>
          <span className="text-red-400 text-xs cursor-pointer ">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UseInfoCardInteraction;
