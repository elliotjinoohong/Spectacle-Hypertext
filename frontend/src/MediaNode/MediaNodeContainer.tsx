import React, { useEffect, useState } from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import { INode } from 'spectacle-interfaces';
import ImmutableTextNodeGateway from '../Gateways/ImmutableText/ImmutableTextNodeGateway';
import { Spinner } from '@blueprintjs/core';
import ImmutableTextWithAnchorsContainer from './MediaWithAnchorsContainer';
import MediaNodeGateway from '../Gateways/Media/MediaNodeGateway';
import MediaWithAnchorsContainer from './MediaWithAnchorsContainer';

interface MediaContainerProps {
	node: INode
	mediaPlayed: number
	setMediaPlayed: any
	setMediaDuration: any
	mediaPlaying: boolean
	setMediaPlaying: any
	newMediaAnchorModal: boolean
    setNewMediaAnchorModal: any
    previouslyPaused:boolean
    mediaSkipUsingAnnotation: boolean
    setMediaSkipUsingAnnotation: any
}

function MediaContainer(props: MediaContainerProps): JSX.Element {
    const { node, mediaPlayed, setMediaPlayed, setMediaDuration, mediaPlaying, setMediaPlaying,
    	newMediaAnchorModal, setNewMediaAnchorModal, previouslyPaused, mediaSkipUsingAnnotation, setMediaSkipUsingAnnotation } = props
    
        const { isLoading, data, error } = useQuery([node.nodeId, node.nodeType], MediaNodeGateway.getNode)
    
        const [createNode] = useMutation(MediaNodeGateway.createNode, {
		onSuccess: () => queryCache.invalidateQueries([node.nodeId, node.nodeType])
	})

	if (isLoading) return <Spinner />

	if (error) return <div> {'An error has occurred: ' + error} </div>

	return (<div>
		<MediaWithAnchorsContainer
			node={data?.payload}
			createNode={mediaUrl => createNode({
				nodeId: node.nodeId,
				mediaUrl: mediaUrl
			})}
			mediaPlayed={mediaPlayed}
			setMediaPlayed={setMediaPlayed}
			setMediaDuration={setMediaDuration}
			mediaPlaying={mediaPlaying}
			setMediaPlaying={setMediaPlaying}
			newMediaAnchorModal={newMediaAnchorModal}
            setNewMediaAnchorModal={setNewMediaAnchorModal}
            previouslyPaused={previouslyPaused}
            mediaSkipUsingAnnotation={mediaSkipUsingAnnotation}
            setMediaSkipUsingAnnotation={setMediaSkipUsingAnnotation}
		/>
	</div>
	)
}

export default MediaContainer;
