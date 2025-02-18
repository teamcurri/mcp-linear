export const Tools = {
    listIssues: {
        name: "linear_list_issues",
        description: "List Linear issues",
        inputSchema: {
            type: "object",
            properties: {
                first: {
                    type: "integer",
                    description: "Number of issues to fetch",
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
                orderBy: {
                    type: "string",
                    description: "Field to order by",
                },
            },
        },
    },
    getIssue: {
        name: "linear_get_issue",
        description: "Get a specific Linear issue",
        inputSchema: {
            type: "object",
            properties: {
                issueId: {
                    type: "string",
                    description: "The ID of the issue to get",
                },
            },
            required: ["issueId"],
        },
    },
    createIssue: {
        name: "linear_create_issue",
        description: "Create a new Linear issue",
        inputSchema: {
            type: "object",
            properties: {
                teamId: {
                    type: "string",
                    description: "The team ID to create the issue in",
                },
                title: {
                    type: "string",
                    description: "The title of the issue",
                },
                description: {
                    type: "string",
                    description: "The description of the issue",
                },
                assigneeId: {
                    type: "string",
                    description: "The ID of the user to assign the issue to",
                },
                priority: {
                    type: "number",
                    description: "The priority of the issue (0-4)",
                },
            },
            required: ["teamId", "title"],
        },
    },
    searchIssues: {
        name: "linear_search_issues",
        description: "Search Linear issues",
        inputSchema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search query string",
                },
                first: {
                    type: "integer",
                    description: "Number of results to return",
                    default: 50,
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
            },
        },
    },
    listProjects: {
        name: "linear_list_projects",
        description: "List Linear projects",
        inputSchema: {
            type: "object",
            properties: {
                first: {
                    type: "integer",
                    description: "Number of projects to fetch",
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
                includeArchived: {
                    type: "boolean",
                    description: "Include archived projects in results",
                    default: false,
                },
            },
        },
    },
    listCycles: {
        name: "linear_list_cycles",
        description: "List Linear cycles",
        inputSchema: {
            type: "object",
            properties: {
                first: {
                    type: "integer",
                    description: "Number of cycles to fetch",
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
                includeArchived: {
                    type: "boolean",
                    description: "Include archived cycles in results",
                    default: false,
                },
            },
        },
    },
    getProject: {
        name: "linear_get_project",
        description: "Get a specific Linear project",
        inputSchema: {
            type: "object",
            properties: {
                projectId: {
                    type: "string",
                    description: "The ID of the project to get",
                },
            },
            required: ["projectId"],
        },
    },
    getCycle: {
        name: "linear_get_cycle",
        description: "Get a specific Linear cycle",
        inputSchema: {
            type: "object",
            properties: {
                cycleId: {
                    type: "string",
                    description: "The ID of the cycle to get",
                },
            },
            required: ["cycleId"],
        },
    },
    listTeams: {
        name: "linear_list_teams",
        description: "List all teams in Linear",
        inputSchema: {
            type: "object",
            properties: {
                first: {
                    type: "integer",
                    description: "Number of teams to fetch",
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
            },
        },
    },
    searchIssuesAdvanced: {
        name: "linear_search_issues_advanced",
        description: "Advanced search for Linear issues using full search query syntax",
        inputSchema: {
            type: "object",
            properties: {
                searchQuery: {
                    type: "string",
                    description: "Full Linear search query (e.g. 'assignee:@me status:todo')",
                },
                first: {
                    type: "integer",
                    description: "Number of results to return",
                    default: 50,
                },
                after: {
                    type: "string",
                    description: "Cursor for pagination",
                },
            },
            required: ["searchQuery"],
        },
    },
    deleteIssue: {
        name: "linear_delete_issue",
        description: "Delete a Linear issue",
        inputSchema: {
            type: "object",
            properties: {
                issueId: {
                    type: "string",
                    description: "The ID of the issue to delete",
                },
            },
            required: ["issueId"],
        },
    },
};
