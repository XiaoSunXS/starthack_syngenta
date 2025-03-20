import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JSX } from "react";

export const SummaryCard = ({ title, children }: { title: string, children: JSX.Element }) =>
    <Card>
        <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>