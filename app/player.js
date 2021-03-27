import React, { createContext } from 'react';

export const PlayerContext = createContext({});

export function withPlayer(Component) {
	const PlayerComponent = props => (
		<PlayerContext.Consumer>
			{contexts => <Component {...props} {...contexts} />}
		</PlayerContext.Consumer>
	);
	return PlayerComponent;
}