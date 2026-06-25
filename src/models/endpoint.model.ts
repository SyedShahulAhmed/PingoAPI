import mongoose, {
    Document,
    Model,
    Schema,
} from "mongoose";

export interface IEndpoint extends Document {
    userId: mongoose.Types.ObjectId;

    projectId?: mongoose.Types.ObjectId | null;

    name: string;

    url: string;

    method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";

    interval:
    | "1m"
    | "5m"
    | "1h";

    status:
    | "ONLINE"
    | "OFFLINE"
    | "TIMEOUT";

    lastCheckedAt?: Date;

    createdAt: Date;

    updatedAt: Date;
    lastResponseTime: number;

    lastStatusCode: number;

    nextCheckAt: Date;
}

const EndpointSchema = new Schema<IEndpoint>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            default: null,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        method: {
            type: String,
            enum: [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
            ],
            default: "GET",
        },

        interval: {
            type: String,
            enum: ["1m", "5m", "1h"],
            default: "5m",
        },

        status: {
            type: String,
            enum: [
                "ONLINE",
                "OFFLINE",
                "TIMEOUT",
            ],
            default: "OFFLINE",
        },

        lastCheckedAt: {
            type: Date,
        },
        lastResponseTime: {
            type: Number,
            default: 0,
        },

        lastStatusCode: {
            type: Number,
            default: 0,
        },
        nextCheckAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Endpoint: Model<IEndpoint> =
    mongoose.models.Endpoint ||
    mongoose.model<IEndpoint>(
        "Endpoint",
        EndpointSchema
    );

export default Endpoint;