import { Feature } from "@/types";
import { InertiaFormProps, useForm } from "@inertiajs/react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FeatureUpvoteDownvote({ feature }: { feature: Feature }) {

  const upvoteForm: InertiaFormProps<{ feature_id: number; upvote: true }> = useForm({
    feature_id: feature.id,
    upvote: true,
  });

  const downvoteForm: InertiaFormProps<{ feature_id: number; upvote: false }> = useForm({
    feature_id: feature.id,
    upvote: false,
  });

  const upvoteDownvote = (upvote: boolean) => {
    if (feature.user_upvoted && upvote || feature.user_downvoted && !upvote) {
      // If the user has already upvoted or downvoted, we need to remove the vote
      if (upvote) {
        upvoteForm.delete(route('upvote.delete', feature.id), {
          preserveScroll: true,
        });
      } else {
        downvoteForm.delete(route('upvote.delete', feature.id), {
          preserveScroll: true,
        });
      }
    } else {
      // If the user has not upvoted or downvoted, we need to add the vote
      if (upvote) {
        upvoteForm.post(route('upvote.store', feature.id), {
          preserveScroll: true,
        });
      } else {
        downvoteForm.post(route('upvote.store', feature.id), {
          preserveScroll: true,
        });
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-items-start gap-2">
      <button onClick={() => upvoteDownvote(true)} className={`icon-button ${feature.user_upvoted ? '!text-amber-700 !bg-amber-200 hover:!bg-amber-300' : ''}`}>
        <ChevronUp />
      </button>
      <span className={feature.user_upvoted || feature.user_downvoted ? 'text-amber-700' : ''}>{feature.upvote_count}</span>
      <button onClick={() => upvoteDownvote(false)} className={`icon-button ${feature.user_downvoted ? '!text-amber-700 !bg-amber-200 hover:!bg-amber-300' : ''}`}>
        <ChevronDown />
      </button>
    </div>
  );
}
