import { Card } from "@/shared/ui/card";
import AuthButtons from "./AuthButtons";

export default function DecisionScreen() {

    return (
    <section className="flex items-center justify-center w-full py-10 max-w-4xl mx-auto bg-accent-brown rounded-2xl shadow-lg border-black/50 border-2">
        <Card className="flex flex-col items-center justify-center p-14 w-full max-w-3xl bg-accent-white border-0">
            <h1 className="text-2xl md:text-4xl font-semibold font-aclonica">Welcome to Gardemic!</h1>

            <AuthButtons />
        </Card>
    </section>
    )

};