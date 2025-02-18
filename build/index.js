#!/usr/bin/env node
import { LinearClient } from "@linear/sdk";
import { Tools } from "./Tools.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import * as dotenv from "dotenv";
dotenv.config();
async function main() {
    const apiToken = process.env.LINEAR_API_KEY || "";
    if (!apiToken) {
        console.error("Please set LINEAR_API_KEY environment variable");
        process.exit(1);
    }
    console.error("Starting Linear MCP Server...");
    const server = new Server({
        name: "Linear MCP Server",
        version: "1.0.0",
    }, {
        capabilities: {
            tools: {},
        },
    });
    const linearClient = new LinearClient({ apiKey: apiToken });
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        console.error("Received CallToolRequest:", request);
        try {
            if (!request.params.arguments) {
                throw new Error("No arguments provided");
            }
            switch (request.params.name) {
                case "linear_list_issues": {
                    const args = request.params.arguments;
                    const response = await linearClient.issues({
                        first: args.first,
                        after: args.after,
                        // @ts-expect-error
                        orderBy: args.orderBy,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_get_issue": {
                    const args = request.params.arguments;
                    if (!args.issueId) {
                        throw new Error("Missing required argument: issueId");
                    }
                    const response = await linearClient.issue(args.issueId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_create_issue": {
                    const args = request.params.arguments;
                    const response = await linearClient.createIssue({
                        teamId: args.teamId,
                        title: args.title,
                        description: args.description,
                        assigneeId: args.assigneeId,
                        priority: args.priority,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_search_issues": {
                    const args = request.params.arguments;
                    const response = await linearClient.issues({
                        filter: {
                            title: { contains: args.query || "" },
                        },
                        first: args.first,
                        after: args.after,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_list_projects": {
                    const args = request.params.arguments;
                    const response = await linearClient.projects({
                        first: args.first,
                        after: args.after,
                        includeArchived: args.includeArchived,
                        filter: args.filter,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_list_cycles": {
                    const args = request.params.arguments;
                    const response = await linearClient.cycles({
                        first: args.first,
                        after: args.after,
                        includeArchived: args.includeArchived,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_get_project": {
                    const args = request.params.arguments;
                    if (!args.projectId) {
                        throw new Error("Missing required argument: projectId");
                    }
                    const response = await linearClient.project(args.projectId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_get_cycle": {
                    const args = request.params.arguments;
                    if (!args.cycleId) {
                        throw new Error("Missing required argument: cycleId");
                    }
                    const response = await linearClient.cycle(args.cycleId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_list_teams": {
                    const args = request.params.arguments;
                    const response = await linearClient.teams({
                        first: args.first,
                        after: args.after,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_search_issues_advanced": {
                    const args = request.params.arguments;
                    if (!args.searchQuery) {
                        throw new Error("Missing required argument: searchQuery");
                    }
                    const response = await linearClient.issueSearch({
                        query: args.searchQuery,
                        first: args.first,
                        after: args.after,
                    });
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                case "linear_delete_issue": {
                    const args = request.params.arguments;
                    if (!args.issueId) {
                        throw new Error("Missing required argument: issueId");
                    }
                    const response = await linearClient.deleteIssue(args.issueId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(response) }],
                    };
                }
                default:
                    throw new Error(`Unknown tool: ${request.params.name}`);
            }
        }
        catch (error) {
            console.error("Error executing tool:", error);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error),
                        }),
                    },
                ],
            };
        }
    });
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        console.error("Received ListToolsRequest");
        return {
            tools: [
                Tools.listIssues,
                Tools.getIssue,
                Tools.createIssue,
                Tools.searchIssues,
                Tools.listProjects,
                Tools.listCycles,
                Tools.getProject,
                Tools.getCycle,
                Tools.listTeams,
                Tools.searchIssuesAdvanced,
                Tools.deleteIssue,
            ],
        };
    });
    const transport = new StdioServerTransport();
    console.error("Connecting server to transport...");
    await server.connect(transport);
    console.error("Linear MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
