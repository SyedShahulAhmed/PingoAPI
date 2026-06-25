import mongoose, {
    Document,
    Model,
    Schema,
} from "mongoose";

export interface ICheck
    extends Document {
    endpointId:
    mongoose.Types.ObjectId;

    statusCode: number;

    responseTime: number;

    success: boolean;

    checkedAt: Date;
}

const CheckSchema =
    new Schema<ICheck>({
        endpointId: {
            type: Schema.Types.ObjectId,
            ref: "Endpoint",
            required: true,
        },

        statusCode: {
            type: Number,
            required: true,
        },

        responseTime: {
            type: Number,
            required: true,
        },

        success: {
            type: Boolean,
            required: true,
        },

        checkedAt: {
            type: Date,
            default: Date.now,
        },
    });

const Check: Model<ICheck> =
    mongoose.models.Check ||
    mongoose.model<ICheck>(
        "Check",
        CheckSchema
    );

export default Check;