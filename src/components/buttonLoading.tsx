import { Loader2 } from "lucide-react"

import { Button } from "./ui/button"

export function ButtonLoading() {
    return (
        <Button disabled>
            <Loader2 className="animate-spin">
                Enviando
            </Loader2>
        </Button>
    )
}