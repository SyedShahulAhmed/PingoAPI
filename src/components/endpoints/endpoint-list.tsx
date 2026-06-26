import EndpointCard from "./endpoint-card";

interface EndpointListProps {
    endpoints: any[];
}

export default function EndpointList({
    endpoints,
}: EndpointListProps) {
    if (!endpoints.length) {
        return (
            <div className="border rounded-xl p-10 text-center">
                <h3 className="font-semibold">
                    No Endpoints Found
                </h3>

                <p className="text-muted-foreground mt-2">
                    Add your first endpoint.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {endpoints.map((endpoint) => (
                <EndpointCard
                    key={endpoint._id.toString()}
                    endpoint={endpoint}
                />
            ))}
        </div>
    );
}