"use client";

import { addComment } from "@/lib/actions";
import { useAuth, useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { comment } from "postcss";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: string;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  const add = async () => {
    if (!user || !description) return;
    addOptimisticComments({
      id: Math.random().toString(),
      description,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/noAvatar.png",
        name: "",
        surname: "",
        username: "Sending Please wait",
        cover: "",
        description: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, description);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {}
  };

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            width={32}
            height={32}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="write a comment..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Image
              src={"/emoji.png"}
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
          </form>
        </div>
      )}
      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* AVATAR */}
            <div className="">
              <Image
                src={comment.user.avatar || "/noAvatar.png"}
                width={40}
                height={40}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.description}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={"/like.png"}
                    width={12}
                    height={12}
                    alt=""
                    className="w-3 h-3 cursor-pointer"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">143 Likes</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/* ICON */}
            <div className="">
              <Image
                src={"/more.png"}
                width={16}
                height={16}
                alt=""
                className="cursor-pointer w-4 h-4"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
