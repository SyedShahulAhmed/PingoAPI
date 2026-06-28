import Check from "@/models/check.model";

export async function getUptime(
    endpointId: string
) {
    const checks =
        await Check.find({
            endpointId,
            checkedAt: {
                $gte:
                    new Date(
                        Date.now() -
                            30 *
                                24 *
                                60 *
                                60 *
                                1000
                    ),
            },
        });

    if (
        checks.length === 0
    ) {
        return 100;
    }

    const successful =
        checks.filter(
            (check) =>
                check.success
        ).length;

    return Number(
        (
            (successful /
                checks.length) *
            100
        ).toFixed(2)
    );
}