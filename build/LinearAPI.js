import { LinearClient } from "@linear/sdk";
const client = new LinearClient({
    apiKey: process.env.LINEAR_API_KEY || "",
});
export async function getIssue(issueId) {
    return client.issue(issueId);
}
export async function getIssues(params) {
    return client.issues(params);
}
export async function createIssue(input) {
    return client.createIssue(input);
}
export async function updateIssue(issueId, input) {
    return client.updateIssue(issueId, input);
}
export async function searchIssues(params) {
    return client.issues({
        filter: params.query,
        first: params.first,
        after: params.after,
    });
}
