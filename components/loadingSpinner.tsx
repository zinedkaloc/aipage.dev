import { cn } from "@/utils/helpers";
import styles from "./loadingSpinner.module.css";

export default function LoadingSpinner({
  className,
  style,
}: {
  className?: string;
  style?: Record<string, any>;
}) {
  return (
    <div className={cn("h-5 w-5", className)}>
      <div className={cn(styles.spinner, "h-5 w-5", className)} style={style}>
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}
