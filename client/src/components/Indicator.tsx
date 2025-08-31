import { cn } from "@/lib/utils";

const Indicator = ({ className }: { className?: string }) => {
    return (
        <span
            className={cn(
                "p-1 rounded-full bg-foreground animate-pulse",
                className
            )}
        />
    );
};

export default Indicator;
