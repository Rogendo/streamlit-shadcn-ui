import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, getPositionRelativeToTopDocument } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Streamlit } from "streamlit-component-lib";
import { useBodyStyle } from "@/hooks/useBodyStyle";

interface StDatePickerTriggerProps {
    value?: string;
    open: boolean;
}

export const StDatePickerTrigger = forwardRef<
    HTMLButtonElement,
    StDatePickerTriggerProps
>((props, ref) => {
    const container = useRef(null);
    const [open, setOpen] = useState(Boolean(props.open));

    const date = props.value ? new Date(props.value) : null;

    useEffect(() => {
        setOpen(Boolean(props.open));
    }, [props.open]);

    useEffect(() => {
        if (ref) {
            Streamlit.setFrameHeight(container.current.offsetHeight + 10);
        }
    });
    useEffect(() => {
        if (container.current) {
            const pos = getPositionRelativeToTopDocument(container.current);

            Streamlit.setComponentValue({
                x: pos.left,
                // consider the margin of the container
                y:
                    pos.top +
                    container.current.offsetHeight +
                    container.current.style.marginTop.replace("px", "") * 1,
                open,
            });
        }
    }, [open]);
    useBodyStyle("body { padding-right: 0.5em !important; }");
    return (
        <Popover>
            <PopoverTrigger ref={container} asChild>
                <Button
                    ref={ref}
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal m-1",
                        !date && "text-muted-foreground"
                    )}
                    onClick={() => {
                        setOpen((v) => !v);
                    }}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
        </Popover>
    );
});
