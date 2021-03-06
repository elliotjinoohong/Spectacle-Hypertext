import IServiceResponse from "./IServiceResponse";

export interface ILink {
	linkId: string;
	srcNodeId?: string;
	destAnchorId?: string;
	destNodeId?: string;
	srcAnchorId?: string;
}

export interface ILinkGateway {
	createLink(link: ILink): Promise<IServiceResponse<ILink>>;
	getLink(linkId: string): Promise<IServiceResponse<ILink>>;
	getLinks(linkIds: string[]): Promise<IServiceResponse<{ [linkId: string]: ILink }>>;
	// getAnchorLinks not being used in current implementation
	getAnchorLinks(anchorId: string): Promise<IServiceResponse<{ [linkId: string]: ILink }>>;
	getNodeLinks(nodeId: string): Promise<IServiceResponse<{ [linkId: string]: ILink }>>;
	deleteLink(linkId: string): Promise<IServiceResponse<{}>>;
	deleteLinks(linkId: string[]): Promise<IServiceResponse<{}>>;
	deleteAnchorLinks(anchorId: string): Promise<IServiceResponse<{}>>;
	deleteNodeLinks(nodeId: string): Promise<IServiceResponse<{}>>;
}