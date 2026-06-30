"use server";

import { connectDB } from "@/lib/db";

import { getUser } from "@/lib/getUser";

import Project from "@/models/project.model";

import Endpoint from "@/models/endpoint.model";

export async function getSettingsData() {
  try {
    await connectDB();

    const user =
      await getUser();

    if (!user) {
      return null;
    }

    const totalProjects =
      await Project.countDocuments({
        userId: user._id,
      });

    const projectEndpoints =
      await Endpoint.countDocuments({
        userId: user._id,
        projectId: {
          $ne: null,
        },
      });

    const standaloneEndpoints =
      await Endpoint.countDocuments({
        userId: user._id,
        projectId: null,
      });

    const totalEndpoints =
      await Endpoint.countDocuments({
        userId: user._id,
      });

    return {
      user,

      stats: {
        totalProjects,

        projectEndpoints,

        standaloneEndpoints,

        totalEndpoints,
      },
    };
  } catch {
    return null;
  }
}