import { ReactElement } from "react";
import {
    ShieldExclamationIcon,
    TrashIcon,
    HandRaisedIcon,
    LockClosedIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export type Clause = {
    text: string;
    metadata: {
        file_name: string;
        page_number: number;
    };
    type: ClauseType;
};

export enum ClauseType {
    INDEMNIFICATION = "Indemnification",
    TERMINATION = "Termination",
    LIABILITY = "Liability",
    CONFIDENTIALITY = "Confidentiality",
    COPYRIGHT = "Copyright",
}

export const clauseTypeColors: Record<
    ClauseType,
    { bgColor: string; spanColor: string; badgeBgColor: string; textColor: string; icon: ReactElement }
> = {
    [ClauseType.INDEMNIFICATION]: {
        bgColor: "bg-red-500",
        spanColor: "bg-red-500",
        badgeBgColor: "bg-red-100",
        textColor: "text-red-500",
        icon: React.createElement(ShieldExclamationIcon, { className: "h-6 w-6" }),
    },
    [ClauseType.TERMINATION]: {
        bgColor: "bg-blue-500",
        spanColor: "bg-blue-500",
        badgeBgColor: "bg-blue-100",
        textColor: "text-blue-500",
        icon: React.createElement(TrashIcon, { className: "h-6 w-6" }),
    },
    [ClauseType.LIABILITY]: {
        bgColor: "bg-green-500",
        spanColor: "bg-green-500",
        badgeBgColor: "bg-green-100",
        textColor: "text-green-500",
        icon: React.createElement(HandRaisedIcon, { className: "h-6 w-6" }),
    },
    [ClauseType.CONFIDENTIALITY]: {
        bgColor: "bg-purple-500",
        spanColor: "bg-purple-500",
        badgeBgColor: "bg-purple-100",
        textColor: "text-purple-500",
        icon: React.createElement(LockClosedIcon, { className: "h-6 w-6" }),
    },
    [ClauseType.COPYRIGHT]: {
        bgColor: "bg-yellow-500",
        spanColor: "bg-yellow-500",
        badgeBgColor: "bg-yellow-100",
        textColor: "text-yellow-500",
        icon: React.createElement(ChartBarIcon, { className: "h-6 w-6" }),
    },
};
