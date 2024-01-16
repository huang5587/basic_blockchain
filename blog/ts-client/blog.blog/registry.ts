import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdatePost } from "./types/blog/tx";
import { MsgDeletePost } from "./types/blog/tx";
import { MsgCreatePost } from "./types/blog/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/blog.blog.MsgUpdatePost", MsgUpdatePost],
    ["/blog.blog.MsgDeletePost", MsgDeletePost],
    ["/blog.blog.MsgCreatePost", MsgCreatePost],
    
];

export { msgTypes }