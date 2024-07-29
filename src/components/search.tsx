'use client';

import React, {useState} from "react";
import {motion} from "framer-motion";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

export const AnimatedSearchInput = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
                                                                                                               className,
                                                                                                           }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <motion.div
            ref={ref}
            className={cn('relative w-1/3 lg:w-1/6', className)}
            animate={{width: isFocused ? "100%" : ["100%", "66.666667%", "33.333333%"]}}
            transition={{duration: 0.3}}

        >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                type="search"
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </motion.div>
    );
});

AnimatedSearchInput.displayName = "AnimatedSearchInput";