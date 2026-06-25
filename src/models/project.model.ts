import mongoose, {
    Document,
    Model,
    Schema,
} from "mongoose";

export interface IProject extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Project: Model<IProject> =
    mongoose.models.Project ||
    mongoose.model<IProject>(
        "Project",
        ProjectSchema
    );

export default Project;