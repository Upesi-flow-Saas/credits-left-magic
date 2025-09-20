import { cn } from "@/lib/utils";

type StatusType = 'active' | 'pending' | 'error' | 'inactive' | 'not_subscribed' | 
                  'submitted' | 'reviewing' | 'accepted' | 'completed' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  active: { label: "Active", className: "badge-active" },
  pending: { label: "Pending", className: "badge-pending" },
  error: { label: "Error", className: "badge-error" },
  inactive: { label: "Inactive", className: "badge-inactive" },
  not_subscribed: { label: "Not Subscribed", className: "badge-inactive" },
  submitted: { label: "Submitted", className: "bg-gray-100 text-gray-600 border-gray-200" },
  reviewing: { label: "Reviewing", className: "bg-blue-100 text-blue-600 border-blue-200" },
  accepted: { label: "Accepted", className: "badge-pending" },
  completed: { label: "Completed", className: "badge-active" },
  rejected: { label: "Rejected", className: "badge-error" },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}