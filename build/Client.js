import { LinearClient } from "@linear/sdk";
import { getIssue, getIssues, createIssue, updateIssue, searchIssues, } from "./LinearAPI.js";
export class LinearAPIClient {
    apiKey;
    client;
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = new LinearClient({ apiKey });
    }
    async getIssues(params) {
        return getIssues(params);
    }
    async getIssueById(issueId) {
        return getIssue(issueId);
    }
    async createIssue(input) {
        return createIssue(input);
    }
    async updateIssue(issueId, input) {
        return updateIssue(issueId, input);
    }
    async searchIssues(params) {
        return searchIssues(params);
    }
}
