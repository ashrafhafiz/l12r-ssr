import { Feature, SharedData, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import FeatureUpvoteDownvote from "./FeatureUpvoteDownvote";
import FeatureActionsDropdown from "./FeatureActionsDropdown";
import { can } from "@/helper";

export default function FeatureItem({ feature }: { feature: Feature }) {

  const user: User = usePage<SharedData>().props.auth.user;

  const [isExpanded, setIsExpanded] = useState(false);

  const isOnFeatureShowPage = route().current('features.show');

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray100 flex gap-8">
      <FeatureUpvoteDownvote feature={feature} />
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex justify-center items-start gap-2 border-b-2 border-b-slate-200">
          <h2 className="flex-1 text-lg font-bold dark:text-gray-200 dark:border-b-gray-700">
            <Link href={route('features.show', feature.id)} className="">
              {feature.name}
            </Link>
          </h2>
          {
            can(user, 'manage_features') && <FeatureActionsDropdown feature={feature} />
          }
        </div>
        {
          feature.description && feature.description.length > 200 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {isExpanded ? feature.description : (feature.description || '').substring(0, 200) + "..."}
              <button className="pl-2 text-amber-500 hover:underline cursor-pointer" onClick={toggleExpanded}>
                {isExpanded ? " Show less" : " Read more"}
              </button>
            </p>
          )
        }

        {
          (feature.description || '').length <= 200 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {feature.description}
            </p>
          )
        }
        {
          !isOnFeatureShowPage && can(user, 'manage_comments') && (
            <div>
              <Link href={route('features.show', feature.id)} className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-slate-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                Comments
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
}
