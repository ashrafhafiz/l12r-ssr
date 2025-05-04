import { Comment, SharedData, User } from "@/types";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import { useForm, usePage } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { hasRole } from "@/helper";

export default function FeatureCommentItem({ comment }: { comment: Comment }) {

  const user: User = usePage<SharedData>().props.auth.user;

  const getInitials = useInitials();
  const initials = getInitials(comment.user.name);
  // const initials = intials.length > 2 ? intials.slice(0, 2) : intials;

  const form = useForm();

  const deleteComment = () => {
    // Implement delete comment functionality here
    form.delete(route('comments.destroy', comment.id), {
      preserveScroll: true,
      preserveState: true,
    })
  };

  return (
    <div className="flex gap-4 mb-3 rounded-2xl border border-neutral-200 bg-slate-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">

      <Button variant="ghost" className="size-10 rounded-full p-1">
        <Avatar className="size-10 overflow-hidden rounded-full">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      <div className="flex-1">
        <h3 className="font-semibold mt-1">
          {comment.user.name} <span className="text-gray-500 text-xs ml-4">{comment.created_at}</span>
        </h3>
        <div className="italic mt-1">{comment.comment}</div>
      </div>

      {
        (hasRole(user, 'admin') || (hasRole(user, 'commenter') && (user.id === comment.user.id))) && <div className="flex items-center py-2 px-6">
          <button onClick={deleteComment} className="cursor-pointer"><Trash2 /></button>
        </div>
      }
    </div>
  );
}
