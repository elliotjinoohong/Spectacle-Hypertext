import { ITestMediaAnchorDatabaseConnection } from "../IMediaAnchorDatabaseConnection";
import { IServiceResponse, successfulServiceResponse, failureServiceResponse, getServiceResponse, IMediaAnchor } from "spectacle-interfaces"
import { getMongoAnchor, IMongoIMediaAnchor, tryGetAnchor } from "../helpers";


// TODO: completed by Chai
export default class MockMediaAnchorDatabaseConnection implements ITestMediaAnchorDatabaseConnection {

	_anchors: {[anchorId: string]: IMongoIMediaAnchor}

	constructor() {
	  this._anchors = {}
	  this.clearAnchorCollection = this.clearAnchorCollection.bind(this);
	  this.initAnchors = this.initAnchors.bind(this);
	  this.insertAnchor = this.insertAnchor.bind(this);
	  this.findAnchor = this.findAnchor.bind(this);
	  this.deleteAnchor = this.deleteAnchor.bind(this);
	  this.deleteAnchors = this.deleteAnchors.bind(this);
	}
  
	async clearAnchorCollection(): Promise<IServiceResponse<{}>> {
	  this._anchors = {}
	  return successfulServiceResponse({})
	}
  
	async initAnchors(anchors: IMediaAnchor[]): Promise<IServiceResponse<{}>> {
	  anchors.forEach(anchor => {
		const mongoAnchorResp = getMongoAnchor(anchor)
		if (!mongoAnchorResp.success) {
		  return failureServiceResponse(mongoAnchorResp.message)
		}
		this._anchors[anchor.anchorId] = mongoAnchorResp.payload
	  })
	  return successfulServiceResponse({})
	}
  
	async insertAnchor(anchor: IMediaAnchor): Promise<IServiceResponse<IMediaAnchor>> {
  
	  const mongoAnchorResp = getMongoAnchor(anchor)
	  if (!mongoAnchorResp.success) {
		return failureServiceResponse(mongoAnchorResp.message)
	  } if (this._anchors[anchor.anchorId])
		return failureServiceResponse("Anchor already exists")
	  this._anchors[anchor.anchorId] = mongoAnchorResp.payload
	  return successfulServiceResponse(anchor)
	}
  
	async findAnchor(anchorId: string): Promise<IServiceResponse<IMediaAnchor>> {
  
	  const anchor = this._anchors[anchorId]
  
	  if (anchor) {
		const tryCreateAnchorResp = tryGetAnchor(anchor)
		return getServiceResponse(tryCreateAnchorResp, "Failed to find anchor\n")
	  }
  
	  return failureServiceResponse("Failed to find anchors")
  
	}
  
	async findAnchors(anchorIds: string[]): Promise<IServiceResponse<{[anchorId: string]: IMediaAnchor}>> {
  
	  let anchors: {[anchorId: string]: IMediaAnchor} = {}
  
	  anchorIds.forEach(aid => {
		if (this._anchors[aid]) {
		  const manchor = this._anchors[aid]
		  const tryCreateAnchorResp = tryGetAnchor(manchor)
		  if (tryCreateAnchorResp.success) {
			anchors[aid] = tryCreateAnchorResp.payload
		  }
		}
	  })
  
	  if (Object.keys(anchors).length > 0) {
		return successfulServiceResponse(anchors)
	  }
	  return failureServiceResponse("Failed to find anchors")
  
	}
  
	async deleteAnchor(anchorId: string): Promise<IServiceResponse<{}>> {
	  delete this._anchors[anchorId]
	  return successfulServiceResponse({})
	}
	
	async deleteAnchors(anchorIds: string[]): Promise<IServiceResponse<{}>> {
	  anchorIds.forEach(nid => delete this._anchors[nid])
	  return successfulServiceResponse({})
	}
}