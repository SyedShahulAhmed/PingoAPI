"use server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";
import Endpoint from "@/models/endpoint.model";

export async function getLogSidebarData() {
    try {
        await connectDB();

        const user =
            await getUser();

        if (!user) {
            return {
                projects: [],
                standaloneEndpoints:
                    [],
            };
        }

        const projects =
            await Project.find({
                userId: user._id,
            }).lean();

        const endpoints =
            await Endpoint.find({
                userId: user._id,
            }).lean();

        const projectData =
            projects.map(
                (project: any) => ({
                    ...project,

                    endpoints:
                        endpoints.filter(
                            (
                                endpoint: any
                            ) =>
                                endpoint.projectId?.toString() ===
                                project._id.toString()
                        ),
                })
            );

        const standaloneEndpoints =
            endpoints.filter(
                (
                    endpoint: any
                ) =>
                    !endpoint.projectId
            );

        return {
            projects:
                projectData,
            standaloneEndpoints,
        };
    } catch {
        return {
            projects: [],
            standaloneEndpoints:
                [],
        };
    }
}