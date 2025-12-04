import React from 'react'
import { toast } from "sonner"
import { CircleX, CircleCheckBig, ShieldAlert } from "lucide-react"

export function toastError(message) {
    toast(
        <div className="flex items-center gap-2">
            <CircleX className="text-red-500" />
            <span className="font-sans font-medium">{message}</span>
        </div>,
        {}
    )
}

export function toastSuccess(message) {
    toast(
        <div className="flex items-center gap-2">
            <CircleCheckBig className="text-green-500" />
            <span className="font-sans font-medium">{message}</span>
        </div>,
        {}
    )
}

export function toastWarning(message){
    toast(
        <div className="flex items-center gap-2">
            <ShieldAlert className="text-orange-500" />
            <span className="font-sans font-medium">{message}</span>
        </div>,
        {}
    )
}
