import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Player } from '../src/components/player/Player';
import { usePlayerStore } from '../src/store/usePlayerStore';

describe('Player Component', () => {
  it('renders a placeholder when no track is selected', () => {
    // Current state has no track
    usePlayerStore.setState({ currentTrack: null });
    const { getByText } = render(<Player />);
    expect(getByText('Select a track to play')).toBeDefined();
  });
});
